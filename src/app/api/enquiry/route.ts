import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

function buildHtml(e: { product: string; name: string; mobile: string; email: string; message: string; page: string }) {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 14px;font-weight:600;color:#6b7280;white-space:nowrap;width:140px;vertical-align:top">${label}</td>
          <td style="padding:10px 14px;color:#111827;border-left:1px solid #f3f4f6">${value.replace(/\n/g, "<br>")}</td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:580px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08)">

        <!-- Header -->
        <tr>
          <td style="background:#0f2040;padding:24px 28px">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.12em;color:#c9a84c;text-transform:uppercase">Sampratiti Exim Pvt Ltd</p>
            <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-.02em">New Enquiry Received</h1>
          </td>
        </tr>

        <!-- Body table -->
        <tr>
          <td style="padding:0 0 8px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;line-height:1.5">
              ${row("Product", e.product)}
              ${row("Name", e.name)}
              ${row("Mobile", "+91 " + e.mobile)}
              ${row("Email", e.email || "—")}
              ${row("Requirement", e.message)}
              ${row("Source page", e.page || "—")}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:20px 28px 28px">
            <a href="tel:+91${e.mobile}" style="display:inline-block;background:#c9a84c;color:#000000;font-weight:700;font-size:14px;text-decoration:none;padding:11px 24px;border-radius:8px">
              Call ${e.name.split(" ")[0]} now →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f3f4f6;padding:14px 28px">
            <p style="margin:0;font-size:12px;color:#9ca3af">This email was sent automatically when someone submitted the enquiry form on <a href="https://sampratitiexim.vercel.app" style="color:#6b7280">sampratitiexim.vercel.app</a>.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildText(e: { product: string; name: string; mobile: string; email: string; message: string; page: string }) {
  return [
    "NEW ENQUIRY — Sampratiti Exim",
    "=".repeat(40),
    `Product   : ${e.product}`,
    `Name      : ${e.name}`,
    `Mobile    : +91 ${e.mobile}`,
    `Email     : ${e.email || "—"}`,
    `Message   : ${e.message}`,
    e.page ? `Source    : ${e.page}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendEmail(e: { product: string; name: string; mobile: string; email: string; message: string; page: string }) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const notify = process.env.NOTIFY_EMAIL;

  if (!user || !pass || !notify) {
    console.warn("[enquiry] SMTP env vars missing — skipping email");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Sampratiti Exim Website" <${user}>`,
    to: notify,
    subject: `New Enquiry: ${e.product} from ${e.name}`,
    text: buildText(e),
    html: buildHtml(e),
  });
}

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

  // Submit to Google Form
  try {
    const res = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });
    if (process.env.NODE_ENV !== "production") console.info("[enquiry] Google Form status", res.status);
    if (res.status >= 400) throw new Error(`Google Form responded ${res.status}`);
  } catch (error) {
    console.error("[enquiry] Google Form delivery failed", error);
    return NextResponse.json({ message: "We could not send your inquiry right now." }, { status: 502 });
  }

  // Send email notification (non-blocking — don't fail the response if email fails)
  sendEmail(enquiry).catch((err) => console.error("[enquiry] Email delivery failed", err));

  return NextResponse.json({ ok: true });
}
