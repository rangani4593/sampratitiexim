import { Download04Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { Icon } from "@/components/ui/Icon";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { company, profileParagraphs } from "@/data/company";

export const metadata: Metadata = {
  title: "Introduction & Company Profile",
  description: "Sampratiti Exim Pvt. Ltd. factsheet: established 2022 in Ahmedabad, GST 24ABJCS3281Q1ZP, IEC ABJCS3281Q, importer, exporter, wholesaler and supplier of chemicals.",
  alternates: { canonical: "/profile" },
};

export default function ProfilePage() {
  return (
    <>
      <PageIntro title="Introduction" lead={company.tagline} crumbs={[{ href: "/profile", label: "Company" }, { label: "Introduction" }]} />

      <section className="shell pb-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Company profile</h2>
          <div className="prose-spec mt-5">
            {profileParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <InquiryButton />
            <a href={company.catalogue.href} download className="btn btn-ghost">
              <Icon icon={Download04Icon} size={18} />
              Catalogue PDF ({company.catalogue.size})
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
