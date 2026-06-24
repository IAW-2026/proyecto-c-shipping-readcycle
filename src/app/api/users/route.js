import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import requireAdmin from "@/lib/requireAdmin";
import { checkAPIToken } from "@/lib/jwt";

export async function GET(req) {
  // const authResult = await requireAdmin();

  // if (authResult.error) {
  //   return authResult.error;
  // }

  try {
    checkAPIToken(req);
    const users = await prisma.user.findMany({
      select: {
        id: true,
        clerkUserId: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    checkAPIToken(req);
    const body = await req.json();

    const { email, username, password, role } = body;

    if (!email || !username || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const clerk = await clerkClient();

    // Crear usuario en Clerk
    const clerkUser = await clerk.users.createUser({
      firstName: username,
      lastName: username,
      emailAddress: [email],
      password,
    });

    // Crear usuario en Prisma
    const user = await prisma.user.create({
      data: {
        clerkUserId: clerkUser.id,
        email,
        username,
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
