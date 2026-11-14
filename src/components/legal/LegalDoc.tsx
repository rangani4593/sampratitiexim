import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { LegalSection } from "@/data/legal";

/*
  Shared body for the privacy policy and terms pages.

  These two pages carry their own heading rather than PageIntro, because the whole
  document — heading included — sits in one centred reading column. A full-width
  PageIntro above a narrow column left the page hugging its left edge.
*/
export function LegalDoc({
  title,
  lead,
  updated,
  sections,
}: {
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <section className="shell pb-20 pt-5 md:pt-8">
      <div className="mx-auto max-w-[72ch]">
        <Breadcrumbs items={[{ label: title }]} />

        <h1 className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:mt-10 md:text-6xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">{lead}</p>
        <p className="mt-6 text-sm text-ink-3">Last updated {updated}</p>

        <nav aria-label="On this page" className="mt-8 rounded-[var(--radius-surface)] bg-surface p-5 hairline">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">On this page</p>
          <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#${slug(s.heading)}`} className="text-ink-2 hover:text-ink hover:underline hover:underline-offset-4">
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 grid gap-10">
          {sections.map((s, i) => (
            <section key={s.heading} id={slug(s.heading)} className="scroll-mt-28">
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                <span className="text-ink-3">{i + 1}.</span> {s.heading}
              </h2>
              <div className="mt-3 grid gap-3">
                {s.blocks.map((b, j) =>
                  "p" in b ? (
                    <p key={j} className="leading-relaxed text-ink-2">
                      {b.p}
                    </p>
                  ) : (
                    <ul key={j} className="grid gap-2 pl-1">
                      {b.ul.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed text-ink-2">
                          <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

const slug = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
