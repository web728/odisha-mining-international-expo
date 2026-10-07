import type { MetadataRoute } from "next";

const SITE_URL = "https://odishaminingexpo.com";

type SitemapRoute = {
  path: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

const routes: SitemapRoute[] = [
  {
    path: "",
    lastModified: "2026-10-07",
    changeFrequency: "weekly",
    priority: 1.0,
  },

  {
    path: "/about",
    lastModified: "2026-10-07",
    changeFrequency: "monthly",
    priority: 0.8,
  },

  {
    path: "/why-odisha",
    lastModified: "2026-10-07",
    changeFrequency: "monthly",
    priority: 0.8,
  },

  {
    path: "/exhibit",
    lastModified: "2026-10-07",
    changeFrequency: "weekly",
    priority: 0.9,
  },

  {
    path: "/exhibitor-registration",
    lastModified: "2026-10-07",
    changeFrequency: "weekly",
    priority: 0.9,
  },

  {
    path: "/visit",
    lastModified: "2026-10-07",
    changeFrequency: "weekly",
    priority: 0.9,
  },

  {
    path: "/visitor-registration",
    lastModified: "2026-10-07",
    changeFrequency: "weekly",
    priority: 0.9,
  },

  {
    path: "/venue",
    lastModified: "2026-10-07",
    changeFrequency: "monthly",
    priority: 0.8,
  },

  {
    path: "/brochure",
    lastModified: "2026-10-07",
    changeFrequency: "monthly",
    priority: 0.8,
  },

  {
    path: "/gallery",
    lastModified: "2026-10-07",
    changeFrequency: "monthly",
    priority: 0.7,
  },

  {
    path: "/faq",
    lastModified: "2026-10-07",
    changeFrequency: "monthly",
    priority: 0.7,
  },

  {
    path: "/contact",
    lastModified: "2026-10-07",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}