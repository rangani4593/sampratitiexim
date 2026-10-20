"use client";

import { ArrowLeft01Icon, ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type DeckSlide = { src: string; title: string; href: string; caption: string; eyebrow: string };

const DEPTH = 3;
const SWIPE = 90;

export function ProductDeck({ slides, autoPlay = true }: { slides: DeckSlide[]; autoPlay?: boolean }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (step: number) => {
      setDir(step);
      setIndex((i) => (i + step + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (!autoPlay || reduce || paused || slides.length < 2) return;
    const t = setInterval(() => !document.hidden && go(1), 4200);
    return () => clearInterval(t);
  }, [autoPlay, reduce, paused, go, slides.length]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE || info.velocity.x < -500) go(1);
    else if (info.offset.x > SWIPE || info.velocity.x > 500) go(-1);
  };

  const visible = Array.from({ length: Math.min(DEPTH, slides.length) }, (_, d) => ({ d, slide: slides[(index + d) % slides.length] }));

  return (
    <div
      className="relative isolate overflow-hidden rounded-[28px] bg-brand px-6 pb-6 pt-10 sm:px-10 sm:pt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Industries we supply"
    >
      <Image src="/images/brand/emblem-gold.png" alt="" width={420} height={524} className="pointer-events-none absolute -bottom-16 -right-14 -z-10 w-56 opacity-[0.09] sm:w-72" />

      <div className="relative mx-auto max-w-[19rem] sm:max-w-[21rem]">
        <div className="relative aspect-[4/5]">
          <AnimatePresence initial={false} custom={dir}>
            {visible
              .slice()
              .reverse()
              .map(({ d, slide }) => {
                const top = d === 0;
                return (
                  <motion.article
                    key={slide.href}
                    custom={dir}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: 26 * DEPTH, y: -14 * DEPTH, scale: 0.85, rotate: 3 * DEPTH }}
                    animate={{ opacity: 1 - d * 0.18, x: d * 22, y: d * -16, scale: 1 - d * 0.06, rotate: d * 3.5, zIndex: DEPTH - d }}
                    variants={{
                      out: (direction: number) =>
                        reduce
                          ? { opacity: 0 }
                          : { opacity: 0, x: direction > 0 ? -320 : 320, rotate: direction > 0 ? -14 : 14, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    exit="out"
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    drag={top && !reduce ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.85}
                    onDragEnd={top ? onDragEnd : undefined}
                    whileDrag={{ cursor: "grabbing", rotate: 0 }}
                    className={`absolute inset-0 flex origin-bottom flex-col overflow-hidden rounded-[22px] bg-surface shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)] ${top ? "cursor-grab" : "pointer-events-none"}`}
                    aria-hidden={!top}
                  >
                    <div className="relative min-h-0 flex-1 bg-surface-2">
                      <Image
                        src={slide.src}
                        alt={top ? slide.title : ""}
                        fill
                        draggable={false}
                        sizes="(min-width: 1024px) 44rem, 160vw"
                        quality={90}
                        loading={d === 0 && index === 0 ? "eager" : "lazy"}
                        fetchPriority={d === 0 && index === 0 ? "high" : "auto"}
                        className="select-none object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-3 border-t border-line p-3.5 pl-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-ink-3">{slide.eyebrow}</p>
                        <p className="truncate font-semibold leading-snug text-ink">{slide.title}</p>
                        <p className="truncate text-sm text-ink-2">{slide.caption}</p>
                      </div>
                      <Link
                        href={slide.href}
                        tabIndex={top ? 0 : -1}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-on-gold transition-transform active:scale-95"
                        aria-label={`View ${slide.title}`}
                      >
                        <Icon icon={ArrowUpRight01Icon} size={20} />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
          </AnimatePresence>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="relative mt-6 flex items-center justify-between gap-4">
          <p className="font-mono text-xs text-on-brand/70" aria-live="polite">
            <span className="text-on-brand">{String(index + 1).padStart(2, "0")}</span> / {String(slides.length).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full text-on-brand ring-1 ring-on-brand/30 transition-colors hover:bg-on-brand hover:text-brand"
              aria-label="Previous industry"
            >
              <Icon icon={ArrowLeft01Icon} size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full text-on-brand ring-1 ring-on-brand/30 transition-colors hover:bg-on-brand hover:text-brand"
              aria-label="Next industry"
            >
              <Icon icon={ArrowRight01Icon} size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
