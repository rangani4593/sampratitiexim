"use client";

import { PlayIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type Video = { id: string; title: string; thumb: string };

export function VideoFrame({ video, className = "" }: { video: Video; className?: string }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const active = playing === video.id;
  return (
    <div className={`relative aspect-video overflow-hidden rounded-[var(--radius-surface)] bg-brand-deep ${className}`}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(video.id)} className="group absolute inset-0" aria-label={`Play video: ${video.title}`}>
          <Image src={video.thumb} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-gradient-to-t from-[#06121b]/70 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-on-gold shadow-xl transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
            <Icon icon={PlayIcon} size={28} strokeWidth={2} className="translate-x-0.5" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold text-white md:p-5 md:text-base">{video.title}</span>
        </button>
      )}
    </div>
  );
}

export function VideoPlaylist({ videos }: { videos: Video[] }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:gap-6">
      <VideoFrame key={videos[current].id} video={videos[current]} />
      <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 lg:mx-0 lg:max-h-[28rem] lg:flex-col lg:overflow-y-auto lg:px-0">
        {videos.map((v, i) => (
          <li key={v.id} className="w-[64%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
            <button
              type="button"
              onClick={() => setCurrent(i)}
              aria-pressed={i === current}
              className={`flex w-full flex-col gap-2 rounded-2xl p-2 text-left transition-colors lg:flex-row lg:items-center lg:gap-3 ${
                i === current ? "bg-surface hairline" : "hover:bg-surface"
              }`}
            >
              <span className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl lg:w-36">
                <Image src={v.thumb} alt="" fill sizes="(min-width: 1024px) 144px, 60vw" className="object-cover" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className={`grid h-8 w-8 place-items-center rounded-full ${i === current ? "bg-gold text-on-gold" : "bg-white/90 text-brand"}`}>
                    <Icon icon={PlayIcon} size={14} strokeWidth={2} />
                  </span>
                </span>
              </span>
              <span className="line-clamp-2 px-1 text-sm font-medium leading-snug text-ink lg:px-0">{v.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
