import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqLd, type Faq as FaqItem } from "@/lib/seo";

export function Faq({ title, items, id, eyebrow }: { title: string; items: FaqItem[]; id?: string; eyebrow?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      {eyebrow && (
        <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
          <span className="h-px w-8 shrink-0 bg-gold" />
          {eyebrow}
          <span className="h-px w-8 shrink-0 bg-gold" />
        </p>
      )}
      <h2 id={id ? `${id}-title` : undefined} className="text-balance text-center text-2xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="mt-8 divide-y divide-line overflow-hidden rounded-[var(--radius-surface)] bg-surface hairline">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-left font-semibold md:p-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-[1rem] font-semibold leading-snug md:text-lg">{f.q}</h3>
              <Icon icon={ArrowDown01Icon} size={20} className="shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-4 pb-5 leading-relaxed text-ink-2 md:px-5">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(items)} />
    </section>
  );
}
