import type { MetadataRoute } from "next";
import {
  getDivisions,
  getJobOpeningSlugs,
  getInsightSlugs,
} from "@/sanity/lib/data";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.candtengineers.com";

  // 1. Static pages
  const staticRoutes = [
    "",
    "/about",
    "/divisions",
    "/careers",
    "/insights",
    "/projects",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const [divisions, jobSlugs, insightSlugs] = await Promise.all([
      getDivisions(),
      getJobOpeningSlugs(),
      getInsightSlugs(),
    ]);

    // 2. Division slug pages
    const divisionRoutes = (divisions ?? []).map((d) => ({
      url: `${baseUrl}/divisions/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // 3. Job opening pages
    const jobRoutes = (jobSlugs ?? []).map((slug) => ({
      url: `${baseUrl}/careers/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // 4. Insight article pages
    const insightRoutes = (insightSlugs ?? []).map((slug) => ({
      url: `${baseUrl}/insights/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...divisionRoutes, ...jobRoutes, ...insightRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
