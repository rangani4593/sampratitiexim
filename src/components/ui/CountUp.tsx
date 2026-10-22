"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Animates the leading number of a value like "108+" or "33+"; non-numeric values render as-is.
export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const numeric = match !== null;
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (!numeric || reduce) return;
    if (!inView) {
      setShown(0);
      return;
    }
    const controls = animate(0, target, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, target, duration, numeric]);

  if (!numeric) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {shown ?? target}
      {suffix}
    </span>
  );
}
