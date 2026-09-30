import type { MetadataRoute } from "next";

const SITE_URL = "https://odishaminingexpo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // SEO Optimized Route Mapping
  // Important conversion pages get higher priority (0.9) and weekly frequency
  // Informational pages get standard priority (0.8 or 0.7) and monthly frequency
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" }, // Homepage
    
    // Core Conversion & Business Pages
    { path: "/exhibit", priority: 0.9, changeFrequency: "weekly" },
    { path: "/exhibitor-registration", priority: 0.9, changeFrequency: "weekly" },
    { path: "/visit", priority: 0.9, changeFrequency: "weekly" },
    { path: "/visitor-registration", priority: 0.9, changeFrequency: "weekly" },
    
    // Important Informational Pages
    { path: "/why-odisha", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/venue", priority: 0.8, changeFrequency: "monthly" },
    { path: "/brochure", priority: 0.8, changeFrequency: "monthly" },
    
    // Secondary Pages
    { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ] as const;

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}