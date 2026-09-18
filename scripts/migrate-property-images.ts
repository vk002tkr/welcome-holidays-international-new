import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type Property = {
  id: number;
  destination_id: number;
  name: string;
  slug: string;
};

type Destination = {
  id: number;
  slug: string;
};

type MigrationItem = {
  filePath: string;
  fileName: string;
  destinationFolder: string;
  destination: Destination;
  property: Property;
  order: number;
  primary: boolean;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const propertiesRoot = path.join(process.cwd(), "public", "properties");

const STORAGE_BUCKET = "property-images";

/**
 * Normalizes text for safe filename/property matching.
 */
function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");
}

/**
 * Removes image numbering and extension.
 *
 * Example:
 * hotel-taj-resorts-03.jpg
 * -> hotel-taj-resorts
 */
function getBaseImageName(fileName: string) {
  return fileName
    .replace(
      /-(\d+)\.(jpg|jpeg|png|webp)$/i,
      ".$2"
    )
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");
}

/**
 * Determines image order.
 *
 * property.jpg      -> 1
 * property-02.jpg  -> 2
 * property-03.jpg  -> 3
 */
function getImageOrder(fileName: string) {
  const match = fileName.match(
    /-(\d+)\.(jpg|jpeg|png|webp)$/i
  );

  if (!match) {
    return 1;
  }

  return Number(match[1]);
}

/**
 * Existing local filename aliases.
 *
 * These affect only migration matching.
 * Database slugs are NOT changed.
 */
const filenameAliases: Record<string, string> = {
  crystalsarovarportico: "crystalsarovarporticoagra",
  howardplazathefern: "howardplazathefernagra",
  radissonhotelagra: "radissonhotelagraagra",
  lemontreevembanadalleppey: "lemontreevembanandalleppey",
  ramadabywyndhamalleppey:
    "ramadabywyndhamalleppeyalleppey",
};

/**
 * Matches a local destination folder to the database destination.
 */
function getDestinationMatch(
  folderName: string,
  destinations: Destination[]
): Destination | undefined {
  const normalizedFolder = normalize(folderName);

  const exact = destinations.find(
    (destination) =>
      normalize(destination.slug) === normalizedFolder
  );

  if (exact) {
    return exact;
  }

  const partialMatches = destinations.filter(
    (destination) => {
      const destinationSlug = normalize(destination.slug);

      return (
        destinationSlug.startsWith(normalizedFolder) ||
        normalizedFolder.startsWith(destinationSlug)
      );
    }
  );

  if (partialMatches.length === 1) {
    return partialMatches[0];
  }

  return undefined;
}

/**
 * Finds the property belonging to the current destination.
 *
 * Matching order:
 * 1. Explicit alias
 * 2. Exact normalized slug
 * 3. Exact normalized name
 * 4. Unique partial match
 *
 * Ambiguous matches are rejected.
 */
function findProperty(
  fileName: string,
  properties: Property[]
): Property | undefined {
  const baseName = getBaseImageName(fileName);
  const normalizedImageName = normalize(baseName);

  /**
   * 1. Explicit alias
   */
  const aliasSlug = filenameAliases[normalizedImageName];

  if (aliasSlug) {
    const aliasMatch = properties.find(
      (property) =>
        normalize(property.slug) === aliasSlug
    );

    if (aliasMatch) {
      return aliasMatch;
    }
  }

  /**
   * 2. Exact slug
   */
  const exactSlugMatches = properties.filter(
    (property) =>
      normalize(property.slug) === normalizedImageName
  );

  if (exactSlugMatches.length === 1) {
    return exactSlugMatches[0];
  }

  /**
   * 3. Exact property name
   */
  const exactNameMatches = properties.filter(
    (property) =>
      normalize(property.name) === normalizedImageName
  );

  if (exactNameMatches.length === 1) {
    return exactNameMatches[0];
  }

  /**
   * 4. Unique partial match
   */
  const partialMatches = properties.filter(
    (property) => {
      const propertySlug = normalize(property.slug);
      const propertyName = normalize(property.name);

      return (
        propertySlug.startsWith(normalizedImageName) ||
        normalizedImageName.startsWith(propertySlug) ||
        propertyName.startsWith(normalizedImageName) ||
        normalizedImageName.startsWith(propertyName)
      );
    }
  );

  if (partialMatches.length === 1) {
    return partialMatches[0];
  }

  return undefined;
}

/**
 * Converts an image extension into the correct MIME type.
 */
function getContentType(fileName: string) {
  const extension = path
    .extname(fileName)
    .toLowerCase();

  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";

    case ".png":
      return "image/png";

    case ".webp":
      return "image/webp";

    default:
      return "application/octet-stream";
  }
}

