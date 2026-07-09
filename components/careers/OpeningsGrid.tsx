import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";
import type { JobOpeningCard } from "@/sanity/lib/data";

/**
 * Open positions as a card grid. Each card links through to its
 * /careers/[slug] description page ("View more"). Mirrors the card idiom used
 * on the services index — bordered surface cards on the mist canvas.
 */
export function OpeningsGrid({ openings }: { openings: JobOpeningCard[] }) {
  return (
    <section id="openings" className="scroll-mt-28 bg-mist">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
            Current <span className="text-green-dark">openings</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-ink-dim">
            {openings.length} open role{openings.length === 1 ? "" : "s"} across
            our teams. Don&apos;t see a fit? We still want to hear from you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {openings.map((o) => (
            <a
              key={o.slug}
              href={`/careers/${o.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green/50 hover:shadow-[0_24px_60px_-32px_rgba(9,33,44,0.4)] md:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-green-dark">
                  {o.team}
                </span>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-dim">
                  {o.type}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-ink md:text-2xl">
                {o.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                {o.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem] text-ink/75">
                <li className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-green-dark" strokeWidth={1.75} />
                  {o.location}
                </li>
                <li className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-green-dark" strokeWidth={1.75} />
                  {o.experience}
                </li>
              </ul>

              <span className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink transition-colors duration-300 group-hover:text-green-dark">
                View more
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
