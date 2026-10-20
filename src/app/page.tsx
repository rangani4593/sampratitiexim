import { ArrowRight01Icon, StarIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { AdvantageList } from "@/components/home/AdvantageList";
import { CertificateFan } from "@/components/home/CertificateFan";
import { HorizontalShelf } from "@/components/home/HorizontalShelf";
import { ProductDeck, type DeckSlide } from "@/components/home/ProductDeck";
import { ProductCard } from "@/components/product/ProductCard";
import { CopyValue } from "@/components/ui/CopyValue";
import { Icon } from "@/components/ui/Icon";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { advantageIntro, advantages, company, mission, ratings, reviews, welcomeParagraphs } from "@/data/company";
import { industryPages } from "@/data/industries";
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
  const quotes = reviews.filter((r) => r.text && r.text.length > 20);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: "https://www.sampratitiexim.in",
    logo: "https://www.sampratitiexim.in/icon.png",
    foundingDate: company.established,
    telephone: "+91-95580-86593",
    address: { "@type": "PostalAddress", streetAddress: company.address.lines.slice(0, 3).join(", "), addressLocality: "Ahmedabad", postalCode: "382430", addressRegion: "Gujarat", addressCountry: "IN" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: ratings.average, reviewCount: ratings.count, bestRating: 5 },
  };

  return (
    <>
      <JsonLd data={orgLd} />

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
            { k: "Products", v: String(productCount), d: `in ${productTypes.length} groups` },
            { k: "Industries", v: String(industryPages.length), d: "food, beverage and nutrition" },
            { k: "Buyer rating", v: `${ratings.average}/5`, d: `from ${ratings.count} reviews` },
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
      <section aria-label="Industries we serve" className="marquee overflow-hidden border-y border-line py-6 md:py-8">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1} className="flex items-center">
              {industryPages.map((ind) => (
                <li key={ind.slug} className="flex items-center whitespace-nowrap text-3xl font-semibold tracking-tight text-ink md:text-6xl">
                  <Link href={`/industry/${ind.slug}`} tabIndex={dup === 1 ? -1 : undefined} className="px-5 hover:underline md:px-8">
                    {ind.name}
                  </Link>
                  <span className="block size-2.5 rotate-45 rounded-[2px] bg-gold md:size-3.5" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* About and certificates */}
      <section className="shell grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">A trusted sourcing partner since {company.established}</h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink-2">{welcomeParagraphs[0]}</p>
          <p className="mt-4 max-w-[56ch] leading-relaxed text-ink-2">
            Imported materials are sourced from established manufacturers and supplied with applicable product documentation such as COA and MSDS.
          </p>
          <div className="mt-8 grid gap-2 rounded-[var(--radius-surface)] bg-surface p-3 hairline sm:grid-cols-2">
            {company.registrations.slice(0, 4).map((r) => (
              <CopyValue key={r.label} label={r.label} value={r.value} className="rounded-xl p-2.5 hover:bg-surface-2" />
            ))}
          </div>
          <Link href="/profile" className="mt-6 inline-flex items-center gap-1.5 font-semibold">
            Company introduction
            <Icon icon={ArrowRight01Icon} size={18} />
          </Link>
        </Reveal>
        <CertificateFan
          certs={[
            { src: "/images/company/iso-certificate.jpg", title: "ISO certification" },
            { src: company.fssai.image, title: `FSSAI, valid to ${company.fssai.validUpto}` },
            { src: "/images/company/iso-certificate-2.jpg", title: "ISO certificate" },
          ]}
        />
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

      {/* Reviews */}
      <section className="py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Ratings &amp; reviews</h2>
            <div className="mt-8 flex items-end gap-4">
              <p className="text-7xl font-semibold leading-none tracking-tighter">{ratings.average}</p>
              <div className="pb-1">
                <div className="flex gap-0.5 text-gold" aria-label={`${ratings.average} out of 5 stars`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Icon key={i} icon={StarIcon} size={20} fill="currentColor" strokeWidth={0} className={i === 4 ? "opacity-50" : ""} />
                  ))}
                </div>
                <p className="mt-1 text-sm text-ink-2">Reviewed by {ratings.count} buyers</p>
              </div>
            </div>
            <ul className="mt-8 grid max-w-sm gap-2">
              {ratings.distribution.map((d) => (
                <li key={d.stars} className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3 text-sm">
                  <span className="text-ink-2">{d.stars} star</span>
                  <span className="h-1.5 rounded-full bg-gold" style={{ width: `${Math.max(d.pct, 2)}%` }} />
                  <span className="text-right font-mono text-xs text-ink-3">{d.pct}%</span>
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid max-w-sm grid-cols-3 gap-3">
              {ratings.satisfaction.map((s) => (
                <div key={s.label} className="rounded-2xl bg-surface p-3 hairline">
                  <dd className="text-xl font-semibold">{s.pct}%</dd>
                  <dt className="text-xs text-ink-3">{s.label}</dt>
                </div>
              ))}
            </dl>
            <Link href="/testimonial" className="mt-8 inline-flex items-center gap-1.5 font-semibold">
              Read all reviews
              <Icon icon={ArrowRight01Icon} size={18} />
            </Link>
          </Reveal>
          <div className="no-scrollbar -mx-4 flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0">
            {quotes.map((r) => (
              <figure key={r.name} className="flex w-[82%] shrink-0 snap-start flex-col rounded-[var(--radius-surface)] bg-surface p-5 hairline sm:w-[60%] lg:w-auto">
                <span className="font-mono text-3xl leading-none text-gold" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-1 line-clamp-4 leading-relaxed text-ink">{r.text}</blockquote>
                <figcaption className="mt-auto pt-5 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="block text-ink-3">
                    {r.place}
                    {r.product ? `, bought ${r.product}` : ""}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
