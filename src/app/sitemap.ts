import type { MetadataRoute } from "next";
import { companyTabs } from "@/data/company";
import { industryPages } from "@/data/industries";
import { products } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;
const BUILT = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/products-and-services", "/industry", "/enquiry", "/sitemap", ...companyTabs.map((t) => t.href)];
  // Legal pages belong in the sitemap, but they are not what anyone searches for.
  const legal = ["/privacy-policy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, lastModified: BUILT, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : p === "/products-and-services" ? 0.9 : 0.6 })),
    ...legal.map((p) => ({ url: `${BASE}${p}`, lastModified: BUILT, changeFrequency: "yearly" as const, priority: 0.3 })),
    ...products.map((p) => ({ url: `${BASE}/${p.slug}`, lastModified: BUILT, changeFrequency: "monthly" as const, priority: 0.9, images: [`${BASE}${p.image}`] })),
    ...industryPages.map((i) => ({ url: `${BASE}/industry/${i.slug}`, lastModified: BUILT, changeFrequency: "monthly" as const, priority: 0.7, images: [`${BASE}${i.image}`] })),
  ];
}
