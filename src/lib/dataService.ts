import { generateRestaurantCode, generateTableCode } from "@/utils/crypto";
import demoRestaurantsJson from "@/data/demo/restaurants.json";
import demoQrMappingsJson from "@/data/demo/qrMappings.json";
import prodRestaurantsJson from "@/data/production/restaurants.json";
import prodQrMappingsJson from "@/data/production/qrMappings.json";
import { Restaurant, QRMapping } from "./mockData";

// Type assertions and merging to ensure compatibility with our models
const restaurantsData: Record<string, Restaurant> = {
  ...(demoRestaurantsJson as unknown as Record<string, Restaurant>),
  ...(prodRestaurantsJson as unknown as Record<string, Restaurant>)
};

interface RawMapping {
  restaurantId: string;
  mobile: string;
  tables: string[];
}
const qrMappingsData: RawMapping[] = [
  ...(demoQrMappingsJson as RawMapping[]),
  ...(prodQrMappingsJson as RawMapping[])
];

interface RuntimeMapping {
  restaurantId: string;
  tables: Record<string, string>; // tableCode -> tableNumber
}

// Global cached runtime mappings computed once at startup
const runtimeMappings: Record<string, RuntimeMapping> = {};

qrMappingsData.forEach(mapping => {
  const restaurantCode = generateRestaurantCode(mapping.mobile);
  const tableMap: Record<string, string> = {};
  mapping.tables.forEach(tableNum => {
    const tableCode = generateTableCode(mapping.mobile, tableNum);
    tableMap[tableCode] = tableNum;
  });

  runtimeMappings[restaurantCode] = {
    restaurantId: mapping.restaurantId,
    tables: tableMap
  };
});

/**
 * Returns the QRMapping for a given restaurantCode and tableCode.
 */
export function getQRMapping(restaurantCode: string, tableCode: string): QRMapping | undefined {
  const restMapping = runtimeMappings[restaurantCode];
  if (!restMapping) return undefined;

  const tableNumber = restMapping.tables[tableCode];
  if (!tableNumber) return undefined;

  const restaurant = restaurantsData[restMapping.restaurantId];
  if (!restaurant) return undefined;

  return {
    restaurantId: restMapping.restaurantId,
    restaurantNameEn: restaurant.nameEn,
    restaurantNameBn: restaurant.nameBn,
    tableNumber: tableNumber,
  };
}

/**
 * Returns the Restaurant details for a given restaurantId.
 */
export function getRestaurant(restaurantId: string): Restaurant | undefined {
  return restaurantsData[restaurantId];
}

/**
 * Returns all unique restaurantCode and tableCode combinations.
 */
export function getAllMappings(): { restaurantCode: string; tableCode: string }[] {
  const results: { restaurantCode: string; tableCode: string }[] = [];
  qrMappingsData.forEach(mapping => {
    const restaurantCode = generateRestaurantCode(mapping.mobile);
    mapping.tables.forEach(tableNum => {
      const tableCode = generateTableCode(mapping.mobile, tableNum);
      results.push({ restaurantCode, tableCode });
    });
  });
  return results;
}
