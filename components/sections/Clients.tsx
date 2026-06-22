"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLUMNS: string[][] = [
  ["NEOM", "AECOM", "VOLTAS", "OSCO", "ARTELIA", "EIDC"],
  ["PETROFAC", "TECHNIP", "QATAR ENERGY", "L&T", "KIIFB", "CINQ"],
  ["ADNOC", "AHI CARRIER", "DRY DOCK WORLD", "ARIES MARINE", "MARINOR", "ACCEL"],
];

const DURATIONS = ["26s", "32s", "29s"];

const MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

function TickerColumn({ items, duration }: { items: string[]; duration: string }) {
  // Two stacked copies → seamless loop (content moves top → down).
  const loop = [...items, ...items];
  return (
    <div
      className="h-[30rem] overflow-hidden"
      style={{ WebkitMaskImage: MASK, maskImage: MASK }}
    >
      <div
        className="flex flex-col"
        style={{ animation: `ct-ticker-down ${duration} linear infinite` }}
      >
        {loop.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex h-24 items-center justify-center px-4 text-center font-display text-base tracking-wide text-paper/55 transition-colors duration-300 hover:text-paper"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap.from("[data-up]", {
        y: 46,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="trust" className="scroll-mt-24 text-paper">
      {/* Inline keyframes — Tailwind v4 purges unreferenced @keyframes from
          the stylesheet, so the vertical ticker animation lives here. */}
      <style>{`@keyframes ct-ticker-down{from{transform:translateY(-50%)}to{transform:translateY(0)}}`}</style>
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-10 md:py-36">
        {/* Left — heading, intro, ISO, CTA */}
        <div className="md:max-w-md">
          <h2
            data-up
            className="font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
          >
            Trusted across four continents
          </h2>
          <p
            data-up
            className="mt-10 max-w-md text-base leading-relaxed text-paper/80 md:text-lg"
          >
            Since 2013, C&amp;T has delivered engineering for developers, EPCs
            and energy majors worldwide — backed by an ISO&nbsp;9001:2015
            certified quality system.
          </p>

          <div data-up className="mt-8">
            <span className="inline-flex h-12 items-center rounded-md border border-paper/30 px-4 font-mono text-xs uppercase tracking-[0.16em] text-paper">
              ISO 9001:2015
            </span>
          </div>

          <a
            data-up
            href="#contact"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-paper py-3.5 pl-6 pr-2.5 text-sm font-medium text-navy transition-colors duration-300 hover:bg-beige-light"
          >
            Start a project
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        {/* Right — three vertical logo tickers (top → down), no boxes/borders */}
        <div className="grid grid-cols-3">
          {COLUMNS.map((col, i) => (
            <TickerColumn key={i} items={col} duration={DURATIONS[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
