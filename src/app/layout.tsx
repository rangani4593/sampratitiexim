import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Martian_Mono } from "next/font/google";
import { EnquirySheet } from "@/components/enquiry/EnquirySheet";
import { LaunchGateClient } from "@/components/launch/LaunchGateClient";
import { UIProvider } from "@/components/providers/UIProvider";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { Footer } from "@/components/site/Footer";
import { Header, type NavFamily } from "@/components/site/Header";
import { MobileDock } from "@/components/site/MobileDock";
import { company, companyTabs } from "@/data/company";
import { productCount, productHref, productTypes, products, searchIndex } from "@/lib/catalog";
import { JsonLd } from "@/components/ui/JsonLd";
import { launchBootScript, launchConfig } from "@/lib/launch";
import { baseOpenGraph, organizationLd, websiteLd } from "@/lib/seo";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const familjen = Familjen_Grotesk({ variable: "--font-familjen", subsets: ["latin"], display: "swap" });
const martian = Martian_Mono({ variable: "--font-martian", subsets: ["latin"], axes: ["wdth"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sampratiti Exim | Chemical Importer & Supplier, Ahmedabad",
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
  authors: [{ name: "Sampratiti Exim Pvt Ltd", url: SITE_URL }],
  creator: "Sampratiti Exim Pvt Ltd",
  publisher: "Sampratiti Exim Pvt Ltd",
  category: "Chemicals",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in the hosting dashboard to claim the domain in
  // Search Console. Without it the sitemap cannot be submitted and a changed favicon, title or
  // description cannot be sent for re-crawling, so updates wait for Google to come round on its own.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } } : {}),
  openGraph: baseOpenGraph,
  twitter: { card: "summary_large_image" },
  other: { "geo.region": "IN-GJ", "geo.placename": "Ahmedabad", "geo.position": `${company.geo.lat};${company.geo.lng}`, ICBM: `${company.geo.lat}, ${company.geo.lng}` },
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

const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;var c=t==="dark"?"#0a1823":"#edf1f3";document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.content=c})}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${familjen.variable} ${martian.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply a saved light/dark choice before first paint so the page never flashes the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Scroll-reveal content is served at opacity 0 and faded in by JavaScript; without
            JavaScript it would simply never appear. */}
        <noscript dangerouslySetInnerHTML={{ __html: "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>" }} />
        {/* Decide the launch phase before first paint, so the gate never flashes either way. */}
        {launchConfig.enabled && <script dangerouslySetInnerHTML={{ __html: launchBootScript() }} />}
      </head>
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
        {launchConfig.enabled && <LaunchGateClient />}
      </body>
    </html>
  );
}
