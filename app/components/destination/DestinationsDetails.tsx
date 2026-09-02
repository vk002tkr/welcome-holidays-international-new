import Link from "next/link";
import { getDomesticDestinations } from "../../../lib/destinations";

export const dynamic = "force-dynamic";

type Destination = {
  id: number;
  name: string;
  slug: string;
  location: string | null;
  attractions: string | null;
  description: string | null;
  image_url: string | null;
  rating: number | null;
};

function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Link
      href={`/destinations/domestic/${destination.slug}`}
      className="group block overflow-hidden rounded-[22px] border border-[#e5e0d5] bg-white shadow-[0_8px_30px_rgba(7,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,23,42,0.12)]"
    >
      <div className="relative h-64 w-full overflow-hidden bg-[#07172a]">
        {destination.image_url ? (
          <img
            src={destination.image_url}
            alt={destination.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#10283d] via-[#173b57] to-[#07172a]">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6a84f]/40 text-[#e5bd63]">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21C12 21 20 15.8 20 9.5C20 5.35786 16.4183 2 12 2C7.58172 2 4 5.35786 4 9.5C4 15.8 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="9.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">
                Destination
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/85 via-transparent to-transparent" />

        {destination.rating !== null && (
          <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-[#07172a]/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            ★ {destination.rating.toFixed(1)}
          </div>
        )}

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e5bd63]">
            Explore India
          </p>

          <h2 className="mt-1 text-3xl font-light tracking-[-0.04em] text-white">
            {destination.name}
          </h2>

          {destination.location && (
            <p className="mt-2 text-xs text-white/60">
              {destination.location}
            </p>
          )}
        </div>
      </div>

      <div className="p-6">
        {destination.description ? (
          <p className="line-clamp-2 text-sm leading-7 text-slate-500">
            {destination.description}
          </p>
        ) : destination.attractions ? (
          <p className="line-clamp-2 text-sm leading-7 text-slate-500">
            {destination.attractions}
          </p>
        ) : (
          <p className="text-sm leading-7 text-slate-500">
            Discover handpicked stays and memorable experiences in{" "}
            {destination.name}.
          </p>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-[#ece8df] pt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#07172a]">
            Explore Destination
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2d8c7] text-[#b58935] transition-all duration-300 group-hover:border-[#b58935] group-hover:bg-[#b58935] group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function DomesticDestinationsPage() {
  const destinations = await getDomesticDestinations();

  const sortedDestinations = [...destinations].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-[460px] items-center overflow-hidden bg-[#07172a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07172a] via-[#12324b] to-[#07172a]" />

        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-[#d6a84f]/10" />

        <div className="absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full border border-[#d6a84f]/10" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-10">
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
                Incredible India
              </p>
            </div>

            <h1 className="mt-5 text-6xl font-light tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">
              Domestic
              <br />
              <span className="italic text-[#e5bd63]">
                Destinations
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60">
              From the mountains and valleys of the north to tropical
              beaches, royal cities and peaceful backwaters, discover
              remarkable destinations across India.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="border-b border-[#e3ded3] bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Explore India
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                Familiar escapes. New horizons.
              </h2>
            </div>

            <p className="text-sm leading-7 text-slate-500">
              Explore our growing collection of Indian destinations,
              each connected to carefully selected stays and
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESTINATION GRID
      ========================================================= */}
      <section className="px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Handpicked Places
              </p>

              <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                Discover India
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              {sortedDestinations.length} destinations
            </p>
          </div>

          {sortedDestinations.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-[#e5e0d5] bg-white px-6 py-16 text-center">
              <h3 className="text-2xl font-light text-[#07172a]">
                Destinations coming soon
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
                We are currently updating our destination
                collection. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-[#07172a]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#102d46] to-[#07172a] px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#d6a84f]/10" />

            <div className="relative max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e5bd63]">
                Plan Your Journey
              </p>

              <h2 className="mt-5 text-4xl font-light tracking-[-0.05em] text-white sm:text-5xl">
                Your next Indian escape
                <br />
                <span className="italic text-[#e5bd63]">
                  awaits.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/55">
                Discover destinations, premium stays and memorable
                holiday experiences with Welcome Holidays
                International.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/memberships"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d6a84f] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#07172a] transition hover:bg-[#e5bd63]"
                >
                  Explore Memberships
                  <span>→</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Plan My Holiday
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}