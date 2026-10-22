import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { ProductCard } from "@/components/product/ProductCard";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { getIndustry, industryPages } from "@/data/industries";
import { company } from "@/data/company";
import { getProduct } from "@/lib/catalog";

export const instant = false;

export function generateStaticParams() {
  return industryPages.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industry/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return { title: ind.title, description: ind.blurb, alternates: { canonical: `/industry/${ind.slug}` }, openGraph: { images: [{ url: ind.image }] } };
}

export default async function IndustryDetail({ params }: PageProps<"/industry/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const items = ind.products.map((s) => getProduct(s)).filter((p) => p !== undefined);
  const others = industryPages.filter((i) => i.slug !== ind.slug);
  const names = items.map((p) => p.name);
  const faqs = [
    { q: `Which ingredients does Sampratiti Exim supply for the ${ind.name.toLowerCase()} industry?`, a: `For the ${ind.name.toLowerCase()} industry we supply ${names.join(", ")}. ${ind.blurb}.` },
    { q: `Can I buy ${ind.name.toLowerCase()} industry ingredients in bulk in India?`, a: "Yes. Sampratiti Exim Pvt Ltd, Ahmedabad, supplies in bulk across India with COA and MSDS support as applicable to the product and batch." },
    { q: "How do I get a price?", a: `Send an inquiry on this page, message on WhatsApp or call ${company.phoneDisplay}. The team replies with price, availability and dispatch time.` },
  ];

  return (
    <>
      <section className="shell pt-3 md:pt-6">
        <Breadcrumbs items={[{ href: "/industry", label: "Industries" }, { label: ind.name }]} />
        <div className="relative mt-5 overflow-hidden rounded-[var(--radius-surface)] bg-brand-deep">
          <div className="relative aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/6]">
            <Image src={ind.image} alt={ind.title} fill sizes="(min-width: 1320px) 1256px, 100vw" quality={90} loading="eager" fetchPriority="high" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06121b]/85 via-[#06121b]/25 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
            <h1 className="max-w-[18ch] text-balance text-[2rem] font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">{ind.title}</h1>
            <p className="mt-3 hidden max-w-[56ch] text-white/80 md:block md:text-lg">{ind.blurb}</p>
          </div>
        </div>
      </section>

      <section className="shell grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="prose-spec">
          <p className="md:hidden">{ind.blurb}</p>
          {ind.body.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>
        <div className="rounded-[var(--radius-surface)] bg-brand p-6 text-on-brand lg:self-start">
          <h2 className="text-2xl font-semibold tracking-tight">Need ingredients for {ind.name.toLowerCase()}?</h2>
          <p className="mt-2 text-on-brand/75">Tell us the product and quantity. We reply with price, COA and dispatch time.</p>
          <div className="mt-5">
            <InquiryButton product={`${ind.name} industry`} />
          </div>
        </div>
      </section>

      <section className="shell border-t border-line py-14 md:py-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Products for {ind.name.toLowerCase()}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="shell pb-14">
        <div className="mx-auto max-w-3xl">
          <Faq id="faq" title={`${ind.name} industry FAQs`} items={faqs} />
        </div>
      </section>

      <section className="shell pb-20">
        <h2 className="text-xl font-semibold tracking-tight">Other industries</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((i) => (
            <li key={i.slug}>
              <Link href={`/industry/${i.slug}`} className="chip">
                {i.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
