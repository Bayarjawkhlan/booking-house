import prismadb from "@/libs/prismadb";

interface IParams {
  userId?: string;
  listingId?: string;
  authorId?: string;
}

const getReservations = async (params: IParams) => {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (userId) query.userId = userId;
    if (listingId) query.listingId = listingId;
    if (authorId) query.listing = { userId: authorId };

    const reservations = await prismadb.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getReservations;
