import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { AdvantageList } from "@/components/home/AdvantageList";
import { advantageIntro, advantageOutro, advantages, company } from "@/data/company";

export const metadata: Metadata = {
  title: "Custom Profile",
  description: "Key facts of Sampratiti Exim Pvt. Ltd.: year of establishment, import and export share, turnover and why buyers choose us.",
  alternates: { canonical: "/company-insights" },
};

const KEY = ["Nature of business", "Year of establishment", "Import percentage", "Export percentage", "Annual turnover", "Number of employees"];

export default function InsightsPage() {
  const facts = KEY.map((k) => company.facts.find((f) => f.label === k)).filter((f) => f !== undefined);
  return (
    <>
      <PageIntro title="Key facts of Sampratiti Exim" lead={advantageIntro} crumbs={[{ href: "/profile", label: "Company" }, { label: "Custom Profile" }]} />
      <section className="shell pb-14">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-surface)] bg-line md:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="bg-surface p-5 md:p-7">
              <dt className="text-sm text-ink-3">{f.label}</dt>
              <dd className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="shell grid gap-10 pb-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Our advantage</h2>
          <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-ink-2">{advantageOutro}</p>
        </div>
        <AdvantageList items={advantages} />
      </section>
    </>
  );
}
