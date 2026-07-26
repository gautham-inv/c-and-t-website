"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import type { PortfolioCard } from "@/sanity/lib/data";
import { ProjectCard } from "@/components/projects/ProjectCard";
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
                return (
                  <ProjectCard
                    key={p.name}
                    project={p}
                    className={`col-span-1 ${wide ? "sm:col-span-2" : ""}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
