import { ArrowUpRight } from "lucide-react";
import type { Insight } from "@/lib/insights";

// Full insights directory. Card layout mirrors the rest of the site's
// editorial cards; centred heading matches the other index pages.
export function InsightsIndex({ items }: { items: Insight[] }) {
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
          <h1 className="mx-auto max-w-4xl font-display text-[clamp(2.5rem,1rem+5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Innovative thinking
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim md:text-xl">
            Notes from our engineers on BIM, CFD, MEP and the methods behind the
            buildings and energy projects we deliver.
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {items.map((a) => (
              <a key={a.title} href={a.href} className="group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0a1c25]">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
                </div>
                <div className="mt-5 flex flex-1 flex-col">
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-dim">
                    {a.tag} · {a.date}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-medium leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-green-dark md:text-2xl">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                    {a.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-green-dark transition-colors duration-300 group-hover:text-green">
                    {a.read}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                    />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
