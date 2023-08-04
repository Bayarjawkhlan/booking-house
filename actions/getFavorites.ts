import { User } from "@prisma/client";
import prisma from "../libs/prismadb";

const getFavorites = async (currentUserId: User) => {
  try {
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUserId.favoriteIds || [])],
        },
      },
    });

    return favorites;
  } catch (error) {
    return [];
  }
};

export default getFavorites;
