"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DivisionCard } from "@/components/divisions/DivisionCard";
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
          Specialized Expertise.{" "}
          <span className="text-green-dark">Unified Excellence.</span>
        </h2>

        {/* Two division cards — see DivisionCard: shared with the /divisions
            index so both stay the same size at every breakpoint. */}
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {divisions.map((d) => (
            <DivisionCard key={d.slug} division={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
