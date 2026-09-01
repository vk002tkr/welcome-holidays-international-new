import { supabase } from "./supabase";

export type Destination = {
  id: number;
  name: string;
  slug: string;
  type: "domestic" | "international";
  location: string | null;
  attractions: string | null;
  description: string | null;
  image_url: string | null;
  rating: number | null;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

async function getDestinationsByType(
  type: "domestic" | "international"
): Promise<Destination[]> {
  const result = await supabase
    .from("destinations")
    .select("*")
    .eq("type", type)
    .eq("active", true)
    .order("display_order", {
      ascending: true,
    })
    .order("name", {
      ascending: true,
    });

  if (result.error) {
    const error =
      result.error as unknown as Record<string, unknown>;

    const message =
      typeof error.message === "string"
        ? error.message
        : "Unknown Supabase error";

    const details =
      typeof error.details === "string"
        ? error.details
        : "No details";

    const hint =
      typeof error.hint === "string"
        ? error.hint
        : "No hint";

    const code =
      typeof error.code === "string"
        ? error.code
        : "No code";

    throw new Error(
      [
        "SUPABASE DESTINATIONS ERROR",
        `Type: ${type}`,
        `Code: ${code}`,
        `Message: ${message}`,
        `Details: ${details}`,
        `Hint: ${hint}`,
      ].join(" | ")
    );
  }

  return (result.data ?? []) as Destination[];
}

export async function getDomesticDestinations(): Promise<
  Destination[]
> {
  return getDestinationsByType("domestic");
}

export async function getInternationalDestinations(): Promise<
  Destination[]
> {
  return getDestinationsByType("international");
}