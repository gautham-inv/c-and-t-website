"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import type { PortfolioCard } from "@/sanity/lib/data";
import { getIndustry } from "@/lib/industries";

// Bento spans on a 3-col grid: a wide (2-col) tile rotates position row to row
// so each row reads as "one wider tile" — deterministic, so it's stable for
// static export but still varied.
const SPANS = [2, 1, 1, 1, 2, 1, 1, 2, 1];

export function ProjectsIndex({ items }: { items: PortfolioCard[] }) {
  const searchParams = useSearchParams();
  const industrySlug = searchParams.get("industry");
  const industry = industrySlug ? getIndustry(industrySlug) : undefined;

  const filtered = useMemo(() => {
    if (!industry) return items;
    return items.filter((p) => p.industries?.includes(industry.slug));
  }, [items, industry]);

  return (
    <div className="bg-mist text-ink">
      {/* Heading */}
      <section className="relative overflow-hidden bg-mist">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#729d35 1px,transparent 1px),linear-gradient(to bottom,#729d35 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-[1600px] px-6 pb-4 pt-36 text-center md:px-10 md:pt-44">
          <h1 className="mx-auto max-w-4xl font-display text-[clamp(2.5rem,1rem+5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
            {industry ? (
              <>
                Projects in <span className="text-green-dark">{industry.label}</span>
              </>
            ) : (
              <>
                Our <span className="text-green-dark">Projects</span>
              </>
            )}
          </h1>
          

          {industry && (
            <div className="mt-7 flex justify-center">
              <a
                href="/projects"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-2 pl-5 pr-2.5 text-sm font-medium text-navy transition-colors duration-300 hover:border-navy"
              >
                Filtered by {industry.label}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-paper">
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Bento grid */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-10 md:py-20">
          {filtered.length === 0 ? (
            <p className="text-center text-base text-ink-dim">
              No projects tagged for this industry yet — check back soon, or{" "}
              <a href="/projects" className="text-green-dark underline underline-offset-4">
                see all projects
              </a>
              .
            </p>
          ) : (
            <div className="grid auto-rows-[clamp(19rem,30vw,27rem)] grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
              {filtered.map((p, i) => {
                const wide = SPANS[i % SPANS.length] === 2;
                // col-span-2 is sm+ only — unscoped it would force an implicit
                // extra column on the 1-col mobile grid, making "wide" cards
                // overflow wider than the rest instead of matching their size.
                const cls = `group relative block overflow-hidden rounded-2xl bg-stone col-span-1 ${
                  wide ? "sm:col-span-2" : ""
                }`;
                // Photo cards hide their metadata and reveal it on hover/focus
                // (leadership-style wipe) — no detail page to link to. Cards
                // without a photo keep the branded blueprint look with the
                // label always visible, since there's no image to reveal from.
                return (
                  <article
                    key={p.name}
                    className={cls}
                    tabIndex={p.image ? 0 : undefined}
                    aria-label={p.image ? `${p.name} — ${p.meta}` : undefined}
                  >
                    {p.image ? (
                      <>
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/50" />
                        {/* Hover/focus wipe — metadata rises over the photo. */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink via-ink/92 to-ink/0 px-5 pb-5 pt-16 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:translate-y-0 motion-reduce:transition-none group-hover:translate-y-0 group-focus-visible:translate-y-0">
                          <p className="font-display text-lg font-medium leading-tight text-paper md:text-xl">
                            {p.name}
                          </p>
                          <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/60">
                            {p.meta}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-[0.16]"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right,#729d35 1px,transparent 1px),linear-gradient(to bottom,#729d35 1px,transparent 1px)",
                            backgroundSize: "34px 34px",
                          }}
                        />
                        <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/50" />
                        <div className="absolute inset-x-5 bottom-5 text-ink">
                          <p className="font-display text-lg font-medium leading-tight md:text-xl">
                            {p.name}
                          </p>
                          <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-dim">
                            {p.meta}
                          </p>
                        </div>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
