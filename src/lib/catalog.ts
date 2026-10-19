import raw from "@/data/catalog.json";

export type Product = {
  slug: string;
  anchor: string;
  name: string;
  price: number | null;
  unit: string | null;
  moq: string | null;
  specs: [string, string][];
  trade: [string, string][];
  descriptionHtml: string;
  tags: string[];
  images: string[];
  brochures: string[];
  videoId: string | null;
  videoThumb: string | null;
  sources: string[];
  legacy: string[];
};

type CategoryMeta = { formula: string | null; code: string | null; use: string };

export type Category = CategoryMeta & {
  slug: string;
  name: string;
  families: string[];
  introHtml: string;
  tags: string[];
  products: Product[];
  cover: string;
  priceMin: number | null;
  priceMax: number | null;
};

export type Family = {
  slug: string;
  name: string;
  blurb: string;
  categories: Category[];
  cover: string;
  productCount: number;
};

const META: Record<string, CategoryMeta> = {
  "food-grade-sucralose": { formula: "C12H19Cl3O8", code: "E955", use: "Zero-calorie sweetener for beverages, bakery and pharma" },
  "sucralose-powder-supplier-in-rajkot-bulk": { formula: "C12H19Cl3O8", code: "E955", use: "Bulk sucralose supply for Rajkot and Saurashtra" },
  "aspartame-powder": { formula: "C14H18N2O5", code: "E951", use: "Low-calorie sweetener for beverages and food" },
  "aspartame-sweeteners": { formula: "C14H18N2O5", code: "E951", use: "Aspartame in bulk for food and pharma" },
  "artificial-sweetener": { formula: null, code: null, use: "Sweetener blends for beverages and food" },
  "acesulfame-k-pottasium": { formula: "C4H4KNO4S", code: "E950", use: "Heat-stable sweetener for beverages and bakery" },
  "sweet-neotame": { formula: "C20H30N2O5", code: "E961", use: "High-intensity neotame sweetener" },
  "sodium-benzoate": { formula: "C7H5NaO2", code: "E211", use: "Food preservative, IP and food grade" },
  "potassium-sorbate": { formula: "C6H7KO2", code: "E202", use: "Preservative for beverages, food and cosmetics" },
  "sorbic-acid": { formula: "C6H8O2", code: "E200", use: "Preservative for food and beverages" },
  "sodium-citrate": { formula: "Na3C6H5O7", code: "E331", use: "Food and pharma grade citrate" },
  "sodium-citrate-manufacturer-dihydrate-anhydrous": { formula: "Na3C6H5O7·2H2O", code: "E331", use: "Dihydrate and anhydrous sodium citrate" },
  "citric-acid-monohydrate": { formula: "C6H8O7·H2O", code: "E330", use: "Acidulant and preservative for food" },
  "citric-acid-anhydrous": { formula: "C6H8O7", code: "E330", use: "Anhydrous citric acid, 30-100 mesh" },
  "monosodium-glutamate": { formula: "C5H8NO4Na", code: "E621", use: "Flavour enhancer, also sold as Ajinomoto" },
  "malic-acid": { formula: "C4H6O5", code: "E296", use: "Acidulant for beverages and confectionery" },
  "gms-flakes-or-powder": { formula: "C21H42O4", code: "E471", use: "Emulsifier for bakery and dairy" },
  "sodium-bi-carbonate": { formula: "NaHCO3", code: "E500", use: "Food, feed and technical grade baking soda" },
  "vanilla-flavouring-ingredients": { formula: "C8H8O3", code: null, use: "Vanillin and ethyl vanillin flavours" },
  "ascorbic-acid": { formula: "C6H8O6", code: "E300", use: "Vitamin C powder, food grade" },
  "xanthan-gum": { formula: "(C35H49O29)n", code: "E415", use: "Thickener for food and beverages" },
  "carrageenan-gum": { formula: null, code: "E407", use: "Gelling agent for dairy and confectionery" },
  "pectin-powder": { formula: null, code: "E440", use: "Gelling agent for jams and jellies" },
  tcca90: { formula: "C3Cl3N3O3", code: "90% Cl", use: "Chlorine disinfectant for pools and water treatment" },
  "industrial-grade-edta": { formula: "C10H16N2O8", code: "EDTA", use: "Chelating agent for industrial use" },
  "industrial-citric": { formula: "C6H8O7", code: null, use: "Industrial grade citric acid" },
  "acetic-acid": { formula: "CH3COOH", code: "E260", use: "Glacial acetic acid for industry and food" },
  "oxalic-acid": { formula: "C2H2O4", code: null, use: "Industrial cleaning and bleaching acid" },
  "pottasium-humate": { formula: null, code: null, use: "Soil conditioner for agriculture" },
  "fulvic-acid": { formula: null, code: null, use: "Soil conditioner and fertiliser additive" },
  "amino-acid": { formula: null, code: null, use: "Plant nutrition for agriculture" },
};

const FAMILY_BLURB: Record<string, string> = {
  "artificial-sweeteners": "Sucralose, aspartame, acesulfame K and neotame for sugar-free food, beverages and pharma.",
  "preservative-ingredients": "Sodium benzoate, potassium sorbate and sorbic acid to extend shelf life.",
  "food-additives": "Acidulants, flavour enhancers, emulsifiers and leavening agents for food processing.",
  "hydrocolloid-ingredients": "Xanthan gum, carrageenan and pectin for thickening, gelling and stabilising.",
  "pharma-chemicals": "Citric acid and sodium citrate in IP, BP and USP grades.",
  "swimming-pool-chemicals": "TCCA 90 powder, granules and tablets for pool and water disinfection.",
  "industrial-chemicals": "EDTA, industrial citric acid, acetic and oxalic acid for process industries.",
  "agriculture-chemicals": "Potassium humate, fulvic acid and amino acids for soil and plant nutrition.",
};

