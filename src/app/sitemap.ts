import type { MetadataRoute } from "next";
import { companyTabs } from "@/data/company";
import { allProducts, categories, families, productHref } from "@/lib/catalog";

const BASE = "https://www.sampratitiexim.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/products-and-services", "/photos", "/enquiry", "/sitemap", ...companyTabs.map((t) => t.href)];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, priority: p === "/" ? 1 : 0.6 })),
    ...families.map((f) => ({ url: `${BASE}/range/${f.slug}`, priority: 0.8 })),
    ...categories.map((c) => ({ url: `${BASE}/${c.slug}`, priority: 0.9, images: [`${BASE}${c.cover}`] })),
    ...allProducts.map(({ category, product }) => ({
      url: `${BASE}${productHref(category.slug, product.slug)}`,
      priority: 0.7,
      images: product.images.slice(0, 3).map((i) => `${BASE}${i}`),
    })),
  ];
}
