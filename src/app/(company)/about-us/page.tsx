import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { aboutParagraphs, customerApproach, industries, mission, welcomeParagraphs } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutParagraphs[0].slice(0, 158),
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro title="About Us" lead={aboutParagraphs[0]} crumbs={[{ href: "/profile", label: "Company" }, { label: "About Us" }]} />

      <section className="shell pb-16">
        <div className="prose-spec max-w-3xl">
          {aboutParagraphs.slice(1).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="bg-brand py-16 text-on-brand md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-sm font-semibold text-gold">Our mission</h2>
            <p className="mt-4 text-2xl font-medium leading-snug tracking-tight md:text-3xl">{mission}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-sm font-semibold text-gold">Customer-centric approach</h2>
            <p className="mt-4 leading-relaxed text-on-brand/80 md:text-lg">{customerApproach}</p>
          </Reveal>
        </div>
      </section>

      <section className="shell grid gap-10 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Welcome to Sampratiti Exim</h2>
        <div className="prose-spec">
          {welcomeParagraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="shell pb-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Industries we serve</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {industries.map((i) => (
            <li key={i} className="rounded-full bg-surface px-4 py-2 font-medium hairline">
              {i}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
