"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingItem from "@/app/components/listing/ListingItem";
import { Listing, User } from "@prisma/client";
import { FC } from "react";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser: User;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of place you have favorited!" />
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingItem
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
