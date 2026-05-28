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

    const { orderId, carrierId } = body;

    if (!orderId || !carrierId) {
      return NextResponse.json(
        { error: "orderId and carrierId are required" },
        { status: 400 },
      );
    }

    const shipment = await prisma.shipment.create({
      data: {
        orderId,
        carrierId,
        statuses: {
          create: {
            description: "PENDING",
          },
        },
      },
      include: {
        statuses: true,
      },
    });

    return NextResponse.json(shipment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating shipment" },
      { status: 500 },
    );
  }
}
