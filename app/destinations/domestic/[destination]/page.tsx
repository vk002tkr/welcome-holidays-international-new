import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertiesByDestination } from "../../../../lib/properties";
import { getDomesticDestinations } from "../../../../lib/destinations";

type PageProps = {
  params: Promise<{
    destination: string;
  }>;
};

export default async function DomesticDestinationPage({
  params,
}: PageProps) {
  const { destination: destinationSlug } = await params;

  const destinations = await getDomesticDestinations();

  const destination = destinations.find(
    (item) => item.slug === destinationSlug
  );

  if (!destination) {
    notFound();
  }

  const properties = await getPropertiesByDestination(destinationSlug);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/destinations/domestic"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back to Domestic Destinations
          </Link>

          <h1 className="mt-6 text-4xl font-bold tracking-tight">
            {destination.name}
          </h1>

          {destination.location && (
            <p className="mt-2 text-gray-500">
              {destination.location}
            </p>
          )}

          {destination.description && (
            <p className="mt-6 max-w-3xl leading-7 text-gray-600">
              {destination.description}
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Properties
            </p>

            <h2 className="mt-2 text-3xl font-semibold">
              Stay in {destination.name}
            </h2>
          </div>

          {properties.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
              <h3 className="text-xl font-semibold">
                Properties coming soon
              </h3>

              <p className="mt-2 text-gray-500">
                We are currently adding properties for this destination.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => {
                const image =
                  property.images.find(
                    (item) => item.is_primary
                  )?.image_url ??
                  property.images[0]?.image_url ??
                  null;

                return (
                  <Link
                    key={property.id}
                    href={`/destinations/domestic/${destination.slug}/${property.slug}`}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      {image ? (
                        <img
                          src={image}
                          alt={
                            property.images.find(
                              (item) => item.is_primary
                            )?.alt_text ??
                            property.name
                          }
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          Image coming soon
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      {property.property_type && (
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                          {property.property_type}
                        </p>
                      )}

                      <h3 className="mt-2 text-xl font-semibold">
                        {property.name}
                      </h3>

                      {property.location && (
                        <p className="mt-2 text-sm text-gray-500">
                          {property.location}
                        </p>
                      )}

                      {property.rating !== null && (
                        <p className="mt-3 text-sm text-gray-600">
                          ★ {Number(property.rating).toFixed(1)}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-sm font-medium">
                          View Property
                        </span>

                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}