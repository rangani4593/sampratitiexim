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

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdKNdRK4UDSCrhNxfvVykAZCYXNRgaA2hWq06j0LPLZJifDHQ/formResponse";
const ENTRY = {
  product: "entry.1585662190",
  mobile: "entry.425400747",
  email: "entry.73582058",
  name: "entry.1367924449",
  message: "entry.1963075245",
} as const;

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
  };

  if (!enquiry.product || !/^[6-9]\d{9}$/.test(enquiry.mobile) || enquiry.name.length < 2 || enquiry.message.length < 10) {
    return NextResponse.json({ message: "Please check product, mobile number, name and requirement." }, { status: 422 });
  }
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email)) {
    return NextResponse.json({ message: "Please check your email address." }, { status: 422 });
  }

  const params = new URLSearchParams({
    [ENTRY.product]: enquiry.product,
    [ENTRY.mobile]: enquiry.mobile,
    [ENTRY.email]: enquiry.email,
    [ENTRY.name]: enquiry.name,
    [ENTRY.message]: enquiry.page ? `${enquiry.message}\n\n(Sent from: ${enquiry.page})` : enquiry.message,
  });

  try {
    const res = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });
    // Google answers 200 (confirmation page) or a 3xx redirect on success.
    if (process.env.NODE_ENV !== "production") console.info("[enquiry] Google Form status", res.status, res.headers.get("location") ?? "");
    if (res.status >= 400) throw new Error(`Google Form responded ${res.status}`);
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json({ message: "We could not send your inquiry right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
