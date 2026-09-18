import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "whi_admin_session";
const BUCKET_NAME = "property-images";

type StorageFile = {
  name: string;
};

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing from .env.local."
    );
  }

  return url;
}

function getAdminSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing from .env.local."
    );
  }

  return createClient(getSupabaseUrl(), serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD is missing from .env.local."
    );
  }

  return password;
}

function verifyAdminSession(token: string | undefined) {
  if (!token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [expiresAtString, suppliedSignature] = parts;
  const expiresAt = Number(expiresAtString);

  if (
    !Number.isFinite(expiresAt) ||
    expiresAt < Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const expectedSignature = createHmac(
    "sha256",
    getAdminPassword()
  )
    .update(expiresAtString)
    .digest("hex");

  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (suppliedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(
    suppliedBuffer,
    expectedBuffer
  );
}

/* ============================================================
   STORAGE HELPERS
   ============================================================ */

async function listAllStorageItems(
  supabase: ReturnType<typeof getAdminSupabase>,
  path: string
) {
  const items: StorageFile[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(path, {
        limit,
        offset,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (error) {
      throw new Error(
        `Storage list failed for "${path}": ${error.message}`
      );
    }

    if (!data || data.length === 0) {
      break;
    }

    items.push(
      ...data.map((item) => ({
        name: item.name,
      }))
    );

    if (data.length < limit) {
      break;
    }

    offset += limit;
  }

  return items;
}

function isImageFile(name: string) {
  return /\.(jpg|jpeg|png|webp)$/i.test(name);
}

function getImageOrder(name: string) {
  const match = name.match(/^(\d+)\.(jpg|jpeg|png|webp)$/i);

  if (!match) {
    return null;
  }

  const number = Number(match[1]);

  if (!Number.isFinite(number) || number < 1) {
    return null;
  }

  return number - 1;
}

function getPublicImageUrl(
  destinationSlug: string,
  propertySlug: string,
  fileName: string
) {
  return `${getSupabaseUrl()}/storage/v1/object/public/${BUCKET_NAME}/${encodeURIComponent(
    destinationSlug
  )}/${encodeURIComponent(propertySlug)}/${encodeURIComponent(
    fileName
  )}`;
}

/* ============================================================
   SYNC
   ============================================================ */

async function syncPropertyImages() {
  const supabase = getAdminSupabase();

  let destinationsScanned = 0;
  let propertiesScanned = 0;
  let propertiesSynced = 0;
  let imagesSynced = 0;
  let imagesCreated = 0;
  let imagesUpdated = 0;

  const skippedProperties: string[] = [];
  const errors: string[] = [];

  /* --------------------------------------------------------
     LOAD DESTINATIONS
     -------------------------------------------------------- */

  const { data: destinations, error: destinationsError } =
    await supabase
      .from("destinations")
      .select("id, name, slug, active")
      .eq("active", true)
      .order("id", {
        ascending: true,
      });

  if (destinationsError) {
    throw new Error(
      `Unable to load destinations: ${destinationsError.message}`
    );
  }

  /* --------------------------------------------------------
     SCAN EACH DESTINATION FOLDER
     -------------------------------------------------------- */

  for (const destination of destinations ?? []) {
    destinationsScanned += 1;

    const destinationItems = await listAllStorageItems(
      supabase,
      destination.slug
    );

    const propertyFolders = destinationItems.filter(
      (item) =>
        !isImageFile(item.name) &&
        item.name.trim()
    );

    /* ------------------------------------------------------
       SCAN EACH PROPERTY FOLDER
       ------------------------------------------------------ */

    for (const propertyFolder of propertyFolders) {
      const propertySlug = propertyFolder.name;

      propertiesScanned += 1;

      try {
        const { data: property, error: propertyError } =
          await supabase
            .from("properties")
            .select("id, name, slug, destination_id, active")
            .eq("destination_id", destination.id)
            .eq("slug", propertySlug)
            .maybeSingle();

        if (propertyError) {
          throw new Error(
            `Property lookup failed: ${propertyError.message}`
          );
        }

        if (!property) {
          skippedProperties.push(
            `${destination.name} / ${propertySlug} — property not found`
          );

          continue;
        }

        if (!property.active) {
          skippedProperties.push(
            `${destination.name} / ${property.name} — property inactive`
          );

          continue;
        }

        const files = await listAllStorageItems(
          supabase,
          `${destination.slug}/${propertySlug}`
        );

        const imageFiles = files
          .filter((file) => isImageFile(file.name))
          .map((file) => ({
            name: file.name,
            displayOrder: getImageOrder(file.name),
          }))
          .filter(
            (
              file
            ): file is {
              name: string;
              displayOrder: number;
            } => file.displayOrder !== null
          )
          .sort(
            (a, b) =>
              a.displayOrder - b.displayOrder
          );

        if (imageFiles.length === 0) {
          skippedProperties.push(
            `${destination.name} / ${property.name} — no numbered images found`
          );

          continue;
        }

        /* ----------------------------------------------------
           EXISTING DB RECORDS
           ---------------------------------------------------- */

        const {
          data: existingImages,
          error: existingImagesError,
        } = await supabase
          .from("property_images")
          .select(
            "id, image_url, alt_text, is_primary, display_order, active"
          )
          .eq("property_id", property.id)
          .order("display_order", {
            ascending: true,
          });

        if (existingImagesError) {
          throw new Error(
            `Existing image lookup failed: ${existingImagesError.message}`
          );
        }

        /* ----------------------------------------------------
           BUILD NEW STORAGE IMAGE RECORDS
           ---------------------------------------------------- */

        const imageRows = imageFiles.map(
          (image, index) => ({
            property_id: property.id,
            image_url: getPublicImageUrl(
              destination.slug,
              propertySlug,
              image.name
            ),
            alt_text: `${property.name} property image`,
            is_primary: index === 0,
            display_order: index,
            active: true,
          })
        );

        /* ----------------------------------------------------
           DELETE OLD MAPPINGS

           Storage is the source of truth.

           This removes:
           - old /properties/... URLs
           - duplicate records
           - broken mappings
           ---------------------------------------------------- */

        if (
          existingImages &&
          existingImages.length > 0
        ) {
          const {
            error: deleteError,
          } = await supabase
            .from("property_images")
            .delete()
            .eq("property_id", property.id);

          if (deleteError) {
            throw new Error(
              `Old image cleanup failed: ${deleteError.message}`
            );
          }
        }

        /* ----------------------------------------------------
           INSERT CURRENT STORAGE IMAGES
           ---------------------------------------------------- */

        const {
          error: insertError,
        } = await supabase
          .from("property_images")
          .insert(imageRows);

        if (insertError) {
          throw new Error(
            `Image insert failed: ${insertError.message}`
          );
        }

        propertiesSynced += 1;
        imagesSynced += imageRows.length;

        if (
          existingImages &&
          existingImages.length > 0
        ) {
          imagesUpdated += imageRows.length;
        } else {
          imagesCreated += imageRows.length;
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unknown sync error.";

        errors.push(
          `${destination.name} / ${propertySlug} — ${message}`
        );
      }
    }
  }

  return {
    success: errors.length === 0,
    summary: {
      destinations_scanned: destinationsScanned,
      property_folders_scanned: propertiesScanned,
      properties_synced: propertiesSynced,
      images_synced: imagesSynced,
      images_created: imagesCreated,
      images_updated: imagesUpdated,
      skipped_properties: skippedProperties.length,
      errors: errors.length,
    },
    skipped_properties: skippedProperties,
    errors,
  };
}

/* ============================================================
   GET
   ============================================================ */

export async function GET(
  request: NextRequest
) {
  try {
    const sessionToken = request.cookies.get(
      COOKIE_NAME
    )?.value;

    if (!verifyAdminSession(sessionToken)) {
      return NextResponse.json(
        {
          error:
            "Admin session expired. Please login again.",
        },
        {
          status: 401,
        }
      );
    }

    const result =
      await syncPropertyImages();

    return NextResponse.json(result, {
      status: result.errors.length > 0 ? 207 : 200,
    });
  } catch (error) {
    console.error(
      "PROPERTY IMAGE SYNC ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to sync property images.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   POST
   ============================================================ */

export async function POST(
  request: NextRequest
) {
  return GET(request);
}