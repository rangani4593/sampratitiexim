"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type HeroSlide = { src: string; name: string; href: string; price: string; category: string };

export function HeroVisual({ slides }: { slides: HeroSlide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const emblemX = useTransform(sx, (v) => v * -18);
  const emblemY = useTransform(sy, (v) => v * -14);
  const dropX = useTransform(sx, (v) => v * 8);
  const dropY = useTransform(sy, (v) => v * 6);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length);
    }, 3600);
    return () => clearInterval(t);
  }, [reduce, paused, slides.length]);

  const slide = slides[index];

  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div style={{ x: emblemX, y: emblemY }} className="pointer-events-none absolute -inset-x-[12%] -top-[6%] bottom-[14%] -z-0 opacity-[0.14] dark:opacity-[0.2]" aria-hidden>
        <Image src="/images/brand/emblem-gold.png" alt="" fill sizes="40vw" className="object-contain" />
      </motion.div>

      <motion.div style={{ x: dropX, y: dropY }} className="relative mx-auto aspect-[4/5] w-[86%]">
        <div className="droplet absolute -inset-[3.5%] bg-gold" aria-hidden />
        <div className="droplet absolute -inset-[1.6%] bg-bg" aria-hidden />
        <Link href={slide.href} className="droplet well absolute inset-0 block overflow-hidden" aria-label={`View ${slide.name}`}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={slide.src}
                alt={slide.name}
                fill
                sizes="(min-width: 1024px) 34vw, 80vw"
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-contain px-[12%] pb-[6%] pt-[26%]"
              />
            </motion.div>
          </AnimatePresence>
        </Link>
      </motion.div>

      <div className="relative mt-5 flex items-center justify-between gap-4 rounded-2xl bg-surface p-3 pl-4 lift hairline">
        <div className="min-w-0" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p className="truncate text-xs text-ink-3">{slide.category}</p>
              <p className="truncate font-semibold">{slide.name}</p>
              <p className="font-mono text-sm text-ink-2">{slide.price}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden gap-1.5 sm:flex" role="tablist" aria-label="Featured products">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.name}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-ink" : "w-2 bg-line-strong"}`}
              />
            ))}
          </div>
          <Link href={slide.href} className="grid h-11 w-11 place-items-center rounded-full bg-gold text-on-gold" aria-label={`Open ${slide.name}`}>
            <Icon icon={ArrowUpRight01Icon} size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
