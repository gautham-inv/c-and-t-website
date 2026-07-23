import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Insight } from "@/lib/insights";
import { RichBlocks } from "@/components/shared/RichBlocks";

export function InsightView({ insight }: { insight: Insight }) {
  return (
    <div className="bg-mist text-ink">
      {/* ── Header ── */}
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
        <div className="relative mx-auto max-w-[1100px] px-6 pb-6 pt-26 md:px-10 md:pt-30">
          <a
            href="/insights"
            className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-dim transition-colors duration-200 hover:text-green-dark"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.75}
            />
            All insights
          </a>

          <p className="mt-8 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-green-dark">
            {insight.tag}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,1rem+3.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            {insight.title}
          </h1>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/75">
            <li className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-dark" strokeWidth={1.75} />
              {insight.date}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-dark" strokeWidth={1.75} />
              {insight.read}
            </li>
          </ul>
        </div>
      </section>

      {/* ── Hero image ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-stone">
            <img
              src={insight.image}
              alt={insight.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1100px] px-6 pb-24 pt-10 md:px-10 md:pb-32">
          {insight.body && insight.body.length > 0 ? (
            <div className="space-y-5">
              <RichBlocks blocks={insight.body} />
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-ink-dim">
              {insight.excerpt}
            </p>
          )}

          {insight.attribution && (
            <p className="mt-12 border-t border-line pt-6 text-sm italic leading-relaxed text-ink-dim">
              {insight.attribution}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
