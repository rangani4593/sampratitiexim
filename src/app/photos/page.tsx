import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/company/PageIntro";
import { industryPages } from "@/data/industries";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos of the Sampratiti Exim warehouse, certificates and the industries we supply, from Ahmedabad.",
  alternates: { canonical: "/photos" },
};

export default function PhotosPage() {
  return (
    <>
      <PageIntro title="Photos" lead="Industries we supply, from Ahmedabad." />
      <section className="shell pb-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Industries</h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {industryPages.map((i) => (
            <li key={i.slug}>
              <Link href={`/industry/${i.slug}`} className="group block">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-surface)] bg-surface-2">
                  <Image src={i.image} alt={i.title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="mt-2 block px-1 text-sm font-semibold">{i.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
