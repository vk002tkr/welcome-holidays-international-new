import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "whi_admin_session";

type PropertyImageInput = {
  image_url: string;
  alt_text?: string | null;
  is_primary?: boolean;
};

type PropertyRequestBody = {
  destination_id: number;
  name: string;
  slug: string;
  location?: string | null;
  property_type?: string | null;
  rating?: number;
  price_from?: number | null;
  description?: string | null;
  display_order?: number;
  active?: boolean;
  images?: PropertyImageInput[];
  amenities?: string[];
};

/* ============================================================
   SUPABASE URL
   ============================================================ */

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing from .env.local."
    );
  }

  return url;
}

/* ============================================================
   PUBLIC SUPABASE CLIENT
   Used for public destination reads.
   ============================================================ */

function getPublicSupabase() {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing from .env.local."
    );
  }

  return createClient(getSupabaseUrl(), anonKey);
}

/* ============================================================
   ADMIN SUPABASE CLIENT
   Service-role key remains server-side only.
   ============================================================ */

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

/* ============================================================
   ADMIN PASSWORD
   Used only for validating the server-created session.
   ============================================================ */

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD is missing from .env.local."
    );
  }

  return password;
}

/* ============================================================
   VERIFY ADMIN SESSION
   ============================================================ */

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
   ADMIN GET
   Load active destinations for the property form.
   ============================================================ */

