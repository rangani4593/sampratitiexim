import { Call02Icon, Location01Icon, WarehouseIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { Icon } from "@/components/ui/Icon";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${company.name}, Ahmedabad. Call ${company.phoneDisplay} or send an enquiry for the best price on food, pharma and industrial chemicals.`,
  alternates: { canonical: "/enquiry" },
};

export default function EnquiryPage() {
  const phone = { display: company.phoneDisplay, href: company.phoneHref };
  return (
    <>
      <PageIntro title="Contact Us" lead="Tell us your requirement. We reply with price, availability and dispatch time." />
      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="rounded-[var(--radius-surface)] bg-surface p-5 hairline md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Send an enquiry</h2>
          <p className="mt-1 text-ink-2">Mobile number, name and requirement are needed.</p>
          <div className="mt-6">
            <EnquiryForm phone={phone} />
          </div>
        </div>

        <div className="grid content-start gap-4">
          <div className="grid gap-3 rounded-[var(--radius-surface)] bg-brand p-6 text-on-brand">
            <div className="grid gap-2 sm:grid-cols-2">
              <a href={company.phoneHref} className="btn btn-gold">
                <Icon icon={Call02Icon} size={18} />
                {company.phoneDisplay}
              </a>
              <a href={company.altPhoneHref} className="btn btn-on-brand">
                <Icon icon={Call02Icon} size={18} />
                {company.altPhoneDisplay}
              </a>
            </div>
            <a href={`mailto:${company.email}`} className="text-sm font-semibold text-on-brand underline underline-offset-4">
              {company.email}
            </a>
          </div>

          <div className="rounded-[var(--radius-surface)] bg-surface p-5 hairline">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Icon icon={Location01Icon} size={18} /> {company.office.label}
            </p>
            <address className="mt-2 not-italic leading-relaxed text-ink-2">
              {company.name}
              {company.office.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <a href={company.office.mapHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold underline underline-offset-4">
              Get directions
            </a>
          </div>

          <div className="rounded-[var(--radius-surface)] bg-surface p-5 hairline">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Icon icon={WarehouseIcon} size={18} /> Warehouses
            </p>
            <dl className="mt-2 grid gap-1 leading-relaxed text-ink-2">
              {company.warehouses.map((w) => (
                <div key={w.region}>
                  <dt className="inline font-semibold text-ink">{w.region}: </dt>
                  <dd className="inline">{w.places.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-surface)] hairline">
            <iframe
              title="Sampratiti Exim office location on Google Maps"
              src="https://maps.google.com/maps?q=23.03899,72.69154&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[4/3] w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
