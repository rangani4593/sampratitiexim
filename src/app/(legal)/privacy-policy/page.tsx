import type { Metadata } from "next";
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
    <LegalDoc
      title="Privacy Policy"
      lead="What we collect when you send us an inquiry, why we collect it, who it reaches and what you can ask us to do with it."
      updated={legalUpdated}
      sections={privacySections}
    />
  );
}
