import prismadb from "@/libs/prismadb";

const getListingById = async (id: string) => {
  try {
    if (!id) return null;

    const listing = await prismadb.listing.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return listing;
  } catch (error) {
    return null;
  }
};

export default getListingById;
