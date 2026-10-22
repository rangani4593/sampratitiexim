import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Martian_Mono } from "next/font/google";
import { EnquirySheet } from "@/components/enquiry/EnquirySheet";
import { UIProvider } from "@/components/providers/UIProvider";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { Footer } from "@/components/site/Footer";
import { Header, type NavFamily } from "@/components/site/Header";
import { MobileDock } from "@/components/site/MobileDock";
import { company, companyTabs } from "@/data/company";
import { productCount, productHref, productTypes, products, searchIndex } from "@/lib/catalog";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";
import "./globals.css";

const familjen = Familjen_Grotesk({ variable: "--font-familjen", subsets: ["latin"], display: "swap" });
const martian = Martian_Mono({ variable: "--font-martian", subsets: ["latin"], axes: ["wdth"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sampratitiexim.in"),
  title: {
    default: "Sampratiti Exim | Chemical Importer & Bulk Supplier, Ahmedabad",
    template: "%s | Sampratiti Exim",
  },
  description:
    "Ahmedabad importer and bulk supplier of food grade sucralose, aspartame, TCCA 90, xanthan gum, citric acid and sodium benzoate. COA/MSDS and pan-India supply.",
  keywords: [
    "Food Grade Sucralose",
    "Aspartame Powder",
    "TCCA 90",
    "Xanthan Gum",
    "Citric Acid Monohydrate",
    "Sodium Benzoate",
    "Monosodium Glutamate",
    "Potassium Sorbate",
    "Acesulfame Potassium",
    "Chemical importer Ahmedabad",
    "Sampratiti Exim",
  ],
  applicationName: "Sampratiti Exim",
  authors: [{ name: "Sampratiti Exim Pvt Ltd", url: "https://www.sampratitiexim.in" }],
  creator: "Sampratiti Exim Pvt Ltd",
  publisher: "Sampratiti Exim Pvt Ltd",
  category: "Chemicals",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", siteName: "Sampratiti Exim Pvt Ltd", locale: "en_IN", url: "/" },
  twitter: { card: "summary_large_image" },
  other: { "geo.region": "IN-GJ", "geo.placename": "Ahmedabad", "geo.position": "23.03899;72.69154", ICBM: "23.03899, 72.69154" },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf1f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1823" },
  ],
  viewportFit: "cover",
};

const navFamilies: NavFamily[] = productTypes.map((t) => ({
  slug: t.slug,
  name: t.name,
  blurb: t.blurb,
  cover: t.cover,
  productCount: t.products.length,
  categories: t.products.map((p) => ({ slug: p.slug, name: p.name, code: p.code, count: 0 })),
}));

const productNames = Object.fromEntries(products.map((p) => [productHref(p.slug), p.name]));
const companyLinks = [...companyTabs];
const phone = { display: company.phoneDisplay, href: company.phoneHref };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${familjen.variable} ${martian.variable}`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only z-[90] rounded-full bg-gold px-4 py-2 font-semibold text-on-gold focus:not-sr-only focus:fixed focus:left-4 focus:top-3">
          Skip to content
        </a>
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        <UIProvider>
          <Header families={navFamilies} companyLinks={companyLinks} productCount={productCount} phone={phone} />
          <main id="main">{children}</main>
          <Footer />
          <MobileDock phoneHref={company.phoneHref} productNames={productNames} companyPaths={companyTabs.map((t) => t.href)} />
          <SearchOverlay items={searchIndex} quickLinks={productTypes.map((t) => ({ href: `/products-and-services#${t.slug}`, label: t.name }))} />
          <EnquirySheet phone={phone} />
        </UIProvider>
      </body>
    </html>
  );
}
