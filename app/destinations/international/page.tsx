import Link from "next/link";
import {
  getInternationalDestinations,
  Destination,
} from "../../../lib/destinations";

export const dynamic = "force-dynamic";

function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Link
      href={`/destinations/international/${destination.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        {destination.image_url ? (
          <img
            src={destination.image_url}
            alt={destination.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
            <span className="text-sm font-medium text-slate-500">
              {destination.name}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-2xl font-semibold">{destination.name}</h3>

          {destination.location && (
            <p className="mt-1 text-sm text-white/85">
              {destination.location}
            </p>
          )}
        </div>
      </div>

      <div className="p-5">
        {destination.attractions && (
          <p className="line-clamp-2 text-sm leading-6 text-gray-600">
            {destination.attractions}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#173fbb]">
            Explore Destination
          </span>

          <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function InternationalDestinationsPage() {
  const destinations = await getInternationalDestinations();

  const sortedDestinations = [...destinations].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
    })
  );

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      {/* Hero */}
      <section className="relative flex min-h-[460px] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07172a] via-[#173fbb] to-[#0b315f]" />

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
              Welcome Holidays International
            </p>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Discover the World
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
              From tropical islands and vibrant cities to iconic landmarks
              and unforgettable international escapes, discover the world
              with Welcome Holidays International.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#173fbb]">
            International Destinations
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#07172a] md:text-4xl">
            Explore the world with us
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Choose your destination and discover handpicked international
            stays and experiences available through Welcome Holidays
            International.
          </p>
        </div>

        {sortedDestinations.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-gray-600">
              No international destinations are available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {sortedDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#07172a]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            The world is waiting
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">
            Discover extraordinary destinations and premium stays with
            Welcome Holidays International.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#07172a] transition hover:bg-gray-100"
          >
            Plan Your Journey
          </Link>
        </div>
      </section>

      <div className="h-16 bg-white" />
    </main>
  );
}