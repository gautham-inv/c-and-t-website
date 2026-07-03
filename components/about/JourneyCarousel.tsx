"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Milestone, Award } from "@/lib/company";

/**
 * Horizontal journey carousel (GISI-style) in the light palette. Merges the
 * practice's milestones and the projects awarded into one chronological track;
 * prev/next arrows scroll by a card. Each card is tagged so the two threads
 * stay legible in a single timeline.
 */
type Card = { year: string; tag: string; title: string; detail: string };

export function JourneyCarousel({
  milestones,
  awards,
}: {
  milestones: Milestone[];
  awards: Award[];
}) {
  const track = useRef<HTMLDivElement>(null);

  const CARDS: Card[] = [
    ...milestones.map((m) => ({
      year: m.year,
      tag: m.detail ? "Practice" : "Expansion",
      title: m.title,
      detail: [m.detail, m.place].filter(Boolean).join(" · "),
    })),
    ...awards.map((a) => ({
      year: a.year,
      tag: "Project awarded",
      title: a.name,
      detail: a.meta,
    })),
  ].sort((a, b) => Number(a.year) - Number(b.year));

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h2 className="max-w-2xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
          Our journey, <span className="text-green-dark">built with purpose</span>
        </h2>
        <div className="hidden shrink-0 gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:bg-ink hover:text-mist"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:bg-ink hover:text-mist"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CARDS.map((c, i) => (
          <article
            key={`${c.year}-${i}`}
            data-card
            className="flex w-[280px] shrink-0 snap-start flex-col rounded-2xl bg-stone p-7 md:w-[340px]"
          >
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-green-dark">
              {c.tag}
            </span>
            <p className="mt-4 font-display text-4xl font-semibold leading-none tracking-[-0.02em] text-ink md:text-5xl">
              {c.year}
            </p>
            <p className="mt-6 font-display text-lg font-medium leading-snug text-ink">
              {c.title}
            </p>
            {c.detail && (
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {c.detail}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
