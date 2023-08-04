import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return new Response("Unauthenticated", { status: 401 });

    const {
      category,
      location,
      guestCount,
      roomCount,
      bathRoomCount,
      imageSrc,
      price,
      title,
      description,
    } = await req.json();

    if (
      !category ||
      !location ||
      !guestCount ||
      !roomCount ||
      !bathRoomCount ||
      !imageSrc ||
      !price ||
      !title ||
      !description
    ) {
      return new Response("Error on values", { status: 404 });
    }

    const listing = await prismadb.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathRoomCount: bathRoomCount,
        locationValue: location.value,
        guestCount,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}
