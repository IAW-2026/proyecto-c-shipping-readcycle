import { NextResponse } from "next/server";

// POST /api/shipments/calculate
export async function POST(req) {
  try {
    const body = await req.json();

    const { weight } = body;

    if (!weight) {
      return NextResponse.json(
        { error: "weight are required" },
        { status: 400 },
      );
    }

    const basePrice = 1000;

    const weightCost = weight * 200;

    const total = basePrice + weightCost;

    return NextResponse.json({
      weight,
      total,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error calculating shipment cost" },
      { status: 500 },
    );
  }
}
