"use client";

import { ArrowDown01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Item = { name: string; category: string };
let cache: Item[] | null = null;

export function ProductPicker({ value, onChange, invalid, describedBy }: { value: string; onChange: (v: string) => void; invalid?: boolean; describedBy?: string }) {
  const id = useId();
  const [items, setItems] = useState<Item[]>(cache ?? []);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (cache) return;
    fetch("/api/products")
      .then((r) => r.json())
      .then((d: Item[]) => {
        cache = d;
        setItems(d);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const results = useMemo(() => {
    const words = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const pool = words.length ? items.filter((i) => words.every((w) => `${i.name} ${i.category}`.toLowerCase().includes(w))) : items;
    return pool.slice(0, 30);
  }, [items, value]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-i="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const pick = (name: string) => {
    onChange(name);
    setOpen(false);
  };

  return (
    <div ref={root} className="relative">
      <Icon icon={Search01Icon} size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
      <input
        id={`${id}-input`}
        name="product"
        value={value}
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        autoComplete="off"
        placeholder="Search and select a product"
        className="field pl-11 pr-12"
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setCursor(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setCursor((c) => Math.min(c + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setCursor((c) => Math.max(c - 1, 0));
          } else if (e.key === "Enter" && open && results[cursor]) {
            e.preventDefault();
            pick(results[cursor].name);
          } else if (e.key === "Escape" && open) {
            e.stopPropagation();
            setOpen(false);
          }
        }}
      />
      <button type="button" tabIndex={-1} aria-label="Show products" onClick={() => setOpen((o) => !o)} className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-ink-3">
        <Icon icon={ArrowDown01Icon} size={18} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+0.4rem)] z-20 max-h-60 overflow-y-auto overscroll-contain rounded-2xl bg-surface p-1.5 lift hairline"
        >
          {results.length === 0 && <li className="px-3 py-3 text-sm text-ink-2">{items.length ? "No matching product. You can still type your own." : "Loading products..."}</li>}
          {results.map((r, i) => (
            <li key={`${r.category}-${r.name}-${i}`} role="option" aria-selected={i === cursor} data-i={i}>
              <button
                type="button"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => pick(r.name)}
                onMouseMove={() => setCursor(i)}
                className={`flex w-full flex-col rounded-xl px-3 py-2.5 text-left ${i === cursor ? "bg-gold-soft" : ""}`}
              >
                <span className="truncate text-[0.95rem] font-medium text-ink">{r.name}</span>
                <span className="truncate text-xs text-ink-3">{r.category}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
