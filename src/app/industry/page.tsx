import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/company/PageIntro";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { industryPages } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Ingredients for dairy, ice-cream, beverages, bakery, processed food, snacks, confectionery and nutracare industries from Sampratiti Exim, Ahmedabad.",
  alternates: { canonical: "/industry" },
};

export default function IndustryPage() {
  return (
    <>
      <PageIntro title="Industries" lead="Premium ingredients for the food, beverage and nutrition industries, supplied in bulk with COA and MSDS support." />
      <section className="shell grid gap-3 pb-20 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {industryPages.map((ind, i) => (
          <Reveal key={ind.slug} delay={(i % 3) * 0.05}>
            <Link
              href={`/industry/${ind.slug}`}
              className="group flex h-full flex-col rounded-[var(--radius-surface)] bg-surface p-2 transition-transform hairline active:scale-[0.985] md:hover:-translate-y-1 md:hover:lift"
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-[16px] bg-surface-2">
                <Image
                  src={ind.image}
                  alt={ind.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  loading={i < 2 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-1 flex-col p-3 md:p-4">
                <span className="flex items-start justify-between gap-3">
                  <span className="text-xl font-semibold tracking-tight">{ind.title}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 transition-colors group-hover:bg-gold group-hover:text-on-gold">
                    <Icon icon={ArrowUpRight01Icon} size={18} />
                  </span>
                </span>
                <span className="mt-2 text-sm leading-relaxed text-ink-2">{ind.blurb}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
