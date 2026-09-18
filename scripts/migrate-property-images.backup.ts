import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type Property = {
  id: number;
  destination_id: number;
  name: string;
  slug: string;
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

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getImageOrder(fileName: string) {
  const match = fileName.match(/-(\d+)\.(jpg|jpeg|png|webp)$/i);

  if (!match) {
    return 1;
  }

  return Number(match[1]);
}

function getBaseImageName(fileName: string) {
  return fileName.replace(
    /-(\d+)\.(jpg|jpeg|png|webp)$/i,
    ".$2"
  );
}

function getPropertySlugFromImage(fileName: string) {
  const baseName = getBaseImageName(fileName);

  return normalize(
    baseName.replace(/\.(jpg|jpeg|png|webp)$/i, "")
  );
}

async function main() {
  console.log("");
  console.log("==========================================");
  console.log("PROPERTY IMAGE MIGRATION — DRY RUN");
  console.log("==========================================");
  console.log("");

  if (!fs.existsSync(propertiesRoot)) {
    throw new Error(`Properties folder not found: ${propertiesRoot}`);
  }

  const { data: properties, error } = await supabase
    .from("properties")
    .select("id, destination_id, name, slug")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch properties: ${error.message}`);
  }

  const allProperties = (properties ?? []) as Property[];

  const destinationFolders = fs
    .readdirSync(propertiesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  let totalImages = 0;
  let matchedImages = 0;
  let unmatchedImages = 0;

  for (const destinationFolder of destinationFolders) {
    const destinationPath = path.join(
      propertiesRoot,
      destinationFolder.name
    );

    const files = fs
      .readdirSync(destinationPath, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.(jpg|jpeg|png|webp)$/i.test(entry.name)
      );

    console.log(`\nDESTINATION: ${destinationFolder.name}`);

    for (const file of files) {
      totalImages++;

      const imageSlug = getPropertySlugFromImage(file.name);

      const exactSlugMatch = allProperties.find(
        (property) => normalize(property.slug) === imageSlug
      );

      const nameMatch = allProperties.find(
        (property) => normalize(property.name) === imageSlug
      );

      const property = exactSlugMatch ?? nameMatch;

      if (!property) {
        unmatchedImages++;

        console.log(
          `  ❌ UNMATCHED: ${file.name}`
        );

        continue;
      }

      matchedImages++;

      const order = getImageOrder(file.name);
      const primary = order === 1;

      console.log(
        `  ✅ ${file.name} → ${property.name} | ID: ${property.id} | order: ${order} | primary: ${primary}`
      );
    }
  }

  console.log("");
  console.log("==========================================");
  console.log("DRY RUN SUMMARY");
  console.log("==========================================");
  console.log(`Total images:      ${totalImages}`);
  console.log(`Matched images:    ${matchedImages}`);
  console.log(`Unmatched images:  ${unmatchedImages}`);
  console.log("");

  if (unmatchedImages > 0) {
    console.log(
      "⚠️ Some images could not be matched."
    );
    console.log(
      "DO NOT run the real migration until these are reviewed."
    );
  } else {
    console.log(
      "✅ All images matched successfully."
    );
    console.log(
      "No files were uploaded or deleted."
    );
  }

  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("MIGRATION ERROR");
  console.error(error);
  process.exit(1);
});