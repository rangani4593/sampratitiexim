import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { Icon } from "@/components/ui/Icon";
import { productHref, typeOf, type Product } from "@/lib/catalog";

export function ProductCard({
  product,
  eager = false,
  sizes = "(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw",
}: {
  product: Product;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <Link
      href={productHref(product.slug)}
      className="group flex h-full flex-col rounded-[var(--radius-surface)] bg-surface p-2 transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-out-expo)] hairline active:scale-[0.985] md:hover:-translate-y-1 md:hover:lift"
    >
      <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-surface-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] md:group-hover:scale-[1.05]"
          />
          {product.code && <span className="absolute left-2 top-2 rounded-full bg-brand/90 px-2 py-0.5 font-mono text-[10px] font-medium text-gold backdrop-blur">{product.code}</span>}
        </div>
      </ViewTransition>
      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3 md:px-2.5">
        <p className="text-xs text-ink-3">{typeOf(product).name}</p>
        <h3 className="mt-0.5 line-clamp-2 text-[0.98rem] font-semibold leading-snug text-ink md:text-base">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink-2">{product.short}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-semibold text-ink">
          View details
          <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-2 transition-colors group-hover:bg-gold group-hover:text-on-gold">
            <Icon icon={ArrowUpRight01Icon} size={15} />
          </span>
        </span>
      </div>
    </Link>
  );
}
