import { checkAPIToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/shipments/:id/tracking
export async function GET(req, { params }) {
  const { id } = await params;
  try {
    await checkAPIToken(req);
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
    await checkAPIToken(req);
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
      return NextResponse.json(
        {
          error: "Invalid status",
        },
        {
          status: 400,
        },
      );
    }

    const [, shipment] = await prisma.$transaction([
      prisma.status.create({
        data: {
          description,
          shipmentId: id,
        },
      }),

      prisma.shipment.update({
        where: {
          id,
        },

        data: {
          currentStatus: description,
        },
      }),
    ]);

    return NextResponse.json(shipment, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error creating tracking status",
      },
      {
        status: 500,
      },
    );
  }
}
