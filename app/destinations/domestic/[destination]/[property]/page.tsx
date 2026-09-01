import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyBySlug } from "../../../../../lib/properties";

type PageProps = {
  params: Promise<{
    destination: string;
    property: string;
  }>;
};

export default async function PropertyPage({
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

  const images = property.images ?? [];
  const amenities = property.amenities ?? [];

  const primaryImage =
    images.find((image) => image.is_primary)?.image_url ??
    images[0]?.image_url ??
    "/kashmir.png";

  const secondaryImages = images
    .filter((image) => image.image_url !== primaryImage)
    .slice(0, 4);

  const hasRealImages = images.length > 0;

  const rating = Number(property.rating ?? 5);

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#07172a]">
      {/* =========================================================
          TOP NAV / BREADCRUMB
      ========================================================= */}
      <div className="border-b border-[#e6e1d6] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-6 lg:px-10">
          <Link
            href={`/destinations/domestic/${property.destination.slug}`}
            className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:text-[#b58935]"
          >
            <span className="text-base transition-transform group-hover:-translate-x-1">
              ←
            </span>

            {property.destination.name}
          </Link>

          <span className="hidden text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-300 sm:block">
            Welcome Holidays International
          </span>
        </div>
      </div>

      {/* =========================================================
          PROPERTY HEADER
      ========================================================= */}
      <section className="bg-white px-5 pb-8 pt-8 sm:px-6 lg:px-10 lg:pb-10 lg:pt-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#b58935]">
                  {property.property_type || "Hotel & Resort"}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#d6a84f]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {property.destination.name}
                </span>
              </div>

              <h1 className="max-w-5xl text-4xl font-light leading-[1.05] tracking-[-0.055em] text-[#07172a] sm:text-5xl lg:text-7xl">
                {property.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 text-[#c3983d]">
                    {Array.from({ length: 5 }).map(
                      (_, index) => (
                        <span
                          key={index}
                          className={
                            index < Math.round(rating)
                              ? "text-sm"
                              : "text-sm opacity-20"
                          }
                        >
                          ★
                        </span>
                      )
                    )}
                  </div>

                  <span className="text-xs font-medium text-[#07172a]">
                    {rating.toFixed(1)}
                  </span>
                </div>

                <span className="hidden h-4 w-px bg-[#ddd8cd] sm:block" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  {property.location ||
                    property.destination.name}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              {property.price_from !== null &&
              property.price_from !== undefined ? (
                <div className="text-right">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Starting From
                  </p>

                  <p className="mt-1 text-2xl font-medium tracking-tight text-[#07172a]">
                    ₹
                    {property.price_from.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              ) : (
                <div className="hidden text-right sm:block">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Best Available Rate
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#07172a]">
                    On enquiry
                  </p>
                </div>
              )}

              <Link
                href="/contact"
                className="rounded-full bg-[#d6a84f] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#07172a] transition hover:bg-[#e5bd63]"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN IMAGE GALLERY
      ========================================================= */}
      <section className="bg-white px-3 pb-3 sm:px-5 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <div
            className={`grid gap-2 overflow-hidden rounded-[18px] ${
              secondaryImages.length > 0
                ? "lg:grid-cols-[1.7fr_1fr]"
                : "grid-cols-1"
            }`}
          >
            {/* MAIN IMAGE */}
            <div className="group relative min-h-[430px] overflow-hidden bg-[#07172a] sm:min-h-[520px] lg:min-h-[650px]">
              <img
                src={primaryImage}
                alt={
                  images[0]?.alt_text ||
                  property.name
                }
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/65 via-transparent to-transparent" />

              {!hasRealImages && (
                <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#07172a]/60 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  Property Images Coming Soon
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/55">
                    {property.destination.name}
                  </p>

                  <p className="mt-2 max-w-xl text-xl font-light tracking-[-0.02em] text-white sm:text-2xl">
                    {property.name}
                  </p>
                </div>

                {hasRealImages && (
                  <span className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                    {images.length} Photos
                  </span>
                )}
              </div>
            </div>

            {/* SECONDARY IMAGES */}
            {secondaryImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                {secondaryImages.map(
                  (image, index) => (
                    <div
                      key={image.id}
                      className={`group relative overflow-hidden bg-[#07172a] ${
                        index === 0
                          ? "min-h-[210px] lg:min-h-0"
                          : "min-h-[210px] lg:min-h-0"
                      }`}
                    >
                      <img
                        src={image.image_url}
                        alt={
                          image.alt_text ||
                          property.name
                        }
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-[#07172a]/10 transition group-hover:bg-transparent" />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO + BOOKING CARD
      ========================================================= */}
      <section className="bg-white px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          {/* ABOUT */}
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d6a84f]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#b58935]">
                About The Property
              </p>
            </div>

            <h2 className="mt-5 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] sm:text-5xl">
              A comfortable stay in{" "}
              <span className="italic">
                {property.destination.name}.
              </span>
            </h2>

            {property.description ? (
              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-500">
                {property.description}
              </p>
            ) : (
              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-500">
                Located in {property.destination.name},
                {property.name} is available as part of
                our curated stay options. Contact our
                travel team for current availability,
                rates and property information.
              </p>
            )}
          </div>

          {/* QUICK BOOKING CARD */}
          <div className="self-start rounded-[20px] border border-[#e3ded3] bg-[#f8f6f0] p-7 sm:p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#b58935]">
              Plan Your Stay
            </p>

            <h3 className="mt-3 text-2xl font-light tracking-[-0.035em]">
              Make an enquiry
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Get availability, current rates and
              personalised travel assistance from our
              team.
            </p>

            <div className="mt-6 border-t border-[#ded8cb] pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Destination
                </span>

                <span className="text-sm font-medium text-[#07172a]">
                  {property.destination.name}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Rating
                </span>

                <span className="text-sm font-medium text-[#07172a]">
                  {rating.toFixed(1)} / 5
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-[#07172a] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#102944]"
            >
              Enquire About This Property
              <span className="ml-4 text-[#e5bd63]">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROPERTY INFORMATION
      ========================================================= */}
      <section className="border-y border-[#e3ded3] bg-[#f7f5ef] px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-9">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#b58935]">
              Property Information
            </p>

            <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
              At a glance.
            </h2>
          </div>

          <div className="grid overflow-hidden rounded-[20px] border border-[#e2ddd2] bg-white sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-[#e2ddd2] p-7 sm:border-r lg:border-b-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Property Type
              </p>

              <p className="mt-3 text-lg font-medium text-[#07172a]">
                {property.property_type ||
                  "Hotel / Resort"}
              </p>
            </div>

            <div className="border-b border-[#e2ddd2] p-7 lg:border-b-0 lg:border-r">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Location
              </p>

              <p className="mt-3 text-lg font-medium text-[#07172a]">
                {property.location ||
                  property.destination.name}
              </p>
            </div>

            <div className="border-b border-[#e2ddd2] p-7 sm:border-r sm:border-b-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Guest Rating
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span className="text-lg font-medium text-[#07172a]">
                  {rating.toFixed(1)}
                </span>

                <span className="text-sm tracking-wide text-[#c3983d]">
                  ★★★★★
                </span>
              </div>
            </div>

            <div className="p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Rates
              </p>

              <p className="mt-3 text-lg font-medium text-[#07172a]">
                {property.price_from !==
                  null &&
                property.price_from !==
                  undefined
                  ? `₹${property.price_from.toLocaleString(
                      "en-IN"
                    )}`
                  : "On enquiry"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AMENITIES
      ========================================================= */}
      <section className="bg-white px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#b58935]">
                Facilities & Services
              </p>

              <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                Amenities.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
                Everything you need for a comfortable
                stay, subject to property availability.
              </p>
            </div>

            <div>
              {amenities.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {amenities.map(
                    (amenity) => (
                      <div
                        key={amenity.id}
                        className="flex items-center gap-4 border-b border-[#e8e3d9] py-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3eee3] text-sm text-[#b58935]">
                          ✓
                        </span>

                        <span className="text-sm font-medium text-[#07172a]">
                          {amenity.amenity_name}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="rounded-[20px] border border-[#e3ded3] bg-[#f8f6f0] p-8">
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#b58935]">
                    Details Being Updated
                  </p>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                    Detailed facilities and services
                    for this property are currently
                    being updated. Our travel team can
                    provide the latest information on
                    request.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GALLERY STRIP
      ========================================================= */}
      {images.length > 1 && (
        <section className="bg-[#07172a] px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#e5bd63]">
                  More From The Property
                </p>

                <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] text-white sm:text-5xl">
                  View the gallery.
                </h2>
              </div>

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                {images.length} Images
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group h-[280px] overflow-hidden rounded-[14px] bg-black"
                >
                  <img
                    src={image.image_url}
                    alt={
                      image.alt_text ||
                      property.name
                    }
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div className="absolute inset-0">
          <img
            src={primaryImage}
            alt=""
            className="h-full w-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-[#07172a]/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#e5bd63]">
              Welcome Holidays International
            </p>

            <h2 className="mt-5 text-5xl font-light leading-[1.05] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Planning a stay at{" "}
              <span className="italic">
                {property.name}?
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50">
              Let our travel experts help you with
              availability, rates and a complete holiday
              plan around {property.destination.name}.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-[#d6a84f] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#07172a] transition hover:bg-[#e5bd63]"
              >
                Enquire Now
                <span className="ml-5">
                  →
                </span>
              </Link>

              <Link
                href={`/destinations/domestic/${property.destination.slug}`}
                className="inline-flex items-center rounded-full border border-white/15 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.13em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                More Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="bg-[#06131f] px-5 py-9 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d6a84f]">
              Welcome Holidays International
            </p>

            <p className="mt-2 text-xs text-white/30">
              Curated journeys. Exceptional stays.
            </p>
          </div>

          <Link
            href={`/destinations/domestic/${property.destination.slug}`}
            className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45 transition hover:text-[#d6a84f]"
          >
            ← Back to {property.destination.name}
          </Link>
        </div>
      </footer>
    </main>
  );
}