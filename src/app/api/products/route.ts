import { NextResponse } from "next/server";
import { products, typeOf } from "@/lib/catalog";

export function GET() {
  const items = products.map((p) => ({ name: p.name, category: typeOf(p).name }));
  return NextResponse.json(items, { headers: { "Cache-Control": "public, max-age=3600" } });
}
