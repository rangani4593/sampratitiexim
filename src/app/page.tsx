import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { AdvantageList } from "@/components/home/AdvantageList";
import { HorizontalShelf } from "@/components/home/HorizontalShelf";
import { ProductDeck, type DeckSlide } from "@/components/home/ProductDeck";
import { ProductCard } from "@/components/product/ProductCard";
import { CopyValue } from "@/components/ui/CopyValue";
import { Icon } from "@/components/ui/Icon";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { Faq } from "@/components/ui/Faq";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { advantageIntro, advantages, company, mission, ratings, welcomeParagraphs } from "@/data/company";
import { industryPages } from "@/data/industries";
import { homeFaqs } from "@/lib/seo";
import { featured, productCount, productTypes } from "@/lib/catalog";

const HEADLINE = "Your trusted chemical solutions partner";

export default function Home() {
  const slides: DeckSlide[] = industryPages.map((i) => ({
    src: i.image,
    title: i.title,
    href: `/industry/${i.slug}`,
    eyebrow: "Industry",
    caption: `${i.products.length} products`,
  }));
  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-10 pb-14 pt-4 md:pt-10 lg:min-h-[calc(100dvh-72px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pb-16">
        <div>
          <p className="fade-in text-sm font-medium text-ink-2">Importer, exporter and bulk supplier since {company.established}</p>
          <h1 className="rise mt-4 text-balance text-[2.5rem] font-semibold leading-[1.03] tracking-[-0.035em] sm:text-[3.4rem] lg:text-[3.55rem] xl:text-[4.1rem]">
            {HEADLINE.split(" ").map((w, i) => (
              <span key={i} style={{ ["--i" as string]: i }}>
                {w}&nbsp;
              </span>
            ))}
          </h1>
          <p className="fade-in mt-5 max-w-[40ch] text-lg leading-relaxed text-ink-2 md:text-xl" style={{ ["--d" as string]: "420ms" }}>
            Food, pharma and water-treatment chemicals, imported and supplied in bulk across India with COA and MSDS support.
          </p>
          <div className="fade-in mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap" style={{ ["--d" as string]: "560ms" }}>
            <InquiryButton className="btn btn-gold px-4" />
            <Link href="/products-and-services" className="btn btn-ghost px-4">
              <span className="sm:hidden">All products</span>
              <span className="hidden sm:inline">Browse {productCount} products</span>
            </Link>
          </div>
        </div>
        <div className="fade-in" style={{ ["--d" as string]: "200ms" }}>
          <ProductDeck slides={slides} />
        </div>
      </section>

      {/* Proof strip */}
      <section aria-label="Company at a glance" className="shell">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-surface)] bg-line md:grid-cols-4">
          {[
            { k: "Satisfied Customers", v: `${ratings.count}+`, d: "verified buyers across India" },
            { k: "Industries Served", v: String(industryPages.length), d: "food, pharma and industrial" },
            { k: "Years in Business", v: `${new Date().getFullYear() - parseInt(company.established)}+`, d: `since ${company.established}` },
            { k: "Delivery", v: "Pan-India", d: "from Ahmedabad warehouse" },
          ].map((s) => (
            <div key={s.k} className="bg-surface p-4 md:p-6">
              <dt className="text-sm text-ink-3">{s.k}</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{s.v}</dd>
              <dd className="mt-0.5 text-sm text-ink-2">{s.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Product groups */}
      <section className="shell py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Product range</h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-2">
            {productCount} ingredients and chemicals for food, pharma, agriculture and industry, sourced from established manufacturers.
          </p>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {productTypes.map((t) => (
            <RevealItem key={t.slug}>
              <Link
                href={`/products-and-services#${t.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-surface)] bg-surface p-2 transition-transform hairline active:scale-[0.985] md:hover:-translate-y-1 md:hover:lift"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[16px] bg-surface-2">
                  <Image src={t.cover} alt={t.name} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 flex-col p-3 md:p-4">
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-[1.05rem] font-semibold leading-tight tracking-tight md:text-xl">{t.name}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 transition-colors group-hover:bg-gold group-hover:text-on-gold">
                      <Icon icon={ArrowRight01Icon} size={16} />
                    </span>
                  </span>
                  <span className="mt-1 hidden text-sm leading-snug text-ink-2 md:block">{t.blurb}</span>
                  <span className="mt-auto pt-3 text-sm text-ink-3">{t.products.length} products</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Popular products */}
      <HorizontalShelf
        header={
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Popular products</h2>
            <Link href="/products-and-services" className="hidden items-center gap-1.5 font-semibold sm:inline-flex">
              View all {productCount}
              <Icon icon={ArrowRight01Icon} size={18} />
            </Link>
          </div>
        }
      >
        {featured.map((p) => (
          <div key={p.slug} className="w-[72%] shrink-0 snap-start sm:w-[42%] md:w-[30%] lg:w-[19rem]">
            <ProductCard product={p} sizes="(min-width: 1024px) 19rem, 72vw" />
          </div>
        ))}
      </HorizontalShelf>

      {/* Industries */}
      <section aria-label="Industries we serve" className="marquee overflow-hidden border-y border-line py-3 md:py-4">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1} className="flex items-center">
              {industryPages.map((ind) => (
                <li key={ind.slug} className="flex items-center whitespace-nowrap text-lg font-semibold tracking-tight text-ink md:text-2xl">
                  <Link href={`/industry/${ind.slug}`} tabIndex={dup === 1 ? -1 : undefined} className="px-4 hover:underline md:px-6">
                    {ind.name}
                  </Link>
                  <span className="block size-2 rotate-45 rounded-[1px] bg-gold md:size-2.5" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="shell grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">

        {/* Left — image with overlaid badges */}
        <div className="relative order-2 lg:order-1">
          {/* Main image with overlaid badges */}
          <div className="overflow-hidden rounded-[var(--radius-surface)] hairline">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/company/warehouse.webp"
                alt="Sampratiti Exim chemical storage facility, Ahmedabad"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              {/* Floating info cards — inside overflow-hidden so they stay within image */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <div className="rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
                  <p className="text-[11px] font-medium text-gray-500">Our Warehouse</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">Kathwada, Ahmedabad</p>
                </div>
                <div className="rounded-xl bg-gold px-4 py-3 shadow-lg text-on-gold">
                  <p className="text-[11px] font-medium opacity-75">Est.</p>
                  <p className="mt-0.5 text-sm font-bold">{company.established}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat strip below image */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { v: `${productCount}+`, label: "Products" },
              { v: `${industryPages.length}`, label: "Industries" },
              { v: "Pan-India", label: "Delivery" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface px-3 py-4 text-center hairline">
                <p className="text-xl font-bold tracking-tight md:text-2xl">{s.v}</p>
                <p className="mt-0.5 text-xs text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — copy */}
        <div className="order-1 lg:order-2">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-gold uppercase">
            <span className="h-px w-8 bg-gold shrink-0" />
            Ahmedabad, Gujarat · Since {company.established}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            A trusted sourcing partner since {company.established}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            {welcomeParagraphs[0]}
          </p>
          <p className="mt-4 leading-relaxed text-ink-2">
            All materials are sourced from established manufacturers and supplied with COA and MSDS documentation.
          </p>

          {/* Registration info */}
          <div className="mt-8 grid gap-2 rounded-[var(--radius-surface)] bg-surface p-3 hairline sm:grid-cols-2">
            {company.registrations
              .filter((r) => r.label === "GST No." || r.label === "CIN No.")
              .map((r) => (
                <CopyValue key={r.label} label={r.label} value={r.value} className="rounded-xl p-2.5 hover:bg-surface-2" />
              ))}
          </div>

          <Link href="/profile" className="mt-6 inline-flex items-center gap-1.5 font-semibold">
            Company introduction
            <Icon icon={ArrowRight01Icon} size={18} />
          </Link>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-surface-2/60 py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Why choose Sampratiti Exim</h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-2">{advantageIntro}</p>
            <figure className="mt-8 border-l-2 border-gold pl-5">
              <blockquote className="max-w-[48ch] leading-relaxed text-ink-2">{mission.split(". ")[0]}.</blockquote>
              <figcaption className="mt-2 text-sm font-semibold">Our mission</figcaption>
            </figure>
            <div className="mt-8 hidden lg:block">
              <InquiryButton />
            </div>
          </div>
          <AdvantageList items={advantages} />
        </div>
      </section>

      {/* FAQ */}
      <section className="shell pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <Faq id="faq" title="Frequently asked questions" items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
