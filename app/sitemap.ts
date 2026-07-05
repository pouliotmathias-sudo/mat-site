import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/videos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/articles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/a-propos`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const articles: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${site.url}/articles/${a.slug}`,
    lastModified: a.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...articles];
}
