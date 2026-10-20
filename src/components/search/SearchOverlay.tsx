"use client";

import { ArrowRight01Icon, Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useUI } from "@/components/providers/UIProvider";
import { Icon } from "@/components/ui/Icon";
import type { SearchItem } from "@/lib/catalog";

type Props = {
  items: SearchItem[];
  quickLinks: { href: string; label: string }[];
};

export function SearchOverlay({ items, quickLinks }: Props) {
  const { searchOpen, closeSearch } = useUI();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const deferred = useDeferredValue(query);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return [];
    const words = q.split(/\s+/);
    return items
      .filter((it) => words.every((w) => it.keywords.includes(w)))
      .map((it) => {
        const n = it.name.toLowerCase();
        return { it, score: (n.startsWith(q) ? 3 : 0) + (n.includes(q) ? 2 : 0) + (it.category.toLowerCase().includes(q) ? 1 : 0) };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 40)
      .map((r) => r.it);
  }, [deferred, items]);

  const [lastDeferred, setLastDeferred] = useState(deferred);
  if (deferred !== lastDeferred) {
    setLastDeferred(deferred);
    setCursor(0);
  }

  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => input.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSearch();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(results[cursor].href);
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex justify-center md:items-start md:px-6 md:pt-[9vh]">
          <motion.button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-[#06121b]/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[100dvh] w-full flex-col bg-surface md:h-auto md:max-h-[76vh] md:max-w-[44rem] md:rounded-[24px] md:lift"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3 md:px-5">
              <Icon icon={Search01Icon} size={22} className="text-ink-3" />
              <input
                ref={input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                type="search"
                enterKeyHint="search"
                placeholder="Search sucralose, E211, xanthan, TCCA..."
                aria-label="Search products"
                aria-controls="search-results"
                aria-activedescendant={results.length ? `search-opt-${cursor}` : undefined}
                className="h-12 min-w-0 flex-1 bg-transparent text-[1.05rem] text-ink outline-none placeholder:text-ink-3"
              />
              <button type="button" onClick={closeSearch} className="grid h-10 w-10 place-items-center rounded-full bg-surface-2" aria-label="Close search">
                <Icon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 md:p-3">
              {!query.trim() && (
                <div className="p-3">
                  <p className="text-sm font-medium text-ink-3">Browse by group</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {quickLinks.map((l) => (
                      <Link key={l.href} href={l.href} className="chip">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="px-3 py-10 text-center">
                  <p className="font-semibold">No product matches &ldquo;{query}&rdquo;</p>
                  <p className="mx-auto mt-1 max-w-[36ch] text-sm text-ink-2">
                    Try a shorter word like &ldquo;citric&rdquo; or an E-number like &ldquo;E211&rdquo;. We also source products not listed here.
                  </p>
                </div>
              )}

              {results.length > 0 && (
                <ul ref={list} id="search-results" role="listbox" aria-label="Products">
                  {results.map((r, i) => (
                    <li key={r.href} id={`search-opt-${i}`} role="option" aria-selected={i === cursor} data-index={i}>
                      <Link
                        href={r.href}
                        onMouseMove={() => setCursor(i)}
                        className={`flex items-center gap-3 rounded-2xl p-2 pr-3 transition-colors ${i === cursor ? "bg-gold-soft" : ""}`}
                      >
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                          {r.image && <Image src={r.image} alt="" fill sizes="56px" className="object-cover" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-ink">{r.name}</span>
                          <span className="mt-0.5 block truncate text-sm text-ink-3">
                            {r.category}
                          </span>
                        </span>
                        <Icon icon={ArrowRight01Icon} size={18} className="shrink-0 text-ink-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="hidden items-center justify-between border-t border-line px-5 py-2.5 text-xs text-ink-3 md:flex">
              <span>
                <kbd className="font-mono">Up/Down</kbd> to move, <kbd className="font-mono">Enter</kbd> to open
              </span>
              <span>{items.length} products</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
