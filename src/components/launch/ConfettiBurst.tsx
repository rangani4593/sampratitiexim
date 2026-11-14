"use client";

import { useEffect, useRef } from "react";

/*
  Hand-rolled confetti so the launch moment costs no extra dependency.

  Three emitters: the headline bursts outward with a horizontal bias (the pieces
  shoot off to both sides rather than raining straight down) and two corner
  cannons fire inwards, which is what reads as "party popper" on a wide screen.
  Motion is integrated against real elapsed time, so it looks identical on a
  60 Hz laptop and a 120 Hz phone.
*/

const COLORS = ["#e3b04b", "#f0cd86", "#ffffff", "#edf1f3", "#c2913a"];
const GRAVITY = 0.0019; // px per ms²
const DRAG = 0.9988; // per ms
const MAX_MS = 5000;

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  ratio: number;
  spin: number;
  spinRate: number;
  tilt: number;
  tiltRate: number;
  color: string;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makePiece(x: number, y: number, angle: number, speed: number, stretch: number): Piece {
  return {
    x,
    y,
    vx: Math.cos(angle) * speed * stretch,
    vy: Math.sin(angle) * speed,
    size: rand(6, 13),
    ratio: Math.random() < 0.35 ? rand(0.25, 0.4) : rand(0.6, 1),
    spin: rand(0, Math.PI * 2),
    spinRate: rand(-0.012, 0.012),
    tilt: rand(0, Math.PI * 2),
    tiltRate: rand(0.004, 0.011),
    color: COLORS[(Math.random() * COLORS.length) | 0],
  };
}

function seed(w: number, h: number): Piece[] {
  const total = w < 640 ? 90 : w < 1024 ? 140 : 180;
  const pieces: Piece[] = [];

  // Centre burst, roughly where the "we're live" wordmark sits.
  for (let i = 0; i < total * 0.56; i++) {
    pieces.push(makePiece(w / 2 + rand(-40, 40), h * 0.46 + rand(-24, 24), rand(0, Math.PI * 2), rand(0.3, 1.05), 1.75));
  }
  // Corner cannons, angled up and inwards.
  const cannon = Math.ceil((total * 0.44) / 2);
  for (let i = 0; i < cannon; i++) {
    pieces.push(makePiece(-10, h + 10, rand(-1.25, -0.5), rand(0.95, 1.7), 1.15));
    pieces.push(makePiece(w + 10, h + 10, rand(Math.PI + 0.5, Math.PI + 1.25), rand(0.95, 1.7), 1.15));
  }
  return pieces;
}

export function ConfettiBurst({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.clientWidth || window.innerWidth;
    let h = canvas.clientHeight || window.innerHeight;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    let pieces = seed(w, h);
    let raf = 0;
    let last = performance.now();
    const start = last;

    const onResize = () => size();
    window.addEventListener("resize", onResize, { passive: true });

    const frame = (now: number) => {
      // Clamp the step so a backgrounded tab does not teleport every piece off-screen.
      const dt = Math.min(now - last, 48);
      last = now;
      ctx.clearRect(0, 0, w, h);

      const drag = Math.pow(DRAG, dt);
      const alive: Piece[] = [];

      for (const p of pieces) {
        p.vx *= drag;
        p.vy = p.vy * drag + GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.spin += p.spinRate * dt;
        p.tilt += p.tiltRate * dt;

        if (p.y > h + 60 || p.x < -80 || p.x > w + 80) continue;
        alive.push(p);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        // Flutter: the piece turns edge-on as it tumbles.
        ctx.scale(Math.cos(p.tilt), 1);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, (-p.size * p.ratio) / 2, p.size, p.size * p.ratio);
        ctx.restore();
      }

      pieces = alive;
      if (pieces.length && now - start < MAX_MS) raf = requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, w, h);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
