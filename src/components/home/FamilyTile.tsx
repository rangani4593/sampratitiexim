import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Family } from "@/lib/catalog";

type Variant = "feature" | "wide" | "plain";

export function FamilyTile({ family, variant = "plain", className = "" }: { family: Family; variant?: Variant; className?: string }) {
  const own = family.categories.filter((c) => c.families[0] === family.slug);
  const codes = [...new Set(own.map((c) => c.code).filter(Boolean))].slice(0, 4) as string[];
  const dark = variant === "feature";

  return (
    <Link
      href={`/range/${family.slug}`}
      className={`group relative flex overflow-hidden rounded-[var(--radius-surface)] transition-transform duration-300 active:scale-[0.985] ${
        dark ? "bg-brand text-on-brand" : variant === "wide" ? "bg-surface-2" : "bg-surface hairline"
      } ${variant === "wide" ? "flex-row items-stretch" : "flex-col"} ${className}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          variant === "feature"
            ? "m-2 aspect-[4/3] rounded-[16px] bg-white md:aspect-auto md:flex-1"
            : variant === "wide"
              ? "well m-2 w-[40%] rounded-[16px]"
              : "well m-2 aspect-[4/3] rounded-[16px]"
        }`}
      >
        <Image
          src={family.cover}
          alt={family.name}
          fill
          sizes={variant === "feature" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          className="object-contain p-3 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
      </div>
      <div className={`flex flex-1 flex-col p-4 pt-2 md:p-5 md:pt-3 ${variant === "wide" ? "justify-center pl-2 pt-4" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-semibold leading-tight tracking-tight ${variant === "feature" ? "text-2xl md:text-3xl" : "text-[1.05rem] md:text-xl"}`}>{family.name}</h3>
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
              dark ? "bg-gold text-on-gold" : "bg-surface-2 text-ink group-hover:bg-gold group-hover:text-on-gold"
            } ${variant === "wide" ? "bg-surface" : ""}`}
          >
            <Icon icon={ArrowUpRight01Icon} size={18} />
          </span>
        </div>
        {variant !== "plain" && <p className={`mt-2 max-w-[44ch] text-sm leading-relaxed ${dark ? "text-on-brand/75" : "text-ink-2"}`}>{family.blurb}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4">
          <span className={`text-sm ${dark ? "text-gold" : "text-ink-2"}`}>{family.productCount} products</span>
          {codes.length > 0 && (
            <span className={`font-mono text-[11px] ${dark ? "text-on-brand/60" : "text-ink-3"}`}>{codes.join("  ")}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
