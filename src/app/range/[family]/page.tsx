import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDeck, type DeckSlide } from "@/components/home/ProductDeck";
import { CategoryBlock } from "@/components/product/CategoryBlock";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { Reveal } from "@/components/ui/Reveal";
import { families, formatPrice, getFamily, productHref, unitLabel } from "@/lib/catalog";

export const instant = false;

export function generateStaticParams() {
  return families.map((f) => ({ family: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/range/[family]">): Promise<Metadata> {
  const { family: slug } = await params;
  const family = getFamily(slug);
  if (!family) return {};
  return {
    title: `${family.name} Supplier in Ahmedabad`,
    description: `${family.blurb} ${family.categories.length} categories from Sampratiti Exim, Ahmedabad.`,
    alternates: { canonical: `/range/${family.slug}` },
  };
}

export default async function FamilyPage({ params }: PageProps<"/range/[family]">) {
  const { family: slug } = await params;
  const family = getFamily(slug);
  if (!family) notFound();
  const productTotal = family.categories.reduce((n, c) => n + c.products.length, 0);
  const slides: DeckSlide[] = family.categories
    .map((c) => ({ c, p: c.products.find((p) => p.images.length) }))
    .filter((x) => x.p)
    .slice(0, 8)
    .map(({ c, p }) => ({
      src: p!.images[0],
      name: p!.name,
      href: productHref(c.slug, p!.slug),
      price: p!.price ? `${formatPrice(p!.price)} / ${unitLabel(p!.unit)}` : "Price on request",
      category: c.name,
      code: c.code,
    }));

  return (
    <>
      <section className="shell pt-3 md:pt-6">
        <Breadcrumbs items={[{ href: "/products-and-services", label: "Products" }, { label: family.name }]} />
        <div className="mt-6 grid items-center gap-8 md:mt-10 md:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h1 className="text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:text-6xl">{family.name}</h1>
            <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-ink-2">{family.blurb}</p>
            <p className="mt-3 text-sm text-ink-3">
              {family.categories.length} categories, {productTotal} products
            </p>
            <div className="mt-6">
              <InquiryButton product={family.name} />
            </div>
          </div>
          <div className="hidden md:block">
            <ProductDeck slides={slides} compact />
          </div>
        </div>
      </section>

      <section className="shell py-10 md:py-14">
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {family.categories.map((c) => (
            <CategoryBlock key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {family.categories.map((c) => (
        <section key={c.slug} className="shell border-t border-line py-10 md:py-14">
          <Reveal className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{c.name}</h2>
            <Link href={`/${c.slug}`} className="shrink-0 text-sm font-semibold underline underline-offset-4">
              View category
            </Link>
          </Reveal>
          <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 xl:grid-cols-4">
            {c.products.map((p) => (
              <div key={p.slug} className="w-[64%] shrink-0 snap-start sm:w-[40%] md:w-auto">
                <ProductCard category={c} product={p} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
