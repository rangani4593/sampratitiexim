import { notFound } from "next/navigation";
import { getCategory } from "@/lib/catalog";

// Unknown slugs must 404 before streaming starts, so this segment may block briefly.
export const instant = false;

export default async function CategoryLayout({ children, params }: LayoutProps<"/[category]">) {
  const { category } = await params;
  if (!getCategory(category)) notFound();
  return children;
}
