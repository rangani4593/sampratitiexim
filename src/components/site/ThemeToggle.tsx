"use client";

import { ComputerIcon, Moon02Icon, Sun03Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

function applyDom(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  syncBarColor(theme);
}

/*
  The saved choice is an external store (localStorage). Reading it through
  useSyncExternalStore gives "system" on the server and the real value on the client
  without a setState-in-effect, and a "storage" event keeps other open tabs in step.
*/
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY && e.key !== null) return;
    applyDom(readTheme());
    onChange();
  };
  listeners.add(onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function applyTheme(theme: Theme) {
  applyDom(theme);
  try {
    if (theme === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
  notify();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system" as Theme);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Metadata tags can land after the head script runs, so re-pin the browser bar colour once mounted.
    syncBarColor(readTheme());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    // A menu opens with focus on its checked item, so arrow keys work straight away.
    menu.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = OPTIONS.find((o) => o.value === theme)!;

  return (
    <div
      ref={wrap}
      className="relative shrink-0"
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current.label}`}
        title={`Theme: ${current.label}`}
        className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink-2 hairline transition-colors hover:text-ink"
      >
        {/* All three icons ship in the HTML and CSS shows the one matching html[data-theme],
            which the head script sets before first paint: no System-icon flash for visitors
            who saved Light or Dark. */}
        {OPTIONS.map((o) => (
          <span key={o.value} className={`theme-ic theme-ic-${o.value}`} aria-hidden>
            <Icon icon={o.icon} size={19} />
          </span>
        ))}
      </button>

      {open && (
        <div
          ref={menu}
          role="menu"
          aria-label="Theme"
          className="absolute right-0 top-full z-50 mt-2 w-40 rounded-2xl bg-surface p-1.5 shadow-lg hairline"
          onKeyDown={(e) => {
            const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitemradio"]'));
            const at = items.indexOf(document.activeElement as HTMLElement);
            const next = { ArrowDown: at + 1, ArrowUp: at - 1, Home: 0, End: items.length - 1 }[e.key];
            if (next === undefined) return;
            e.preventDefault();
            items[(next + items.length) % items.length]?.focus();
          }}
        >
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === o.value}
              tabIndex={theme === o.value ? 0 : -1}
              onClick={() => {
                applyTheme(o.value);
                setOpen(false);
                trigger.current?.focus();
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
