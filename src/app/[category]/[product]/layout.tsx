import { notFound } from "next/navigation";
import { getProduct } from "@/lib/catalog";

// Unknown slugs must 404 before streaming starts, so this segment may block briefly.
export const instant = false;

export default async function ProductLayout({ children, params }: LayoutProps<"/[category]/[product]">) {
  const { category, product } = await params;
  if (!getProduct(category, product)) notFound();
  return children;
}
