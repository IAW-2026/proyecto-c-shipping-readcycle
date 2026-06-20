import { checkAPIToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/shipments/:id
export async function GET(req, { params }) {
  const { id } = await params;
  try {
    checkAPIToken(req);
    const shipment = await prisma.shipment.findUnique({
      where: {
        id: id,
      },
      include: {
        statuses: {
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    });

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(shipment);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching shipment" },
      { status: 500 },
    );
  }
}

// PUT /api/shipments/:id
export async function PUT(req, { params }) {
  try {
    checkAPIToken(req);
    const body = await req.json();

    const { id } = await params;

    const shipment = await prisma.shipment.update({
      where: {
        id,
      },

      data: {
        carrierId: body.carrierId || null,
      },

      include: {
        carrier: true,
      },
    });

    return NextResponse.json(shipment);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error updating shipment",
      },
      {
        status: 500,
      },
    );
  }
}
