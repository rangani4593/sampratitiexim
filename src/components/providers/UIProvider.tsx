"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type EnquiryState = { open: boolean; product?: string };

type UIContext = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  enquiry: EnquiryState;
  openEnquiry: (product?: string) => void;
  closeEnquiry: () => void;
};

const Ctx = createContext<UIContext | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [enquiry, setEnquiry] = useState<EnquiryState>({ open: false });
  const pathname = usePathname();

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setSearchOpen(false);
    setEnquiry((e) => (e.open ? { open: false, product: e.product } : e));
  }

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openEnquiry = useCallback((product?: string) => setEnquiry({ open: true, product }), []);
  const closeEnquiry = useCallback(() => setEnquiry((e) => ({ open: false, product: e.product })), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // While the launch gate is up the site behind it is inert: a shortcut must not
      // open an invisible search underneath it and steal focus.
      const gate = document.documentElement.dataset.launch;
      if (gate === "countdown" || gate === "celebrate") return;
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({ searchOpen, openSearch, closeSearch, enquiry, openEnquiry, closeEnquiry }),
    [searchOpen, openSearch, closeSearch, enquiry, openEnquiry, closeEnquiry],
  );
  return <Ctx value={value}>{children}</Ctx>;
}

export function useUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
