import { DeliveryTruck01Icon, File01Icon, SearchList01Icon, UserCheck01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
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

const CERTIFICATES = [
  { src: "/images/company/iso-certificate.jpg", title: "ISO Certification", caption: "ISO certified company" },
  { src: "/images/company/iso-certificate-2.jpg", title: "ISO Certificate", caption: "Quality management" },
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

      {/* Body copy */}
      <section className="shell pb-14">
        <div className="prose-spec max-w-3xl">
          {qualityParagraphs.slice(1).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section className="shell pb-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Certificates</h2>
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          {CERTIFICATES.map((c) => (
            <figure key={c.src} className="rounded-[var(--radius-surface)] bg-surface p-3 hairline">
              <div className="relative aspect-[5/7] overflow-hidden rounded-xl bg-white">
                <Image src={c.src} alt={c.title} fill sizes="(min-width: 640px) 380px, 90vw" className="object-contain" />
              </div>
              <figcaption className="px-1 pb-1 pt-3">
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-ink-3">{c.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
