import Link from "next/link";
import { getInternationalDestinations } from "../../../lib/destinations";

export default async function InternationalDestinationsPage() {
  const destinations = await getInternationalDestinations();

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div className="relative min-h-[560px]">
          <div className="absolute inset-0 bg-[#07172a]" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#041323] via-[#07172a]/95 to-[#07172a]/75" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07172a] via-transparent to-[#07172a]/20" />

          <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1400px] items-end px-6 pb-16 lg:px-10 lg:pb-20">
            <div className="max-w-4xl">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 transition hover:text-[#e5bd63]"
              >
                <span>←</span>
                All Destinations
              </Link>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-[#d6a84f]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#e5bd63]">
                  Beyond Borders
                </p>
              </div>

              <h1 className="mt-5 text-6xl font-light tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">
                International
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/50">
                Discover unforgettable journeys beyond India,
                from tropical escapes and vibrant cities to
                iconic landscapes and timeless experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESTINATIONS
      ========================================================= */}
      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-6 border-b border-[#ddd8cd] pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Explore The World
              </p>

              <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                Choose your destination.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500">
              Explore our curated international destinations
              and discover the right journey for your next
              holiday.
            </p>
          </div>

          {destinations.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {destinations.map((destination) => (
                <Link
                  key={destination.id}
                  href={`/destinations/international/${destination.slug}`}
                  className="group overflow-hidden rounded-[18px] bg-white shadow-[0_10px_35px_rgba(7,23,42,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,23,42,0.12)]"
                >
                  {/* IMAGE */}
                  <div className="relative h-[300px] overflow-hidden bg-[#07172a]">
                    {destination.image_url ? (
                      <img
                        src={destination.image_url}
                        alt={`${destination.name} destination`}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#07172a]">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/25">
                          Image Coming Soon
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/80 via-transparent to-transparent" />

                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        International
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#e5bd63]">
                        Explore
                      </p>

                      <h3 className="mt-2 text-2xl font-light tracking-[-0.035em] text-white">
                        {destination.name}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <p className="text-sm leading-7 text-slate-500">
                      Discover {destination.name} and plan
                      your next international holiday with
                      Welcome Holidays International.
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#07172a] transition group-hover:text-[#b58935]">
                        View Destination
                      </span>

                      <span className="text-lg text-[#b58935] transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[20px] border border-[#ded8cd] bg-white p-10 text-center">
              <p className="text-sm text-slate-500">
                International destinations are being updated.
                Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          INSPIRATION
      ========================================================= */}
      <section className="bg-[#07172a] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                Travel Beyond Borders
              </p>

              <h2 className="mt-5 text-5xl font-light tracking-[-0.055em] text-white sm:text-6xl">
                New places.
                <br />
                <span className="italic">
                  New stories.
                </span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-8 text-white/45">
              Whether you're looking for beaches, mountains,
              culture, shopping, adventure or simply a change
              of scenery, our international destinations are
              designed to inspire your next journey.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-[#faf9f5] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="overflow-hidden rounded-[28px] bg-[#e8e0cf]">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9b742c]">
                  Plan Your Journey
                </p>

                <h2 className="mt-5 max-w-3xl text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                  Let us create your next
                  <span className="italic">
                    {" "}
                    international escape.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
                  Tell us where you want to go and our travel
                  experts will help you plan the perfect holiday.
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center rounded-full bg-[#07172a] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#102944]"
                >
                  Plan My Holiday
                  <span className="ml-4 text-[#e5bd63]">
                    →
                  </span>
                </Link>
              </div>

              <div className="hidden min-h-[320px] bg-[#07172a] lg:block">
                <div className="flex h-full items-center justify-center p-12">
                  <div className="text-center">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                      Welcome Holidays International
                    </p>

                    <p className="mt-5 text-4xl font-light tracking-[-0.04em] text-white">
                      Your world,
                      <br />
                      <span className="italic">
                        your journey.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}