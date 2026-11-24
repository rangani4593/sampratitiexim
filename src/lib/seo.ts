import { company } from "@/data/company";
import { industryPages } from "@/data/industries";
import { industriesFor, productCount, productTypes, typeOf, type Product } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

/*
  One timestamp per build. A static site has no per-page edit history, so this is the
  honest answer to "when was this last changed" — the same answer the sitemap gives.
*/
const BUILT_AT = new Date().toISOString();

const CIN = company.registrations.find((r) => r.label === "CIN No.")?.value ?? "";

export { SITE_URL };

/**
 * Open Graph fields every page shares. Pages that set their own openGraph must spread
 * this in: Next replaces the parent's openGraph object instead of merging it.
 * There is deliberately no `url` — a shared one made every page claim to be the homepage.
 */
const TITLE_SUFFIX = " | Sampratiti Exim";
const MAX_TITLE = 60; // roughly what Google shows before cutting the title off
const MAX_DESCRIPTION = 160;

/** Product page title that fits in a search result: drops "& Importer", then the site name. */
export function productTitle(name: string): { text: string; absolute: boolean } {
  const full = `${name} Supplier & Importer in Ahmedabad`;
  if ((full + TITLE_SUFFIX).length <= MAX_TITLE) return { text: full, absolute: false };
  const short = `${name} Supplier in Ahmedabad`;
  if ((short + TITLE_SUFFIX).length <= MAX_TITLE) return { text: short, absolute: false };
  return { text: short, absolute: true };
}

/** Joins sentences while they fit the description limit; trims a too-long first one at a word. */
export function fitDescription(parts: string[], max = MAX_DESCRIPTION): string {
  const joined = parts.reduce((acc, part) => {
    const next = acc ? `${acc} ${part}` : part;
    return next.length <= max ? next : acc;
  }, "");
  if (joined) return joined;
  const cut = parts[0].slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export const baseOpenGraph = { type: "website", siteName: "Sampratiti Exim Pvt Ltd", locale: "en_IN" } as const;
export const abs = (path: string) => `${SITE_URL}${path}`;

const plainText = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const firstSentences = (text: string, max = 280) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("."));
  return end > 80 ? cut.slice(0, end + 1) : `${cut.trim()}...`;
};

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: company.name,
  alternateName: "Sampratiti Exim",
  url: SITE_URL,
  // Google reads this for the logo rich result and the knowledge panel; as an ImageObject
  // with explicit dimensions it has everything it needs without fetching the file first.
  logo: { "@type": "ImageObject", url: abs("/icon.png"), contentUrl: abs("/icon.png"), width: 512, height: 512, caption: company.name },
  image: abs("/opengraph-image.jpg"),
  description:
    "Chemical importer, exporter, trader and bulk supplier of food, pharma, nutraceutical, industrial, agriculture and water treatment chemicals from Ahmedabad, Gujarat, with COA and MSDS support and pan-India supply.",
  foundingDate: company.established,
  email: company.email,
  telephone: "+91-95580-86593",
  taxID: company.gst,
  vatID: company.gst,
  priceRange: "Request a quote",
  address: {
    "@type": "PostalAddress",
    streetAddress: "56, Vivan Industrial Park, Kathwada GIDC",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "382430",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
  areaServed: { "@type": "Country", name: "India" },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "sales", telephone: "+91-95580-86593", email: company.email, areaServiceCategory: "Chemical enquiries", availableLanguage: ["English", "Hindi", "Gujarati"] },
    { "@type": "ContactPoint", contactType: "sales", telephone: "+91-89800-02428", availableLanguage: ["English", "Hindi", "Gujarati"] },
  ],
  founder: { "@type": "Person", name: company.ceo },
  sameAs: company.social,
  hasMap: company.office.mapHref,
  /*
    Registration numbers and a subject list give an answer engine something checkable to
    tie this entity to, rather than leaving it to infer the business from prose.
  */
  identifier: [
    { "@type": "PropertyValue", name: "CIN", value: CIN },
    { "@type": "PropertyValue", name: "GSTIN", value: company.gst },
    { "@type": "PropertyValue", name: "FSSAI Licence", value: company.fssai.number },
  ],
  knowsAbout: [
    ...productTypes.map((t) => t.name),
    ...industryPages.map((i) => i.name),
    "Chemical import and distribution",
    "Bulk chemical supply",
    "COA and MSDS documentation",
    "Food grade chemicals",
    "Pharmaceutical grade chemicals",
  ],
};

/*
  An answer-first paragraph for the top of the home page. Answer engines quote the first
  section of a page far more often than anything below it, so the plain facts go there.
*/
export const homeQuickAnswer = `${company.name} is an Ahmedabad based chemical importer, trader and bulk supplier, established in ${company.established}. It supplies ${productCount}+ food, pharma, nutraceutical, industrial, agriculture and water treatment chemicals to manufacturers across India, with COA and MSDS available as applicable to the product and batch. Prices are quoted on request.`;

/** Contact page node, so the enquiry page is understood as the way to reach the company. */
export const contactPageLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/enquiry#page`,
  url: `${SITE_URL}/enquiry`,
  name: `Contact ${company.name}`,
  description: `Send an enquiry, call or message ${company.shortName} in Ahmedabad for price, availability and dispatch time on bulk chemicals.`,
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  dateModified: BUILT_AT,
};

