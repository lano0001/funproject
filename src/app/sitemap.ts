// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1, lastModified: new Date() },
    { url: `${base}/services`, priority: 0.8, lastModified: new Date() },
  ];

  const cityPages: MetadataRoute.Sitemap = site.cities.map((c) => ({
    url: `${base}/${c.slug}`,
    priority: 0.8,
    lastModified: new Date(),
  }));

  const servicePages: MetadataRoute.Sitemap = site.services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    priority: 0.8,
    lastModified: new Date(),
  }));

  return [...staticPages, ...cityPages, ...servicePages];
}
