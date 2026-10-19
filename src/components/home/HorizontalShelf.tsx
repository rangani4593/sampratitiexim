"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HorizontalShelf({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - el.clientWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: wrap },
  );

  return (
    <section ref={wrap} className="relative overflow-hidden py-16 md:py-24 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:py-0">
      <div className="shell">{header}</div>
      <div
        ref={track}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 md:gap-4 md:px-8 lg:mt-10 lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))]"
      >
        {children}
      </div>
    </section>
  );
}
