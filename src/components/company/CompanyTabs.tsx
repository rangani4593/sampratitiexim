"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function CompanyTabs({ tabs }: { tabs: readonly { href: string; label: string }[] }) {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bar.current?.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [pathname]);
  return (
    <nav aria-label="Company" className="sticky top-16 z-30 border-y border-line bg-bg md:top-[72px]">
      <div ref={bar} className="shell no-scrollbar flex gap-2 overflow-x-auto py-3">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} aria-current={pathname === t.href ? "page" : undefined} className="chip shrink-0">
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
