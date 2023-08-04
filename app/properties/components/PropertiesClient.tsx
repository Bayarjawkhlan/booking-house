"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Listing, User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingItem from "@/app/components/listing/ListingItem";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser: User;
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingItem
            key={listing.id}
            data={listing}
            actionId={listing.id as string}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel={"Delete property"}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
