import { ArrowRight01Icon, Call02Icon, Facebook01Icon, Linkedin01Icon, Location01Icon, Mail01Icon, UserIcon, YoutubeIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { LogoBadge } from "@/components/brand/Logo";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { Icon } from "@/components/ui/Icon";
import { company } from "@/data/company";
import { productTypes } from "@/lib/catalog";

const COMPANY_LINKS = [
  { href: "/profile", label: "Introduction" },
  { href: "/about-us", label: "About Us" },
  { href: "/quality-and-compliance", label: "Quality" },
  { href: "/our-advantage", label: "Our Advantage" },
  { href: "/industry", label: "Industries" },
] as const;

// Same order as company.social: Facebook, LinkedIn, YouTube.
const SOCIAL = [
  { label: "Facebook", icon: Facebook01Icon },
  { label: "LinkedIn", icon: Linkedin01Icon },
  { label: "YouTube", icon: YoutubeIcon },
] as const;

export function Footer() {
  const phone = { display: company.phoneDisplay, href: company.phoneHref };

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
          <div className="grid content-start gap-1.5 text-sm">
            <p className="flex items-center gap-2 font-semibold text-gold">
              <Icon icon={UserIcon} size={18} />
              Contact person
            </p>
            <p className="leading-relaxed">
              {company.contactPerson.name}
              <br />
              <span className="text-on-brand/70">{company.contactPerson.role}</span>
            </p>
            <div className="mt-3 grid gap-2">
              <a href={company.phoneHref} className="flex items-center gap-2 text-base font-semibold hover:text-gold">
                <Icon icon={Call02Icon} size={18} />
                {company.phoneOwner}: {company.phoneDisplay}
              </a>
              <a href={company.altPhoneHref} className="flex items-center gap-2 text-on-brand/80 hover:text-gold">
                <Icon icon={Call02Icon} size={18} />
                {company.altPhoneOwner}: {company.altPhoneDisplay}
              </a>
            </div>
          </div>
          <div className="grid content-start gap-5 text-sm">
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
        </div>
      </div>

      <nav aria-label="Footer" className="shell grid gap-10 border-t border-on-brand/15 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
        <div className="max-w-xs">
          <p className="font-semibold">{company.shortName}</p>
          <p className="mt-3 text-sm leading-relaxed text-on-brand/70">
            Importer, trader and bulk supplier of food, pharma and industrial chemicals from Ahmedabad since {company.established}.
          </p>
          <a href={`mailto:${company.email}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">
            <Icon icon={Mail01Icon} size={18} />
            {company.email}
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold text-gold">Company</p>
          <ul className="mt-4 grid gap-2.5 text-sm text-on-brand/75">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-on-brand">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-gold">Products</p>
          <ul className="mt-4 grid gap-2.5 text-sm text-on-brand/75">
            {productTypes.map((t) => (
              <li key={t.slug}>
                <Link href={`/products-and-services#${t.slug}`} className="transition-colors hover:text-on-brand">{t.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/products-and-services" className="inline-flex items-center gap-1 font-semibold text-on-brand hover:text-gold">
                All products
                <Icon icon={ArrowRight01Icon} size={14} />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-gold">Follow us</p>
          <div className="mt-4 flex gap-2">
            {SOCIAL.map((s, i) => (
              <a
                key={s.label}
                href={company.social[i]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${company.shortName} on ${s.label}`}
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-on-brand/25 transition-colors hover:bg-on-brand hover:text-brand"
              >
                <Icon icon={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="shell flex flex-col gap-3 border-t border-on-brand/15 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-6 text-sm text-on-brand/60 md:flex-row md:items-center md:justify-between md:pb-8">
        <p>© {company.name}. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/sitemap" className="hover:text-on-brand">Sitemap</Link>
          <Link href="/enquiry" className="hover:text-on-brand">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
