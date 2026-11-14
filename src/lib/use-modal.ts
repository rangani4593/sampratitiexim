"use client";

import { useEffect, type RefObject } from "react";
import { lockScroll } from "@/lib/scroll-lock";

/*
  Makes an overlay behave as a real modal while `open`:
  - everything else on the page goes `inert`, so Tab, clicks and screen readers
    cannot wander behind it (aria-modal alone does not stop the Tab key);
  - page scroll is locked without a sideways layout jump;
  - focus goes back to whatever opened it when it closes, unless the visitor
    navigated away from inside it (then the new page keeps focus).
*/
export function useModal(ref: RefObject<HTMLElement | null>, open: boolean) {
  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    if (!node) return;

    let top: HTMLElement = node;
    while (top.parentElement && top.parentElement !== document.body) top = top.parentElement;

    const returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const openedAt = window.location.href;

    // Only touch elements that were not already inert, so other owners (the launch
    // gate) keep their own state when this modal lets go.
    const made: Element[] = [];
    for (const el of Array.from(document.body.children)) {
      // Leave Next's route announcer alone: navigating from inside a modal (a search result)
      // must still be announced to screen readers.
      if (el === top || el.tagName === "SCRIPT" || el.tagName === "NEXT-ROUTE-ANNOUNCER" || el.hasAttribute("inert")) continue;
      el.setAttribute("inert", "");
      made.push(el);
    }
    const unlock = lockScroll();

    return () => {
      made.forEach((el) => el.removeAttribute("inert"));
      unlock();
      if (returnTo?.isConnected && window.location.href === openedAt) returnTo.focus({ preventScroll: true });
    };
  }, [ref, open]);
}
