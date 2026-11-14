import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { company } from "@/data/company";
import { legalUpdated, privacySections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.shortName} collects, uses, shares and protects the details you send through this website, and the rights you have over them.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageIntro
        title="Privacy Policy"
        lead="What we collect when you send us an inquiry, why we collect it, who it reaches and what you can ask us to do with it."
      />
      <LegalDoc updated={legalUpdated} sections={privacySections} />
    </>
  );
}
