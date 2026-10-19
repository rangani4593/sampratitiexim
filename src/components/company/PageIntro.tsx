import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function PageIntro({ title, lead, crumbs }: { title: string; lead?: string; crumbs?: { href?: string; label: string }[] }) {
  return (
    <section className="shell pb-8 pt-5 md:pb-12 md:pt-8">
      <Breadcrumbs items={crumbs ?? [{ label: title }]} />
      <h1 className="mt-6 text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight md:mt-10 md:text-6xl">{title}</h1>
      {lead && <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-ink-2">{lead}</p>}
    </section>
  );
}
