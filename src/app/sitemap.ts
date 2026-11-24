import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { IS_NON_PRODUCTION_DEPLOYMENT, SITE_URL, canonicalUrl } from "@/lib/site-config";

const siteUrl = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
    if (IS_NON_PRODUCTION_DEPLOYMENT) return [];
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: siteUrl, priority: 1, changeFrequency: "monthly" },
        { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: "monthly" },
        { url: `${siteUrl}/projects`, priority: 0.9, changeFrequency: "weekly" },
        { url: `${siteUrl}/competitions`, priority: 0.8, changeFrequency: "monthly" },
        { url: `${siteUrl}/contact`, priority: 0.6, changeFrequency: "yearly" },
    ];

    const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map(({ slug }) => ({
        url: canonicalUrl(`/projects/${slug}`),
        priority: 0.6,
        changeFrequency: "monthly",
    }));

    return [...staticRoutes, ...projectRoutes];
}
