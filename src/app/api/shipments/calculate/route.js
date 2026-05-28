import { NextResponse } from "next/server";

// POST /api/shipments/calculate
export async function POST(req) {
  try {
    const body = await req.json();

    const { weight, distance } = body;

    if (!weight || !distance) {
      return NextResponse.json(
        { error: "weight and distance are required" },
        { status: 400 },
      );
    }

    const basePrice = 1000;

    const weightCost = weight * 200;

    const distanceCost = distance * 15;

    const total = basePrice + weightCost + distanceCost;

    return NextResponse.json({
      weight,
      distance,
      total,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error calculating shipment cost" },
      { status: 500 },
    );
  }
}
