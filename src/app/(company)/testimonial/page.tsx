import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Customer testimonials for Sampratiti Exim Pvt. Ltd., chemical importer and bulk supplier from Ahmedabad.",
  alternates: { canonical: "/testimonial" },
};

export default function TestimonialPage() {
  return (
    <>
      <PageIntro title="Testimonials" crumbs={[{ href: "/profile", label: "Company" }, { label: "Testimonial" }]} />
      <section className="shell pb-20">
        <p className="text-ink-2">Testimonials coming soon.</p>
      </section>
    </>
  );
}
