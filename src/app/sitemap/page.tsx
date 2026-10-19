import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/company/PageIntro";
import { companyTabs } from "@/data/company";
import { families, productHref } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "All pages, product groups, categories and products on the Sampratiti Exim website.",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  return (
    <>
      <PageIntro title="Sitemap" />
      <section className="shell grid gap-10 pb-20 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="text-lg font-semibold">Pages</h2>
          <ul className="mt-3 grid gap-2 text-ink-2">
            {[{ href: "/", label: "Home" }, ...companyTabs, { href: "/products-and-services", label: "Products & Services" }, { href: "/photos", label: "Photos" }, { href: "/enquiry", label: "Contact Us" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink hover:underline hover:underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-10">
          {families.map((f) => (
            <div key={f.slug}>
              <h2 className="text-lg font-semibold">
                <Link href={`/range/${f.slug}`} className="hover:underline hover:underline-offset-4">
                  {f.name}
                </Link>
              </h2>
              <div className="mt-3 grid gap-6 sm:grid-cols-2">
                {f.categories
                  .filter((c) => c.families[0] === f.slug)
                  .map((c) => (
                    <div key={c.slug}>
                      <Link href={`/${c.slug}`} className="font-medium hover:underline hover:underline-offset-4">
                        {c.name}
                      </Link>
                      <ul className="mt-2 grid gap-1.5 border-l border-line pl-3 text-sm text-ink-2">
                        {c.products.map((p) => (
                          <li key={p.slug}>
                            <Link href={productHref(c.slug, p.slug)} className="hover:text-ink hover:underline hover:underline-offset-4">
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
