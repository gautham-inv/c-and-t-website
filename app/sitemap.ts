import type { MetadataRoute } from "next";
import { getDivisions, getProjectSlugs, getJobOpeningSlugs } from "@/sanity/lib/data";

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
    const [divisions, projectSlugs, jobSlugs] = await Promise.all([
      getDivisions(),
      getProjectSlugs(),
      getJobOpeningSlugs(),
    ]);

    // 2. Division slug pages
    const divisionRoutes = (divisions ?? []).map((d) => ({
      url: `${baseUrl}/divisions/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // 3. Project case study pages
    const projectRoutes = (projectSlugs ?? []).map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // 4. Job opening pages
    const jobRoutes = (jobSlugs ?? []).map((slug) => ({
      url: `${baseUrl}/careers/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...divisionRoutes,
      ...projectRoutes,
      ...jobRoutes,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
