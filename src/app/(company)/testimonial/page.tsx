import { StarIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { Icon } from "@/components/ui/Icon";
import { ratings, reviews } from "@/data/company";

export const metadata: Metadata = {
  title: "Testimonials, Ratings & Reviews",
  description: `Sampratiti Exim is rated ${ratings.average}/5 by ${ratings.count} buyers. Response 98%, quality 100%, delivery 100%.`,
  alternates: { canonical: "/testimonial" },
};

export default function TestimonialPage() {
  const withText = reviews.filter((r) => r.text);
  const ratingOnly = reviews.filter((r) => !r.text);
  return (
    <>
      <PageIntro title="Ratings & Reviews" crumbs={[{ href: "/profile", label: "Company" }, { label: "Testimonial" }]} />

      <section className="shell grid gap-4 pb-12 md:grid-cols-3">
        <div className="rounded-[var(--radius-surface)] bg-brand p-6 text-on-brand md:row-span-2">
          <p className="text-7xl font-semibold leading-none tracking-tighter">{ratings.average}</p>
          <span className="mt-3 flex gap-0.5 text-gold" aria-label={`${ratings.average} out of 5 stars`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} icon={StarIcon} size={18} fill="currentColor" strokeWidth={0} className={i === 4 ? "opacity-50" : ""} />
            ))}
          </span>
          <p className="mt-2 text-on-brand/75">out of 5, reviewed by {ratings.count} users</p>
          <ul className="mt-6 grid gap-2">
            {ratings.distribution.map((d) => (
              <li key={d.stars} className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3 text-sm">
                <span>{d.stars} star</span>
                <span className="h-1.5 rounded-full bg-gold" style={{ width: `${Math.max(d.pct, 2)}%` }} />
                <span className="text-right font-mono text-xs text-on-brand/70">{d.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-3 md:col-span-2">
          {ratings.satisfaction.map((s) => (
            <div key={s.label} className="rounded-[var(--radius-surface)] bg-surface p-5 hairline">
              <p className="text-3xl font-semibold tracking-tight md:text-4xl">{s.pct}%</p>
              <p className="mt-1 text-sm text-ink-3">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="rounded-[var(--radius-surface)] bg-surface-2/60 p-5 text-ink-2 md:col-span-2">
          User satisfaction scores are based on buyer feedback for response, quality and delivery.
        </p>
      </section>

      <section className="shell pb-14">
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {withText.map((r) => (
            <li key={r.name} className="mb-4 break-inside-avoid rounded-[var(--radius-surface)] bg-surface p-5 hairline">
              <p className="leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold">{r.name}</p>
              <p className="text-sm text-ink-3">
                {r.place}, {r.date}
              </p>
              {r.product && <p className="mt-2 text-xs text-ink-2">Product: {r.product}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pb-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">More verified ratings</h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ratingOnly.map((r) => (
            <li key={r.name} className="flex items-center gap-3 rounded-2xl bg-surface p-3 hairline">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-soft font-semibold">{r.name.replace(/^(Mr\.?|Mrs\.?)\s*/i, "")[0]}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{r.name}</span>
                <span className="block truncate text-xs text-ink-3">
                  {r.place}
                  {r.product ? `, ${r.product}` : ""}
                </span>
              </span>
              <span className="shrink-0 text-xs text-ink-3">{r.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
