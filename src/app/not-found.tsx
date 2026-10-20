import Link from "next/link";
import { LogoBadge } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[70dvh] place-items-center py-20 text-center">
      <div>
        <LogoBadge size={96} className="mx-auto" />
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
