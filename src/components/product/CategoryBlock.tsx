import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatPrice, productHref, type Category } from "@/lib/catalog";

export function CategoryBlock({ category }: { category: Category }) {
  return (
    <article className="flex flex-col rounded-[var(--radius-surface)] bg-surface p-2 hairline">
      <Link href={`/${category.slug}`} className="group flex items-center gap-4 rounded-[16px] p-2">
        <span className="well relative h-20 w-20 shrink-0 overflow-hidden rounded-[14px] hairline md:h-24 md:w-24">
          <Image src={category.cover} alt={category.name} fill sizes="96px" className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105" />
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-ink-3">
            {category.code && <span className="rounded-full bg-gold-soft px-2 py-0.5 text-ink">{category.code}</span>}
            {category.formula && <span>{category.formula}</span>}
          </span>
          <span className="mt-1 block text-lg font-semibold leading-tight tracking-tight group-hover:underline group-hover:underline-offset-4">{category.name}</span>
          <span className="mt-0.5 block text-sm text-ink-2">
            {category.products.length} products
            {category.priceMin !== null && <> from <span className="font-mono">{formatPrice(category.priceMin)}</span>/Kg</>}
          </span>
        </span>
      </Link>
      <ul className="mt-1 grid gap-0.5 px-2 pb-1">
        {category.products.slice(0, 3).map((p) => (
          <li key={p.slug}>
            <Link href={productHref(category.slug, p.slug)} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-ink-2 hover:bg-surface-2 hover:text-ink">
              <span className="truncate">{p.name}</span>
              <span className="shrink-0 font-mono text-xs text-ink-3">{formatPrice(p.price)}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={`/${category.slug}`} className="mt-auto flex items-center justify-between rounded-[14px] bg-surface-2 px-4 py-3 text-sm font-semibold">
        View all {category.products.length}
        <Icon icon={ArrowRight01Icon} size={18} />
      </Link>
    </article>
  );
}
