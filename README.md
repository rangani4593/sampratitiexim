This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Launch screen

A full-screen gate (`src/components/launch/`) sits above the finished site: brand emblem,
countdown, contact buttons. The real pages stay in the DOM underneath, so crawlers still
read them and the reveal needs no reload — at launch time the gate holds **WE'RE LIVE** for
a second, then confetti fires and the whole panel flies apart to reveal the site.

Everything is driven by build-time env vars (put them in `.env.local` for dev, or in the
hosting dashboard for production — a change needs a redeploy):

| Variable | Default | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_LAUNCH_MODE` | `off` | Master switch. `off` removes the gate from the site completely. |
| `NEXT_PUBLIC_LAUNCH_AT` | `2026-11-16T07:00:00+05:30` | Launch moment (any ISO datetime with an offset). |
| `NEXT_PUBLIC_LAUNCH_CELEBRATE_HOURS` | `24` | How long after launch a fresh load still plays the burst. |
| `NEXT_PUBLIC_LAUNCH_PREVIEW` | *(blank)* | Force a phase: `countdown`, `celebrate` or `off`. |

**Rehearsing the animation.** Add `?launch=celebrate` to any URL to replay the live moment
on the spot (`?launch=countdown` forces the countdown). The query param wins over
`NEXT_PUBLIC_LAUNCH_PREVIEW`, and both win over the clock — so the animation can be checked
on the real deployment without touching the launch time. `?launch=off` (skip the gate) only
works in `next dev`: on a production build anyone with the link could walk past the gate, so
there it is ignored. To open a deployment without the gate, set `NEXT_PUBLIC_LAUNCH_PREVIEW=off`
on that deployment.

**On launch day** the gate shows the countdown until 7:00 AM IST; after that, every fresh
load inside the celebrate window replays the reveal (about 3.4 s: WE'RE LIVE for 1.9 s, then the burst), and once the window passes
the site opens normally. Set `NEXT_PUBLIC_LAUNCH_MODE=off` afterwards to drop the feature
entirely.

Notes: the phase is decided in the browser (a tiny script in `<head>` runs before first
paint), so static pages stay cacheable and there is no flash in either direction; without
JavaScript the visitor goes straight to the site; `prefers-reduced-motion` replaces the
confetti and fly-apart with plain fades.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
