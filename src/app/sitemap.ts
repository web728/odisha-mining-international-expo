import type { MetadataRoute } from "next";
const routes = ["", "/about", "/why-odisha", "/exhibit", "/exhibitor-registration", "/visit", "/visitor-registration", "/venue", "/gallery", "/faq", "/contact"];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map(route => ({ url: `https://odishaminingexpo.com${route}`, lastModified: new Date(), changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly", priority: route === "" ? 1 : .7 })); }
