import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[70dvh] place-items-center py-20 text-center">
      <div>
        <div className="relative mx-auto aspect-[4/5] w-28">
          <div className="droplet absolute inset-0 bg-brand" />
          <Image src="/images/brand/emblem-gold.png" alt="" fill sizes="112px" className="object-contain p-5 pt-8" />
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight md:text-5xl">This page has moved</h1>
        <p className="mx-auto mt-3 max-w-[44ch] text-lg text-ink-2">The product or page you opened is not here. Search the catalogue or browse all products.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products-and-services" className="btn btn-gold">
            All products
          </Link>
          <Link href="/" className="btn btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
