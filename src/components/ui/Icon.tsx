import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";

export function Icon({ size = 20, strokeWidth = 1.6, ...props }: HugeiconsIconProps) {
  return <HugeiconsIcon size={size} strokeWidth={strokeWidth} aria-hidden {...props} />;
}
