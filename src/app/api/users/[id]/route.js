import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import requireAdmin from "@/lib/requireAdmin";

export async function PATCH(req, { params }) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        username: body.username,
        role: body.role,
        isActive: body.isActive,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return authResult.error;
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        isActive: false,
      },
    });

    const clerk = await clerkClient();

    // bloquear login en Clerk
    await clerk.users.updateUser(user.clerkUserId, {
      banned: true,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const body = await req.json();

    const user = await prisma.user.update({
      where: {
        id,
      },

      data: {
        username: body.username,
        email: body.email,
        role: body.role,
        isActive: body.isActive,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error updating user",
      },
      {
        status: 500,
      },
    );
  }
}
