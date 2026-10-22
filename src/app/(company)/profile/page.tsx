import { ArrowRight01Icon, Building01Icon, Calendar01Icon, CheckmarkBadge02Icon, GlobalIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { CopyValue } from "@/components/ui/CopyValue";
import { Icon } from "@/components/ui/Icon";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { company, profileParagraphs } from "@/data/company";
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
      <PageIntro title="Introduction" lead={company.tagline} crumbs={[{ href: "/profile", label: "Company" }, { label: "Introduction" }]} />

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

          {/* Registration numbers */}
          {(gstReg || cinReg) && (
            <div className="mt-6 grid gap-2 rounded-[var(--radius-surface)] bg-surface p-3 hairline sm:grid-cols-2">
              {[gstReg, cinReg].filter(Boolean).map((r) => (
                <CopyValue key={r!.label} label={r!.label} value={r!.value} className="rounded-xl p-2.5 hover:bg-surface-2" />
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <InquiryButton />
            <Link href="/enquiry" className="btn btn-ghost px-5">
              Contact us
              <Icon icon={ArrowRight01Icon} size={16} />
            </Link>
          </div>
        </div>

        {/* Right — visual panel */}
        <div className="sticky top-24 space-y-4">

          {/* Warehouse image */}
          <div className="overflow-hidden rounded-[var(--radius-surface)] hairline">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/company/warehouse.webp"
                alt="Sampratiti Exim chemical storage facility, Ahmedabad"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">Our Warehouse</p>
                <p className="mt-1 text-base font-bold text-white">Kathwada, Ahmedabad</p>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { v: `${productCount}+`, label: "Products" },
              { v: `${new Date().getFullYear() - parseInt(company.established)}+`, label: "Years" },
              { v: "Pan-India", label: "Delivery" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface px-3 py-4 text-center hairline">
                <p className="text-xl font-bold tracking-tight md:text-2xl">{s.v}</p>
                <p className="mt-0.5 text-xs text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Contact person card */}
          <div className="rounded-[var(--radius-surface)] bg-surface p-5 hairline">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Contact person</p>
            <p className="mt-3 text-base font-semibold">{company.contactPerson.name}</p>
            <p className="text-sm text-ink-3">{company.contactPerson.role}</p>
            <a href={company.phoneHref} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">
              {company.phoneDisplay}
            </a>
          </div>
        </div>

      </section>
    </>
  );
}
