import { NextResponse } from "next/server";
import { allProducts } from "@/lib/catalog";

export function GET() {
  const items = allProducts.map(({ category, product }) => ({ name: product.name, category: category.name }));
  return NextResponse.json(items, { headers: { "Cache-Control": "public, max-age=3600" } });
}
