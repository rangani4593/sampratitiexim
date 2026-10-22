import {
  CheckmarkBadge02Icon, GlobalIcon, Package01Icon, StarIcon,
  ShieldCheckIcon, LocationIcon, TruckIcon, CustomerService01Icon, Award01Icon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { advantageIntro, advantageOutro, advantages, company, ratings } from "@/data/company";
import { industryPages } from "@/data/industries";
import { productCount } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Our Advantage",
  description: advantageIntro,
  alternates: { canonical: "/our-advantage" },
};

const ICONS = [
  CheckmarkBadge02Icon, Package01Icon, ShieldCheckIcon, StarIcon,
  Award01Icon, LocationIcon, GlobalIcon, CustomerService01Icon, TruckIcon,
];

export default function AdvantagePage() {
  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-8 pb-6 pt-5 md:pt-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Breadcrumbs items={[{ href: "/profile", label: "Company" }, { label: "Our Advantage" }]} />
          <h1 className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:mt-8 md:text-6xl">
            Why choose<br />Sampratiti Exim
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-2">{advantageIntro}</p>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-surface)] hairline">
          <div className="relative aspect-[16/9]">
            <Image
              src="/images/company/advantage-partners.webp"
              alt="Sampratiti Exim — reliable chemical supply"
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

      {/* Stats */}
      <section className="shell pb-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-surface)] bg-line md:grid-cols-4">
          {[
            { k: "Products", v: `${productCount}+` },
            { k: "Years Active", v: `${company.yearsInBusiness}+` },
            { k: "Industries", v: `${industryPages.length}` },
            { k: "Happy Customers", v: `${ratings.count}+` },
          ].map((s) => (
            <div key={s.k} className="bg-surface p-5 text-center md:p-6">
              <dd className="text-3xl font-bold tracking-tight md:text-4xl">{s.v}</dd>
              <dt className="mt-1 text-sm text-ink-3">{s.k}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Intro blurb */}
      <section className="shell pb-4">
        <p className="max-w-[60ch] text-lg leading-relaxed text-ink-2">{advantageOutro}</p>
      </section>

      {/* Advantages — 3-col grid */}
      <section className="shell pb-20 pt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <div key={a.key} className="flex gap-4 rounded-[var(--radius-surface)] bg-surface p-5 hairline">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                <Icon icon={ICONS[i % ICONS.length]} size={20} />
              </span>
              <div>
                <p className="font-semibold leading-tight">{a.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
