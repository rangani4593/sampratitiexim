"use client";

import { Call02Icon, Facebook01Icon, Linkedin01Icon, Mail01Icon, WhatsappIcon, YoutubeIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ConfettiBurst } from "@/components/launch/ConfettiBurst";
import { Icon } from "@/components/ui/Icon";
import { company } from "@/data/company";
import { LAUNCH_SEEN_KEY, launchConfig, launchDateLine, phaseAt, type LaunchPhase } from "@/lib/launch";

/*
  Full-screen launch gate. It sits above the finished site, which is already in the
  DOM underneath — so crawlers still read the real pages, and the reveal needs no
  reload: the gate simply takes itself off the screen.

  countdown → live (the word holds for a second) → burst (confetti, the panel flies
  apart) → released (the site is back in the visitor's hands while the last confetti
  falls through) → done (unmounted).
*/

type Stage = "countdown" | "live" | "burst" | "done";

const LIVE_HOLD_MS = 1900; // long enough to actually read "WE'RE LIVE" before it goes
const BURST_MS = 1500; // panel gone, backdrop wiped: hand the page back here
const SETTLE_MS = 1600; // ...and let the confetti land instead of cutting it off
const REDUCED_BURST_MS = 800;

// Same order as company.social: Facebook, LinkedIn, YouTube.
const SOCIAL = [
  { label: "Facebook", icon: Facebook01Icon },
  { label: "LinkedIn", icon: Linkedin01Icon },
  { label: "YouTube", icon: YoutubeIcon },
] as const;

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;
const LIVE_WORD = "WE'RE LIVE";
const WHATSAPP_TEXT = encodeURIComponent(`Hello ${company.shortName}, I have an inquiry.`);

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

function split(ms: number): [number, number, number, number] {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86_400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
}

function bootPhase(): LaunchPhase {
  const p = document.documentElement.dataset.launch;
  return p === "countdown" || p === "celebrate" || p === "done" ? p : phaseAt(Date.now());
}

/** Keep the site behind the gate out of the tab order and off the screen reader. */
function setBackgroundInert(on: boolean) {
  for (const el of Array.from(document.body.children)) {
    if (el.classList.contains("launch-gate") || el.tagName === "SCRIPT") continue;
    if (on) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  }
}

