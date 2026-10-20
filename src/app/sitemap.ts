import type { MetadataRoute } from "next";
import { companyTabs } from "@/data/company";
import { industryPages } from "@/data/industries";
import { products } from "@/lib/catalog";

const BASE = "https://www.sampratitiexim.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/products-and-services", "/industry", "/photos", "/enquiry", "/sitemap", ...companyTabs.map((t) => t.href)];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, priority: p === "/" ? 1 : 0.6 })),
    ...products.map((p) => ({ url: `${BASE}/${p.slug}`, priority: 0.9, images: [`${BASE}${p.image}`] })),
    ...industryPages.map((i) => ({ url: `${BASE}/industry/${i.slug}`, priority: 0.7, images: [`${BASE}${i.image}`] })),
  ];
}
