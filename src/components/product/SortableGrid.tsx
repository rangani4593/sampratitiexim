"use client";

import { useMemo, useState } from "react";

type Item = { key: string; price: number | null; name: string; node: React.ReactNode };
type Sort = "featured" | "low" | "high" | "name";

const LABELS: Record<Sort, string> = { featured: "Featured", low: "Price: low to high", high: "Price: high to low", name: "Name A-Z" };

export function SortableGrid({ items, className = "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4" }: { items: Item[]; className?: string }) {
  const [sort, setSort] = useState<Sort>("featured");
  const sorted = useMemo(() => {
    const list = [...items];
    const price = (p: number | null, fallback: number) => (p === null ? fallback : p);
    if (sort === "low") list.sort((a, b) => price(a.price, Infinity) - price(b.price, Infinity));
    if (sort === "high") list.sort((a, b) => price(b.price, -Infinity) - price(a.price, -Infinity));
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [items, sort]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-ink-2">
          {items.length} {items.length === 1 ? "product" : "products"}
        </p>
        <label className="flex items-center gap-2 text-sm text-ink-2">
          <span className="hidden sm:inline">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-10 rounded-full bg-surface px-4 pr-8 text-sm font-medium text-ink hairline">
            {(Object.keys(LABELS) as Sort[]).map((s) => (
              <option key={s} value={s}>
                {LABELS[s]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={className}>
        {sorted.map((it) => (
          <div key={it.key}>{it.node}</div>
        ))}
      </div>
    </div>
  );
}
