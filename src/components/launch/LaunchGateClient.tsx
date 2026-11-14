"use client";

import dynamic from "next/dynamic";

/*
  The launch gate renders only in the browser. Server-rendered, its markup — a second
  <h1>, "New website launching soon", a zeroed countdown — sat in every page's HTML for
  as long as launch mode stayed on, and that is what crawlers without JavaScript, link
  previews and AI bots read. launch.css keeps the site hidden until the gate has mounted,
  so there is still no flash of the site before launch.
*/
const LaunchGate = dynamic(() => import("./LaunchGate").then((m) => m.LaunchGate), { ssr: false });

export function LaunchGateClient() {
  return <LaunchGate />;
}
