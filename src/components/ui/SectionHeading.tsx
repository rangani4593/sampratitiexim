import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
          <span className="h-px w-8 shrink-0 bg-gold" />
          {eyebrow}
        </p>
        <h2 id={id} className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
      {(intro || action) && (
        <div className="grid gap-4 lg:justify-items-end lg:text-right">
          {intro && <p className="max-w-[52ch] text-lg leading-relaxed text-ink-2">{intro}</p>}
          {action}
        </div>
      )}
    </Reveal>
  );
}
