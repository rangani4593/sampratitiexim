"use client";

import { Alert02Icon, CheckmarkBadge02Icon, Loading03Icon, SentIcon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { company } from "@/data/company";
import { ProductPicker } from "./ProductPicker";

type Field = "product" | "mobile" | "email" | "name" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";


export const normaliseMobile = (v: string) => v.replace(/[^\d]/g, "").replace(/^(91|0)(?=\d{10}$)/, "");

function validate(v: Record<Field, string>): Errors {
  const e: Errors = {};
  if (!v.product.trim()) e.product = "Select or type the product you need.";
  if (!/^[6-9]\d{9}$/.test(normaliseMobile(v.mobile))) e.mobile = "Enter a 10-digit Indian mobile number.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address, or leave it empty.";
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (v.message.trim().length < 10) e.message = "Tell us the grade, quantity and delivery city you need.";
  return e;
}

const whatsappLink = (v: Record<Field, string>) => {
  const lines = [
    "Hello Sampratiti Exim, I have an inquiry.",
    v.product && `Product: ${v.product}`,
    v.message && `Requirement: ${v.message}`,
    v.name && `Name: ${v.name}`,
    v.mobile && `Mobile: ${v.mobile}`,
    v.email && `Email: ${v.email}`,
  ].filter(Boolean);
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
};

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
  const [values, setValues] = useState<Record<Field, string>>({ product: product ?? "", mobile: "", email: "", name: "", message: "" });
  const [lastProp, setLastProp] = useState(product);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [sentLink, setSentLink] = useState("");

  if (product !== lastProp) {
    setLastProp(product);
    setValues((v) => ({ ...v, product: product ?? "" }));
  }

  const label = tone === "brand" ? "text-on-brand" : "text-ink";
  const help = tone === "brand" ? "text-on-brand/70" : "text-ink-3";
  const err = tone === "brand" ? "text-[#ffb4a3]" : "text-[#b4402c] dark:text-[#ff9f8a]";

  const set = (name: Field) => (value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(values);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const honeypot = (new FormData(form).get("company_website") as string) ?? "";
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, mobile: normaliseMobile(values.mobile), company_website: honeypot, page: window.location.pathname }),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(body.message ?? "Could not send your inquiry.");
      setSentLink(whatsappLink(values));
      setStatus("sent");
      setValues({ product: "", mobile: "", email: "", name: "", message: "" });
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Could not send your inquiry.");
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
        <p className={`max-w-[40ch] ${help}`}>Your inquiry has been sent successfully. We will reply shortly with the best price.</p>
        <a href={sentLink} target="_blank" rel="noopener noreferrer" className="btn mt-1 w-full bg-[#25d366] text-[#06210f] sm:w-auto">
          <Icon icon={WhatsappIcon} size={20} />
          Continue on WhatsApp
        </a>
        <p className={`text-sm ${help}`}>
          Or call{" "}
          <a href={phone.href} className="font-semibold underline underline-offset-4">
            {phone.display}
          </a>
        </p>
        <button type="button" className={`btn mt-1 ${tone === "brand" ? "btn-on-brand" : "btn-ghost"}`} onClick={() => setStatus("idle")}>
          Send another inquiry
        </button>
      </div>
    );
  }

  const field = (name: Exclude<Field, "product">) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(name)(e.target.value),
  });
  const fieldError = (name: Field) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className={`text-sm ${err}`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor={`${id}-input`} className={`text-sm font-medium ${label}`}>
          Product
        </label>
        <ProductPicker value={values.product} onChange={set("product")} invalid={!!errors.product} describedBy={errors.product ? `${id}-product-error` : undefined} />
        {fieldError("product")}
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
            {serverMessage} Please use WhatsApp or call{" "}
            <a href={phone.href} className="font-semibold underline underline-offset-4">
              {phone.display}
            </a>
            .
          </span>
        </p>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-gold h-[3.25rem] w-full disabled:opacity-70">
          {status === "sending" ? (
            <>
              <Icon icon={Loading03Icon} size={18} className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send inquiry
              <Icon icon={SentIcon} size={18} />
            </>
          )}
        </button>
        <a
          href={whatsappLink(values)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn h-[3.25rem] w-full ${tone === "brand" ? "btn-on-brand" : "btn-ghost"}`}
        >
          <Icon icon={WhatsappIcon} size={20} />
          Inquire on WhatsApp
        </a>
      </div>
    </form>
  );
}
