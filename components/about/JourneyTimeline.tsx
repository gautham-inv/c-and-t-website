"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Milestone } from "@/lib/company";

gsap.registerPlugin(ScrollTrigger);

/**
 * Journey — the practice's own milestones (formation and geographic expansion)
 * as a full-viewport, scroll-driven timeline. As you scroll, the section pins
 * and the connecting line grows to its full width while each milestone appears
 * in sequence, reached one after another by the growing line. On mobile it
 * folds to a vertical timeline (line grows top→down) so every node still reads.
 */
export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  const section = useRef<HTMLElement>(null);
  const lineH = useRef<HTMLSpanElement>(null);
  const lineV = useRef<HTMLSpanElement>(null);

  const NODES = milestones
    .slice()
    .sort((a, b) => Number(a.year) - Number(b.year))
    .map((m) => ({
      year: m.year,
      title: m.title,
      detail: [m.detail, m.place].filter(Boolean).join(" · "),
    }));
  const count = NODES.length;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mm = gsap.matchMedia();

      // Desktop + motion: pin the section and scrub the reveal — the line grows
      // left→right and each milestone column pops in as the line reaches it.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(lineH.current, { scaleX: 0, transformOrigin: "left center" });
        // First milestone (2011) is already visible the moment the section is
        // reached; the rest reveal as the growing line reaches them.
        gsap.set('[data-mi="0"]', { opacity: 1, y: 0 });
        for (let i = 1; i < count; i++) {
          gsap.set(`[data-mi="${i}"]`, { opacity: 0, y: 26 });
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: `+=${count * 240}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.to(lineH.current, { scaleX: 1, ease: "none", duration: count });
        for (let i = 1; i < count; i++) {
          tl.to(
            `[data-mi="${i}"]`,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            // reveal milestone i just as the line reaches its position
            Math.max(0, i - 0.15),
          );
        }
      });

      // Mobile or reduced motion: no pin. Grow the vertical line on enter and
      // reveal nodes with a simple stagger; everything ends fully visible.
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        if (reduce) {
          gsap.set(lineV.current, { scaleY: 1 });
          gsap.set("[data-mi]", { opacity: 1, y: 0 });
          return;
        }
        gsap.set(lineV.current, { scaleY: 0, transformOrigin: "top center" });
        gsap.set("[data-mi]", { opacity: 0, y: 20 });
        gsap.set('[data-mi="0"]', { opacity: 1, y: 0 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section.current, start: "top 70%", end: "bottom 70%", scrub: 0.5 },
        });
        tl.to(lineV.current, { scaleY: 1, ease: "none", duration: count });
        for (let i = 1; i < count; i++) {
          tl.to(`[data-mi="${i}"]`, { opacity: 1, y: 0, duration: 0.6 }, Math.max(0, i - 0.15));
        }
      });

      return () => mm.revert();
    },
    { scope: section, dependencies: [count] },
  );

  return (
    <section
      ref={section}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-surface"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10">
        <h2 className="max-w-2xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
          Our journey, <span className="text-green-dark">built with purpose</span>
        </h2>

        {/* ── Desktop: horizontal timeline ── */}
        <div
          className="mt-20 hidden md:grid"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0,1fr))` }}
        >
          {/* Row 1 — year (above the line) */}
          {NODES.map((n, i) => (
            <div key={`t-${i}`} data-mi={i} className="px-3 text-center">
              <p className="font-display text-4xl font-semibold leading-none tracking-[-0.02em] text-green-dark">
                {n.year}
              </p>
            </div>
          ))}

          {/* Row 2 — the connecting line + nodes */}
          <div
            className="relative col-span-full my-6"
            style={{ display: "grid", gridTemplateColumns: `repeat(${count}, minmax(0,1fr))` }}
          >
            <span
              ref={lineH}
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-green/50"
            />
            {NODES.map((_, i) => (
              <div key={`n-${i}`} data-mi={i} className="flex justify-center">
                <span className="relative z-10 h-3.5 w-3.5 rounded-full bg-green ring-4 ring-surface" />
              </div>
            ))}
          </div>

          {/* Row 3 — title + detail (below the line) */}
          {NODES.map((n, i) => (
            <div key={`b-${i}`} data-mi={i} className="px-3 text-center">
              <p className="font-display text-lg font-medium leading-snug text-ink">
                {n.title}
              </p>
              {n.detail && (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{n.detail}</p>
              )}
            </div>
          ))}
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <ol className="relative mt-12 space-y-8 pl-7 md:hidden">
          <span
            ref={lineV}
            aria-hidden
            className="absolute bottom-1 left-[1px] top-1 w-px bg-green/50"
          />
          {NODES.map((n, i) => (
            <li key={`m-${i}`} data-mi={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-[calc(1.75rem+1px)] top-1 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-green ring-4 ring-surface"
              />
              <p className="font-display text-3xl font-semibold leading-none tracking-[-0.02em] text-green-dark">
                {n.year}
              </p>
              <p className="mt-3 font-display text-lg font-medium leading-snug text-ink">
                {n.title}
              </p>
              {n.detail && (
                <p className="mt-1 text-sm leading-relaxed text-ink-dim">{n.detail}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
