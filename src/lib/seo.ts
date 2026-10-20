import { company } from "@/data/company";
import { industriesFor, typeOf, type Product } from "@/lib/catalog";

export const SITE_URL = "https://www.sampratitiexim.in";
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
  logo: abs("/icon.png"),
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
    streetAddress: company.address.lines.slice(0, 3).join(", "),
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
  hasMap: company.address.mapHref,
};

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
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const homeFaqs: Faq[] = [
  {
    q: "Who is Sampratiti Exim Pvt Ltd?",
    a: "Sampratiti Exim Pvt Ltd is an Ahmedabad, Gujarat based chemical importer, trader, distributor and bulk supplier, established in 2022. It sources food, pharma, nutraceutical, industrial, water treatment, cosmetic, textile and agriculture chemicals from reputed domestic and international manufacturers.",
  },
  {
    q: "Where is Sampratiti Exim located?",
    a: `The warehouse is at ${company.address.lines.join(", ")}. The corporate office is at ${company.corporateOffice.lines.join(", ")}.`,
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
  brand: { "@type": "Brand", name: company.name },
  ...(p.code ? { additionalProperty: [{ "@type": "PropertyValue", name: "Code", value: p.code }] } : {}),
  isRelatedTo: industriesFor(p).map((i) => ({ "@type": "Thing", name: `${i.title}`, url: abs(`/industry/${i.slug}`) })),
});
