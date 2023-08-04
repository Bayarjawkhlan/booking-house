import getCurrentUser from "@/actions/getCurrentUser";
import getFavorites from "@/actions/getFavorites";

import ClientOnly from "../components/ClientOnly";
import EmtpyState from "../components/EmtpyState";
import FavoritesClient from "./components/FavoritesClient";

const MyFavorites = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmtpyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getFavorites(currentUser);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmtpyState
          title="No favorites found"
          subtitle="Look like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyFavorites;
