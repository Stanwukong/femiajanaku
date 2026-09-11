import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { STRATEGIES } from "@/data/strategies";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = PROJECTS.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const strategyRoutes = STRATEGIES.map((strategy) => ({
    url: `${SITE.url}/strategies/${strategy.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectRoutes,
    ...strategyRoutes,
    {
      url: `${SITE.url}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
