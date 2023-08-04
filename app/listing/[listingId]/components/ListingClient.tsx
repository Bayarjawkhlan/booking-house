"use client";

import Container from "@/app/components/Container";
import { useCategories } from "@/app/hooks/useCategories";
import { Listing, Reservation, User } from "@prisma/client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser: User | null;
}

export interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

const ListingClient: FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: Reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    if (currentUser.id === listing.userId) {
      return toast.error("You can not reserve on your property!");
    }

    try {
      setIsLoading(true);

      let startDate = dateRange.startDate;
      let endDate = dateRange.endDate;

      await axios.post("/api/reservations", {
        startDate: startDate,
        endDate: endDate,
        listingId: listing.id,
        totalPrice,
      });

      toast.success("Listing created");

      setDateRange(initialDateRange);

      router.push("/trips");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [totalPrice, dateRange, currentUser, listing, loginModal, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      dayCount && listing.price
        ? setTotalPrice(listing.price * dayCount)
        : setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

  const categories = useCategories();
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing, categories]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            blocked={currentUser?.id === listing.userId}
          />
          <div className="grid md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathRoomCount={listing.bathRoomCount}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ListingClient;
