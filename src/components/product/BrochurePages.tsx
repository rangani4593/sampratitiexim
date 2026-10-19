"use client";

import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "./Gallery";

export function BrochurePages({ pages, title }: { pages: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:px-0">
        {pages.map((src, i) => (
          <li key={src} className="w-[44%] shrink-0 snap-start md:w-auto">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white hairline transition-transform active:scale-[0.98]"
              aria-label={`Open brochure page ${i + 1}`}
            >
              <Image src={src} alt={`${title} brochure, page ${i + 1}`} fill sizes="(min-width: 768px) 20vw, 44vw" className="object-cover object-top" />
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>{open !== null && <Lightbox images={pages} alt={`${title} brochure`} start={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}
