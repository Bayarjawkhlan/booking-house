"use client";

import { Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingItem from "@/app/components/listing/ListingItem";

interface ReservationsClientProps {
  reservations: Reservation[];
  currentUser: User;
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<String>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subTitle="Booking on your properties" />

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: any) => (
          <ListingItem
            reservation={reservation}
            currentUser={currentUser}
            actionLabel="Cancel reservation"
            disabled={deletingId === reservation.id}
            onAction={onCancel}
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
