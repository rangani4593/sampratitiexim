import Image from "next/image";
import Link from "next/link";

export function LogoBadge({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center bg-brand ${className}`}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.27) }}
    >
      <Image src="/images/brand/emblem-gold.png" alt="" width={size} height={Math.round(size * 1.25)} quality={90} sizes={`${size * 2}px`} className="h-[76%] w-auto" />
    </span>
  );
}

export function Logo({ onBrand = false }: { onBrand?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Sampratiti Exim, home">
      <LogoBadge />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.05rem] font-bold tracking-[0.06em] ${onBrand ? "text-gold" : "text-ink"}`}>SAMPRATITI EXIM</span>
        <span className={`mt-1 text-[0.72rem] font-medium tracking-[0.02em] ${onBrand ? "text-on-brand/70" : "text-ink-3"}`}>Pvt Ltd.</span>
      </span>
    </Link>
  );
}
