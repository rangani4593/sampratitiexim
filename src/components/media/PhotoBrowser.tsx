"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type Photo = { src: string; name: string; href: string; group: string; price: string };

const PAGE = 48;

export function PhotoBrowser({ photos, groups }: { photos: Photo[]; groups: string[] }) {
  const [group, setGroup] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => (group ? photos.filter((p) => p.group === group) : photos), [group, photos]);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-y border-line bg-bg/90 px-4 backdrop-blur-xl md:top-[72px] md:-mx-8 md:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          <button type="button" className="chip shrink-0" aria-pressed={group === null} onClick={() => (setGroup(null), setShown(PAGE))}>
            All <span className="font-mono text-[11px] opacity-60">{photos.length}</span>
          </button>
          {groups.map((g) => (
            <button key={g} type="button" className="chip shrink-0" aria-pressed={group === g} onClick={() => (setGroup(g), setShown(PAGE))}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {list.slice(0, shown).map((p) => (
          <li key={p.src}>
            <Link href={p.href} className="group block">
              <span className="well relative block aspect-square overflow-hidden rounded-[18px] hairline">
                <Image src={p.src} alt={p.name} fill sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 50vw" className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-gold text-on-gold opacity-0 transition-opacity group-hover:opacity-100">
                  <Icon icon={ArrowUpRight01Icon} size={16} />
                </span>
              </span>
              <span className="mt-2 block px-1">
                <span className="line-clamp-1 text-sm font-semibold">{p.name}</span>
                <span className="block font-mono text-xs text-ink-3">{p.price}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {shown < list.length && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE)}>
            Show more photos
          </button>
          <p className="text-sm text-ink-3">
            Showing {Math.min(shown, list.length)} of {list.length}
          </p>
        </div>
      )}
    </div>
  );
}
