import { CheckmarkBadge02Icon, GlobalIcon, Package01Icon, StarIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CopyValue } from "@/components/ui/CopyValue";
import { Icon } from "@/components/ui/Icon";
import { advantageIntro, advantages, company, ratings } from "@/data/company";
import { industryPages } from "@/data/industries";
import { productCount } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Custom Profile",
  description: "Key facts of Sampratiti Exim Pvt. Ltd.: year of establishment, import and export share, turnover and why buyers choose us.",
  alternates: { canonical: "/company-insights" },
};

const ADVANTAGE_ICONS = [
  CheckmarkBadge02Icon, Package01Icon, GlobalIcon, StarIcon,
  CheckmarkBadge02Icon, GlobalIcon, Package01Icon, StarIcon, CheckmarkBadge02Icon,
];

export default function InsightsPage() {
  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-8 pb-8 pt-5 md:pt-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Breadcrumbs items={[{ href: "/profile", label: "Company" }, { label: "Custom Profile" }]} />
          <h1 className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:mt-8 md:text-6xl">
            Key facts of<br />Sampratiti Exim
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-2">{advantageIntro}</p>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-surface)] hairline">
          <div className="relative aspect-[16/9]">
            <Image
              src="/images/company/port-terminal.webp"
              alt="Sampratiti Exim — global chemical logistics"
              fill
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
      <section className="shell pb-10">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-surface)] bg-line md:grid-cols-4">
          {[
            { k: "Products", v: `${productCount}+` },
            { k: "Years Active", v: `${company.yearsInBusiness}+` },
            { k: "Industries", v: `${industryPages.length}` },
            { k: "Happy Customers", v: `${ratings.count}+` },
          ].map((s) => (
            <div key={s.k} className="bg-surface p-5 text-center md:p-7">
              <dd className="text-3xl font-bold tracking-tight md:text-4xl">{s.v}</dd>
              <dt className="mt-1 text-sm text-ink-3">{s.k}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Key facts table */}
      <section className="shell pb-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Company facts</h2>
        <div className="overflow-hidden rounded-[var(--radius-surface)] hairline">
          <dl className="divide-y divide-line">
            {company.facts.map((f, i) => (
              <div key={f.label} className={`grid gap-2 px-5 py-4 sm:grid-cols-[1fr_1.4fr] ${i % 2 === 0 ? "bg-surface" : "bg-surface-2/40"}`}>
                <dt className="text-sm font-semibold text-ink-3">{f.label}</dt>
                <dd className="text-sm font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Registrations */}
      <section className="shell pb-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Registrations &amp; licences</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {company.registrations.map((r) => (
            <div key={r.label} className="rounded-[var(--radius-surface)] bg-surface p-4 hairline">
              <CopyValue label={r.label} value={r.value} className="rounded-xl p-2 hover:bg-surface-2" />
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="shell pb-20">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">Our advantages</h2>
        <p className="mb-8 max-w-[52ch] text-ink-2">Why manufacturers, distributors and industrial buyers choose Sampratiti Exim.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <div key={a.key} className="flex gap-4 rounded-[var(--radius-surface)] bg-surface p-5 hairline">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                <Icon icon={ADVANTAGE_ICONS[i % ADVANTAGE_ICONS.length]} size={20} />
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
