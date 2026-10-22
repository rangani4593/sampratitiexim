import { industryPages } from "@/data/industries";
import raw from "@/data/products.json";

export type ProductType = { slug: string; name: string; blurb: string };

export type Product = {
  slug: string;
  name: string;
  short: string;
  type: string;
  code: string | null;
  tagline: string;
  html: string;
  image: string;
};

const data = raw as { types: ProductType[]; products: Omit<Product, "image">[] };

// Bump a product's version when its image changes so caches pick up the new file.
const IMAGE_VERSION: Record<string, string> = { pectin: "v7" };

export const products: Product[] = data.products.map((p) => ({ ...p, image: `/images/product/${p.slug}-${IMAGE_VERSION[p.slug] ?? "v5"}.webp` }));
export const productCount = products.length;

export const productTypes = data.types.map((t) => {
  const items = products.filter((p) => p.type === t.slug);
  return { ...t, products: items, cover: items[0]?.image ?? "/images/brand/emblem-gold.png" };
});

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getType = (slug: string) => productTypes.find((t) => t.slug === slug);
export const typeOf = (p: Product) => getType(p.type)!;
export const productHref = (slug: string) => `/${slug}`;

export const industriesFor = (p: Product) => industryPages.filter((i) => i.products.includes(p.slug));

export function relatedProducts(p: Product, limit = 8) {
  const same = products.filter((x) => x.type === p.type && x.slug !== p.slug);
  const rest = products.filter((x) => x.type !== p.type && x.slug !== p.slug);
  return [...same, ...rest].slice(0, limit);
}

export const featured = [
  "sucralose",
  "aspartame",
  "citric-acid",
  "xanthan-gum",
  "monosodium-glutamate",
  "sodium-benzoate",
  "potassium-sorbate",
  "pectin",
  "ascorbic-acid",
  "gms-powder",
  "tcca-90",
  "potassium-humate",
]
  .map((s) => getProduct(s))
  .filter((p): p is Product => p !== undefined);

export type SearchItem = { name: string; href: string; category: string; image: string; keywords: string };

export const searchIndex: SearchItem[] = products.map((p) => ({
  name: p.name,
  href: productHref(p.slug),
  category: typeOf(p).name,
  image: p.image,
  keywords: [p.name, p.code ?? "", p.short, typeOf(p).name, p.tagline].join(" ").toLowerCase(),
}));
