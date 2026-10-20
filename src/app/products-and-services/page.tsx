import type { Metadata } from "next";
import Link from "next/link";
import { CategoryBlock } from "@/components/product/CategoryBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { categories, families, productCount } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products & Services",
  description: `All ${productCount} products from Sampratiti Exim: sweeteners, preservatives, food additives, hydrocolloids, pharma, swimming pool, industrial and agriculture chemicals.`,
  alternates: { canonical: "/products-and-services" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="shell pt-3 md:pt-6">
        <Breadcrumbs items={[{ label: "Products & Services" }]} />
        <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:text-6xl">Products &amp; Services</h1>
            <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-ink-2">
              {productCount} products across {categories.length} categories. Tap a group to jump, or search by name or E-number.
            </p>
          </div>
          <InquiryButton />
        </div>
      </section>

      <nav aria-label="Product groups" className="sticky top-16 z-30 mt-8 border-y border-line bg-bg/90 backdrop-blur-xl md:top-[72px]">
        <div className="shell no-scrollbar flex gap-2 overflow-x-auto py-3">
          {families.map((f) => (
            <a key={f.slug} href={`#${f.slug}`} className="chip shrink-0">
              {f.name}
            </a>
          ))}
        </div>
      </nav>

      {families.map((f) => (
        <section key={f.slug} id={f.slug} className="shell scroll-mt-36 py-10 md:py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">{f.name}</h2>
              <p className="mt-2 max-w-[60ch] text-ink-2">{f.blurb}</p>
            </div>
            <Link href={`/range/${f.slug}`} className="text-sm font-semibold underline underline-offset-4">
              Open {f.name.toLowerCase()}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {f.categories
              .filter((c) => c.families[0] === f.slug)
              .map((c) => (
                <CategoryBlock key={c.slug} category={c} />
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
