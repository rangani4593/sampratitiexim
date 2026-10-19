import { Download04Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { PhotoGrid } from "@/components/company/PhotoGrid";
import { CopyValue } from "@/components/ui/CopyValue";
import { Icon } from "@/components/ui/Icon";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { company, companyPhotos, profileParagraphs } from "@/data/company";

export const metadata: Metadata = {
  title: "Introduction & Company Profile",
  description: "Sampratiti Exim Pvt. Ltd. factsheet: established 2022 in Ahmedabad, GST 24ABJCS3281Q1ZP, IEC ABJCS3281Q, importer, exporter, wholesaler and supplier of chemicals.",
  alternates: { canonical: "/profile" },
};

export default function ProfilePage() {
  return (
    <>
      <PageIntro title="Introduction" lead={company.tagline} crumbs={[{ href: "/profile", label: "Company" }, { label: "Introduction" }]} />

      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Company profile</h2>
          <div className="prose-spec mt-5">
            {profileParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButton />
            <a href={company.catalogue.href} download className="btn btn-ghost">
              <Icon icon={Download04Icon} size={18} />
              Catalogue PDF ({company.catalogue.size})
            </a>
          </div>
        </div>

        <div className="rounded-[var(--radius-surface)] bg-surface p-5 hairline md:p-7">
          <h2 className="text-xl font-semibold tracking-tight">Factsheet</h2>
          <p className="mt-1 text-sm text-ink-3">Basic information</p>
          <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {company.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs text-ink-3">{f.label}</dt>
                <dd className="mt-0.5 font-medium">{f.value}</dd>
              </div>
            ))}
            <div className="sm:col-span-2">
              <dt className="text-xs text-ink-3">Registered address</dt>
              <dd className="mt-0.5 font-medium">{company.registeredAddress}</dd>
            </div>
          </dl>
          <p className="mt-8 text-sm text-ink-3">Statutory profile</p>
          <div className="mt-3 grid gap-1 rounded-2xl bg-surface-2/60 p-2">
            {company.registrations.map((r) => (
              <CopyValue key={r.label} label={r.label} value={r.value} className="rounded-xl p-2.5 hover:bg-surface" />
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="shell scroll-mt-36 border-t border-line py-14 md:py-20">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">Warehouse, infrastructure and certificates</h2>
        <PhotoGrid photos={companyPhotos} />
      </section>
    </>
  );
}
