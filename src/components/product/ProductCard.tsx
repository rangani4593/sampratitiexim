import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatPrice, productHref, unitLabel, type Category, type Product } from "@/lib/catalog";

export function ProductCard({
  category,
  product,
  showCategory = false,
  eager = false,
  sizes = "(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw",
}: {
  category: Category;
  product: Product;
  showCategory?: boolean;
  eager?: boolean;
  sizes?: string;
}) {
  const img = product.images[0];
  return (
    <Link
      href={productHref(category.slug, product.slug)}
      id={product.anchor}
      className="group flex h-full scroll-mt-28 flex-col rounded-[var(--radius-surface)] bg-surface p-2 transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-out-expo)] hairline active:scale-[0.985] md:hover:-translate-y-1 md:hover:lift"
    >
      <ViewTransition name={`product-${category.slug}-${product.slug}`} share="morph" default="none">
        <div className="well relative aspect-square overflow-hidden rounded-[16px]">
          {img ? (
            <Image
              src={img}
              alt={product.name}
              fill
              sizes={sizes}
              loading={eager ? "eager" : "lazy"}
              className="object-contain p-2 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] md:group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full place-items-center bg-brand">
              <Image src="/images/brand/emblem-gold.png" alt="" width={80} height={100} className="w-1/3 opacity-80" />
            </div>
          )}
        </div>
      </ViewTransition>
      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3 md:px-2.5">
        {showCategory && <p className="mb-1 truncate text-xs font-medium text-ink-3">{category.name}</p>}
        <h3 className="line-clamp-2 text-[0.95rem] font-semibold leading-snug text-ink md:text-base">{product.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="min-w-0">
            <span className="font-mono text-[0.92rem] font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.price !== null && <span className="text-xs text-ink-3"> / {unitLabel(product.unit)}</span>}
            {product.moq && <span className="mt-0.5 block truncate text-xs text-ink-3">MOQ {product.moq}</span>}
          </p>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 text-ink transition-colors group-hover:bg-gold group-hover:text-on-gold">
            <Icon icon={ArrowUpRight01Icon} size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
