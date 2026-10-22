import { Building01Icon, Calendar01Icon, CheckmarkBadge02Icon, GlobalIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CopyValue } from "@/components/ui/CopyValue";
import { Icon } from "@/components/ui/Icon";
import { company, profileParagraphs, ratings } from "@/data/company";
import { industryPages } from "@/data/industries";
import { productCount } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Introduction & Company Profile",
  description: "Sampratiti Exim Pvt. Ltd. factsheet: established 2022 in Ahmedabad, GST 24ABJCS3281Q1ZP, IEC ABJCS3281Q, importer, exporter, wholesaler and supplier of chemicals.",
  alternates: { canonical: "/profile" },
};

const HIGHLIGHTS = [
  { icon: Calendar01Icon, label: "Established", value: company.established },
  { icon: Building01Icon, label: "Type", value: "Importer · Exporter · Wholesaler" },
  { icon: GlobalIcon, label: "Supply", value: "Pan-India from Ahmedabad" },
  { icon: CheckmarkBadge02Icon, label: "Documentation", value: "COA & MSDS with every order" },
] as const;

export default function ProfilePage() {
  const gstReg = company.registrations.find((r) => r.label === "GST No.");
  const cinReg = company.registrations.find((r) => r.label === "CIN No.");

  return (
    <>
      {/* Hero — two-column: title left, image right */}
      <section className="shell grid items-center gap-8 pb-6 pt-5 md:pt-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Breadcrumbs items={[{ href: "/profile", label: "Company" }, { label: "Introduction" }]} />
          <h1 className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:mt-8 md:text-6xl">Introduction</h1>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-2">{company.tagline}</p>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-surface)] hairline">
          <div className="relative aspect-[16/9]">
            <Image
              src="/images/company/port-hero.webp"
              alt="Sampratiti Exim — global chemical sourcing and supply"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Est. {company.established}</p>
              <p className="mt-0.5 text-sm font-bold text-white">Ahmedabad, Gujarat</p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid items-start gap-12 pb-20 lg:grid-cols-[1fr_0.9fr] lg:gap-16">

        {/* Left — text content */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Company profile</h2>
          <div className="prose-spec mt-5">
            {profileParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          {/* Highlight grid */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="flex items-start gap-3 rounded-[var(--radius-surface)] bg-surface p-4 hairline">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-soft">
                  <Icon icon={h.icon} size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-ink-3 uppercase tracking-wide">{h.label}</p>
                  <p className="mt-0.5 text-sm font-medium leading-snug">{h.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — stats + registration panel */}
        <div className="sticky top-24 space-y-4">

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: `${productCount}+`, label: "Products" },
              { v: `${company.yearsInBusiness}+`, label: "Years Active" },
              { v: `${industryPages.length}`, label: "Industries" },
              { v: `${ratings.count}+`, label: "Happy Customers" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface px-4 py-5 hairline">
                <p className="text-2xl font-bold tracking-tight">{s.v}</p>
                <p className="mt-0.5 text-xs text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Registration numbers */}
          {(gstReg || cinReg) && (
            <div className="rounded-[var(--radius-surface)] bg-surface p-4 hairline">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">Registration</p>
              <div className="grid gap-2">
                {[gstReg, cinReg].filter(Boolean).map((r) => (
                  <CopyValue key={r!.label} label={r!.label} value={r!.value} className="rounded-xl p-2.5 hover:bg-surface-2" />
                ))}
              </div>
            </div>
          )}

          {/* Address */}
          <div className="rounded-[var(--radius-surface)] bg-surface p-4 hairline">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">Warehouse</p>
            <address className="not-italic text-sm leading-relaxed text-ink-2">
              {company.address.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
          </div>
        </div>

      </section>
    </>
  );
}
