import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { company } from "@/data/company";
import { legalUpdated, termsSections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms on which ${company.shortName} publishes this website, including how product information, quotations and buyer responsibilities are to be read.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Use"
      lead="How to read the product information on this website, what a quotation means, and the law that governs both."
      updated={legalUpdated}
      sections={termsSections}
    />
  );
}
