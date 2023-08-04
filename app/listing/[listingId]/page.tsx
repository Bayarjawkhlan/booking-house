import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmtpyState from "@/app/components/EmtpyState";
import ListingClient from "./components/ListingClient";
import getReservations from "@/actions/getReservations";

interface ListingPageProps {
  params: { listingId: string };
}

const ListingPage = async ({ params }: ListingPageProps) => {
  const listing = await getListingById(params.listingId);

  const reservations = await getReservations(params);

  const currentUser = await getCurrentUser();

  if (!listing)
    return (
      <ClientOnly>
        <EmtpyState subtitle="try again with another place" />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
