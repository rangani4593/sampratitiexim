"use client";

import {
  Award01Icon,
  CheckmarkBadge02Icon,
  DeliveryTruck01Icon,
  File01Icon,
  GlobalIcon,
  Package,
  Store01Icon,
  Tag01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";

const ICONS = {
  sourcing: GlobalIcon,
  portfolio: Store01Icon,
  imported: CheckmarkBadge02Icon,
  pricing: Tag01Icon,
  docs: File01Icon,
  ahmedabad: Package,
  panindia: DeliveryTruck01Icon,
  service: UserGroupIcon,
  bulk: Award01Icon,
} as const;

export function AdvantageList({ items }: { items: readonly { key: string; title: string; body: string }[] }) {
  const reduce = useReducedMotion();
  return (
    <ol className="grid gap-2 md:gap-3">
      {items.map((a) => (
        <motion.li
          key={a.key}
          initial={reduce ? false : { opacity: 0.42 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-38% 0px -38% 0px" }}
          transition={{ duration: 0.4 }}
          className="flex gap-4 rounded-[var(--radius-surface)] bg-surface p-4 hairline md:gap-5 md:p-6"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-gold-soft text-ink md:h-12 md:w-12">
            <Icon icon={ICONS[a.key as keyof typeof ICONS]} size={22} />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{a.title}</h3>
            <p className="mt-1 max-w-[52ch] leading-relaxed text-ink-2">{a.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
