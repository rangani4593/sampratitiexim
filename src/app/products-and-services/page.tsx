import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { abs } from "@/lib/seo";
import { productCount, productTypes, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products & Services",
  description: `All ${productCount} products from Sampratiti Exim: sweeteners, thickeners, acids, preservatives, flavour enhancers and industrial chemicals.`,
  alternates: { canonical: "/products-and-services" },
};

export default function ProductsPage() {
  const listLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Products & Services | Sampratiti Exim",
    url: abs("/products-and-services"),
    isPartOf: { "@id": abs("/#website") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/${p.slug}`), name: p.name })),
    },
  };

  return (
    <>
      <JsonLd data={listLd} />
      <section className="shell pt-3 md:pt-6">
        <Breadcrumbs items={[{ label: "Products & Services" }]} />
        <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:text-6xl">Products &amp; Services</h1>
            <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-ink-2">
              {productCount} products in {productTypes.length} groups. Tap a group to jump, or search by name or E-number.
            </p>
          </div>
          <InquiryButton />
        </div>
      </section>

      <nav aria-label="Product groups" className="sticky top-16 z-30 mt-8 border-y border-line bg-bg md:top-[72px]">
        <div className="shell no-scrollbar flex gap-2 overflow-x-auto py-3">
          {productTypes.map((t) => (
            <a key={t.slug} href={`#${t.slug}`} className="chip shrink-0">
              {t.name}
              <span className="font-mono text-[11px] opacity-60">{t.products.length}</span>
            </a>
          ))}
        </div>
      </nav>

      {productTypes.map((t, ti) => (
        <section key={t.slug} id={t.slug} className="shell scroll-mt-36 py-10 md:py-14">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">{t.name}</h2>
            <p className="mt-2 max-w-[60ch] text-ink-2">{t.blurb}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {t.products.map((p, i) => (
              <ProductCard key={p.slug} product={p} eager={ti === 0 && i < 2} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
