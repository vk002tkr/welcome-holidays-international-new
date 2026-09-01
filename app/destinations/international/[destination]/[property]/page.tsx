import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyBySlug } from "../../../../../lib/properties";

type PageProps = {
  params: Promise<{
    destination: string;
    property: string;
  }>;
};

export default async function InternationalPropertyPage({
  params,
}: PageProps) {
  const {
    destination: destinationSlug,
    property: propertySlug,
  } = await params;

  const property = await getPropertyBySlug(
    destinationSlug,
    propertySlug
  );

  if (!property) {
    notFound();
  }

  const primaryImage =
    property.images.find((image) => image.is_primary)?.image_url ??
    property.images[0]?.image_url ??
    null;

  const galleryImages = property.images
    .filter((image) => image.image_url !== primaryImage)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div className="relative min-h-[620px]">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={property.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#07172a]" />
          )}

          <div className="absolute inset-0 bg-[#07172a]/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#041323]/95 via-[#07172a]/60 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/90 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1400px] items-end px-6 pb-16 lg:px-10">
            <div className="max-w-4xl">
              <Link
                href={`/destinations/international/${destinationSlug}`}
                className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition hover:text-[#e5bd63]"
              >
                <span>←</span>
                Back to {property.destination?.name ?? "Destination"}
              </Link>

              <div className="mt-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#d6a84f]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#e5bd63]">
                  Welcome Holidays International
                </p>
              </div>

              {property.property_type && (
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55">
                  {property.property_type}
                </p>
              )}

              <h1 className="mt-3 text-5xl font-light tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                {property.name}
              </h1>

              {property.location && (
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-white/55">
                  {property.location}
                </p>
              )}

              <div className="mt-6 flex items-center gap-1 text-[#e0b75c]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < Math.round(property.rating ?? 5)
                        ? "opacity-100"
                        : "opacity-25"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROPERTY INTRO
      ========================================================= */}
      <section className="border-b border-[#e3ded3] bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-14 lg:grid-cols-[1fr_340px] lg:px-10 lg:py-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              About The Property
            </p>

            <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
              A stay worth remembering.
            </h2>

            {property.description && (
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-500">
                {property.description}
              </p>
            )}
          </div>

          <div className="rounded-[20px] border border-[#e5e0d5] bg-[#f8f5ee] p-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#b58935]">
              Property Details
            </p>

            <div className="mt-6 space-y-5">
              {property.location && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-[#07172a]">
                    {property.location}
                  </p>
                </div>
              )}

              {property.property_type && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    Property Type
                  </p>

                  <p className="mt-1 text-sm text-[#07172a]">
                    {property.property_type}
                  </p>
                </div>
              )}

              {property.price_from !== null && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    Starting From
                  </p>

                  <p className="mt-1 text-xl font-semibold text-[#07172a]">
                    ₹{property.price_from.toLocaleString("en-IN")}
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      / night
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GALLERY
      ========================================================= */}
      {property.images.length > 0 && (
        <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Property Gallery
              </p>

              <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                Experience the property.
              </h2>
            </div>

            {galleryImages.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="relative h-[520px] overflow-hidden rounded-[20px] bg-[#07172a]">
                  {primaryImage && (
                    <img
                      src={primaryImage}
                      alt={`${property.name} primary`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {galleryImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative h-[250px] overflow-hidden rounded-[20px] bg-[#07172a]"
                    >
                      <img
                        src={image.image_url}
                        alt={
                          image.alt_text ??
                          `${property.name} gallery image`
                        }
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative h-[520px] overflow-hidden rounded-[20px] bg-[#07172a]">
                {primaryImage && (
                  <img
                    src={primaryImage}
                    alt={property.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================
          AMENITIES
      ========================================================= */}
      <section className="border-y border-[#e3ded3] bg-white px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              Amenities & Services
            </p>

            <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
              Everything you need.
            </h2>
          </div>

          {property.amenities.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity.id}
                  className="flex items-center gap-4 rounded-[14px] border border-[#e5e0d5] bg-[#faf8f3] px-5 py-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#07172a] text-xs text-[#d6a84f]">
                    ✓
                  </span>

                  <span className="text-sm text-[#07172a]">
                    {amenity.amenity_name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[18px] border border-[#e5e0d5] bg-[#faf8f3] px-6 py-12 text-center">
              <p className="text-sm text-slate-500">
                Amenities will be added soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          MEMBERSHIP BOOKING CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div className="absolute inset-0">
          {primaryImage && (
            <img
              src={primaryImage}
              alt=""
              className="h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-[#07172a]/85" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#041323]/95 via-[#07172a]/75 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
              Member Booking
            </p>

            <h2 className="mt-5 text-5xl font-light tracking-[-0.055em] text-white sm:text-6xl">
              Make {property.name}
              <br />
              <span className="italic">
                part of your journey.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
              Membership holders can access dedicated booking assistance
              for this property. Speak with our travel team to plan your
              stay, itinerary and complete holiday experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/memberships"
                className="inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#07172a] transition hover:bg-[#e5bd63]"
              >
                Login / Become A Member
                <span className="ml-4">→</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/20 px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/40"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCATION / MAP
      ========================================================= */}
      <section className="border-t border-[#e3ded3] bg-[#f6f3ec] px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              Location
            </p>

            <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
              Find the property.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              {property.location || property.destination?.name}
            </p>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#e5e0d5] bg-white">
            <iframe
              title={`${property.name} location`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                property.location
                  ? `${property.name}, ${property.location}, ${property.destination?.name ?? ""}`
                  : `${property.name}, ${property.destination?.name ?? ""}`
              )}&output=embed`}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <section className="bg-[#06131f] px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d6a84f]">
              Welcome Holidays International
            </p>

            <p className="mt-2 text-sm text-white/35">
              Curated journeys. Exceptional destinations.
            </p>
          </div>

          <Link
            href={`/destinations/international/${destinationSlug}`}
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 transition hover:text-[#d6a84f]"
          >
            ← Back To {property.destination?.name ?? "Destination"}
          </Link>
        </div>
      </section>
    </main>
  );
}