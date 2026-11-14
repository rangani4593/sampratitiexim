"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useUI } from "@/components/providers/UIProvider";
import { Icon } from "@/components/ui/Icon";
import { useModal } from "@/lib/use-modal";
import { EnquiryForm } from "./EnquiryForm";

export function EnquirySheet({ phone }: { phone: { display: string; href: string } }) {
  const { enquiry, closeEnquiry } = useUI();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const drag = useDragControls();
  useModal(panel, enquiry.open);

  useEffect(() => {
    if (!enquiry.open) return;
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("input[name=mobile]")?.focus({ preventScroll: true }), 260);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeEnquiry();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [enquiry.open, closeEnquiry]);

  return (
    <AnimatePresence>
      {enquiry.open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-6">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close enquiry"
            className="absolute inset-0 bg-[#06121b]/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnquiry}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            initial={reduce ? { opacity: 0 } : { y: "100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            // Drag-to-dismiss starts only from the grab handle: the panel itself scrolls,
            // and a swipe meant to scroll the form back up must never throw it away.
            drag={reduce ? false : "y"}
            dragListener={false}
            dragControls={drag}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => (info.offset.y > 120 || info.velocity.y > 600) && closeEnquiry()}
            className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[28px] bg-surface px-5 pb-[max(env(safe-area-inset-bottom),1.25rem)] pt-0 md:max-w-[38rem] md:rounded-[28px] md:px-8 md:pb-8 md:pt-6"
          >
            <div
              className="-mx-5 mb-1 flex cursor-grab touch-none justify-center pb-3 pt-3 active:cursor-grabbing md:hidden"
              onPointerDown={(e) => !reduce && drag.start(e)}
              aria-hidden
            >
              <span className="h-1.5 w-11 rounded-full bg-line-strong" />
            </div>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="enquiry-title" className="text-2xl font-semibold tracking-tight">
                  Send your inquiry
                </h2>
                <p className="mt-1 text-sm text-ink-2">Share your requirement. Our team replies with price, COA and dispatch time.</p>
              </div>
              <button type="button" onClick={closeEnquiry} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-2 text-ink" aria-label="Close">
                <Icon icon={Cancel01Icon} size={20} />
              </button>
            </div>
            <EnquiryForm product={enquiry.product} phone={phone} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
