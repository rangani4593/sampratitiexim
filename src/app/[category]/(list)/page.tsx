import { Call02Icon, DeliveryTruck01Icon, File01Icon, PackageIcon, WhatsappIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { ShareButton } from "@/components/product/ShareButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { company } from "@/data/company";
import { getProduct, industriesFor, productHref, products, relatedProducts, typeOf } from "@/lib/catalog";
import { productFaqs, productLd, productQuickAnswer } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const desc = `${p.name}${p.code ? ` (${p.code})` : ""}: ${p.short} Bulk supply across India from Ahmedabad. COA and MSDS available. Send an inquiry for price.`;
  const title = `${p.name} Supplier & Importer in Ahmedabad`;
  return {
    title,
    description: desc,
    keywords: [`${p.name} supplier in Ahmedabad`, `${p.name} importer India`, `buy ${p.name} in bulk`, `${p.name} price`, p.name, ...(p.code ? [p.code] : [])],
    alternates: { canonical: productHref(p.slug) },
    openGraph: { type: "website", title, description: desc, url: productHref(p.slug), images: [{ url: p.image, width: 1600, height: 1200, alt: `${p.name} supplier in Ahmedabad` }] },
    twitter: { card: "summary_large_image", title, description: desc, images: [p.image] },
  };
}

export default async function ProductPage({ params }: PageProps<"/[category]">) {
  const { category: slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const type = typeOf(product);
  const industries = industriesFor(product);
  const related = relatedProducts(product);
  const whatsapp = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello Sampratiti Exim, I have an inquiry for ${product.name}.`)}`;

  const faqs = productFaqs(product);

  return (
    <>
      <JsonLd data={productLd(product)} />
      <div className="shell pt-3 md:pt-6">
        <Breadcrumbs items={[{ href: "/products-and-services", label: "Products" }, { label: product.name }]} />
      </div>

      <section className="shell grid gap-8 pb-12 pt-5 md:grid-cols-2 md:items-center md:gap-10 lg:gap-16">
        <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
          <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-[var(--radius-surface)] bg-surface-2">
            <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 50vw, 100vw" loading="eager" fetchPriority="high" className="object-cover" />
          </div>
        </ViewTransition>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-2">
            {product.code && <span className="rounded-full bg-gold px-2.5 py-1 text-on-gold">{product.code}</span>}
            <Link href={`/products-and-services#${type.slug}`} className="rounded-full bg-surface px-2.5 py-1 font-sans hairline">
              {type.name}
            </Link>
          </div>
          <h1 className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.06] tracking-tight md:text-5xl">{product.name}</h1>
          {product.tagline && <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-ink-2">{product.tagline}</p>}

          <div className="mt-6 grid grid-cols-2 gap-2 sm:flex">
            <InquiryButton product={product.name} className="btn btn-gold col-span-2 h-12 sm:flex-1" />
            <a href={company.phoneHref} className="btn btn-ghost h-12">
              <Icon icon={Call02Icon} size={19} />
              Call
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-12">
              <Icon icon={WhatsappIcon} size={19} />
              WhatsApp
            </a>
            <div className="hidden sm:block">
              <ShareButton title={product.name} />
            </div>
          </div>

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
        </div>
      </section>

      <section className="border-t border-line bg-surface-2/50 py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="min-w-0">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">About {product.name}</h2>
            <p className="mb-6 max-w-[68ch] rounded-2xl bg-gold-soft p-4 text-[1.02rem] leading-relaxed text-ink" data-speakable>
              {productQuickAnswer(product)}
            </p>
            <div className="prose-spec" dangerouslySetInnerHTML={{ __html: product.html }} />
          </div>
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            {industries.length > 0 && (
              <>
                <h2 className="mb-3 text-xl font-semibold tracking-tight">Used in these industries</h2>
                <ul className="flex flex-wrap gap-2">
                  {industries.map((i) => (
                    <li key={i.slug}>
                      <Link href={`/industry/${i.slug}`} className="chip">
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-8 rounded-[var(--radius-surface)] bg-brand p-6 text-on-brand">
              <h2 className="text-xl font-semibold tracking-tight">Need {product.name}?</h2>
              <p className="mt-2 text-sm text-on-brand/75">Tell us the grade and quantity. We reply with price, COA and dispatch time.</p>
              <div className="mt-4">
                <InquiryButton product={product.name} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Faq id="faq" title={`${product.name} FAQs`} items={faqs} />
        </div>
      </section>

      <section className="shell pb-14 md:pb-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">More products</h2>
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
          {related.map((r) => (
            <div key={r.slug} className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-auto">
              <ProductCard product={r} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
