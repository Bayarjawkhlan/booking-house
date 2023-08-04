import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return new Response("Unauthenticated", { status: 404 });

    const { listingId, startDate, endDate, totalPrice } = await req.json();

    if (!listingId || !startDate || !endDate || !totalPrice)
      return NextResponse.error();

    const listingAndReservation = await prismadb.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(listingAndReservation);
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}
