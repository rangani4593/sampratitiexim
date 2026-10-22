import Image from "next/image";
import Link from "next/link";

// emblem-gold.png is 397x495; size it in pixels so it always sits inside the badge.
const EMBLEM_RATIO = 397 / 495;

export function LogoBadge({ size = 40, className = "" }: { size?: number; className?: string }) {
  const h = Math.round(size * 0.72);
  const w = Math.round(h * EMBLEM_RATIO);
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden bg-brand ${className}`}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.27) }}
    >
      <Image src="/images/brand/emblem-gold.png" alt="" width={w} height={h} quality={90} sizes={`${w * 2}px`} style={{ width: w, height: h }} />
    </span>
  );
}

export function Logo({ onBrand = false }: { onBrand?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Sampratiti Exim, home">
      <LogoBadge />
      <span className={`text-[1.05rem] font-bold tracking-[0.06em] leading-none ${onBrand ? "text-gold" : "text-ink"}`}>SAMPRATITI EXIM</span>
    </Link>
  );
}
