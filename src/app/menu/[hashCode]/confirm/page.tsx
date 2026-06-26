import React from "react";
import { Metadata } from "next";
import { getQRMapping, getRestaurant } from "@/lib/dataService";
import ConfirmPageClient from "@/components/ConfirmPageClient";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ hashCode: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const hashCode = resolvedParams.hashCode;
  const tableCode = typeof resolvedSearchParams?.table === "string" ? resolvedSearchParams.table : "";
  const mapping = getQRMapping(hashCode, tableCode);
  
  if (!mapping) {
    return {
      title: "Confirm Order | PlateProject",
    };
  }

  const restaurant = getRestaurant(mapping.restaurantId);
  if (!restaurant) {
    return {
      title: "Confirm Order | PlateProject",
    };
  }

  const name = restaurant.nameEn;
  return {
    title: `Confirm Order - ${name} - Table ${mapping.tableNumber} | PlateProject`,
    description: `Confirm your selected items, enter special preparation notes, and submit your order via WhatsApp for ${name} (Table ${mapping.tableNumber}).`,
  };
}

export default async function ConfirmPage() {
  return <ConfirmPageClient />;
}
