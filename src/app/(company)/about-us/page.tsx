import { CheckmarkBadge02Icon, GlobalIcon, Package01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { aboutParagraphs, customerApproach, industries, mission, welcomeParagraphs, company } from "@/data/company";
import { industryPages } from "@/data/industries";
import { productCount } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutParagraphs[0].slice(0, 158),
  alternates: { canonical: "/about-us" },
};

const PILLARS = [
  { icon: CheckmarkBadge02Icon, title: "Quality First", body: "Every product sourced with COA and MSDS documentation, from verified manufacturers." },
  { icon: Package01Icon, title: "Bulk Supply", body: "Consistent bulk supply capability for manufacturers, distributors and industrial users." },
  { icon: GlobalIcon, title: "Pan-India Reach", body: "Order coordination, storage and dispatch from our Gujarat and Maharashtra warehouses." },
  { icon: UserGroupIcon, title: "Long-Term Partnerships", body: "Transparent commercial practices and dedicated support to build lasting relationships." },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-8 pb-6 pt-5 md:pt-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Breadcrumbs items={[{ href: "/profile", label: "Company" }, { label: "About Us" }]} />
          <h1 className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:mt-8 md:text-6xl">About Us</h1>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-2">{aboutParagraphs[0]}</p>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-surface)] hairline">
          <div className="relative aspect-[16/9]">
            <Image
              src="/images/company/about-chemist.webp"
              alt="Sampratiti Exim — chemical import and supply"
              fill
              quality={90}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Est. {company.established}</p>
              <p className="mt-0.5 text-sm font-bold text-white">Ahmedabad, Gujarat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="shell pb-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-surface)] bg-line md:grid-cols-4">
          {[
            { k: "Products", v: `${productCount}+` },
            { k: "Years Active", v: `${company.yearsInBusiness}+` },
            { k: "Industries", v: `${industryPages.length}` },
            { k: "Delivery", v: "Pan-India" },
          ].map((s) => (
            <div key={s.k} className="bg-surface p-5 text-center md:p-6">
              <dd className="text-3xl font-bold tracking-tight md:text-4xl">{s.v}</dd>
              <dt className="mt-1 text-sm text-ink-3">{s.k}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Who we are — text left, pillars right (aligned with hero columns) */}
      <section className="shell grid items-start gap-10 pb-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
            <span className="h-px w-8 shrink-0 bg-gold" />
            Who we are
          </p>
          <div className="prose-spec mt-5">
            {aboutParagraphs.slice(1, -1).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-40">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What sets us apart</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.title} className="group flex flex-col gap-4 rounded-[var(--radius-surface)] bg-surface p-5 transition duration-300 hairline hover:-translate-y-1 hover:bg-surface-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft text-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon icon={p.icon} size={20} />
                </span>
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Approach */}
      <section className="bg-brand py-14 text-on-brand md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Our mission</p>
            <p className="mt-4 text-xl font-medium leading-snug tracking-tight md:text-2xl">{mission}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Customer-centric approach</p>
            <p className="mt-4 leading-relaxed text-on-brand/80 md:text-lg">{customerApproach}</p>
          </div>
        </div>
      </section>

      {/* Welcome — sticky heading + industries left, story right */}
      <section className="shell grid items-start gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-40">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Welcome to Sampratiti Exim</h2>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-gold">Industries we serve</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {industries.map((i) => (
              <li key={i} className="rounded-full bg-surface px-4 py-2 text-sm font-medium transition-colors hairline hover:bg-gold hover:text-on-gold">
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="prose-spec">
          {welcomeParagraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}