/**
 * Creates a clean Storage path.
 *
 * Final structure:
 *
 * property-images/
 *   agra/
 *     aaram-bagh-agra/
 *       01.jpg
 *       02.jpg
 *       03.jpg
 *
 *   alleppey/
 *     oxygen-resorts-alleppey/
 *       01.jpg
 *       02.jpg
 */
function getStoragePath(
  destination: Destination,
  property: Property,
  order: number,
  fileName: string
) {
  const extension =
    path.extname(fileName).toLowerCase() || ".jpg";

  const orderName = String(order).padStart(2, "0");

  return [
    normalize(destination.slug),
    property.slug,
    `${orderName}${extension}`,
  ].join("/");
}

/**
 * Collects every image and validates all matches BEFORE
 * any upload begins.
 *
 * This is important because we don't want to partially migrate
 * the collection if matching unexpectedly fails.
 */
async function buildMigrationPlan(
  properties: Property[],
  destinations: Destination[]
): Promise<MigrationItem[]> {
  const destinationFolders = fs
    .readdirSync(propertiesRoot, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) =>
      a.name.localeCompare(b.name)
    );

  const migrationItems: MigrationItem[] = [];

  for (const destinationFolder of destinationFolders) {
    const destinationPath = path.join(
      propertiesRoot,
      destinationFolder.name
    );

    const destination =
      getDestinationMatch(
        destinationFolder.name,
        destinations
      );

    if (!destination) {
      throw new Error(
        `Could not match destination folder "${destinationFolder.name}" to a database destination.`
      );
    }

    const destinationProperties =
      properties.filter(
        (property) =>
          property.destination_id ===
          destination.id
      );

    const files = fs
      .readdirSync(destinationPath, {
        withFileTypes: true,
      })
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.(jpg|jpeg|png|webp)$/i.test(
            entry.name
          )
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    console.log("");
    console.log(
      `Planning: ${destinationFolder.name}`
    );
    console.log(
      `  Database destination: ${destination.slug} | ID: ${destination.id}`
    );
    console.log(
      `  Images: ${files.length}`
    );

    for (const file of files) {
      const property = findProperty(
        file.name,
        destinationProperties
      );

      if (!property) {
        throw new Error(
          `Could not match image "${destinationFolder.name}/${file.name}" to a property.`
        );
      }

      const order = getImageOrder(
        file.name
      );

      migrationItems.push({
        filePath: path.join(
          destinationPath,
          file.name
        ),
        fileName: file.name,
        destinationFolder:
          destinationFolder.name,
        destination,
        property,
        order,
        primary: order === 1,
      });

      console.log(
        `  ✓ ${file.name} → ${property.name} | ID: ${property.id} | order: ${order}`
      );
    }
  }

  return migrationItems;
}

/**
 * Checks whether a property_images record already exists
 * for the same property and display order.
 */
async function getExistingImage(
  propertyId: number,
  displayOrder: number
) {
  const { data, error } = await supabase
    .from("property_images")
    .select(
      "id, image_url, is_primary, display_order, active"
    )
    .eq("property_id", propertyId)
    .eq("display_order", displayOrder)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed checking existing property image for property ${propertyId}, order ${displayOrder}: ${error.message}`
    );
  }

  return data;
}

/**
 * Creates the public Storage URL.
 */
function getPublicUrl(storagePath: string) {
  const {
    data,
  } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

/**
 * Uploads one local image.
 */
async function uploadImage(
  item: MigrationItem,
  storagePath: string
) {
  const fileBuffer = fs.readFileSync(
    item.filePath
  );

  const contentType = getContentType(
    item.fileName
  );

  console.log(
    `  Uploading: ${item.fileName}`
  );

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(
      storagePath,
      fileBuffer,
      {
        contentType,
        cacheControl: "31536000",
        upsert: false,
      }
    );

  if (error) {
    /**
     * If the object already exists, we do not overwrite it.
     * The caller will verify the existing object by using
     * the same public path.
     */
    if (
      error.message
        .toLowerCase()
        .includes("already exists")
    ) {
      console.log(
        `  ⚠️ Storage object already exists.`
      );

      return;
    }

    throw new Error(
      `Storage upload failed for "${item.fileName}": ${error.message}`
    );
  }

  console.log(
    `  ✓ Storage upload successful`
  );
}

/**
 * Inserts the property_images database record.
 */
async function insertImageRecord(
  item: MigrationItem,
  storagePath: string
) {
  const imageUrl =
    getPublicUrl(storagePath);

  /**
   * Check again immediately before insertion.
   *
   * This protects against duplicate DB records if the script
   * is resumed or accidentally run twice.
   */
  const existing =
    await getExistingImage(
      item.property.id,
      item.order
    );

  if (existing) {
    console.log(
      `  ⚠️ DB record already exists: ID ${existing.id}`
    );

    return {
      imageUrl:
        existing.image_url || imageUrl,
      recordId: existing.id,
      alreadyExists: true,
    };
  }

  const { data, error } = await supabase
    .from("property_images")
    .insert({
      property_id: item.property.id,
      image_url: imageUrl,
      alt_text: `${item.property.name} - image ${item.order}`,
      is_primary: item.primary,
      display_order: item.order,
      active: true,
    })
    .select(
      "id, image_url, is_primary, display_order, active"
    )
    .single();

  if (error) {
    throw new Error(
      `Database insert failed for "${item.fileName}": ${error.message}`
    );
  }

  console.log(
    `  ✓ DB record created: ID ${data.id}`
  );

  return {
    imageUrl,
    recordId: data.id,
    alreadyExists: false,
  };
}

/**
 * Verifies the database record points to the expected Storage URL.
 */
async function verifyDatabaseRecord(
  propertyId: number,
  displayOrder: number,
  expectedUrl: string
) {
  const { data, error } = await supabase
    .from("property_images")
    .select(
      "id, image_url, property_id, display_order, is_primary, active"
    )
    .eq("property_id", propertyId)
    .eq("display_order", displayOrder)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Verification query failed for property ${propertyId}, order ${displayOrder}: ${error.message}`
    );
  }

  if (!data) {
    throw new Error(
      `Verification failed: property_images record does not exist for property ${propertyId}, order ${displayOrder}.`
    );
  }

  if (data.image_url !== expectedUrl) {
    throw new Error(
      `Verification failed: database URL does not match Storage URL for property ${propertyId}, order ${displayOrder}.`
    );
  }

  if (data.property_id !== propertyId) {
    throw new Error(
      `Verification failed: property_id mismatch for property ${propertyId}, order ${displayOrder}.`
    );
  }

  if (data.display_order !== displayOrder) {
    throw new Error(
      `Verification failed: display_order mismatch for property ${propertyId}, order ${displayOrder}.`
    );
  }

  if (!data.active) {
    throw new Error(
      `Verification failed: image record is inactive for property ${propertyId}, order ${displayOrder}.`
    );
  }

  return data;
}

