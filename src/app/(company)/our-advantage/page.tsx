import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { AdvantageList } from "@/components/home/AdvantageList";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { advantageIntro, advantageOutro, advantages } from "@/data/company";

export const metadata: Metadata = {
  title: "Our Advantage",
  description: advantageIntro,
  alternates: { canonical: "/our-advantage" },
};

export default function AdvantagePage() {
  return (
    <>
      <PageIntro title="Why choose Sampratiti Exim" lead={advantageIntro} crumbs={[{ href: "/profile", label: "Company" }, { label: "Our Advantage" }]} />
      <section className="shell grid gap-10 pb-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <p className="max-w-[44ch] text-lg leading-relaxed text-ink-2">{advantageOutro}</p>
          <div className="mt-6">
            <InquiryButton />
          </div>
        </div>
        <AdvantageList items={advantages} />
      </section>
    </>
  );
}
