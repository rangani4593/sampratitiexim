"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
  A row of cards. On wide screens with motion allowed it pins and scrolls sideways as the
  page scrolls down; everywhere else it is a plain horizontally scrollable row.

  The track only stops being a scroll container while the pinned animation owns it.
  It used to be overflow-visible on every wide screen, so with reduced motion (no
  animation) 8 of the 12 cards sat clipped off-screen with no way to reach them.
*/
export function HorizontalShelf({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = wrap.current!;
        const el = track.current!;
        gsap.set(el, { overflow: "visible", scrollSnapType: "none" });

        const distance = () => Math.max(0, el.scrollWidth - el.clientWidth);
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Keyboard: focusing a card that is off to the side made the browser scroll the
        // clipped section itself (by thousands of pixels, taking the heading with it).
        // Undo that, and instead scroll the page to where the animation shows the card.
        const keepUnscrolled = () => {
          if (section.scrollLeft) section.scrollLeft = 0;
        };
        const onFocus = (e: FocusEvent) => {
          const card = Array.from(el.children).find((c) => c.contains(e.target as Node)) as HTMLElement | undefined;
          const st = tween.scrollTrigger;
          if (!card || !st) return;
          // Next task: the browser's own focus scroll has happened by then.
          window.setTimeout(() => {
            keepUnscrolled();
            const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
            const offset = card.getBoundingClientRect().left - el.getBoundingClientRect().left - pad;
            const x = Math.min(Math.max(offset, 0), distance());
            // Jump like native focus scrolling does; a smooth scroll would leave the card
            // off-screen for most of a second while the scrubbed animation catches up.
            window.scrollTo({ top: st.start + x, behavior: "instant" });
          }, 0);
        };
        section.addEventListener("scroll", keepUnscrolled);
        el.addEventListener("focusin", onFocus);
        return () => {
          section.removeEventListener("scroll", keepUnscrolled);
          el.removeEventListener("focusin", onFocus);
        };
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
        // A thin visible scrollbar: without one, mouse users (no touch, no trackpad) had no way to
        // know the row scrolls or to scroll it. The pinned animation hides it via overflow.
        className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-3 [scrollbar-width:thin] md:gap-4 md:px-8 lg:mt-10 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))]"
      >
        {children}
      </div>
    </section>
  );
}
