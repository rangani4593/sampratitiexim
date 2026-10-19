import { NextResponse } from "next/server";

type Enquiry = {
  product?: string;
  mobile?: string;
  email?: string;
  name?: string;
  message?: string;
  page?: string;
  company_website?: string;
};

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Enquiry;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (clip(body.company_website, 200)) return NextResponse.json({ ok: true });

  const enquiry = {
    product: clip(body.product, 200),
    mobile: clip(body.mobile, 20).replace(/[^\d]/g, ""),
    email: clip(body.email, 200),
    name: clip(body.name, 120),
    message: clip(body.message, 4000),
    page: clip(body.page, 300),
    receivedAt: new Date().toISOString(),
  };

  if (!/^[6-9]\d{9}$/.test(enquiry.mobile) || enquiry.name.length < 2 || enquiry.message.length < 10) {
    return NextResponse.json({ message: "Please check your mobile number, name and requirement." }, { status: 422 });
  }
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email)) {
    return NextResponse.json({ message: "Please check your email address." }, { status: 422 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] ENQUIRY_WEBHOOK_URL not set, logging instead:", enquiry);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ message: "Online enquiries are not connected yet." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json({ message: "We could not send your enquiry right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
