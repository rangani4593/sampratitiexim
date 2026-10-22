import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { WhyChoose } from "@/components/home/WhyChoose";
import { HorizontalShelf } from "@/components/home/HorizontalShelf";
import { ProductDeck, type DeckSlide } from "@/components/home/ProductDeck";
import { ProductCard } from "@/components/product/ProductCard";
import { CopyValue } from "@/components/ui/CopyValue";
import { Icon } from "@/components/ui/Icon";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { Faq } from "@/components/ui/Faq";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { advantageIntro, advantages, company, ratings, welcomeParagraphs } from "@/data/company";
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
            Food, pharma and industrial chemicals, imported and supplied in bulk across India with COA and MSDS support.
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
        <Reveal>
          <dl className="relative grid grid-cols-2 overflow-hidden rounded-[var(--radius-surface)] bg-surface hairline md:grid-cols-4">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            {[
              { k: "Satisfied Customers", v: `${ratings.count}+`, d: "verified buyers across India" },
              { k: "Industries Served", v: String(industryPages.length), d: "food, pharma and industrial" },
              { k: "Years in Business", v: `${company.yearsInBusiness}+`, d: `since ${company.established}` },
              { k: "Products", v: `${productCount}+`, d: `across ${productTypes.length} product groups` },
            ].map((s, i) => (
              <div
                key={s.k}
                className={`flex flex-col p-5 md:p-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
              >
                <dt className="order-2 mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-3">{s.k}</dt>
                <dd className="order-1 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                  <CountUp value={s.v} />
                </dd>
                <dd className="order-3 mt-1 text-sm text-ink-2">{s.d}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Product groups */}
      <section className="shell py-20 md:py-28">
        <SectionHeading
          eyebrow="What we supply"
          title="Product range"
          intro={`${productCount} ingredients and chemicals for food, pharma, agriculture and industry, sourced from established manufacturers.`}
        />
        <RevealGroup className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:gap-4 lg:grid-cols-3">
          {productTypes.map((t, i) => {
            const big = i === 0;
            // 5 small cards leave an orphan in the 2-column layout, so the last one spans full width below lg.
            const wideLast = i === productTypes.length - 1 && (productTypes.length - 1) % 2 === 1;
            const span = big ? "col-span-2 lg:row-span-2" : wideLast ? "col-span-2 lg:col-span-1" : "";
            const aspect = big ? "aspect-[16/10] lg:aspect-auto" : wideLast ? "aspect-[16/9] lg:aspect-[4/3]" : "aspect-[4/5] sm:aspect-[4/3]";
            return (
              <RevealItem key={t.slug} className={span}>
                <Link
                  href={`/products-and-services#${t.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[var(--radius-surface)] bg-surface-2 hairline active:scale-[0.985] ${aspect}`}
                >
                  <Image
                    src={t.cover}
                    alt={t.name}
                    fill
                    sizes={big ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-6">
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold">{t.products.length} products</span>
                      <span className={`mt-1 block font-semibold leading-tight tracking-tight text-white ${big ? "text-2xl md:text-4xl" : "text-[1.05rem] md:text-xl"}`}>{t.name}</span>
                      <span
                        className={`mt-2 max-w-[44ch] text-sm leading-snug text-white/75 ${big ? "hidden sm:block md:text-base" : "hidden md:block md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-16 md:group-hover:opacity-100"}`}
                      >
                        {t.blurb}
                      </span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-gold group-hover:text-on-gold group-hover:-rotate-45">
                      <Icon icon={ArrowRight01Icon} size={18} />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* Popular products */}
      <HorizontalShelf
        header={
          <SectionHeading
            eyebrow="Most requested"
            title="Popular products"
            action={
              <Link href="/products-and-services" className="btn btn-ghost w-fit px-5">
                View all {productCount}
                <Icon icon={ArrowRight01Icon} size={18} />
              </Link>
            }
          />
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
                src="/images/company/home-about.webp"
                alt="Container cranes and cargo ship at a port terminal"
                fill
                quality={90}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              {/* Floating info cards — inside overflow-hidden so they stay within image */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <div className="rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
                  <p className="text-[11px] font-medium text-gray-500">Warehouses</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">{company.warehouses.map((w) => w.region).join(" · ")}</p>
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
              { v: String(company.warehouses.flatMap((w) => w.places).length), label: "Warehouses" },
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

      <WhyChoose intro={advantageIntro} items={advantages} />

      {/* FAQ */}
      <section className="shell py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Faq id="faq" eyebrow="Good to know" title="Frequently asked questions" items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
