import Link from "next/link";

type Destination = {
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

type PropertyImage = {
  id: number;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  display_order: number;
  active: boolean;
};

type Property = {
  id: number;
  destination_id: number;
  name: string;
  slug: string;
  location: string | null;
  description: string | null;
  property_type: string | null;
  rating: number | null;
  price_from: number | null;
  currency: string | null;
  active: boolean;
  display_order: number;
  images: PropertyImage[];
};

type DestinationDetailProps = {
  destination: Destination;
  properties: Property[];
};

function Stars({ rating }: { rating: number | null }) {
  const value = Math.max(
    0,
    Math.min(5, Number(rating ?? 5))
  );

  return (
    <div
      className="flex items-center gap-[3px]"
      aria-label={`${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={
            index < Math.round(value)
              ? "text-[#c9a45b]"
              : "text-[#c9a45b]/20"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function DestinationDetail({
  destination,
  properties,
}: DestinationDetailProps) {
  const isInternational =
    destination.type === "international";

  const basePath = isInternational
    ? "/destinations/international"
    : "/destinations/domestic";

  const collectionName = isInternational
    ? "International Collection"
    : "India Collection";

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#101c2b]">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#071522]">

        <div className="relative min-h-[680px] lg:min-h-[760px]">

          {destination.image_url ? (
            <img
              src={destination.image_url}
              alt={destination.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#071522]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(201,164,91,0.18),transparent_35%)]" />

              <div className="absolute bottom-0 right-0 h-[70%] w-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_65%)]" />
            </div>
          )}

          <div className="absolute inset-0 bg-[#071522]/30" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#061321]/95 via-[#071522]/55 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#071522] via-transparent to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1500px] items-end px-6 pb-16 sm:pb-20 lg:min-h-[760px] lg:px-12 lg:pb-24">

            <div className="w-full">

              <div className="max-w-5xl">

                {/* BACK */}

                <Link
                  href={basePath}
                  className="group inline-flex items-center text-[9px] font-semibold uppercase tracking-[0.28em] text-white/55 transition hover:text-[#d7b56d]"
                >
                  <span className="mr-3 text-base transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>

                  Back to Destinations
                </Link>

                {/* COLLECTION */}

                <div className="mt-12 flex items-center gap-4">

                  <span className="h-px w-14 bg-[#c9a45b]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.38em] text-[#d7b56d]">
                    {collectionName}
                  </span>

                </div>

                {/* DESTINATION NAME */}

                <h1 className="mt-6 max-w-5xl font-serif text-[72px] font-normal leading-[0.88] tracking-[-0.055em] text-white sm:text-[96px] lg:text-[132px]">
                  {destination.name}
                </h1>

                {destination.location && (
                  <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.3em] text-white/55">
                    {destination.location}
                  </p>
                )}

                {destination.description && (
                  <p className="mt-7 max-w-2xl text-[15px] leading-7 text-white/65 sm:text-base">
                    {destination.description}
                  </p>
                )}

                {/* CTA */}

                <div className="mt-9 flex flex-wrap gap-3">

                  {properties.length > 0 && (
                    <a
                      href="#properties"
                      className="group inline-flex items-center bg-[#c9a45b] px-7 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-[#071522] transition hover:bg-[#dfc17c]"
                    >
                      Explore Properties

                      <span className="ml-4 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  )}

                  <Link
                    href="/contact"
                    className="inline-flex items-center border border-white/25 bg-white/[0.04] px-7 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/[0.08]"
                  >
                    Plan Your Journey
                  </Link>

                </div>

              </div>

              {/* HERO META */}

              <div className="mt-16 grid max-w-5xl grid-cols-2 border-t border-white/15 pt-6 sm:grid-cols-4">

                <div className="border-r border-white/10 pr-5">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                    Destination
                  </p>

                  <p className="mt-2 text-sm text-white">
                    {destination.name}
                  </p>
                </div>

                <div className="border-r border-white/10 px-5">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                    Collection
                  </p>

                  <p className="mt-2 text-sm text-white">
                    {isInternational
                      ? "International"
                      : "Domestic"}
                  </p>
                </div>

                <div className="border-r border-white/10 px-5">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                    Stays
                  </p>

                  <p className="mt-2 text-sm text-white">
                    {properties.length}
                  </p>
                </div>

                <div className="pl-5">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                    Experience
                  </p>

                  <p className="mt-2 text-sm text-white">
                    Curated
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section className="bg-[#f4f1e9] px-6 py-20 sm:py-24 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.5fr_0.55fr] lg:gap-16">

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-9 bg-[#c9a45b]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a17b37]">
                  Discover
                </p>

              </div>

            </div>

            <div>

              <h2 className="max-w-4xl font-serif text-[42px] font-normal leading-[1.04] tracking-[-0.045em] sm:text-[54px] lg:text-[62px]">
                Every journey deserves
                <br />

                <span className="italic text-[#a17b37]">
                  the right destination.
                </span>
              </h2>

              {destination.description && (
                <p className="mt-8 max-w-2xl text-[15px] leading-8 text-[#5e6670]">
                  {destination.description}
                </p>
              )}

            </div>

            <div className="border-l border-[#d8d1c2] pl-7">

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#a17b37]">
                Destination Highlights
              </p>

              <p className="mt-5 text-sm leading-7 text-[#273444]">
                {destination.attractions ||
                  `Discover the character, culture and experiences that make ${destination.name} special.`}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          PROPERTY COLLECTION
      ========================================================= */}

      <section
        id="properties"
        className="border-y border-[#ddd6c8] bg-[#eeebe3] px-6 py-20 sm:py-24 lg:px-12 lg:py-28"
      >

        <div className="mx-auto max-w-[1500px]">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-9 bg-[#c9a45b]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a17b37]">
                  Curated Stays
                </p>

              </div>

              <h2 className="mt-5 font-serif text-[46px] font-normal leading-[0.98] tracking-[-0.045em] sm:text-[58px]">

                Places to stay
                <br />

                <span className="italic text-[#a17b37]">
                  in {destination.name}.
                </span>

              </h2>

            </div>

            <div className="max-w-sm lg:text-right">

              <p className="text-sm leading-7 text-[#68717b]">
                A considered collection of properties selected to complement
                your journey.
              </p>

              <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#a17b37]">
                {properties.length}{" "}
                {properties.length === 1
                  ? "Stay"
                  : "Stays"}
              </p>

            </div>

          </div>

          {/* NO PROPERTIES */}

          {properties.length === 0 ? (

            <div className="mt-14 overflow-hidden border border-[#d8d1c2] bg-[#f7f4ed]">

              <div className="grid min-h-[360px] lg:grid-cols-[0.8fr_1.2fr]">

                <div className="relative overflow-hidden bg-[#071522]">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(201,164,91,0.18),transparent_40%)]" />

                  <div className="absolute bottom-8 left-8">

                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#d7b56d]">
                      Coming Soon
                    </p>

                    <p className="mt-3 font-serif text-4xl leading-tight text-white">
                      More stays are
                      <br />
                      being curated.
                    </p>

                  </div>

                </div>

                <div className="flex flex-col justify-center p-9 sm:p-12 lg:p-16">

                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#a17b37]">
                    Stay Collection
                  </p>

                  <h3 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.04em]">
                    Your stay in {destination.name} starts here.
                  </h3>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-[#69717b]">
                    Our collection is being expanded. Contact our travel team
                    for assistance with accommodation and your complete
                    holiday plan.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex w-fit items-center border border-[#101c2b] px-7 py-4 text-[9px] font-bold uppercase tracking-[0.18em] transition hover:bg-[#101c2b] hover:text-white"
                  >
                    Enquire About Stays

                    <span className="ml-4">
                      →
                    </span>
                  </Link>

                </div>

              </div>

            </div>

          ) : (

            /* PROPERTY GRID */

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {properties.map((property, index) => {

                const primaryImage =
                  property.images.find(
                    (image) =>
                      image.is_primary
                  )?.image_url ??
                  property.images[0]?.image_url ??
                  null;

                return (

                  <Link
                    key={property.id}
                    href={`${basePath}/${destination.slug}/${property.slug}`}
                    className="group block overflow-hidden bg-[#101b27]"
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-[0.86] overflow-hidden">

                      {primaryImage ? (

                        <img
                          src={primaryImage}
                          alt={property.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.045]"
                        />

                      ) : (

                        <div className="absolute inset-0 bg-[#0b1723]">

                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(201,164,91,0.16),transparent_35%)]" />

                          <div className="absolute bottom-7 left-7">

                            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                              Photography Coming Soon
                            </p>

                          </div>

                        </div>

                      )}

                      {/* OVERLAY */}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#071522] via-[#071522]/10 to-transparent" />

                      {/* NUMBER */}

                      <div className="absolute left-5 top-5">

                        <span className="flex h-8 min-w-8 items-center justify-center border border-white/20 bg-[#071522]/35 px-3 text-[9px] text-white backdrop-blur-md">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                      </div>

                      {/* PROPERTY TYPE */}

                      {property.property_type && (

                        <div className="absolute right-5 top-5">

                          <span className="border border-white/20 bg-[#071522]/35 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                            {property.property_type}
                          </span>

                        </div>

                      )}

                      {/* CONTENT */}

                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">

                        {property.location && (

                          <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#d7b56d]">
                            {property.location}
                          </p>

                        )}

                        <h3 className="mt-2 max-w-[92%] font-serif text-[27px] leading-[1.03] tracking-[-0.025em] text-white sm:text-[30px]">
                          {property.name}
                        </h3>

                        <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">

                          <div className="flex items-center gap-3">

                            <Stars
                              rating={property.rating}
                            />

                            {property.rating !== null && (

                              <span className="text-[9px] text-white/45">
                                {Number(
                                  property.rating
                                ).toFixed(1)}
                              </span>

                            )}

                          </div>

                          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white transition-colors group-hover:text-[#d7b56d]">
                            View
                            <span className="ml-2">
                              →
                            </span>
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* PROPERTY FOOTER */}

                    <div className="flex min-h-[60px] items-center justify-between border-t border-white/10 bg-[#0d1925] px-6">

                      <div>

                        <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                          {property.price_from !== null
                            ? "Starting From"
                            : "Rates"}
                        </p>

                        <p className="mt-1 text-xs text-white/70">

                          {property.price_from !== null
                            ? `₹${property.price_from.toLocaleString(
                                "en-IN"
                              )} / night`
                            : "Available on enquiry"}

                        </p>

                      </div>

                      <span className="text-lg text-[#c9a45b] transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>

                    </div>

                  </Link>

                );
              })}

            </div>

          )}

        </div>

      </section>

      {/* =========================================================
          WELCOME DIFFERENCE
      ========================================================= */}

      <section className="bg-[#071522] px-6 py-20 sm:py-24 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-9 bg-[#c9a45b]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">
                  The Welcome Difference
                </p>

              </div>

              <h2 className="mt-6 font-serif text-[48px] font-normal leading-[0.98] tracking-[-0.045em] text-white sm:text-[58px]">

                Travel should feel
                <br />

                <span className="italic text-[#d7b56d]">
                  effortless.
                </span>

              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/45">
                From the right property to the right experience, we bring
                together the details that make a holiday feel considered.
              </p>

            </div>

            <div className="grid border-t border-white/10 sm:grid-cols-2">

              <div className="border-b border-white/10 py-8 sm:border-r sm:pr-9">

                <span className="font-serif text-3xl text-[#c9a45b]">
                  01
                </span>

                <h3 className="mt-4 text-lg text-white">
                  Curated Properties
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Thoughtfully selected stays across our destination
                  collection.
                </p>

              </div>

              <div className="border-b border-white/10 py-8 sm:pl-9">

                <span className="font-serif text-3xl text-[#c9a45b]">
                  02
                </span>

                <h3 className="mt-4 text-lg text-white">
                  Personalised Planning
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Travel support designed around your plans and preferences.
                </p>

              </div>

              <div className="py-8 sm:border-r sm:pr-9">

                <span className="font-serif text-3xl text-[#c9a45b]">
                  03
                </span>

                <h3 className="mt-4 text-lg text-white">
                  Member Privileges
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Dedicated booking assistance for eligible members.
                </p>

              </div>

              <div className="py-8 sm:pl-9">

                <span className="font-serif text-3xl text-[#c9a45b]">
                  04
                </span>

                <h3 className="mt-4 text-lg text-white">
                  One Travel Team
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  A single point of support throughout your journey.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#c9a45b]">

        <div className="absolute right-0 top-0 h-full w-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)]" />

        <div className="relative mx-auto max-w-[1500px] px-6 py-20 sm:py-24 lg:px-12 lg:py-28">

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#071522]/55">
                Your Journey Starts Here
              </p>

              <h2 className="mt-5 max-w-4xl font-serif text-[50px] font-normal leading-[0.95] tracking-[-0.055em] text-[#071522] sm:text-[65px] lg:text-[78px]">

                Ready to discover
                <br />

                <span className="italic">
                  {destination.name}?
                </span>

              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#071522]/65">
                Tell us where you want to go. We will help you put together
                the stay, experiences and journey around it.
              </p>

            </div>

            <Link
              href="/contact"
              className="group inline-flex h-fit items-center bg-[#071522] px-8 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#122335]"
            >
              Enquire Now

              <span className="ml-6 text-[#d7b56d] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}