export async function GET() {
  try {
    const supabase = getPublicSupabase();

    const { data, error } = await supabase
      .from("destinations")
      .select("id, name, slug, type")
      .eq("active", true)
      .order("type", {
        ascending: true,
      })
      .order("name", {
        ascending: true,
      });

    if (error) {
      console.error("ADMIN DESTINATIONS ERROR:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      destinations: data ?? [],
    });
  } catch (error) {
    console.error(
      "ADMIN DESTINATIONS GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load destinations.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   ADMIN POST
   Create property + images + amenities.

   Authentication is handled through the
   HTTP-only admin session cookie.
   ============================================================ */

export async function POST(
  request: NextRequest
) {
  try {
    /* --------------------------------------------------------
       VERIFY ADMIN SESSION
       -------------------------------------------------------- */

    const sessionToken = request.cookies.get(
      COOKIE_NAME
    )?.value;

    const validSession =
      verifyAdminSession(sessionToken);

    if (!validSession) {
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

    /* --------------------------------------------------------
       REQUEST BODY
       -------------------------------------------------------- */

    const body =
      (await request.json()) as PropertyRequestBody;

    /* --------------------------------------------------------
       BASIC VALIDATION
       -------------------------------------------------------- */

    if (
      !body.destination_id ||
      !Number.isInteger(body.destination_id)
    ) {
      return NextResponse.json(
        {
          error:
            "A valid destination is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.name?.trim()) {
      return NextResponse.json(
        {
          error:
            "Property name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.slug?.trim()) {
      return NextResponse.json(
        {
          error:
            "Property slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    const rating = body.rating ?? 5;

    if (rating < 0 || rating > 5) {
      return NextResponse.json(
        {
          error:
            "Rating must be between 0 and 5.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       IMAGES
       -------------------------------------------------------- */

    const images = Array.isArray(body.images)
      ? body.images
          .filter(
            (image) =>
              image &&
              typeof image.image_url ===
                "string" &&
              image.image_url.trim()
          )
          .map(
            (
              image,
              index
            ) => ({
              image_url:
                image.image_url.trim(),

              alt_text:
                image.alt_text?.trim() ||
                `${body.name.trim()} property image`,

              is_primary:
                image.is_primary === true,

              display_order:
                index,

              active: true,
            })
          )
      : [];

    if (images.length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one property image is required.",
        },
        {
          status: 400,
        }
      );
    }

    const hasPrimaryImage =
      images.some(
        (image) => image.is_primary
      );

    if (!hasPrimaryImage) {
      images[0].is_primary = true;
    }

    /* --------------------------------------------------------
       AMENITIES
       -------------------------------------------------------- */

    const amenities = Array.isArray(
      body.amenities
    )
      ? body.amenities
          .filter(
            (amenity) =>
              typeof amenity ===
                "string" &&
              amenity.trim()
          )
          .map(
            (amenity) =>
              amenity.trim()
          )
          .filter(
            (
              amenity,
              index,
              array
            ) =>
              array.indexOf(
                amenity
              ) === index
          )
      : [];

    /* --------------------------------------------------------
       ADMIN SUPABASE CLIENT
       -------------------------------------------------------- */

    const supabase =
      getAdminSupabase();

    /* --------------------------------------------------------
       VERIFY DESTINATION
       -------------------------------------------------------- */

    const {
      data: destination,
      error:
        destinationError,
    } = await supabase
      .from("destinations")
      .select(
        "id, name, slug, type"
      )
      .eq(
        "id",
        body.destination_id
      )
      .eq(
        "active",
        true
      )
      .maybeSingle();

    if (destinationError) {
      console.error(
        "DESTINATION CHECK ERROR:",
        {
          code:
            destinationError.code,
          message:
            destinationError.message,
          details:
            destinationError.details,
          hint:
            destinationError.hint,
        }
      );

      return NextResponse.json(
        {
          error:
            destinationError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!destination) {
      return NextResponse.json(
        {
          error:
            "Selected destination does not exist or is inactive.",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       CREATE PROPERTY
       -------------------------------------------------------- */

    const {
      data: property,
      error:
        propertyError,
    } = await supabase
      .from("properties")
      .insert({
        destination_id:
          body.destination_id,

        name:
          body.name.trim(),

        slug:
          body.slug.trim(),

        location:
          body.location?.trim() ||
          null,

        description:
          body.description?.trim() ||
          null,

        property_type:
          body.property_type?.trim() ||
          null,

        rating,

        price_from:
          body.price_from !==
            null &&
          body.price_from !==
            undefined &&
          !Number.isNaN(
            body.price_from
          )
            ? body.price_from
            : null,

        currency:
          "INR",

        active:
          body.active ?? true,

        display_order:
          body.display_order ??
          0,
      })
      .select("*")
      .single();

    if (
      propertyError ||
      !property
    ) {
      console.error(
        "PROPERTY INSERT ERROR:",
        {
          code:
            propertyError?.code,
          message:
            propertyError?.message,
          details:
            propertyError?.details,
          hint:
            propertyError?.hint,
        }
      );

      return NextResponse.json(
        {
          error:
            propertyError?.message ||
            "Unable to create property.",
        },
        {
          status: 500,
        }
      );
    }

    /* --------------------------------------------------------
       CREATE PROPERTY IMAGES
       -------------------------------------------------------- */

    const imageRows =
      images.map(
        (image) => ({
          property_id:
            property.id,

          image_url:
            image.image_url,

          alt_text:
            image.alt_text,

          is_primary:
            image.is_primary,

          display_order:
            image.display_order,

          active:
            image.active,
        })
      );

    const {
      error:
        imagesError,
    } = await supabase
      .from("property_images")
      .insert(
        imageRows
      );

    if (
      imagesError
    ) {
      console.error(
        "PROPERTY IMAGES INSERT ERROR:",
        {
          code:
            imagesError.code,
          message:
            imagesError.message,
          details:
            imagesError.details,
          hint:
            imagesError.hint,
        }
      );

      await supabase
        .from("properties")
        .delete()
        .eq(
          "id",
          property.id
        );

      return NextResponse.json(
        {
          error:
            `Property created but images failed: ${imagesError.message}`,
        },
        {
          status: 500,
        }
      );
    }

    /* --------------------------------------------------------
       CREATE PROPERTY AMENITIES
       -------------------------------------------------------- */

    if (
      amenities.length >
      0
    ) {
      const amenityRows =
        amenities.map(
          (
            amenity,
            index
          ) => ({
            property_id:
              property.id,

            amenity_name:
              amenity,

            display_order:
              index,

            active:
              true,
          })
        );

      const {
        error:
          amenitiesError,
      } = await supabase
        .from("property_amenities")
        .insert(
          amenityRows
        );

      if (
        amenitiesError
      ) {
        console.error(
          "PROPERTY AMENITIES INSERT ERROR:",
          {
            code:
              amenitiesError.code,
            message:
              amenitiesError.message,
            details:
              amenitiesError.details,
            hint:
              amenitiesError.hint,
          }
        );

        await supabase
          .from("properties")
          .delete()
          .eq(
            "id",
            property.id
          );

        return NextResponse.json(
          {
            error:
              `Property created but amenities failed: ${amenitiesError.message}`,
          },
          {
            status: 500,
          }
        );
      }
    }

    /* --------------------------------------------------------
       SUCCESS
       -------------------------------------------------------- */

    return NextResponse.json(
      {
        success: true,

        property: {
          ...property,
          destination,
        },

        image_count:
          images.length,

        amenity_count:
          amenities.length,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "ADMIN PROPERTY POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create property.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   PUBLIC PROPERTY READ
   Used by public destination pages.

   Finds the destination by slug and then loads its
   active properties along with active property images.
   ============================================================ */

export async function getPropertiesByDestination(
  destinationSlug: string
) {
  try {
    const supabase =
      getPublicSupabase();

    /* --------------------------------------------------------
       FIND DESTINATION
       -------------------------------------------------------- */

    const {
      data: destination,
      error:
        destinationError,
    } = await supabase
      .from("destinations")
      .select(
        "id, name, slug"
      )
      .eq(
        "slug",
        destinationSlug
      )
      .eq(
        "active",
        true
      )
      .maybeSingle();

    if (destinationError) {
      console.error(
        "PUBLIC DESTINATION LOOKUP ERROR:",
        {
          code:
            destinationError.code,
          message:
            destinationError.message,
          details:
            destinationError.details,
          hint:
            destinationError.hint,
        }
      );

      return [];
    }

    if (!destination) {
      return [];
    }

    /* --------------------------------------------------------
       LOAD ACTIVE PROPERTIES + IMAGES
       -------------------------------------------------------- */

    const {
      data: properties,
      error:
        propertiesError,
    } = await supabase
      .from("properties")
      .select(
        `
          id,
          destination_id,
          name,
          slug,
          location,
          description,
          property_type,
          rating,
          price_from,
          currency,
          active,
          display_order,
          property_images (
            id,
            image_url,
            alt_text,
            is_primary,
            display_order,
            active
          )
        `
      )
      .eq(
        "destination_id",
        destination.id
      )
      .eq(
        "active",
        true
      )
      .order(
        "display_order",
        {
          ascending: true,
        }
      );

    if (propertiesError) {
      console.error(
        "PUBLIC PROPERTIES LOOKUP ERROR:",
        {
          code:
            propertiesError.code,
          message:
            propertiesError.message,
          details:
            propertiesError.details,
          hint:
            propertiesError.hint,
        }
      );

      return [];
    }

    /* --------------------------------------------------------
       NORMALIZE IMAGES

       The public page expects:
       property.images[]
       -------------------------------------------------------- */

    return (properties ?? []).map(
      (property) => ({
        ...property,

        images:
          (
            property.property_images ??
            []
          )
            .filter(
              (image) =>
                image.active
            )
            .sort(
              (
                a,
                b
              ) => {
                if (
                  a.is_primary !==
                  b.is_primary
                ) {
                  return a.is_primary
                    ? -1
                    : 1;
                }

                return (
                  a.display_order -
                  b.display_order
                );
              }
            ),
      })
    );
  } catch (error) {
    console.error(
      "PUBLIC PROPERTIES ERROR:",
      error
    );

    return [];
  }
}
export async function getPropertyBySlug(
  destinationSlug: string,
  propertySlug: string
) {
  try {
    const supabase = getPublicSupabase();

    /* --------------------------------------------------------
       FIND DESTINATION
       -------------------------------------------------------- */

    const {
      data: destination,
      error: destinationError,
    } = await supabase
      .from("destinations")
      .select("id, name, slug")
      .eq("slug", destinationSlug)
      .eq("active", true)
      .maybeSingle();

    if (destinationError) {
      console.error(
        "PUBLIC PROPERTY DESTINATION ERROR:",
        destinationError
      );

      return null;
    }

    if (!destination) {
      return null;
    }

    /* --------------------------------------------------------
       FIND PROPERTY
       -------------------------------------------------------- */

    const {
      data: property,
      error: propertyError,
    } = await supabase
      .from("properties")
      .select(
        `
          id,
          destination_id,
          name,
          slug,
          location,
          description,
          property_type,
          rating,
          price_from,
          currency,
          active,
          display_order,
          property_images (
            id,
            image_url,
            alt_text,
            is_primary,
            display_order,
            active
          ),
          property_amenities (
            id,
            amenity_name,
            display_order,
            active
          )
        `
      )
      .eq(
        "destination_id",
        destination.id
      )
      .eq(
        "slug",
        propertySlug
      )
      .eq(
        "active",
        true
      )
      .maybeSingle();

    if (propertyError) {
      console.error(
        "PUBLIC PROPERTY LOOKUP ERROR:",
        propertyError
      );

      return null;
    }

    if (!property) {
      return null;
    }

    /* --------------------------------------------------------
       NORMALIZE IMAGES
       -------------------------------------------------------- */

    const images = (
      property.property_images ??
      []
    )
      .filter(
        (image) => image.active
      )
      .sort(
        (
          a,
          b
        ) => {
          if (
            a.is_primary !==
            b.is_primary
          ) {
            return a.is_primary
              ? -1
              : 1;
          }

          return (
            a.display_order -
            b.display_order
          );
        }
      );

    /* --------------------------------------------------------
       NORMALIZE AMENITIES
       -------------------------------------------------------- */

    const amenities = (
      property.property_amenities ??
      []
    )
      .filter(
        (amenity) =>
          amenity.active
      )
      .sort(
        (
          a,
          b
        ) =>
          a.display_order -
          b.display_order
      );

    /* --------------------------------------------------------
       RETURN PUBLIC PROPERTY
       -------------------------------------------------------- */

    return {
      ...property,

      destination,

      images,

      amenities,
    };
  } catch (error) {
    console.error(
      "PUBLIC PROPERTY ERROR:",
      error
    );

    return null;
  }
}