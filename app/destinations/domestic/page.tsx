import Link from "next/link";
import {
  getDomesticDestinations,
  type Destination,
} from "../../../lib/destinations";

function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  const rating = Math.round(destination.rating ?? 5);

  return (
    <article className="group overflow-hidden rounded-[18px] border border-[#e5e0d5] bg-white shadow-[0_8px_30px_rgba(7,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,23,42,0.12)]">
      <Link
        href={`/destinations/domestic/${destination.slug}`}
        className="block"
      >
        <div className="relative h-[235px] overflow-hidden bg-[#07172a]">
          {destination.image_url ? (
            <img
              src={destination.image_url}
              alt={`${destination.name} destination`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#07172a]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                Image Coming Soon
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/65 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#07172a]/55 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            India
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-[22px] font-semibold tracking-[-0.035em] text-[#07172a]">
            {destination.name}
          </h3>

          {destination.attractions && (
            <p className="mt-3 text-[11px] font-semibold uppercase leading-5 tracking-[0.08em] text-[#a77d2d]">
              {destination.attractions}
            </p>
          )}

          {destination.description && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
              {destination.description}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-[#ece8df] pt-4">
            <div className="flex items-center gap-1 text-[#c3983d]">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={index < rating ? "opacity-100" : "opacity-25"}
                >
                  ★
                </span>
              ))}
            </div>

            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#07172a] transition group-hover:text-[#b58935]">
              View Now

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default async function DomesticDestinationsPage() {
  let destinations: Destination[] = [];
  let hasError = false;

  try {
    destinations = await getDomesticDestinations();
  } catch (error) {
    console.error("Domestic destinations page error:", error);
    hasError = true;
  }

  const sortedDestinations = [...destinations].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
    })
  );

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div className="relative h-[560px]">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400&q=92"
            alt="Incredible India"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#07172a]/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#041323]/95 via-[#07172a]/65 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/90 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-end px-6 pb-16 lg:px-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#d6a84f]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#e5bd63]">
                  Welcome Holidays International
                </p>
              </div>

              <h1 className="mt-6 text-6xl font-light tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">
                Domestic
                <br />
                <span className="italic">Destinations</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Explore India&apos;s most memorable destinations, from
                Himalayan retreats and royal cities to tropical beaches and
                spiritual escapes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / FILTER BAR
      ========================================================= */}
      <section className="border-b border-[#e3ded3] bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              Explore India
            </p>

            <h2 className="mt-2 text-2xl font-light tracking-[-0.035em]">
              Discover incredible destinations
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="#all"
              className="rounded-full bg-[#07172a] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
            >
              All Destinations
            </a>

            <a
              href="#all"
              className="rounded-full border border-[#d9d2c5] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#07172a] transition hover:border-[#c3983d]"
            >
              Mountains
            </a>

            <a
              href="#all"
              className="rounded-full border border-[#d9d2c5] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#07172a] transition hover:border-[#c3983d]"
            >
              Beaches
            </a>

            <a
              href="#all"
              className="rounded-full border border-[#d9d2c5] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#07172a] transition hover:border-[#c3983d]"
            >
              Heritage
            </a>

            <a
              href="#all"
              className="rounded-full border border-[#d9d2c5] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#07172a] transition hover:border-[#c3983d]"
            >
              Spiritual
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESTINATION GRID
      ========================================================= */}
      <section id="all" className="px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                {sortedDestinations.length > 0
                  ? `${sortedDestinations.length} Places To Discover`
                  : "Explore India"}
              </p>

              <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                India, destination by destination.
              </h2>
            </div>

            <p className="hidden max-w-sm text-right text-sm leading-6 text-slate-500 md:block">
              Select a destination to discover stays, experiences and travel
              inspiration.
            </p>
          </div>

          {hasError ? (
            <div className="rounded-[20px] border border-red-200 bg-white px-6 py-16 text-center">
              <p className="text-sm font-semibold text-[#07172a]">
                Destinations could not be loaded.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Please check the Supabase connection and try again.
              </p>
            </div>
          ) : sortedDestinations.length === 0 ? (
            <div className="rounded-[20px] border border-[#e5e0d5] bg-white px-6 py-20 text-center">
              <p className="text-2xl font-light text-[#07172a]">
                Your destinations are coming soon.
              </p>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Add your first active domestic destination in Supabase and it
                will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&fm=jpg&q=90&w=2200"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#07172a]/80" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#041323]/95 via-[#07172a]/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
              Not Sure Where To Go?
            </p>

            <h2 className="mt-5 text-5xl font-light tracking-[-0.055em] text-white sm:text-6xl">
              Let us help you
              <br />
              <span className="italic">find your India.</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
              Tell us what kind of holiday you are looking for and our travel
              team can help you discover the destination that fits you best.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#07172a] transition hover:bg-[#e5bd63]"
            >
              Plan My Holiday
              <span className="ml-4">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER STRIP
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
            href="/destinations"
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 transition hover:text-[#d6a84f]"
          >
            ← Back To All Destinations
          </Link>
        </div>
      </section>
    </main>
  );
}