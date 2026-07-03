"use client";

import { ArrowLeft, ArrowUpRight, MapPin, Briefcase, Clock, Check } from "lucide-react";
import { openApply } from "@/lib/apply";
import type { Opening } from "@/lib/careers";

/**
 * Job description page body for a single opening. The "Apply now" CTA opens the
 * global ApplyModal (prefilled with this role) via the openApply() event bus.
 */
export function JobDescription({ opening }: { opening: Opening }) {
  const apply = () => openApply(opening.title);

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
        <span className="absolute left-6 top-28 h-6 w-6 border-l border-t border-beige md:left-10" />

        <div className="relative mx-auto max-w-[900px] px-6 pb-6 pt-36 md:px-10 md:pt-44">
          <a
            href="/careers"
            className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-dim transition-colors duration-200 hover:text-green-dark"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.75}
            />
            All openings
          </a>

          <p className="mt-8 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-green-dark">
            {opening.team}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,1rem+3.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            {opening.title}
          </h1>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/75">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-dark" strokeWidth={1.75} />
              {opening.location}
            </li>
            <li className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-green-dark" strokeWidth={1.75} />
              {opening.type}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-dark" strokeWidth={1.75} />
              {opening.experience}
            </li>
          </ul>

          <button
            onClick={apply}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:bg-green-dark"
          >
            Apply now
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </button>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[900px] px-6 pb-24 pt-10 md:px-10 md:pb-32">
          <p className="border-t border-line pt-10 text-lg leading-relaxed text-ink-dim">
            {opening.about}
          </p>

          <Block title="What you'll do" items={opening.responsibilities} />
          <Block title="What you'll bring" items={opening.requirements} />
          {opening.niceToHave && opening.niceToHave.length > 0 && (
            <Block title="Nice to have" items={opening.niceToHave} />
          )}

          {/* Closing apply band */}
          <div className="mt-16 flex flex-col items-start gap-5 rounded-3xl bg-green-dark p-8 text-paper md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                Ready to apply?
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/80">
                Send us your résumé and a note on why this role fits — we review
                every application.
              </p>
            </div>
            <button
              onClick={apply}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium tracking-wide text-green-dark transition-colors duration-300 hover:bg-white"
            >
              Apply for this role
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-12">
      <h2 className="font-display text-xl font-semibold tracking-[-0.01em] md:text-2xl">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-ink/85">
            <Check
              className="mt-1 h-4 w-4 shrink-0 text-green-dark"
              strokeWidth={2}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
