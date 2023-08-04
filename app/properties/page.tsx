import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";

import ClientOnly from "../components/ClientOnly";
import EmtpyState from "../components/EmtpyState";
import PropertiesClient from "./components/PropertiesClient";

const Properties = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmtpyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmtpyState
          title="No properties found"
          subtitle="Look like you have no properties like that."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Properties;
