"use client";

import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/product/Gallery";

export function PhotoGrid({ photos }: { photos: { src: string; title: string; caption: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {photos.map((p, i) => (
          <li key={p.src} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <button type="button" onClick={() => setOpen(i)} className="group block h-full w-full text-left" aria-label={`Open ${p.title}`}>
              <span className={`relative block overflow-hidden rounded-[var(--radius-surface)] bg-white hairline ${i === 0 ? "aspect-square" : "aspect-[4/5]"}`}>
                <Image src={p.src} alt={p.title} fill sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </span>
              <span className="mt-2 block px-1">
                <span className="block text-sm font-semibold">{p.title}</span>
                <span className="block text-xs text-ink-3">{p.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {open !== null && <Lightbox images={photos.map((p) => p.src)} alt="Sampratiti Exim" start={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
