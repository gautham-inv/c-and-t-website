import { ArrowUpRight } from "lucide-react";
import type { PortfolioCard } from "@/sanity/lib/data";

// Bento spans on a 3-col grid: a wide (2-col) tile rotates position row to row
// so each row reads as "one wider tile" — deterministic, so it's stable for
// static export but still varied.
const SPANS = [2, 1, 1, 1, 2, 1, 1, 2, 1];

export function ProjectsIndex({ items }: { items: PortfolioCard[] }) {
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
        <span className="absolute left-6 top-28 h-6 w-6 border-l border-t border-beige md:left-10" />
        <div className="relative mx-auto max-w-[1600px] px-6 pb-4 pt-36 text-center md:px-10 md:pt-44">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-green-dark">
            Our work
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.5rem,1rem+5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Selected <span className="text-green-dark">projects</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim md:text-xl">
            Airports, data centres, refineries and offshore platforms —
            engineered by our Buildings &amp; Infrastructure and Oil &amp; Gas
            teams.
          </p>
        </div>
      </section>

      {/* Bento grid */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-10 md:py-20">
          <div className="grid auto-rows-[clamp(19rem,30vw,27rem)] grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {items.map((p, i) => {
              const wide = SPANS[i % SPANS.length] === 2;
              const slug = p.slug;
              const cls = `group relative block overflow-hidden rounded-2xl bg-stone ${
                wide ? "col-span-2" : "col-span-1"
              }`;
              const inner = (
                <>
                  {p.image ? (
                    <>
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(15,43,35,0.92) 0%, rgba(15,43,35,0.3) 45%, transparent 72%)",
                        }}
                      />
                    </>
                  ) : (
                    // No real photo yet — branded blueprint card, not a borrowed image.
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.16] transition-transform duration-[800ms] ease-out group-hover:scale-105"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right,#729d35 1px,transparent 1px),linear-gradient(to bottom,#729d35 1px,transparent 1px)",
                        backgroundSize: "34px 34px",
                      }}
                    />
                  )}
                  <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/50" />
                  <div
                    className={`absolute inset-x-5 bottom-5 ${
                      p.image ? "text-paper" : "text-ink"
                    }`}
                  >
                    <p className="font-display text-lg font-medium leading-tight md:text-xl">
                      {p.name}
                    </p>
                    <p
                      className={`mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${
                        p.image ? "text-paper/60" : "text-ink-dim"
                      }`}
                    >
                      {p.meta}
                    </p>
                    {slug && (
                      <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-green-dark transition-colors duration-300 group-hover:text-green">
                        View project
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </span>
                    )}
                  </div>
                </>
              );
              return slug ? (
                <a key={p.name} href={`/projects/${slug}`} className={cls}>
                  {inner}
                </a>
              ) : (
                <article key={p.name} className={cls}>
                  {inner}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
