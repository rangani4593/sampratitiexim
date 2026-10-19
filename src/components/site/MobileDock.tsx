"use client";

import { Building03Icon, Call02Icon, DashboardSquare01Icon, Home04Icon, SentIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/components/providers/UIProvider";
import { Icon } from "@/components/ui/Icon";

type Props = {
  phoneHref: string;
  productNames: Record<string, string>;
  companyPaths: string[];
};

export function MobileDock({ phoneHref, productNames, companyPaths }: Props) {
  const pathname = usePathname();
  const { openEnquiry } = useUI();
  const productName = productNames[pathname];

  const wrap = "fixed inset-x-0 bottom-0 z-40 md:hidden";
  const pad = { paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)", viewTransitionName: "mobile-dock" } as const;

  if (productName) {
    return (
      <div className={wrap} style={pad}>
        <div className="mx-3 mb-1 flex items-center gap-2 rounded-[22px] bg-surface/95 p-2 backdrop-blur-xl lift hairline">
          <a href={phoneHref} className="btn btn-ghost h-12 shrink-0 px-4" aria-label="Call Sampratiti Exim">
            <Icon icon={Call02Icon} size={20} />
            Call
          </a>
          <button type="button" className="btn btn-gold h-12 min-w-0 flex-1" onClick={() => openEnquiry(productName)}>
            <span className="truncate">Get a quote</span>
            <Icon icon={SentIcon} size={18} />
          </button>
        </div>
      </div>
    );
  }

  const items = [
    { href: "/", label: "Home", icon: Home04Icon, active: pathname === "/" },
    { href: "/products-and-services", label: "Products", icon: DashboardSquare01Icon, active: pathname.startsWith("/products") || pathname.startsWith("/range") },
  ];
  const right = [{ href: "/profile", label: "Company", icon: Building03Icon, active: companyPaths.some((p) => pathname.startsWith(p)) }];

  const itemClass = (active: boolean) =>
    `flex h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition-colors ${active ? "text-ink" : "text-ink-3"}`;

  return (
    <nav aria-label="Quick actions" className={wrap} style={pad}>
      <div className="mx-3 mb-1 flex items-end rounded-[22px] bg-surface/95 px-1.5 py-1 backdrop-blur-xl lift hairline">
        {items.map((it) => (
          <Link key={it.href} href={it.href} aria-current={it.active ? "page" : undefined} className={itemClass(it.active)}>
            <Icon icon={it.icon} size={22} strokeWidth={it.active ? 2 : 1.6} />
            {it.label}
          </Link>
        ))}
        <a href={phoneHref} className="relative -mt-5 flex flex-1 flex-col items-center gap-1 text-[11px] font-semibold text-ink" aria-label="Call Sampratiti Exim">
          <span className="droplet grid h-[3.6rem] w-[2.9rem] place-items-center bg-gold pt-3 text-on-gold shadow-lg">
            <Icon icon={Call02Icon} size={21} strokeWidth={2} />
          </span>
          Call
        </a>
        <button type="button" onClick={() => openEnquiry()} className={itemClass(false)}>
          <Icon icon={SentIcon} size={22} />
          Enquire
        </button>
        {right.map((it) => (
          <Link key={it.href} href={it.href} aria-current={it.active ? "page" : undefined} className={itemClass(it.active)}>
            <Icon icon={it.icon} size={22} strokeWidth={it.active ? 2 : 1.6} />
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
