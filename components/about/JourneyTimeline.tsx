import type { Milestone } from "@/lib/company";

/**
 * Journey — the practice's own milestones (formation and geographic expansion).
 * Static by design: the whole timeline is visible as soon as the section is on
 * screen, with no pinning or scroll-driven reveal. Desktop lays it out
 * horizontally (year above the line, title/detail below); mobile folds to a
 * vertical list so every node still reads.
 */
export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  const NODES = milestones
    .slice()
    .sort((a, b) => Number(a.year) - Number(b.year))
    .map((m) => ({
      year: m.year,
      title: m.title,
      detail: [m.detail, m.place].filter(Boolean).join(" · "),
    }));
  const count = NODES.length;

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
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
            <div key={`t-${i}`} className="px-3 text-center">
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
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-green/50"
            />
            {NODES.map((_, i) => (
              <div key={`n-${i}`} className="flex justify-center">
                <span className="relative z-10 h-3.5 w-3.5 rounded-full bg-green ring-4 ring-surface" />
              </div>
            ))}
          </div>

          {/* Row 3 — title + detail (below the line) */}
          {NODES.map((n, i) => (
            <div key={`b-${i}`} className="px-3 text-center">
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
            aria-hidden
            className="absolute bottom-1 left-[1px] top-1 w-px bg-green/50"
          />
          {NODES.map((n, i) => (
            <li key={`m-${i}`} className="relative">
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
