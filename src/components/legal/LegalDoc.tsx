import type { LegalSection } from "@/data/legal";

/* Shared body for the privacy policy and terms pages: numbered sections, readable measure. */
export function LegalDoc({ updated, sections }: { updated: string; sections: LegalSection[] }) {
  return (
    <section className="shell pb-20">
      {/*
        The text is held to about 68 characters a line because these pages are long and
        nobody reads a 1300px line. That used to leave half the page blank on a desktop, so
        the contents list now sits in that space and follows the reader down. Below lg it
        goes back above the text, which is the order it has always had on a phone.
      */}
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,68ch)_minmax(0,20rem)] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:order-2">
          <p className="text-sm text-ink-3">Last updated {updated}</p>

          <nav
            aria-label="On this page"
            className="mt-4 rounded-[var(--radius-surface)] bg-surface p-5 hairline lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">On this page</p>
            <ol className="mt-3 grid gap-1.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#${slug(s.heading)}`} className="text-ink-2 hover:text-ink hover:underline hover:underline-offset-4">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="grid gap-10 lg:order-1">
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
