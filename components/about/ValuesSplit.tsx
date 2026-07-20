"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Values as a full-bleed split: value names stacked on the left (active = ink,
 * the rest dimmed), the active value's description on a sage panel to the right.
 * Hover / focus / click switches the active value.
 *
 * On mobile the split doesn't work — the description panel would sit far below
 * the tapped name. Instead we render an accordion: each value has an arrowhead
 * that expands its description inline directly beneath it.
 */
export function ValuesSplit({
  values,
}: {
  values: { name: string; body: string }[];
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const current = values[active];

  return (
    <section className="relative">
      {/* ── Mobile: accordion (arrowhead expands the description inline) ── */}
      <div className="px-6 py-16 md:hidden">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-green-dark">
          Our values
        </p>
        <ul className="mt-8 border-t border-ink/10">
          {values.map((v, i) => {
            const on = i === open;
            return (
              <li key={v.name} className="border-b border-ink/10">
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={`font-display text-[clamp(1.6rem,1rem+3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] transition-colors duration-300 ${
                      on ? "text-ink" : "text-ink/45"
                    }`}
                  >
                    {v.name}
                  </span>
                  <ChevronDown
                    className={`h-6 w-6 shrink-0 transition-transform duration-300 ${
                      on ? "rotate-180 text-green-dark" : "text-ink/40"
                    }`}
                    strokeWidth={2}
                  />
                </button>
                {/* Grid-rows collapse gives a smooth height transition. */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-lg leading-relaxed text-ink-dim">
                      {v.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Desktop: full-bleed split ── */}
      <div className="hidden min-h-screen grid-cols-2 md:grid">
        {/* Left — value names */}
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-green-dark">
            Our values
          </p>
          <ul className="mt-10 space-y-1 md:mt-14">
            {values.map((v, i) => {
              const on = i === active;
              return (
                <li key={v.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`block text-left font-display text-[clamp(1.9rem,1rem+2.6vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.02em] transition-colors duration-300 ${
                      on ? "text-ink" : "text-ink/25 hover:text-ink/50"
                    }`}
                  >
                    {v.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right — sage panel with the active description. Direct hex (soft sage
            that harmonises with brand green, strong contrast against navy ink). */}
        <div className="flex items-center bg-green px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <div>
            <p className="max-w-xl font-display text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] font-medium leading-[1.28] tracking-[-0.01em] text-ink">
              {current.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