/** Industry page node: the industry, plus the products we list for it as an ordered list. */
export const industryCollectionLd = (ind: { slug: string; title: string; blurb: string }, items: Product[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/industry/${ind.slug}#page`,
  url: `${SITE_URL}/industry/${ind.slug}`,
  name: ind.title,
  description: ind.blurb,
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  dateModified: BUILT_AT,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((p, n) => ({ "@type": "ListItem", position: n + 1, url: `${SITE_URL}/${p.slug}`, name: p.name })),
  },
});

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Sampratiti Exim Pvt Ltd",
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export type Faq = { q: string; a: string };

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  dateModified: BUILT_AT,
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const homeFaqs: Faq[] = [
  {
    q: "Who is Sampratiti Exim Pvt Ltd?",
    a: "Sampratiti Exim Pvt Ltd is an Ahmedabad, Gujarat based chemical importer, trader, distributor and bulk supplier, established in 2022. It sources food, pharma, nutraceutical, industrial, water treatment, cosmetic, textile and agriculture chemicals from reputed domestic and international manufacturers.",
  },
  {
    q: "Where is Sampratiti Exim located?",
    a: `The office is at ${company.office.lines.join(", ")}. Warehouses are in ${company.warehouses.map((w) => `${w.places.join(", ")} (${w.region})`).join(" and ")}.`,
  },
  {
    q: "Which chemicals and ingredients does Sampratiti Exim supply?",
    a: "Sweeteners such as sucralose, aspartame and acesulfame K; thickeners such as xanthan gum, pectin and carrageenan; acids such as citric acid, ascorbic acid and acetic acid; preservatives such as sodium benzoate and potassium sorbate; flavour enhancers such as MSG; and industrial and agriculture chemicals such as TCCA 90, EDTA and potassium humate.",
  },
  {
    q: "Do you supply across India?",
    a: "Yes. Orders are coordinated, stored and dispatched from Ahmedabad with pan-India supply for manufacturers, distributors and industrial users.",
  },
  {
    q: "Do you provide COA and MSDS?",
    a: "COA, MSDS and relevant technical documents are available as applicable to the product and batch.",
  },
  {
    q: "How can I get a price or place an order?",
    a: `Send an inquiry on the website, message on WhatsApp at +91 ${company.phoneDisplay}, call ${company.phoneOwner} on ${company.phoneDisplay} or ${company.altPhoneOwner} on ${company.altPhoneDisplay}, or email ${company.email}. The team replies with price, availability and dispatch time.`,
  },
];

export function productFaqs(p: Product): Faq[] {
  const industries = industriesFor(p).map((i) => i.name.toLowerCase());
  const intro = firstSentences(plainText(p.html.split("</p>")[0] ?? ""), 320) || p.short;
  const code = p.code ? ` (${p.code})` : "";
  return [
    { q: `What is ${p.name}${code}?`, a: intro },
    {
      q: `What is ${p.name} used for?`,
      a: industries.length
        ? `${p.name} is a ${typeOf(p).name.toLowerCase()} product. ${p.short} It is used in the ${industries.join(", ")} industries.`
        : `${p.name} is a ${typeOf(p).name.toLowerCase()} product. ${p.short}`,
    },
    {
      q: `Where can I buy ${p.name} in bulk in India?`,
      a: `Sampratiti Exim Pvt Ltd, Ahmedabad, Gujarat, imports and supplies ${p.name} in bulk with pan-India dispatch. Send an inquiry on this page, message on WhatsApp or call ${company.phoneDisplay}.`,
    },
    { q: `Do you provide COA and MSDS for ${p.name}?`, a: "COA, MSDS and relevant technical documents are available as applicable to the product and batch." },
    {
      q: `How do I get the price of ${p.name}?`,
      a: "Price depends on grade, brand, packing and order quantity. Share your requirement through the inquiry form, WhatsApp or phone and the team replies with the price, availability and dispatch time.",
    },
  ];
}

export const productQuickAnswer = (p: Product) =>
  `${p.name}${p.code ? ` (${p.code})` : ""} supplier in Ahmedabad: Sampratiti Exim Pvt Ltd imports and supplies ${p.name} in bulk across India. ${p.short} COA and MSDS are available as applicable.`;

export const productLd = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": abs(`/${p.slug}#product`),
  name: p.name,
  url: abs(`/${p.slug}`),
  image: abs(p.image),
  description: firstSentences(plainText(p.html), 480) || p.short,
  category: typeOf(p).name,
  // Sampratiti Exim imports and supplies these products; it is not their brand or maker, so
  // it is stated as the seller. Prices are quoted on enquiry and are not published, so no
  // price or stock claim is made here.
  offers: { "@type": "Offer", url: abs(`/${p.slug}`), seller: { "@id": abs("/#organization") } },
  ...(p.code ? { additionalProperty: [{ "@type": "PropertyValue", name: "Code", value: p.code }] } : {}),
  isRelatedTo: industriesFor(p).map((i) => ({ "@type": "Thing", name: `${i.title}`, url: abs(`/industry/${i.slug}`) })),
});
