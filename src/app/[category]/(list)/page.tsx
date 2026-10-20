import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { SortableGrid } from "@/components/product/SortableGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { categories, formatPrice, getCategory, primaryFamily, productHref } from "@/lib/catalog";

export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const desc = `${category.name} supplier in Ahmedabad: ${category.products.length} products${
    category.priceMin ? ` from ${formatPrice(category.priceMin)}/Kg` : ""
  }. ${category.use}. Bulk supply across India from Sampratiti Exim.`;
  return {
    title: `${category.name} Supplier, Importer & Trader`,
    description: desc,
    keywords: [category.name, ...(category.code ? [category.code] : []), ...category.tags.slice(0, 15)],
    alternates: { canonical: `/${category.slug}` },
    openGraph: { title: category.name, description: desc, images: [{ url: category.cover }] },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const family = primaryFamily(category);
  const siblings = family.categories;
  const others = categories.filter((c) => !family.categories.includes(c)).slice(0, 8);

  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    itemListElement: category.products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `https://www.sampratitiexim.in${productHref(category.slug, p.slug)}`, name: p.name })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="shell pt-3 md:pt-6">
        <Breadcrumbs items={[{ href: "/products-and-services", label: "Products" }, { href: `/range/${family.slug}`, label: family.name }, { label: category.name }]} />
        <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-2">
              {category.code && <span className="rounded-full bg-gold px-2.5 py-1 text-on-gold">{category.code}</span>}
              {category.formula && <span className="rounded-full bg-surface px-2.5 py-1 hairline">{category.formula}</span>}
            </div>
            <h1 className="mt-4 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:text-6xl">{category.name}</h1>
            <p className="mt-4 max-w-[52ch] text-lg text-ink-2">
              {category.use}.{" "}
              {category.priceMin !== null && (
                <>
                  {category.priceMin === category.priceMax ? "Price " : "Prices from "}
                  <span className="font-mono font-semibold text-ink">{formatPrice(category.priceMin)}</span>
                  {category.priceMax !== null && category.priceMax !== category.priceMin && (
                    <>
                      {" "}to <span className="font-mono font-semibold text-ink">{formatPrice(category.priceMax)}</span>
                    </>
                  )}{" "}
                  per Kg.
                </>
              )}
            </p>
          </div>
          <InquiryButton product={category.name} />
        </div>
      </section>

      {siblings.length > 1 && (
        <nav aria-label={`${family.name} categories`} className="sticky top-16 z-30 mt-8 border-y border-line bg-bg/90 backdrop-blur-xl md:top-[72px]">
          <div className="shell no-scrollbar flex gap-2 overflow-x-auto py-3">
            {siblings.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} aria-current={s.slug === category.slug ? "page" : undefined} className="chip shrink-0">
                {s.name}
                <span className="font-mono text-[11px] opacity-60">{s.products.length}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      <section className="shell py-8 md:py-12">
        <SortableGrid
          items={category.products.map((p, i) => ({
            key: p.slug,
            price: p.price,
            name: p.name,
            node: <ProductCard category={category} product={p} eager={i < 4} sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw" />,
          }))}
        />
      </section>

      {category.introHtml && (
        <section className="border-t border-line bg-surface-2/50 py-14 md:py-20">
          <div className="shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">About {category.name}</h2>
              <div className="prose-spec" dangerouslySetInnerHTML={{ __html: category.introHtml }} />
            </div>
            <div className="lg:sticky lg:top-40 lg:self-start">
              <div className="well relative aspect-square overflow-hidden rounded-[var(--radius-surface)] hairline">
                <Image src={category.cover} alt={category.name} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-contain p-4" />
              </div>
              {category.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {category.tags.slice(0, 16).map((t) => (
                    <li key={t} className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink-2 hairline">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="shell py-14 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Explore more categories</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/${o.slug}`} className="group flex items-center gap-3 rounded-2xl bg-surface p-2 pr-3 hairline transition-transform active:scale-[0.98]">
                <span className="well relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={o.cover} alt="" fill sizes="56px" className="object-contain p-1" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold group-hover:underline">{o.name}</span>
                  <span className="block text-xs text-ink-3">{o.products.length} products</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
