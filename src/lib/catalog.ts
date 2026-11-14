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

// Product copy is rendered under the page's "About <product>" h2, but its own headings are
// h4 in the data, which skipped a level for screen readers: render them as h3.
const promoteHeadings = (html: string) => html.replace(/<(\/?)h4\b/g, "<$1h3");

export const products: Product[] = data.products.map((p) => ({
  ...p,
  html: promoteHeadings(p.html),
  image: `/images/product/${p.slug}-${IMAGE_VERSION[p.slug] ?? "v5"}.webp`,
}));
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

// Names buyers in India actually type for these products, beyond the catalogue name.
const SEARCH_ALIASES: Record<string, string> = {
  "ascorbic-acid": "vitamin c",
  "monosodium-glutamate": "ajinomoto tasting salt chinese salt",
  "citric-acid": "nimbu sat lemon salt",
  "sodium-bicarbonate": "baking soda meetha soda",
  "soda-ash": "sodium carbonate washing soda",
  "caustic-soda": "sodium hydroxide lye",
  "tcca-90": "chlorine tablet trichloroisocyanuric",
  "glycerin": "glycerine glycerol",
  "sles": "sodium lauryl ether sulphate",
  "gms-powder": "glycerol monostearate",
  "cmc-powder": "carboxymethyl cellulose",
  "edta-disodium": "edta",
  "sodium-meta-bisulphite": "sodium metabisulphite smbs",
  "acid-slurry": "labsa linear alkyl benzene sulphonic acid",
  "sodium-sulphate": "glauber salt",
};

export const searchIndex: SearchItem[] = products.map((p) => ({
  name: p.name,
  href: productHref(p.slug),
  category: typeOf(p).name,
  image: p.image,
  keywords: [p.name, p.code ?? "", p.short, typeOf(p).name, p.tagline, SEARCH_ALIASES[p.slug] ?? ""].join(" ").toLowerCase(),
}));

/**
 * Lower-cases and folds the ways people write the same thing:
 * "E-211", "e 211", "INS 211" -> "e211" (Indian labels use INS numbers);
 * American "sulfate"/"sulfite" -> the catalogue's "sulphate"/"sulphite".
 */
export function normaliseQuery(q: string): string {
  return q
    .toLowerCase()
    .replace(/\b(?:e|ins)\s*-?\s*(\d{3,4}[a-z]?)\b/g, "e$1")
    .replace(/sulfat/g, "sulphat")
    .replace(/sulfit/g, "sulphit")
    .replace(/\s+/g, " ")
    .trim();
}

/** Products matching every word of the query, best match first. */
export function searchProducts(items: SearchItem[], query: string, limit = 40): SearchItem[] {
  const q = normaliseQuery(query);
  if (!q) return [];
  const words = q.split(" ");
  // A stray one-letter word ("vitamin c") would match nearly everything; rank on it instead.
  const required = words.length > 1 ? words.filter((w) => w.length > 1) : words;
  return items
    .filter((it) => required.every((w) => it.keywords.includes(w)))
    .map((it) => {
      const n = it.name.toLowerCase();
      const score =
        (n === q ? 8 : 0) + (n.startsWith(q) ? 4 : 0) + (n.includes(q) ? 3 : 0) + (it.keywords.includes(q) ? 2 : 0) + (it.category.toLowerCase().includes(q) ? 1 : 0);
      return { it, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.it);
}