const COVERS: Record<string, string> = {
  "food-grade-sucralose": "kanbo-sucralose-powder",
  "aspartame-powder": "aspartame-granular-powder-sweetener-mesh",
  tcca90: "tcca-90-chlorine-powder",
  "monosodium-glutamate": "fufeng-monosodium-glutamate",
  "citric-acid-monohydrate": "25-kg-ensign-citric-acid-monohydrate",
};

type RawCategory = Omit<Category, keyof CategoryMeta | "cover" | "priceMin" | "priceMax">;
type RawCatalog = { families: { slug: string; name: string }[]; categories: RawCategory[] };
const data = raw as unknown as RawCatalog;

export const categories: Category[] = data.categories.map((c) => {
  const prices = c.products.map((p) => p.price).filter((p): p is number => p !== null);
  const coverProduct = c.products.find((p) => p.slug === COVERS[c.slug] && p.images.length) ?? c.products.find((p) => p.images.length);
  return {
    ...c,
    ...(META[c.slug] ?? { formula: null, code: null, use: "" }),
    cover: coverProduct?.images[0] ?? "/images/brand/emblem-gold.png",
    priceMin: prices.length ? Math.min(...prices) : null,
    priceMax: prices.length ? Math.max(...prices) : null,
  };
});

export const families: Family[] = data.families.map((f) => {
  const cats = categories.filter((c) => c.families.includes(f.slug));
  return {
    ...f,
    blurb: FAMILY_BLURB[f.slug] ?? "",
    categories: cats,
    cover: cats.find((c) => c.families[0] === f.slug)?.cover ?? cats[0]?.cover ?? "/images/brand/emblem-gold.png",
    productCount: cats.filter((c) => c.families[0] === f.slug).reduce((n, c) => n + c.products.length, 0),
  };
});

export const getFamily = (slug: string) => families.find((f) => f.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const primaryFamily = (c: Category) => getFamily(c.families[0])!;

export function getProduct(categorySlug: string, productSlug: string) {
  const category = getCategory(categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  return category && product ? { category, product } : undefined;
}

export const allProducts = categories.flatMap((c) => c.products.map((product) => ({ category: c, product })));
export const productCount = allProducts.length;
export const photoCount = allProducts.reduce((n, { product }) => n + product.images.length, 0);

const FEATURED: [string, string][] = [
  ["citric-acid-anhydrous", "citric-acid-anhydrous-30-100-mesh"],
  ["monosodium-glutamate", "fufeng-monosodium-glutamate"],
  ["citric-acid-monohydrate", "citric-acid-powder"],
  ["food-grade-sucralose", "kanbo-sucralose-powder"],
  ["sodium-benzoate", "ganesh-sodium-benzoate"],
  ["aspartame-powder", "aspartame-granular-powder-sweetener-mesh"],
  ["sodium-citrate", "white-sodium-citrate-powder"],
  ["tcca90", "white-tcca-90-chlorine-powder"],
];
export const featured = FEATURED.map(([c, p]) => getProduct(c, p)).filter((x) => x !== undefined);

const POPULAR_COIN: [string, string][] = [
  ["fulvic-acid", "fulvic-acid"],
  ["amino-acid", "amino-acid-80"],
  ["pottasium-humate", "super-potassium-f-humate"],
  ["sodium-bi-carbonate", "sodium-bicarbonate-food-grade-tata"],
];
export const alsoPopular = POPULAR_COIN.map(([c, p]) => getProduct(c, p)).filter((x) => x !== undefined);

export const productHref = (categorySlug: string, productSlug: string) => `/${categorySlug}/${productSlug}`;

export function formatPrice(price: number | null) {
  if (price === null) return "Price on request";
  return `₹${price.toLocaleString("en-IN")}`;
}

export const unitLabel = (unit: string | null) => (unit ? unit.replace(/^Kilograms?$/i, "Kg") : "Kg");

export function relatedProducts(category: Category, product: Product, limit = 8) {
  const same = category.products.filter((p) => p.slug !== product.slug).map((p) => ({ category, product: p }));
  if (same.length >= limit) return same.slice(0, limit);
  const fam = primaryFamily(category);
  const more = fam.categories.filter((c) => c.slug !== category.slug).flatMap((c) => c.products.slice(0, 2).map((p) => ({ category: c, product: p })));
  return [...same, ...more].slice(0, limit);
}

export const allVideos = (() => {
  const seen = new Set<string>();
  const out: { id: string; title: string; thumb: string; href: string; category: string }[] = [];
  for (const { category, product } of allProducts) {
    if (!product.videoId || !product.videoThumb || seen.has(product.videoId)) continue;
    seen.add(product.videoId);
    out.push({ id: product.videoId, title: product.name, thumb: product.videoThumb, href: productHref(category.slug, product.slug), category: category.name });
  }
  return out;
})();

export type SearchItem = {
  name: string;
  href: string;
  category: string;
  image: string | null;
  price: string;
  keywords: string;
};

export const searchIndex: SearchItem[] = allProducts.map(({ category, product }) => ({
  name: product.name,
  href: productHref(category.slug, product.slug),
  category: category.name,
  image: product.images[0] ?? null,
  price: product.price ? `${formatPrice(product.price)} / ${unitLabel(product.unit)}` : "Price on request",
  keywords: [
    product.name,
    category.name,
    category.code ?? "",
    primaryFamily(category).name,
    ...product.tags.slice(0, 8),
    ...product.specs.filter(([k]) => /brand|grade|cas/i.test(k)).map(([, v]) => v),
  ]
    .join(" ")
    .toLowerCase(),
}));
