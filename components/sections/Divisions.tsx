"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DIVISIONS, type Division } from "@/lib/divisions";

gsap.registerPlugin(ScrollTrigger);

export function Divisions({ divisions = DIVISIONS }: { divisions?: Division[] } = {}) {
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
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="divisions" className="scroll-mt-24 bg-paper text-navy">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-20">
        {/* Heading */}
        <h2
          data-up
          className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
        >
          Two practices,{" "}
          <span className="text-green-dark">one standard</span>
        </h2>

        {/* Two division cards */}
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {divisions.map((d) => {
            return (
              <a
                key={d.slug}
                data-up
                href={`/divisions/${d.slug}`}
                className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-[#0a1c25] p-8 md:min-h-[34rem] md:p-10"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(9,33,44,0.92) 0%, rgba(9,33,44,0.5) 40%, rgba(9,33,44,0.12) 75%)",
                  }}
                />
                <span className="absolute left-6 top-6 h-5 w-5 border-l border-t border-beige/60" />

                <div className="relative text-paper">
                  <h3 className="font-display text-[clamp(1.9rem,1rem+2vw,3rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
                    {d.shortName}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-paper/80">
                    {d.tagline}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-beige-light transition-colors duration-300 group-hover:text-green">
                    Explore {d.shortName}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                    />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
