import getCurrentUser from "@/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmtpyState from "../components/EmtpyState";
import getReservations from "@/actions/getReservations";
import TripsClient from "./components/TripsClient";

const MyTrips = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmtpyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmtpyState
          title="No trips found"
          subtitle="Look like you have not reserved any trips"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyTrips;
