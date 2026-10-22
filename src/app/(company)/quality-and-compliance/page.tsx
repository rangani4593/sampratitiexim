import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { company, qualityParagraphs } from "@/data/company";

export const metadata: Metadata = {
  title: "Quality & Compliance",
  description: qualityParagraphs[0].slice(0, 158),
  alternates: { canonical: "/quality-and-compliance" },
};

export default function QualityPage() {
  return (
    <>
      <PageIntro title="Quality Assurance" lead={qualityParagraphs[0]} crumbs={[{ href: "/profile", label: "Company" }, { label: "Quality" }]} />

      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="prose-spec">
          {qualityParagraphs.slice(1).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <aside className="rounded-[var(--radius-surface)] bg-surface p-5 hairline md:p-7">
          <h2 className="text-xl font-semibold tracking-tight">FSSAI licence</h2>
          <dl className="mt-5 grid gap-4">
            {[
              ["Licence number", company.fssai.number],
              ["Issued on", company.fssai.issued],
              ["Valid up to", company.fssai.validUpto],
              ["Kind of business", company.fssai.kind],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-ink-3">{k}</dt>
                <dd className={`mt-0.5 font-medium ${/number/.test(k) ? "font-mono" : ""}`}>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>
    </>
  );
}
