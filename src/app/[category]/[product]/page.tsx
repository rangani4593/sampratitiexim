import { Call02Icon, DeliveryTruck01Icon, File01Icon, PackageIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoFrame } from "@/components/media/VideoPlayer";
import { BrochurePages } from "@/components/product/BrochurePages";
import { Gallery } from "@/components/product/Gallery";
import { ProductCard } from "@/components/product/ProductCard";
import { ShareButton } from "@/components/product/ShareButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { company } from "@/data/company";
import { allProducts, formatPrice, getProduct, primaryFamily, productHref, relatedProducts, unitLabel } from "@/lib/catalog";

export const instant = false;

export function generateStaticParams() {
  return allProducts.map(({ category, product }) => ({ category: category.slug, product: product.slug }));
}

const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

export async function generateMetadata({ params }: PageProps<"/[category]/[product]">): Promise<Metadata> {
  const { category: c, product: p } = await params;
  const found = getProduct(c, p);
  if (!found) return {};
  const { category, product } = found;
  const price = product.price ? ` at ${formatPrice(product.price)}/${unitLabel(product.unit)}` : "";
  const desc = plain(product.descriptionHtml).slice(0, 155) || `${product.name} from ${company.name}, Ahmedabad.`;
  return {
    title: `${product.name}${price}`,
    description: desc,
    keywords: [product.name, category.name, ...product.tags.slice(0, 12)],
    alternates: { canonical: productHref(category.slug, product.slug) },
    openGraph: { title: product.name, description: desc, images: product.images[0] ? [{ url: product.images[0] }] : undefined },
  };
}

const HIGHLIGHT = /^(purity|form|grade|grade standard|packaging size|packaging type|brand|shelf life|cas no|usage\/application|physical state|color|colour|mesh size)/i;

export default async function ProductPage({ params }: PageProps<"/[category]/[product]">) {
  const { category: c, product: p } = await params;
  const found = getProduct(c, p);
  if (!found) notFound();
  const { category, product } = found;
  const family = primaryFamily(category);
  const highlights = product.specs.filter(([k]) => HIGHLIGHT.test(k)).slice(0, 4);
  const rest = product.specs.filter((s) => !highlights.includes(s));
  const related = relatedProducts(category, product);
  const brand = product.specs.find(([k]) => /^brand$/i.test(k))?.[1];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.slice(0, 5).map((i) => `https://www.sampratitiexim.in${i}`),
    description: plain(product.descriptionHtml).slice(0, 500),
    category: category.name,
    ...(brand ? { brand: { "@type": "Brand", name: brand } } : {}),
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            url: `https://www.sampratitiexim.in${productHref(category.slug, product.slug)}`,
            seller: { "@type": "Organization", name: company.name },
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={ld} />
      <div className="shell pt-3 md:pt-6">
        <Breadcrumbs
          items={[
            { href: `/range/${family.slug}`, label: family.name },
            { href: `/${category.slug}`, label: category.name },
            { label: product.name },
          ]}
        />
      </div>

      <section className="shell grid gap-8 pb-14 pt-5 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="min-w-0 md:sticky md:top-24 md:self-start">
          <Gallery images={product.images} alt={product.name} transitionName={`product-${category.slug}-${product.slug}`} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <Link href={`/${category.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 hover:text-ink">
              {category.name}
              {category.code && <span className="rounded-full bg-gold-soft px-2 py-0.5 font-mono text-[11px] text-ink">{category.code}</span>}
            </Link>
            <div className="md:hidden">
              <ShareButton title={product.name} />
            </div>
          </div>
          <h1 className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.1] tracking-tight md:text-[2.6rem]">{product.name}</h1>

          <div className="mt-6 rounded-[var(--radius-surface)] bg-surface p-5 hairline">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p>
                <span className="font-mono text-3xl font-semibold tracking-tight">{formatPrice(product.price)}</span>
                {product.price !== null && <span className="text-ink-2"> / {unitLabel(product.unit)}</span>}
              </p>
              <InquiryButton product={product.name} label="Get latest price" className="text-sm font-semibold text-ink underline underline-offset-4" arrow={false} />
            </div>
            {product.moq && (
              <p className="mt-2 text-ink-2">
                Minimum order quantity: <span className="font-semibold text-ink">{product.moq}</span>
              </p>
            )}
            <div className="mt-5 hidden gap-2 md:flex">
              <InquiryButton product={product.name} className="btn btn-gold h-12 flex-1" />
              <a href={company.phoneHref} className="btn btn-ghost h-12">
                <Icon icon={Call02Icon} size={19} />
                <span className="hidden sm:inline">Call</span>
              </a>
              <ShareButton title={product.name} />
            </div>
          </div>

          {highlights.length > 0 && (
            <dl className="mt-4 grid grid-cols-2 gap-2">
              {highlights.map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-surface p-4 hairline">
                  <dt className="text-xs text-ink-3">{k}</dt>
                  <dd className="mt-1 font-semibold leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-6 grid gap-3 text-sm text-ink-2">
            {[
              { icon: File01Icon, text: "COA and MSDS available as applicable to the product and batch" },
              { icon: PackageIcon, text: "Bulk and custom packing on request" },
              { icon: DeliveryTruck01Icon, text: "Dispatch from Ahmedabad, delivery across India" },
            ].map((r) => (
              <li key={r.text} className="flex items-center gap-3">
                <Icon icon={r.icon} size={19} className="shrink-0 text-ink" />
                {r.text}
              </li>
            ))}
          </ul>

          {rest.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">Specifications</h2>
              <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {rest.map(([k, v]) => (
                  <div key={k} className="border-t border-line pt-3">
                    <dt className="text-xs text-ink-3">{k}</dt>
                    <dd className="mt-0.5 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {product.trade.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">Trade information</h2>
              <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {product.trade.map(([k, v]) => (
                  <div key={k} className="border-t border-line pt-3">
                    <dt className="text-xs text-ink-3">{k}</dt>
                    <dd className="mt-0.5 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </section>

      {(product.descriptionHtml || product.videoId) && (
        <section className="border-t border-line bg-surface-2/50 py-14 md:py-20">
          <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {product.descriptionHtml && (
              <div>
                <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">About {product.name}</h2>
                <div className="prose-spec" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </div>
            )}
            <div className="grid content-start gap-8 lg:sticky lg:top-24 lg:self-start">
              {product.videoId && product.videoThumb && (
                <div>
                  <h2 className="mb-4 text-xl font-semibold tracking-tight">Product video</h2>
                  <VideoFrame video={{ id: product.videoId, title: product.name, thumb: product.videoThumb }} />
                </div>
              )}
              {product.tags.length > 0 && (
                <div>
                  <h2 className="mb-3 text-xl font-semibold tracking-tight">Also searched as</h2>
                  <ul className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 18).map((t) => (
                      <li key={t} className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink-2 hairline">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {product.brochures.length > 0 && (
        <section className="shell py-14 md:py-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Product brochure</h2>
          <BrochurePages pages={product.brochures} title={product.name} />
        </section>
      )}

      {related.length > 0 && (
        <section className="shell pb-20 pt-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">More in {category.name}</h2>
            <Link href={`/${category.slug}`} className="shrink-0 text-sm font-semibold underline underline-offset-4">
              View all
            </Link>
          </div>
          <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
            {related.slice(0, 8).map((r) => (
              <div key={`${r.category.slug}-${r.product.slug}`} className="w-[64%] shrink-0 snap-start sm:w-[40%] md:w-auto">
                <ProductCard category={r.category} product={r.product} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
