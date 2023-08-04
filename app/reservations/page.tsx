import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import EmtpyState from "../components/EmtpyState";
import ClientOnly from "../components/ClientOnly";
import ReservationsClient from "./components/ReservationsClient";

const MyReservations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmtpyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    <ClientOnly>
      <EmtpyState
        title="No Reservations found"
        subtitle="Look like you have no reservetions on your properties"
      />
    </ClientOnly>;
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default MyReservations;
