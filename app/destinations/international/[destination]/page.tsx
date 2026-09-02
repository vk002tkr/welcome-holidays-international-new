import { notFound } from "next/navigation";
import DestinationDetail from "../../../../components/destinations/DestinationDetail";
import { getPropertiesByDestination } from "../../../../lib/properties";
import { getInternationalDestinations } from "../../../../lib/destinations";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    destination: string;
  }>;
};

export default async function InternationalDestinationPage({
  params,
}: PageProps) {
  const { destination: destinationSlug } = await params;

  const destinations = await getInternationalDestinations();

  const destination = destinations.find(
    (item) => item.slug === destinationSlug
  );

  if (!destination) {
    notFound();
  }

  const properties = await getPropertiesByDestination(destinationSlug);

  return (
    <DestinationDetail
      destination={destination}
      properties={properties}
    />
  );
}