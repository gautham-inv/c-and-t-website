"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { VALUES } from "@/lib/company";

/**
 * Interactive values list (GISI-style): a fixed image on the left, the value
 * names stacked on the right. The active value expands its description inline;
 * hover or focus switches it.
 */
export function ValuesList() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone md:aspect-[5/6]">
        <img
          src="/large-image-who-are-we.jpg"
          alt="C&T engineering work"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/70" />
      </div>

      {/* List */}
      <ul className="border-t border-line">
        {VALUES.map((v, i) => {
          const open = i === active;
          return (
            <li key={v.name} className="border-b border-line">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={open}
                className="group flex w-full items-center gap-3 py-5 text-left"
              >
                <ArrowRight
                  className={`h-5 w-5 shrink-0 text-green-dark transition-all duration-300 ${
                    open ? "opacity-100" : "-ml-8 opacity-0"
                  }`}
                  strokeWidth={1.75}
                />
                <span
                  className={`font-display text-2xl font-medium leading-tight tracking-[-0.01em] transition-colors duration-300 md:text-3xl ${
                    open ? "text-ink" : "text-ink/40"
                  }`}
                >
                  {v.name}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-md pb-6 pl-8 text-base leading-relaxed text-ink-dim">
                    {v.body}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
