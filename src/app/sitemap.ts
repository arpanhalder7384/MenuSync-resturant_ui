import { MetadataRoute } from "next";
import { getAllMappings } from "@/lib/dataService";
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://menusync.in";
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
  ];
 
  // Add restaurant specific table routes dynamically from dataService mappings
  const menuRoutes: MetadataRoute.Sitemap = getAllMappings().map(({ restaurantCode, tableCode }) => ({
    url: `${baseUrl}/menu/${restaurantCode}?table=${tableCode}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));
 
  return [...routes, ...menuRoutes];
}
