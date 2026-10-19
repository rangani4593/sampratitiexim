"use client";

import { Alert02Icon, CheckmarkBadge02Icon, Loading03Icon, SentIcon } from "@hugeicons/core-free-icons";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Errors = Partial<Record<"mobile" | "email" | "name" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

export const normaliseMobile = (v: string) => v.replace(/[^\d]/g, "").replace(/^(91|0)(?=\d{10}$)/, "");

function validate(f: FormData): Errors {
  const e: Errors = {};
  const mobile = normaliseMobile(String(f.get("mobile") ?? ""));
  if (!/^[6-9]\d{9}$/.test(mobile)) e.mobile = "Enter a 10-digit Indian mobile number.";
  const email = String(f.get("email") ?? "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Enter a valid email address, or leave it empty.";
  if (String(f.get("name") ?? "").trim().length < 2) e.name = "Please enter your name.";
  if (String(f.get("message") ?? "").trim().length < 10) e.message = "Tell us the product, grade and quantity you need.";
  return e;
}

export function EnquiryForm({
  product,
  tone = "surface",
  phone,
}: {
  product?: string;
  tone?: "surface" | "brand";
  phone: { display: string; href: string };
}) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const label = tone === "brand" ? "text-on-brand" : "text-ink";
  const help = tone === "brand" ? "text-on-brand/70" : "text-ink-3";
  const err = tone === "brand" ? "text-[#ffb4a3]" : "text-[#b4402c] dark:text-[#ff9f8a]";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data.entries()),
          mobile: normaliseMobile(String(data.get("mobile"))),
          page: window.location.pathname,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(body.message ?? "Could not send your enquiry.");
      setStatus("sent");
      form.reset();
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Could not send your enquiry.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className={`flex flex-col items-start gap-3 py-6 ${label}`}>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-on-gold">
          <Icon icon={CheckmarkBadge02Icon} size={24} />
        </span>
        <p className="text-xl font-semibold">Thank you</p>
        <p className={`max-w-[40ch] ${help}`}>Your enquiry has been sent successfully. We will reply shortly with the best price.</p>
        <p className={`text-sm ${help}`}>
          For an immediate response, call{" "}
          <a href={phone.href} className="font-semibold underline underline-offset-4">
            {phone.display}
          </a>
        </p>
        <button type="button" className={`btn mt-2 ${tone === "brand" ? "btn-on-brand" : "btn-ghost"}`} onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((e) => ({ ...e, [name]: undefined })),
  });
  const fieldError = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className={`text-sm ${err}`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor={`${id}-product`} className={`text-sm font-medium ${label}`}>
          Product
        </label>
        <input id={`${id}-product`} name="product" defaultValue={product} key={product} className="field" placeholder="e.g. Sucralose, 25 Kg" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`${id}-mobile`} className={`text-sm font-medium ${label}`}>
            Your mobile number
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-mono text-sm text-ink-3">+91</span>
            <input {...field("mobile")} type="tel" inputMode="numeric" autoComplete="tel-national" className="field pl-14" placeholder="98XXXXXXXX" />
          </div>
          {fieldError("mobile")}
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-email`} className={`text-sm font-medium ${label}`}>
            Your email <span className={help}>(optional)</span>
          </label>
          <input {...field("email")} type="email" inputMode="email" autoComplete="email" className="field" placeholder="you@company.com" />
          {fieldError("email")}
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-name`} className={`text-sm font-medium ${label}`}>
          Your name
        </label>
        <input {...field("name")} autoComplete="name" className="field" placeholder="Full name" />
        {fieldError("name")}
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-message`} className={`text-sm font-medium ${label}`}>
          Your requirement
        </label>
        <textarea {...field("message")} rows={4} className="field" placeholder="Describe your requirement in detail: grade, quantity, packing, delivery city" />
        {fieldError("message")}
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {status === "error" && (
        <p role="alert" className={`flex items-start gap-2 text-sm ${err}`}>
          <Icon icon={Alert02Icon} size={18} className="mt-0.5 shrink-0" />
          <span>
            {serverMessage} Please call{" "}
            <a href={phone.href} className="font-semibold underline underline-offset-4">
              {phone.display}
            </a>
            .
          </span>
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-gold mt-1 h-[3.25rem] w-full disabled:opacity-70 sm:w-auto sm:justify-self-start sm:px-8">
        {status === "sending" ? (
          <>
            <Icon icon={Loading03Icon} size={18} className="animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send enquiry
            <Icon icon={SentIcon} size={18} />
          </>
        )}
      </button>
    </form>
  );
}
