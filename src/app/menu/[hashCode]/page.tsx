import React from "react";
import { Metadata } from "next";
import { getQRMapping, getRestaurant } from "@/lib/dataService";
import MenuFeed from "@/components/MenuFeed";
import InvalidQRFallback from "@/components/InvalidQRFallback";

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
      title: "Menu Not Found | PlateProject",
    };
  }

  const restaurant = getRestaurant(mapping.restaurantId);
  if (!restaurant) {
    return {
      title: "Menu Not Found | PlateProject",
    };
  }

  const name = restaurant.nameEn;
  return {
    title: `${name} - Table ${mapping.tableNumber} | PlateProject Digital Menu`,
    description: `Scan table QR codes, view ${name}'s digital menu (Table ${mapping.tableNumber}), get food recommendations, and place orders directly on WhatsApp.`,
  };
}

export default async function MenuPage({
  params,
  searchParams,
}: {
  params: Promise<{ hashCode: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const hashCode = resolvedParams.hashCode;
  const tableCode = typeof resolvedSearchParams?.table === "string" ? resolvedSearchParams.table : "";
  const mapping = getQRMapping(hashCode, tableCode);

  if (!mapping) {
    return <InvalidQRFallback message="Invalid QR code or Restaurant/Table not found" />;
  }

  const restaurant = getRestaurant(mapping.restaurantId);

  if (!restaurant) {
    return <InvalidQRFallback message="Invalid QR code or Restaurant not found" />;
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

