import bcrypt from "bcrypt";

import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    const userExisting = await prismadb.user.findUnique({
      where: { email },
    });

    if (userExisting)
      return new Response("Already created with this email", { status: 401 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}
