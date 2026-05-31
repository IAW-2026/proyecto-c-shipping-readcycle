import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/shipments
export async function GET() {
  try {
    const shipments = await prisma.shipment.findMany({
      include: {
        statuses: {
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    });

    return NextResponse.json(shipments);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching shipments" },
      { status: 500 },
    );
  }
}

// POST /api/shipments
export async function POST(req) {
  try {
    const body = await req.json();

    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        {
          error: "orderId is required",
        },
        {
          status: 400,
        },
      );
    }

    const shipment = await prisma.shipment.create({
      data: {
        orderId,

        carrierId: null,

        currentStatus: "PENDING",

        statuses: {
          create: {
            description: "PENDING",
          },
        },
      },

      include: {
        carrier: true,

        statuses: {
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    });

    return NextResponse.json(shipment, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error creating shipment",
      },
      {
        status: 500,
      },
    );
  }
}
