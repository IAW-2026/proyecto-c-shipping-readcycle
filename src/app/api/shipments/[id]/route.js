import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/shipments/:id
export async function GET(_, { params }) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: {
        id: params.id,
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
    const body = await req.json();

    const shipment = await prisma.shipment.update({
      where: {
        id: params.id,
      },
      data: {
        orderId: body.orderId,
        carrierId: body.carrierId,
      },
    });

    return NextResponse.json(shipment);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating shipment" },
      { status: 500 },
    );
  }
}

// // DELETE /api/shipments/:id
// export async function DELETE(_, { context }) {
//   try {
//     const params = await context;
//     console.log(params.id);

//     await prisma.shipment.delete({
//       where: {
//         id: params.id,
//       },
//     });

//     return NextResponse.json({
//       message: "Shipment deleted",
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Error deleting shipment" },
//       { status: 500 },
//     );
//   }
// }
