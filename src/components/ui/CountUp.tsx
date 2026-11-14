"use client";

import { animate, type AnimationPlaybackControls } from "motion/react";
import { useEffect, useRef, useState } from "react";

/*
  Animates the leading number of a value like "1500+" or "33+"; non-numeric values render as-is.

  The real value is what the server sends and what stays in the DOM until the count-up
  actually runs, so crawlers, link previews and screen readers never read "0+".
  - Already on screen at mount: no animation, so nothing flashes from the real value to 0.
  - Below the fold: the number is hidden (still the real value) and counts up from 0
    once 60% of it has scrolled into view.
*/
export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const numeric = match !== null;
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"static" | "armed" | "running">("static");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!numeric || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let controls: AnimationPlaybackControls | undefined;
    let first = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          // The observer's first report is where the number sits at mount.
          if (entry.isIntersecting) return io.disconnect();
          setPhase("armed");
          return;
        }
        if (entry.intersectionRatio < 0.6) return;
        io.disconnect();
        setShown(0);
        setPhase("running");
        controls = animate(0, target, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setShown(Math.round(v)) });
      },
      { threshold: [0, 0.6] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      controls?.stop();
    };
  }, [numeric, target, duration]);

  if (!numeric) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums" style={phase === "armed" ? { opacity: 0 } : undefined}>
      {phase === "running" ? shown : target}
      {suffix}
    </span>
  );
}
