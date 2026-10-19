"use client";

import { Share08Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-ghost h-12 w-12 shrink-0 px-0"
      aria-label={copied ? "Link copied" : "Share this product"}
      onClick={async () => {
        const url = window.location.href;
        if (navigator.share) {
          await navigator.share({ title, url }).catch(() => undefined);
          return;
        }
        await navigator.clipboard.writeText(url).catch(() => undefined);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
    >
      <Icon icon={copied ? Tick02Icon : Share08Icon} size={20} />
    </button>
  );
}
