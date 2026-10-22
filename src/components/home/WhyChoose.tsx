import {
  Award01Icon,
  CheckmarkBadge02Icon,
  DeliveryTruck01Icon,
  File01Icon,
  GlobalIcon,
  Package,
  Store01Icon,
  Tag01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = {
  sourcing: GlobalIcon,
  portfolio: Store01Icon,
  imported: CheckmarkBadge02Icon,
  pricing: Tag01Icon,
  docs: File01Icon,
  ahmedabad: Package,
  panindia: DeliveryTruck01Icon,
  service: UserGroupIcon,
  bulk: Award01Icon,
} as const;

type Item = { key: string; title: string; body: string };

export function WhyChoose({ intro, items }: { intro: string; items: readonly Item[] }) {
  const [featured, ...rest] = items;
  return (
    <section className="relative overflow-hidden bg-surface-2/60 py-14 md:py-20">
      <div className="shell">
        <SectionHeading eyebrow="Why Sampratiti" title="Why choose Sampratiti Exim" intro={intro} />

        <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-14 md:gap-4 lg:grid-cols-3" stagger={0.07}>
          <RevealItem className="sm:col-span-2 lg:row-span-2">
            <article className="group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[var(--radius-surface)] bg-brand p-6 text-on-brand transition-transform duration-500 hover:-translate-y-1 md:p-8">
              <Image
                src="/images/brand/emblem-gold.png"
                alt=""
                width={420}
                height={524}
                className="pointer-events-none absolute -bottom-16 -right-10 w-64 opacity-[0.08] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3 md:w-80"
              />
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold text-on-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon icon={ICONS[featured.key as keyof typeof ICONS]} size={26} />
                </span>
                <span className="font-mono text-sm text-on-brand/50">01</span>
              </div>
              <div className="relative mt-16">
                <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">{featured.title}</h3>
                <p className="mt-3 max-w-[40ch] text-lg leading-relaxed text-on-brand/75">{featured.body}</p>
              </div>
            </article>
          </RevealItem>

          {rest.map((a, i) => (
            <RevealItem key={a.key}>
              <article className="group relative h-full overflow-hidden rounded-[var(--radius-surface)] bg-surface p-5 hairline transition duration-300 hover:-translate-y-1 hover:bg-surface-2 md:p-6">
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold via-gold/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-gold-soft text-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon icon={ICONS[a.key as keyof typeof ICONS]} size={21} />
                  </span>
                  <span className="font-mono text-sm text-ink-3 transition-colors group-hover:text-gold">{String(i + 2).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{a.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
