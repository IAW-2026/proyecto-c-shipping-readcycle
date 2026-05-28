import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/shipments/:id/tracking
export async function GET(_, { params }) {
  const { id } = await params;
  try {
    const statuses = await prisma.status.findMany({
      where: {
        shipmentId: id,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    return NextResponse.json(statuses);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tracking information" },
      { status: 500 },
    );
  }
}

// POST /api/shipments/:id/tracking
export async function POST(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();

    const { description } = body;

    const validStatuses = [
      "PENDING",
      "PICKED_UP",
      "IN_TRANSIT",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "FAILED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(description)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const status = await prisma.status.create({
      data: {
        description,
        shipmentId: id,
      },
    });

    return NextResponse.json(status, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating tracking status" },
      { status: 500 },
    );
  }
}
