import { Listing } from "@prisma/client";

import getListings from "@/actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmtpyState from "./components/EmtpyState";
import ListingItem from "./components/listing/ListingItem";
import getCurrentUser from "@/actions/getCurrentUser";

const Home = async ({
  searchParams,
}: {
  searchParams: { userId?: string };
}) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ClientOnly>
          <EmtpyState showReset />
        </ClientOnly>
      </div>
    );

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((list: Listing, index: number) => {
            return (
              <ListingItem
                currentUser={currentUser}
                key={list?.id || index}
                data={list}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
