import { Call02Icon, Download04Icon, Facebook01Icon, Linkedin01Icon, Location01Icon, NewTwitterIcon, UserIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { LogoBadge } from "@/components/brand/Logo";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { Icon } from "@/components/ui/Icon";
import { company, companyTabs } from "@/data/company";
import { categories, families } from "@/lib/catalog";

const shareIcons = { Facebook: Facebook01Icon, X: NewTwitterIcon, LinkedIn: Linkedin01Icon } as const;

export function Footer() {
  const phone = { display: company.phoneDisplay, href: company.phoneHref };
  const topCategories = [...categories].sort((a, b) => b.products.length - a.products.length).slice(0, 10);

  return (
    <footer className="relative isolate overflow-hidden bg-brand text-on-brand">
      <Image
        src="/images/brand/emblem-gold.png"
        alt=""
        width={640}
        height={798}
        className="pointer-events-none absolute -right-24 -top-10 -z-10 w-[26rem] opacity-[0.07] md:w-[40rem]"
      />
      <div className="shell grid gap-12 pb-10 pt-16 md:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div id="contact">
          <h2 className="max-w-[16ch] text-[2rem] font-semibold leading-[1.08] tracking-tight md:text-5xl">Get in touch with us for best deals</h2>
          <p className="mt-4 max-w-[46ch] text-on-brand/75">
            Tell us the product, grade and quantity. {company.contactPerson.name}, {company.contactPerson.role}, replies with price and availability.
          </p>
          <div className="mt-8 max-w-xl">
            <EnquiryForm tone="brand" phone={phone} />
          </div>
        </div>

        <div className="grid content-start gap-8 sm:grid-cols-2 lg:pt-3">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <LogoBadge size={44} className="ring-1 ring-gold/40" />
              <div>
                <p className="font-semibold">{company.name}</p>
                <p className="text-sm text-on-brand/70">GST {company.gst}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-3 text-sm">
            <p className="flex items-center gap-2 font-semibold text-gold">
              <Icon icon={UserIcon} size={18} />
              Contact person
            </p>
            <p>
              {company.contactPerson.name}
              <br />
              <span className="text-on-brand/70">{company.contactPerson.role}</span>
            </p>
            <a href={company.phoneHref} className="flex items-center gap-2 text-base font-semibold">
              <Icon icon={Call02Icon} size={18} />
              {company.phoneDisplay}
            </a>
            <a href={company.altPhoneHref} className="flex items-center gap-2 text-on-brand/80">
              <Icon icon={Call02Icon} size={18} />
              {company.altPhoneDisplay}
            </a>
            <p className="text-on-brand/60">Call response rate {company.responseRate}</p>
          </div>
          <div className="grid gap-5 text-sm">
            {[company.address, company.corporateOffice].map((a) => (
              <div key={a.label} className="grid gap-1.5">
                <p className="flex items-center gap-2 font-semibold text-gold">
                  <Icon icon={Location01Icon} size={18} />
                  {a.label}
                </p>
                <address className="not-italic leading-relaxed text-on-brand/80">
                  {a.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                {"mapHref" in a && (
                  <a href={a.mapHref} target="_blank" rel="noopener noreferrer" className="w-fit font-semibold underline underline-offset-4">
                    Get directions
                  </a>
                )}
              </div>
            ))}
          </div>
          <a href={company.catalogue.href} download className="btn btn-on-brand w-fit sm:col-span-2">
            <Icon icon={Download04Icon} size={18} />
            Download catalogue PDF ({company.catalogue.size})
          </a>
        </div>
      </div>

      <div className="shell grid gap-10 border-t border-on-brand/15 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-semibold text-gold">Our company</p>
          <ul className="mt-4 grid gap-2.5 text-sm text-on-brand/80">
            {[...companyTabs, { href: "/products-and-services", label: "Our Products" }, { href: "/photos", label: "Photos" }, { href: "/enquiry", label: "Contact Us" }, { href: "/sitemap", label: "Sitemap" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-on-brand hover:underline hover:underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-gold">Product groups</p>
          <ul className="mt-4 grid gap-2.5 text-sm text-on-brand/80">
            {families.map((f) => (
              <li key={f.slug}>
                <Link href={`/range/${f.slug}`} className="hover:text-on-brand hover:underline hover:underline-offset-4">
                  {f.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:col-span-2">
          <p className="text-sm font-semibold text-gold">Our products</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-on-brand/80">
            {topCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="hover:text-on-brand hover:underline hover:underline-offset-4">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-on-brand/15 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-6 text-sm text-on-brand/65 md:flex-row md:items-center md:justify-between md:pb-8">
        <p>© {company.name}. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span className="mr-1">Share us on</span>
          {company.share.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${s.label}`}
              className="grid h-10 w-10 place-items-center rounded-full text-on-brand ring-1 ring-on-brand/25 transition-colors hover:bg-on-brand hover:text-brand"
            >
              <Icon icon={shareIcons[s.label as keyof typeof shareIcons]} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
