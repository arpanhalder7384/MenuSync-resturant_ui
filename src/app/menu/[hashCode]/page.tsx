import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { HASH_MAPPINGS, MOCK_RESTAURANTS } from "@/lib/mockData";
import MenuFeed from "@/components/MenuFeed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hashCode: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const hashCode = resolvedParams.hashCode;
  const mapping = HASH_MAPPINGS[hashCode];
  
  if (!mapping) {
    return {
      title: "Menu Not Found | MenuSync",
    };
  }

  const restaurant = MOCK_RESTAURANTS[mapping.restaurantId];
  if (!restaurant) {
    return {
      title: "Menu Not Found | MenuSync",
    };
  }

  const name = restaurant.nameEn;
  return {
    title: `${name} - Table ${mapping.tableNumber} | MenuSync Digital Menu`,
    description: `Scan table QR codes, view ${name}'s digital menu (Table ${mapping.tableNumber}), get food recommendations, and place orders directly on WhatsApp.`,
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ hashCode: string }>;
}) {
  const resolvedParams = await params;
  const hashCode = resolvedParams.hashCode;
  const mapping = HASH_MAPPINGS[hashCode];

  if (!mapping) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-screen bg-white">
        <span className="text-4xl mb-4">⚠️</span>
        <h2 className="text-lg font-black text-stone-900 mb-2">
          Invalid QR code or Restaurant not found.
        </h2>
        <Link
          href="/"
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-full transition-all mt-4 uppercase tracking-wider shadow-sm"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  const restaurant = MOCK_RESTAURANTS[mapping.restaurantId];

  if (!restaurant) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-screen bg-white">
        <span className="text-4xl mb-4">⚠️</span>
        <h2 className="text-lg font-black text-stone-900 mb-2">
          Invalid QR code or Restaurant not found.
        </h2>
        <Link
          href="/"
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-full transition-all mt-4 uppercase tracking-wider shadow-sm"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  const data = {
    restaurantId: restaurant.id,
    restaurantNameEn: restaurant.nameEn,
    restaurantNameBn: restaurant.nameBn,
    tableNumber: mapping.tableNumber,
    whatsappNumber: restaurant.whatsappNumber,
    menu: restaurant.menu,
    wifiDetails: restaurant.wifiDetails,
  };

  return <MenuFeed data={data} />;
}
