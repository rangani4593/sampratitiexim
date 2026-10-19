"use client";

import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Icon } from "./Icon";

export function CopyValue({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
      className={`group flex w-full items-center justify-between gap-3 text-left ${className}`}
      aria-label={`Copy ${label} ${value}`}
    >
      <span className="min-w-0">
        <span className="block text-xs text-ink-3">{label}</span>
        <span className="block truncate font-mono text-[0.9rem] font-medium text-ink">{value}</span>
      </span>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${copied ? "bg-gold text-on-gold" : "bg-surface-2 text-ink-3 group-hover:text-ink"}`}>
        <Icon icon={copied ? Tick02Icon : Copy01Icon} size={15} />
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
