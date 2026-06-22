"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarRange, Globe, Building2, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    target: 2013,
    suffix: "",
    label: "Engineering since",
    group: false,
    Icon: CalendarRange,
  },
  {
    target: 15,
    suffix: "",
    label: "Countries served",
    group: true,
    Icon: Globe,
  },
  {
    target: 40,
    suffix: "M",
    label: "Sq.ft delivered",
    group: true,
    Icon: Building2,
  },
  { target: 10, suffix: "M+", label: "End users", group: true, Icon: Users },
];

export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const els = gsap.utils.toArray<HTMLElement>("[data-count]");

      els.forEach((el) => {
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix ?? "";
        const group = el.dataset.group === "true";
        const fmt = (n: number) =>
          (group ? Math.round(n).toLocaleString() : String(Math.round(n))) +
          suffix;
        if (reduce) {
          el.textContent = fmt(target);
          return;
        }
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 2,
          ease: "power2.out",
          snap: { v: 1 },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = fmt(counter.v);
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="stats"
      className="border-y border-line bg-paper text-navy"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="flex items-center gap-4">
                <s.Icon
                  className="h-9 w-9 shrink-0 text-green md:h-10 md:w-10"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <p className="font-display text-[clamp(2.75rem,1rem+5vw,5rem)] font-semibold leading-none tracking-[-0.02em]">
                  <span
                    data-count
                    data-target={s.target}
                    data-suffix={s.suffix}
                    data-group={String(s.group)}
                  >
                    0{s.suffix}
                  </span>
                </p>
              </div>
              <p className="label mt-5 text-ink-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