export function LaunchGate() {
  const [stage, setStage] = useState<Stage>("countdown");
  const [released, setReleased] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const gate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const timers: number[] = [];
    // The gate renders only in the browser; this tells the CSS it is up, so it can stop
    // hiding the site underneath (see launch.css).
    root.dataset.gate = "ready";
    // A rehearsal (?launch=… or a preview env) must not count as having seen the real thing.
    const rehearsal = !!new URLSearchParams(window.location.search).get("launch") || !!launchConfig.preview;

    const finish = () => {
      root.dataset.launch = "done";
      setBackgroundInert(false);
      setStage("done");
    };

    // The reveal is over: unlock scrolling and let clicks through, but keep the
    // canvas alive so the confetti lands instead of blinking out mid-flight.
    const release = () => {
      root.dataset.launch = "settle";
      setBackgroundInert(false);
      setReleased(true);
    };

    const celebrate = () => {
      root.dataset.launch = "celebrate";
      if (!rehearsal) {
        try {
          localStorage.setItem(LAUNCH_SEEN_KEY, "1");
        } catch {}
      }
      setStage("live");
      timers.push(window.setTimeout(() => setStage("burst"), LIVE_HOLD_MS));
      if (reduce) {
        timers.push(window.setTimeout(finish, LIVE_HOLD_MS + REDUCED_BURST_MS));
        return;
      }
      timers.push(window.setTimeout(release, LIVE_HOLD_MS + BURST_MS));
      timers.push(window.setTimeout(finish, LIVE_HOLD_MS + BURST_MS + SETTLE_MS));
    };

    const phase = bootPhase();
    if (phase === "done") {
      finish();
      return;
    }

    setBackgroundInert(true);
    // Put focus on the gate itself: it is the scroll container, so PageDown, Space and the
    // arrow keys scroll it on short screens, and a screen reader starts inside the dialog.
    gate.current?.focus({ preventScroll: true });

    if (phase === "celebrate") {
      celebrate();
      return () => {
        timers.forEach(window.clearTimeout);
        setBackgroundInert(false);
      };
    }

    // The phase was picked from the visitor's own clock. A phone running an hour slow would
    // keep them locked out for an hour after launch, so correct against the server's clock.
    let offset = 0;
    let interval = 0;
    let stopped = false;
    const tick = () => {
      if (stopped) return;
      const left = launchConfig.at - (Date.now() + offset);
      setRemaining(left);
      if (left > 0) return;
      stopped = true;
      window.clearInterval(interval);
      celebrate();
    };
    // First reading on the next frame (the clock shows zeros until then), then twice a second.
    const firstFrame = window.requestAnimationFrame(tick);
    interval = window.setInterval(tick, 500);

    const sent = Date.now();
    fetch("/api/now", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<{ now?: number }>) : null))
      .then((d) => {
        if (stopped || typeof d?.now !== "number") return;
        const skew = d.now - (sent + Date.now()) / 2; // server time vs. the request's midpoint
        if (Math.abs(skew) < 2000) return;
        offset = skew;
        tick();
      })
      .catch(() => undefined);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(firstFrame);
      window.clearInterval(interval);
      timers.forEach(window.clearTimeout);
      setBackgroundInert(false);
    };
  }, []);

  if (stage === "done") return null;

  // The first render shows zeros; the clock fills them in on the next frame.
  const values = split(remaining ?? 0);

  return (
    <div
      ref={gate}
      tabIndex={-1}
      className="launch-gate"
      data-stage={stage}
      data-released={released || undefined}
      role="dialog"
      aria-modal="true"
      // Once released the gate is only falling confetti: inert drops its links out of the tab
      // order too (aria-hidden alone would leave focusable links inside a hidden region).
      inert={released || undefined}
      aria-label={`${company.shortName} — new website launching soon`}
    >
      <div className="launch-sky" aria-hidden />
      {stage === "burst" && (
        <>
          <div className="launch-flash" aria-hidden />
          <ConfettiBurst className="launch-confetti" />
        </>
      )}

      <div className="launch-panel">
        <div className="launch-emblem">
          <span className="launch-ring" aria-hidden />
          <Image src="/images/brand/emblem-gold.png" alt="" width={77} height={96} quality={90} sizes="154px" priority />
        </div>
        <p className="launch-wordmark">{company.shortName}</p>

        <p className="launch-badge">
          <span className="launch-dot" aria-hidden />
          New website launching soon
        </p>

        <h1 className="launch-title">
          Your trusted <span>chemical solutions</span> partner
        </h1>
        <p className="launch-sub">
          Food, pharma and industrial chemicals, imported and supplied in bulk across India with COA and MSDS support. Our new website goes
          live very soon.
        </p>

        <div className="launch-clock" role="timer" aria-label="Time until launch">
          {UNITS.map((unit, i) => (
            <div key={unit} className="launch-tile">
              <span className="launch-num">{pad(values[i])}</span>
              <span className="launch-unit">{unit}</span>
            </div>
          ))}
        </div>
        <p className="launch-date" suppressHydrationWarning>
          Launching on <b>{launchDateLine}</b>
        </p>

        <div className="launch-actions">
          <a className="launch-btn launch-btn-gold" href={`https://wa.me/${company.whatsapp}?text=${WHATSAPP_TEXT}`} target="_blank" rel="noopener noreferrer">
            <span className="launch-btn-ic">
              <Icon icon={WhatsappIcon} size={19} />
            </span>
            <span className="launch-btn-tx">
              <span className="launch-btn-cap">Quick reply</span>
              <span className="launch-btn-val">Inquire on WhatsApp</span>
            </span>
          </a>

          <a className="launch-btn" href={company.phoneHref}>
            <span className="launch-btn-ic">
              <Icon icon={Call02Icon} size={19} />
            </span>
            <span className="launch-btn-tx">
              <span className="launch-btn-cap">Call us</span>
              <span className="launch-btn-val">+91 {company.phoneDisplay}</span>
            </span>
          </a>

          <a className="launch-btn" href={`mailto:${company.email}`}>
            <span className="launch-btn-ic">
              <Icon icon={Mail01Icon} size={19} />
            </span>
            <span className="launch-btn-tx">
              <span className="launch-btn-cap">Email us</span>
              <span className="launch-btn-val">{company.email}</span>
            </span>
          </a>
        </div>

        <div className="launch-foot">
          <p>
            {company.office.lines.join(", ")} · GST {company.gst}
          </p>
          <div className="launch-social">
            {SOCIAL.map((s, i) => (
              <a key={s.label} href={company.social[i]} target="_blank" rel="noopener noreferrer" aria-label={`${company.shortName} on ${s.label}`}>
                <Icon icon={s.icon} size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="launch-live">
        <div className="launch-live-in">
          <div className="launch-emblem launch-emblem-sm">
            <span className="launch-ring" aria-hidden />
            <Image src="/images/brand/emblem-gold.png" alt="" width={58} height={72} quality={90} sizes="144px" />
          </div>
          <p className="launch-wordmark">{company.shortName}</p>
          <h2 className="launch-word" aria-label="We're live">
            {LIVE_WORD.split("").map((ch, i) => (
              <span key={i} aria-hidden style={{ "--i": i } as CSSProperties}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </h2>
          <p className="launch-live-sub">The new website is ready</p>
        </div>
      </div>
    </div>
  );
}
