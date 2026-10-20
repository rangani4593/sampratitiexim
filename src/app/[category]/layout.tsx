import { notFound } from "next/navigation";
import { getProduct } from "@/lib/catalog";

export const instant = false;

export default async function ProductLayout({ children, params }: LayoutProps<"/[category]">) {
  const { category } = await params;
  if (!getProduct(category)) notFound();
  return children;
}
