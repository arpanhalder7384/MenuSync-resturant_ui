import { MetadataRoute } from "next";
import { HASH_MAPPINGS } from "@/lib/mockData";
 
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
 
  // Add restaurant specific table routes dynamically from HASH_MAPPINGS
  const menuRoutes = Object.keys(HASH_MAPPINGS).map((hash) => ({
    url: `${baseUrl}/menu/${hash}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));
 
  return [...routes, ...menuRoutes];
}
