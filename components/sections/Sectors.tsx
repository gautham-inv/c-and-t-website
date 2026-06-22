"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTORS = [
  {
    label: "Airports",
    note: "Terminals · landside & airside MEP",
    image: "/airport.jpg",
    href: "/sectors/airports",
  },
  {
    label: "Data Centres",
    note: "Hyperscale · mission-critical cooling",
    image: "/datacenter.jpeg",
    href: "/sectors/data-centres",
  },
  {
    label: "Oil & Gas",
    note: "Refineries · LNG · detailed engineering",
    image: "/duqmrefinery.jpeg",
    href: "/sectors/oil-and-gas",
  },
  {
    label: "Industrial Facilities",
    note: "Process plants · utilities · ELV",
    image: "/engineering.jpg",
    href: "/sectors/industrial",
  },
];

export function Sectors() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      // Translate-only reveal (no fade), consistent with the rest of the site.
      gsap.from("[data-up]", {
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sectors" className="scroll-mt-24 bg-paper text-navy">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-20">
        {/* Heading + intro */}
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
          <h2
            data-up
            className="font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
          >
            Designing critical infrastructure{" "}
            <span className="text-green-dark">across global markets</span>
          </h2>
          <p
            data-up
            className="max-w-xl text-base leading-relaxed text-ink-dim md:text-lg"
          >
            From airports and hyperscale data centres to refineries and process
            plants, our MEP, BIM and CFD teams engineer the systems that keep
            the world&apos;s most demanding facilities running.
          </p>
        </div>

        {/* Sector cards */}
        <div className="mt-12 grid grid-cols-2 gap-5 md:mt-14 lg:grid-cols-4">
          {SECTORS.map((s) => (
            <a
              key={s.label}
              data-up
              href={s.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#0a1c25]"
            >
              <img
                src={s.image}
                alt={s.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(9,33,44,0.9) 0%, rgba(9,33,44,0.25) 45%, transparent 72%)",
                }}
              />
              <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/60" />

              <div className="absolute inset-x-5 bottom-5 text-paper">
                <p className="font-display text-xl font-medium leading-tight md:text-2xl">
                  {s.label}
                </p>
                <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/60">
                  {s.note}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-beige-light transition-colors duration-300 group-hover:text-green">
                  Explore sector
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
  );
}
