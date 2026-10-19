"use client";

import { ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon, Maximize01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, ViewTransition } from "react";
import { Icon } from "@/components/ui/Icon";

export function Lightbox({ images, alt, start, onClose }: { images: string[]; alt: string; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const track = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (n: number) => {
      const next = (n + images.length) % images.length;
      setI(next);
      track.current?.children[next]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    },
    [images.length],
  );

  useEffect(() => {
    track.current?.children[start]?.scrollIntoView({ inline: "center", block: "nearest" });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [go, i, onClose, start]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} photos`}
      className="fixed inset-0 z-[70] flex flex-col bg-[#06121b]/95 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between p-3 text-white md:p-5">
        <p className="font-mono text-sm text-white/70">
          {i + 1} / {images.length}
        </p>
        <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white/10" aria-label="Close photos">
          <Icon icon={Cancel01Icon} size={22} />
        </button>
      </div>
      <div
        ref={track}
        className="no-scrollbar flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto"
        onScroll={(e) => {
          const el = e.currentTarget;
          const n = Math.round(el.scrollLeft / el.clientWidth);
          if (n !== i) setI(n);
        }}
      >
        {images.map((src, n) => (
          <div key={src} className="relative h-full w-full shrink-0 snap-center p-3 md:p-10">
            <div className="relative h-full w-full">
              <Image src={src} alt={`${alt}, photo ${n + 1}`} fill sizes="100vw" quality={90} className="object-contain" />
            </div>
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-4 p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
          <button type="button" onClick={() => go(i - 1)} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white" aria-label="Previous photo">
            <Icon icon={ArrowLeft01Icon} size={22} />
          </button>
          <button type="button" onClick={() => go(i + 1)} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white" aria-label="Next photo">
            <Icon icon={ArrowRight01Icon} size={22} />
          </button>
        </div>
      )}
    </motion.div>
  );
}

export function Gallery({ images, alt, transitionName }: { images: string[]; alt: string; transitionName: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const zoom = useRef<HTMLDivElement>(null);

  if (!images.length) {
    return (
      <div className="grid aspect-square place-items-center rounded-[var(--radius-surface)] bg-brand">
        <Image src="/images/brand/emblem-gold.png" alt="" width={160} height={200} className="w-1/3" />
      </div>
    );
  }

  return (
    <ViewTransition name={transitionName} share="morph" default="none">
    <div className="md:grid md:grid-cols-[4.5rem_1fr] md:gap-3">
      {/* Mobile: swipe strip */}
      <div className="md:hidden">
        <div
          ref={strip}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            const n = Math.round(el.scrollLeft / el.clientWidth);
            if (n !== active) setActive(n);
          }}
        >
          {images.map((src, n) => (
            <button key={src} type="button" className="w-full shrink-0 snap-center px-4" onClick={() => setLightbox(n)} aria-label={`Open photo ${n + 1} of ${images.length}`}>
              {n === 0 ? (
                <div className="well relative aspect-square overflow-hidden rounded-[var(--radius-surface)] hairline">
                    <Image src={src} alt={alt} fill sizes="100vw" loading="eager" fetchPriority="high" className="object-contain p-3" />
                  </div>
              ) : (
                <div className="well relative aspect-square overflow-hidden rounded-[var(--radius-surface)] hairline">
                  <Image src={src} alt={`${alt}, photo ${n + 1}`} fill sizes="100vw" className="object-contain p-3" />
                </div>
              )}
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
            {images.map((src, n) => (
              <span key={src} className={`h-1.5 rounded-full transition-all ${n === active ? "w-5 bg-ink" : "w-1.5 bg-line-strong"}`} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: thumbs + zoom */}
      <ul className="no-scrollbar hidden max-h-[34rem] flex-col gap-2 overflow-y-auto md:flex">
        {images.map((src, n) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setActive(n)}
              onMouseEnter={() => setActive(n)}
              aria-label={`Show photo ${n + 1}`}
              aria-pressed={n === active}
              className={`well relative block aspect-square w-full overflow-hidden rounded-xl transition-shadow ${n === active ? "ring-2 ring-gold" : "hairline"}`}
            >
              <Image src={src} alt="" fill sizes="72px" className="object-contain p-1" />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative hidden md:block">
        <div
            ref={zoom}
            className="well group relative aspect-square cursor-zoom-in overflow-hidden rounded-[var(--radius-surface)] hairline"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
              e.currentTarget.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
            }}
            onClick={() => setLightbox(active)}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div key={images[active]} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <Image
                  src={images[active]}
                  alt={active === 0 ? alt : `${alt}, photo ${active + 1}`}
                  fill
                  sizes="(min-width: 1280px) 600px, 50vw"
                  quality={90}
                  loading={active === 0 ? "eager" : "lazy"}
                  fetchPriority={active === 0 ? "high" : "auto"}
                  className="object-contain p-4 transition-transform duration-300 [transform-origin:var(--zx,50%)_var(--zy,50%)] group-hover:scale-[1.8]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        
        <button type="button" onClick={() => setLightbox(active)} className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-surface/90 text-ink lift" aria-label="View full screen">
          <Icon icon={Maximize01Icon} size={18} />
        </button>
      </div>

      <AnimatePresence>{lightbox !== null && <Lightbox images={images} alt={alt} start={lightbox} onClose={() => setLightbox(null)} />}</AnimatePresence>
    </div>
    </ViewTransition>
  );
}
