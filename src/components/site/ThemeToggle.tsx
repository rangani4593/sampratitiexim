"use client";

import { ComputerIcon, Moon02Icon, Sun03Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "theme";
const BAR_COLOR = { light: "#edf1f3", dark: "#0a1823" } as const;

const OPTIONS = [
  { value: "system", label: "System", icon: ComputerIcon },
  { value: "light", label: "Light", icon: Sun03Icon },
  { value: "dark", label: "Dark", icon: Moon02Icon },
] as const;

function readTheme(): Theme {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

// The theme-color metas are keyed to the system scheme; pin them when the visitor overrides it.
function syncBarColor(theme: Theme) {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    const systemColor = m.media.includes("dark") ? BAR_COLOR.dark : BAR_COLOR.light;
    m.content = theme === "system" ? systemColor : BAR_COLOR[theme];
  });
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  syncBarColor(theme);

  try {
    if (theme === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = readTheme();
    setTheme(saved);
    // Metadata tags can land after the head script runs, so re-pin the browser bar colour once mounted.
    syncBarColor(saved);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = OPTIONS.find((o) => o.value === theme)!;

  return (
    <div ref={wrap} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current.label}`}
        title={`Theme: ${current.label}`}
        className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink-2 hairline transition-colors hover:text-ink"
      >
        <Icon icon={current.icon} size={19} />
      </button>

      {open && (
        <div role="menu" aria-label="Theme" className="absolute right-0 top-full z-50 mt-2 w-40 rounded-2xl bg-surface p-1.5 shadow-lg hairline">
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === o.value}
              onClick={() => {
                setTheme(o.value);
                applyTheme(o.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-surface-2 ${theme === o.value ? "text-ink" : "text-ink-2"}`}
            >
              <Icon icon={o.icon} size={17} />
              <span className="flex-1">{o.label}</span>
              {theme === o.value && <Icon icon={Tick02Icon} size={16} className="text-gold" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