/**
 * Deletes a local image only after Storage + DB verification.
 */
function deleteLocalImage(
  item: MigrationItem
) {
  if (!fs.existsSync(item.filePath)) {
    console.log(
      `  ⚠️ Local file already missing: ${item.fileName}`
    );

    return;
  }

  fs.unlinkSync(item.filePath);

  console.log(
    `  ✓ Local file deleted: ${item.fileName}`
  );
}

async function main() {
  console.log("");
  console.log(
    "=================================================="
  );
  console.log(
    "PROPERTY IMAGE MIGRATION - ACTUAL MIGRATION"
  );
  console.log(
    "=================================================="
  );
  console.log("");

  console.log(
    "Storage bucket:",
    STORAGE_BUCKET
  );
  console.log(
    "Local source:",
    propertiesRoot
  );
  console.log("");

  console.log(
    "SAFETY SEQUENCE:"
  );
  console.log(
    "1. Validate all image/property matches"
  );
  console.log(
    "2. Upload image to Supabase Storage"
  );
  console.log(
    "3. Create property_images record"
  );
  console.log(
    "4. Verify database record"
  );
  console.log(
    "5. Delete local image ONLY after verification"
  );
  console.log("");

  if (!fs.existsSync(propertiesRoot)) {
    throw new Error(
      `Properties folder not found: ${propertiesRoot}`
    );
  }

  /**
   * Fetch properties.
   */
  const {
    data: properties,
    error: propertiesError,
  } = await supabase
    .from("properties")
    .select(
      "id, destination_id, name, slug"
    )
    .order("id", {
      ascending: true,
    });

  if (propertiesError) {
    throw new Error(
      `Failed to fetch properties: ${propertiesError.message}`
    );
  }

  const allProperties =
    (properties ?? []) as Property[];

  /**
   * Fetch destinations.
   */
  const {
    data: destinations,
    error: destinationsError,
  } = await supabase
    .from("destinations")
    .select("id, slug")
    .order("id", {
      ascending: true,
    });

  if (destinationsError) {
    throw new Error(
      `Failed to fetch destinations: ${destinationsError.message}`
    );
  }

  const allDestinations =
    (destinations ?? []) as Destination[];

  console.log(
    `Properties loaded:   ${allProperties.length}`
  );

  console.log(
    `Destinations loaded: ${allDestinations.length}`
  );

  /**
   * IMPORTANT:
   *
   * Build and validate the COMPLETE migration plan
   * before uploading anything.
   */
  console.log("");
  console.log(
    "Building migration plan..."
  );

  const migrationPlan =
    await buildMigrationPlan(
      allProperties,
      allDestinations
    );

  console.log("");
  console.log(
    "=================================================="
  );
  console.log(
    "MIGRATION PLAN VALIDATED"
  );
  console.log(
    "=================================================="
  );
  console.log(
    `Total images ready: ${migrationPlan.length}`
  );
  console.log("");

  if (migrationPlan.length === 0) {
    console.log(
      "No images found. Nothing to migrate."
    );
    return;
  }

  /**
   * Verify expected image count based on the known
   * local inventory before making any changes.
   */
  if (migrationPlan.length !== 100) {
    throw new Error(
      `Expected 100 images based on the verified dry-run, but found ${migrationPlan.length}. Migration stopped for safety.`
    );
  }

  console.log(
    "✓ 100 images confirmed."
  );

  console.log("");
  console.log(
    "Starting actual migration..."
  );
  console.log("");

  let uploaded = 0;
  let databaseInserted = 0;
  let alreadyExisting = 0;
  let deleted = 0;
  let failed = 0;

  for (
    let index = 0;
    index < migrationPlan.length;
    index++
  ) {
    const item =
      migrationPlan[index];

    const storagePath =
      getStoragePath(
        item.destination,
        item.property,
        item.order,
        item.fileName
      );

    console.log("");
    console.log(
      `--------------------------------------------------`
    );
    console.log(
      `[${index + 1}/${migrationPlan.length}] ${item.destinationFolder}/${item.fileName}`
    );
    console.log(
      `Property: ${item.property.name} | ID: ${item.property.id}`
    );
    console.log(
      `Storage: ${storagePath}`
    );

    try {
      /**
       * Step 1:
       * Upload local file to Storage.
       */
      const storageObjectExists =
        await (async () => {
          const { data, error } =
            await supabase.storage
              .from(STORAGE_BUCKET)
              .list(
                path.posix.dirname(
                  storagePath
                ),
                {
                  search:
                    path.posix.basename(
                      storagePath
                    ),
                  limit: 10,
                }
              );

          if (error) {
            throw new Error(
              `Failed checking Storage object: ${error.message}`
            );
          }

          return (data ?? []).some(
            (file) =>
              file.name ===
              path.posix.basename(
                storagePath
              )
          );
        })();

      if (!storageObjectExists) {
        await uploadImage(
          item,
          storagePath
        );

        uploaded++;
      } else {
        console.log(
          "  ⚠️ Storage object already exists. Skipping upload."
        );
      }

      /**
       * Step 2:
       * Create DB record if necessary.
       */
      const dbResult =
        await insertImageRecord(
          item,
          storagePath
        );

      if (dbResult.alreadyExists) {
        alreadyExisting++;
      } else {
        databaseInserted++;
      }

      /**
       * Step 3:
       * Verify DB record.
       */
      await verifyDatabaseRecord(
        item.property.id,
        item.order,
        dbResult.imageUrl
      );

      console.log(
        "  ✓ Database verification successful"
      );

      /**
       * Step 4:
       * Delete local file only after successful
       * Storage + DB verification.
       */
      deleteLocalImage(item);

      deleted++;
    } catch (error) {
      failed++;

      console.error("");
      console.error(
        `  ❌ FAILED: ${item.fileName}`
      );

      if (error instanceof Error) {
        console.error(
          `  ${error.message}`
        );
      } else {
        console.error(error);
      }

      console.error(
        "  ⚠️ Local file has NOT been deleted."
      );

      /**
       * Stop immediately on a failure.
       *
       * We don't continue blindly because a failed DB
       * or Storage operation requires review before
       * proceeding.
       */
      throw error;
    }
  }

  console.log("");
  console.log(
    "=================================================="
  );
  console.log(
    "MIGRATION COMPLETE"
  );
  console.log(
    "=================================================="
  );

  console.log(
    `Total planned:       ${migrationPlan.length}`
  );

  console.log(
    `Storage uploaded:    ${uploaded}`
  );

  console.log(
    `DB records created:  ${databaseInserted}`
  );

  console.log(
    `Already existing:    ${alreadyExisting}`
  );

  console.log(
    `Local files deleted: ${deleted}`
  );

  console.log(
    `Failed:              ${failed}`
  );

  console.log("");

  if (
    deleted === migrationPlan.length &&
    failed === 0
  ) {
    console.log(
      "✅ ALL 100 IMAGES MIGRATED SUCCESSFULLY."
    );
    console.log(
      "✅ Storage uploaded."
    );
    console.log(
      "✅ property_images records verified."
    );
    console.log(
      "✅ Local source files removed only after verification."
    );
  } else {
    console.log(
      "⚠️ Migration did not finish cleanly."
    );
    console.log(
      "Review the output before making any further changes."
    );
  }

  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error(
    "=================================================="
  );
  console.error(
    "MIGRATION STOPPED"
  );
  console.error(
    "=================================================="
  );
  console.error("");

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  console.error("");
  console.error(
    "Any failed local image was intentionally NOT deleted."
  );
  console.error("");

  process.exit(1);
});