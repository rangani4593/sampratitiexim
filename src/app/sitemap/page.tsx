import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/company/PageIntro";
import { companyTabs } from "@/data/company";
import { industryPages } from "@/data/industries";
import { productTypes } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "All pages, industries and products on the Sampratiti Exim website.",
  alternates: { canonical: "/sitemap" },
};

const pages = [
  { href: "/", label: "Home" },
  ...companyTabs,
  { href: "/products-and-services", label: "Products & Services" },
  { href: "/industry", label: "Industries" },
  { href: "/enquiry", label: "Contact Us" },
];

export default function SitemapPage() {
  return (
    <>
      <PageIntro title="Sitemap" />
      <section className="shell grid gap-10 pb-20 md:grid-cols-2">
        <div className="grid content-start gap-10">
          <div>
            <h2 className="text-lg font-semibold">Pages</h2>
            <ul className="mt-3 grid gap-2 text-ink-2">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink hover:underline hover:underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Industries</h2>
            <ul className="mt-3 grid gap-2 text-ink-2">
              {industryPages.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industry/${i.slug}`} className="hover:text-ink hover:underline hover:underline-offset-4">
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid content-start gap-8">
          {productTypes.map((t) => (
            <div key={t.slug}>
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <ul className="mt-3 grid gap-2 text-ink-2 sm:grid-cols-2">
                {t.products.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${p.slug}`} className="hover:text-ink hover:underline hover:underline-offset-4">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
