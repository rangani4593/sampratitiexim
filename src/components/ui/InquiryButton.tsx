"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useUI } from "@/components/providers/UIProvider";
import { Icon } from "./Icon";

export function InquiryButton({
  product,
  label = "Send inquiry",
  className = "btn btn-gold",
  arrow = true,
}: {
  product?: string;
  label?: string;
  className?: string;
  arrow?: boolean;
}) {
  const { openEnquiry } = useUI();
  return (
    <button type="button" className={className} onClick={() => openEnquiry(product)}>
      {label}
      {arrow && <Icon icon={ArrowRight01Icon} size={18} />}
    </button>
  );
}
