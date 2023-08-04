import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { listingId: string | undefined } }
) {
  try {
    const listingId = params?.listingId;

    if (!listingId || typeof listingId !== "string")
      return new Response("Invalid Id", { status: 404 });

    const currentUser = await getCurrentUser();

    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    let favoriteIds = [...(currentUser.favoriteIds || []), listingId];

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string | undefined } }
) {
  try {
    const listingId = params?.listingId;

    if (!listingId || typeof listingId !== "string")
      return new Response("Invalid Id", { status: 404 });

    const currentUser = await getCurrentUser();

    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return new Response("Internal error", { status: 500 });
  }
}
