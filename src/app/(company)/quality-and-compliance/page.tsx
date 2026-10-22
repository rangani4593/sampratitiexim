import { CheckmarkCircle02Icon, DeliveryTruck01Icon, File01Icon, QuoteDownIcon, SearchList01Icon, UserCheck01Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CopyValue } from "@/components/ui/CopyValue";
import { Icon } from "@/components/ui/Icon";
import { company, qualityParagraphs } from "@/data/company";

export const metadata: Metadata = {
  title: "Quality & Compliance",
  description: qualityParagraphs[0].slice(0, 158),
  alternates: { canonical: "/quality-and-compliance" },
};

const STEPS = [
  { icon: UserCheck01Icon, title: "Supplier selection", body: "Products sourced only from reputed domestic and international manufacturers." },
  { icon: SearchList01Icon, title: "Specification check", body: "Product specifications verified against customer and application requirements." },
  { icon: File01Icon, title: "Batch documentation", body: "COA, MSDS and technical documents reviewed batch-wise and shared with buyers." },
  { icon: DeliveryTruck01Icon, title: "Pre-dispatch check", body: "Packaging, handling and storage checked before every dispatch." },
] as const;

const DOCUMENTS = [
  { title: "COA", body: "Certificate of Analysis for the supplied batch" },
  { title: "MSDS", body: "Material Safety Data Sheet for safe handling" },
  { title: "Technical documents", body: "Specifications and data sheets where applicable" },
  { title: "Manufacturer details", body: "Source information for imported chemicals" },
] as const;

export default function QualityPage() {
  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-8 pb-10 pt-5 md:pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <Breadcrumbs items={[{ href: "/profile", label: "Company" }, { label: "Quality" }]} />
          <h1 className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:mt-8 md:text-6xl">Quality Assurance</h1>
          <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-ink-2">{qualityParagraphs[0]}</p>
        </div>

        <aside className="rounded-[var(--radius-surface)] bg-surface p-5 hairline md:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">FSSAI licence</p>
          <CopyValue label="Licence number" value={company.fssai.number} className="-mx-2 mt-3 rounded-xl p-2 hover:bg-surface-2" />
          <dl className="mt-4 grid gap-4 border-t border-line pt-4 text-sm sm:grid-cols-2">
            {[
              ["Issued on", company.fssai.issued],
              ["Valid up to", company.fssai.validUpto],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-ink-3">{k}</dt>
                <dd className="mt-0.5 font-medium">{v}</dd>
              </div>
            ))}
            <div className="sm:col-span-2">
              <dt className="text-xs text-ink-3">Kind of business</dt>
              <dd className="mt-0.5 font-medium">{company.fssai.kind}</dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* Process */}
      <section className="shell pb-14">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Our quality process</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-4 rounded-[var(--radius-surface)] bg-surface p-5 hairline">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft text-gold">
                  <Icon icon={s.icon} size={20} />
                </span>
                <span className="font-mono text-sm text-ink-3">0{i + 1}</span>
              </div>
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Body — two columns aligned with hero */}
      <section className="shell grid items-start gap-10 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How we assure quality</h2>
          <div className="prose-spec mt-5">
            {qualityParagraphs.slice(1, -1).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-40">
          <div className="rounded-[var(--radius-surface)] bg-surface p-5 hairline md:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">With every order</p>
            <ul className="mt-4 divide-y divide-line">
              {DOCUMENTS.map((d) => (
                <li key={d.title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="mt-0.5 text-gold">
                    <Icon icon={CheckmarkCircle02Icon} size={20} />
                  </span>
                  <div>
                    <p className="font-semibold">{d.title}</p>
                    <p className="text-sm text-ink-3">{d.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <figure className="rounded-[var(--radius-surface)] border-l-2 border-gold bg-surface p-5 hairline md:p-7">
            <span className="text-gold">
              <Icon icon={QuoteDownIcon} size={22} />
            </span>
            <blockquote className="mt-3 text-lg font-medium leading-snug tracking-tight">{qualityParagraphs[qualityParagraphs.length - 1]}</blockquote>
            <figcaption className="mt-3 text-sm text-ink-3">Our commitment</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
