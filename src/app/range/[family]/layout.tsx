import { notFound } from "next/navigation";
import { getFamily } from "@/lib/catalog";

// Unknown slugs must 404 before streaming starts, so this segment may block briefly.
export const instant = false;

export default async function FamilyLayout({ children, params }: LayoutProps<"/range/[family]">) {
  const { family } = await params;
  if (!getFamily(family)) notFound();
  return children;
}
