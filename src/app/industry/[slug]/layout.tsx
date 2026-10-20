import { notFound } from "next/navigation";
import { getIndustry } from "@/data/industries";

export const instant = false;

export default async function IndustryLayout({ children, params }: LayoutProps<"/industry/[slug]">) {
  const { slug } = await params;
  if (!getIndustry(slug)) notFound();
  return children;
}
