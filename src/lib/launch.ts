/*
  Launch screen configuration.

  Everything is driven by build-time public env vars so the whole feature can be
  switched off from the hosting dashboard without a code change:

    NEXT_PUBLIC_LAUNCH_MODE               on | off      (master switch, default off)
    NEXT_PUBLIC_LAUNCH_AT                 ISO datetime  (default Mon 16 Nov 2026, 07:00 IST)
    NEXT_PUBLIC_LAUNCH_CELEBRATE_HOURS    number        (how long after launch the
                                                         "we're live" burst still plays
                                                         on a fresh load, default 24)
    NEXT_PUBLIC_LAUNCH_PREVIEW            countdown | celebrate | off

  A `?launch=countdown|celebrate` query param overrides the phase for one page load,
  which is the quickest way to rehearse the animation on any deployment.
  `?launch=off` (skip the gate) only works in development: on a production build it
  would let anyone with the link walk past the gate before launch.

  Time is never read on the server: the phase is decided in the browser, so static
  pages stay cacheable and the countdown is correct for every visitor.
*/

export type LaunchPhase = "countdown" | "celebrate" | "done";

/** Monday, 16 November 2026, 7:00 AM IST. */
const DEFAULT_LAUNCH_AT = "2026-11-16T07:00:00+05:30";
const DEFAULT_CELEBRATE_HOURS = 24;
const HOUR_MS = 3_600_000;

function readTime(raw: string | undefined): number {
  const parsed = Date.parse((raw ?? "").trim() || DEFAULT_LAUNCH_AT);
  return Number.isNaN(parsed) ? Date.parse(DEFAULT_LAUNCH_AT) : parsed;
}

function readHours(raw: string | undefined): number {
  const n = Number((raw ?? "").trim());
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_CELEBRATE_HOURS;
}

function readPreview(raw: string | undefined): LaunchPhase | "" {
  switch ((raw ?? "").trim().toLowerCase()) {
    case "countdown":
      return "countdown";
    case "celebrate":
    case "live":
      return "celebrate";
    case "off":
    case "done":
      return "done";
    default:
      return "";
  }
}

export const launchConfig = {
  enabled: ["on", "1", "true", "yes"].includes((process.env.NEXT_PUBLIC_LAUNCH_MODE ?? "").trim().toLowerCase()),
  at: readTime(process.env.NEXT_PUBLIC_LAUNCH_AT),
  celebrateMs: readHours(process.env.NEXT_PUBLIC_LAUNCH_CELEBRATE_HOURS) * HOUR_MS,
  preview: readPreview(process.env.NEXT_PUBLIC_LAUNCH_PREVIEW),
} as const;

/** Phase for a given clock reading, ignoring any preview override. */
export function phaseAt(now: number): LaunchPhase {
  if (now < launchConfig.at) return "countdown";
  if (now < launchConfig.at + launchConfig.celebrateMs) return "celebrate";
  return "done";
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};
const TIME_FORMAT: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true };

/** "Monday, 16 November 2026 · 7:00 am IST" — always stated in IST, wherever the visitor is. */
export const launchDateLine = `${new Intl.DateTimeFormat("en-IN", DATE_FORMAT).format(launchConfig.at)} · ${new Intl.DateTimeFormat(
  "en-IN",
  TIME_FORMAT,
).format(launchConfig.at)} IST`;

/*
  Runs in <head>, before the first paint, so the gate never flashes:
  no-JS visitors and visitors arriving after the window simply get the site.
*/
export function launchBootScript(): string {
  const { at, celebrateMs, preview } = launchConfig;
  const allowSkip = process.env.NODE_ENV !== "production";
  return `(function(){try{var q=new URLSearchParams(location.search).get("launch")||"";var f=(q||${JSON.stringify(
    preview,
  )}).toLowerCase();if(f==="live")f="celebrate";if(f==="off")f="done";if(f==="done"&&q&&!${JSON.stringify(allowSkip)})f="";var p;if(f==="countdown"||f==="celebrate"||f==="done"){p=f}else{var n=Date.now();p=n<${at}?"countdown":(n<${
    at + celebrateMs
  }?"celebrate":"done")}document.documentElement.dataset.launch=p}catch(e){document.documentElement.dataset.launch="done"}})()`;
}
