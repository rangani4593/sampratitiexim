"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type Cert = { src: string; title: string };

function Card({ cert, i, total, progress, reduce }: { cert: Cert; i: number; total: number; progress: MotionValue<number>; reduce: boolean }) {
  const mid = (total - 1) / 2;
  const spread = i - mid;
  const rotate = useTransform(progress, [0, 1], reduce ? [spread * 5, spread * 5] : [spread * 2, spread * 9]);
  const x = useTransform(progress, [0, 1], reduce ? [`${spread * 30}%`, `${spread * 30}%`] : [`${spread * 8}%`, `${spread * 34}%`]);
  const y = useTransform(progress, [0, 1], reduce ? ["0%", "0%"] : [`${Math.abs(spread) * 2}%`, `${Math.abs(spread) * 7}%`]);
  return (
    <motion.figure
      style={{ rotate, x, y, zIndex: total - Math.round(Math.abs(spread) * 2) }}
      className="absolute left-1/2 top-0 w-[46%] -translate-x-1/2 origin-bottom"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] bg-white shadow-[0_24px_50px_-20px_rgb(var(--shadow-rgb)/0.45)] ring-1 ring-line">
        <Image src={cert.src} alt={cert.title} fill sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover object-top" />
      </div>
    </motion.figure>
  );
}

export function CertificateFan({ certs }: { certs: Cert[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  return (
    <div className="mx-auto w-full max-w-[34rem]">
      <div ref={ref} className="relative aspect-[5/4] w-full">
        {certs.map((c, i) => (
          <Card key={c.src} cert={c} i={i} total={certs.length} progress={scrollYProgress} reduce={reduce} />
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-ink-2">{certs.map((c) => c.title).join("  /  ")}</p>
    </div>
  );
}
