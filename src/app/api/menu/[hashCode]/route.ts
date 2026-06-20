import { NextRequest, NextResponse } from "next/server";
import { HASH_MAPPINGS, MOCK_RESTAURANTS } from "@/lib/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ hashCode: string }> }
) {
  try {
    const resolvedParams = await params;
    const hashCode = resolvedParams.hashCode;
    const mapping = HASH_MAPPINGS[hashCode];

    if (!mapping) {
      return NextResponse.json(
        { error: "Restaurant or table not found" },
        { status: 404 }
      );
    }

    const restaurant = MOCK_RESTAURANTS[mapping.restaurantId];

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant details not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      restaurantId: restaurant.id,
      restaurantNameEn: restaurant.nameEn,
      restaurantNameBn: restaurant.nameBn,
      tableNumber: mapping.tableNumber,
      whatsappNumber: restaurant.whatsappNumber,
      menu: restaurant.menu,
      wifiDetails: restaurant.wifiDetails,
    });
  } catch (error) {
    console.error("API Error in fetching menu:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
