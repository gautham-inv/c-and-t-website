"use client";

import { useState } from "react";

/**
 * Values as a full-bleed split: value names stacked on the left (active = ink,
 * the rest dimmed), the active value's description on a sage panel to the right.
 * Hover / focus / click switches the active value. On mobile the panel stacks
 * beneath the list. No fades on the panel copy — it swaps instantly so the
 * interaction feels direct.
 */
export function ValuesSplit({
  values,
}: {
  values: { name: string; body: string }[];
}) {
  const [active, setActive] = useState(0);
  const current = values[active];

  return (
    <section className="relative grid min-h-screen grid-cols-1 md:grid-cols-2">
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
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
            {String(active + 1).padStart(2, "0")} / {String(values.length).padStart(2, "0")}
          </span>
          <p className="mt-6 max-w-xl font-display text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] font-medium leading-[1.28] tracking-[-0.01em] text-ink">
            {current.body}
          </p>
        </div>
      </div>
    </section>
  );
}
