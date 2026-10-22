"use client";

import { ArrowDown01Icon, ArrowRight01Icon, Call02Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useUI } from "@/components/providers/UIProvider";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { InquiryButton } from "@/components/ui/InquiryButton";

export type NavFamily = {
  slug: string;
  name: string;
  blurb: string;
  cover: string;
  productCount: number;
  categories: { slug: string; name: string; code: string | null; count: number }[];
};

type Props = {
  families: NavFamily[];
  companyLinks: { href: string; label: string }[];
  productCount: number;
  phone: { display: string; href: string };
};

export function Header({ families, companyLinks, productCount, phone }: Props) {
  const { openSearch } = useUI();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<null | "products" | "company">(null);
  const [activeFamily, setActiveFamily] = useState(families[0]?.slug);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const nextScrolled = y > 8;
    if (nextScrolled !== scrolled) setScrolled(nextScrolled);
  });

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(null);
  }

  const open = (m: "products" | "company") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(m);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const current = families.find((f) => f.slug === activeFamily) ?? families[0];

  return (
    <header style={{ viewTransitionName: "site-header" }} className="sticky top-0 z-40" onKeyDown={(e) => e.key === "Escape" && setMenu(null)}>
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || menu ? "bg-bg/95 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-bg/0"
        }`}
      >
        <div className="shell flex h-16 items-center gap-4 md:h-[72px]">
          <Logo />

          <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 lg:flex">
            <button
              type="button"
              aria-expanded={menu === "products"}
              aria-controls="mega-products"
              onMouseEnter={() => open("products")}
              onMouseLeave={scheduleClose}
              onClick={() => setMenu(menu === "products" ? null : "products")}
              className={`flex h-10 items-center gap-1 rounded-full px-4 text-[0.95rem] font-medium transition-colors hover:bg-surface ${
                menu === "products" || pathname.startsWith("/products") ? "text-ink" : "text-ink-2"
              }`}
            >
              Products
              <Icon icon={ArrowDown01Icon} size={16} className={`transition-transform ${menu === "products" ? "rotate-180" : ""}`} />
            </button>
            <button
              type="button"
              aria-expanded={menu === "company"}
              aria-controls="mega-company"
              onMouseEnter={() => open("company")}
              onMouseLeave={scheduleClose}
              onClick={() => setMenu(menu === "company" ? null : "company")}
              className={`flex h-10 items-center gap-1 rounded-full px-4 text-[0.95rem] font-medium transition-colors hover:bg-surface ${
                menu === "company" ? "text-ink" : "text-ink-2"
              }`}
            >
              Company
              <Icon icon={ArrowDown01Icon} size={16} className={`transition-transform ${menu === "company" ? "rotate-180" : ""}`} />
            </button>
            {[
              { href: "/industry", label: "Industries" },
              { href: "/enquiry", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`flex h-10 items-center rounded-full px-4 text-[0.95rem] font-medium transition-colors hover:bg-surface ${
                  isActive(l.href) ? "text-ink" : "text-ink-2"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex min-w-0 items-center justify-end gap-2 xl:flex-1">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-12 min-w-0 items-center gap-3 whitespace-nowrap rounded-full bg-surface px-4 text-ink-2 hairline transition-colors hover:text-ink xl:flex-1 xl:max-w-[28rem] min-[1700px]:pr-2.5"
              aria-label="Search products"
            >
              <Icon icon={Search01Icon} size={21} className="shrink-0" />
              <span className="hidden text-[0.95rem] md:inline xl:hidden">Search</span>
              <span className="hidden min-w-0 flex-1 truncate text-left text-[0.95rem] xl:inline">Search {productCount} products</span>
              <kbd className="hidden shrink-0 rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-3 min-[1700px]:inline">Ctrl K</kbd>
            </button>
            <ThemeToggle />
            <a href={phone.href} className="hidden h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 text-sm font-semibold text-ink min-[1700px]:flex">
              <Icon icon={Call02Icon} size={18} />
              {phone.display}
            </a>
            <div className="hidden shrink-0 md:block">
              <InquiryButton className="btn btn-gold h-11" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menu === "products" && (
          <motion.div
            id="mega-products"
            key="products"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => open("products")}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="shell">
              <div className="grid grid-cols-[17rem_1fr_17rem] overflow-hidden rounded-[var(--radius-surface)] bg-surface lift hairline">
                <ul className="border-r border-line p-3">
                  {families.map((f) => (
                    <li key={f.slug}>
                      <Link
                        href={`/products-and-services#${f.slug}`}
                        onMouseEnter={() => setActiveFamily(f.slug)}
                        onFocus={() => setActiveFamily(f.slug)}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[0.95rem] transition-colors ${
                          f.slug === current?.slug ? "bg-gold-soft font-semibold text-ink" : "text-ink-2 hover:text-ink"
                        }`}
                      >
                        {f.name}
                        <span className="font-mono text-[11px] text-ink-3">{f.productCount}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="p-6">
                  {current && (
                    <>
                      <p className="max-w-[46ch] text-sm leading-relaxed text-ink-2">{current.blurb}</p>
                      <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
                        {current.categories.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/${c.slug}`} className="group flex items-baseline justify-between gap-3 rounded-lg py-2 text-[0.95rem] text-ink">
                              <span className="underline-offset-4 group-hover:underline">{c.name}</span>
                              <span className="font-mono text-[11px] text-ink-3">{c.code}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href={`/products-and-services#${current.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                        View {current.name.toLowerCase()}
                        <Icon icon={ArrowRight01Icon} size={16} />
                      </Link>
                    </>
                  )}
                </div>
                <div className="relative flex flex-col bg-surface-2 p-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
                    {current && <Image key={current.cover} src={current.cover} alt="" fill sizes="16rem" className="object-cover" />}
                  </div>
                  <Link href="/products-and-services" className="btn btn-ghost mt-auto h-11 w-full bg-surface">
                    All {productCount} products
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {menu === "company" && (
          <motion.div
            id="mega-company"
            key="company"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => open("company")}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="shell">
              <div className="ml-[13.5rem] w-[30rem] rounded-[var(--radius-surface)] bg-surface p-3 lift hairline">
                <ul className="grid grid-cols-2 gap-1">
                  {companyLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        aria-current={isActive(l.href) ? "page" : undefined}
                        className="block rounded-xl px-3.5 py-2.5 text-[0.95rem] text-ink-2 transition-colors hover:bg-gold-soft hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
