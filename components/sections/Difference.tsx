"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    image: "/calinova-case-study.jpg",
    caption: "Calinova Data Centre — MEP & BIM · 2.4 MW | Calicut",
    title: "A 2.4 MW data centre, coordinated clash-free",
    body: "A hyperscale-ready facility with no tolerance for downtime. We delivered full MEP design and a LOD 400 BIM model — coordinating HVAC, power and fire through tight plant rooms — and CFD-validated the cooling to hold rack temperatures under peak load. The result: a clash-free model and a faster, rework-free install on site.",
    cta: "View project",
    href: "#projects",
  },
  {
    image: "/trivandrum-airport-case-study.jpg",
    caption: "Trivandrum Airport T2 — MEP Design & BIM | Kerala",
    title: "A new terminal, engineered for millions",
    body: "An international terminal needed resilient systems for millions of passengers a year. Our teams modelled every MEP discipline to LOD 400 and ran CFD across the concourse to balance passenger comfort against energy use — delivered fully coordinated, on programme and built to endure for decades.",
    cta: "View project",
    href: "#projects",
  },
];

export function Difference() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      // Pure translate, no fade. Each element rises from a resting offset
      // BELOW its final position to 0 — upward only, never dipping below.
      // The right column uses a later start so it resolves on a shorter,
      // delayed window while still landing near the end alongside the left.
      const cols = gsap.utils.toArray<HTMLElement>("[data-col]");
      const END = "bottom 68%";
      gsap.fromTo(
        heading.current,
        { y: 64 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 55%", scrub: true },
        },
      );
      gsap.fromTo(
        cols[0],
        { y: 130 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 84%", end: END, scrub: true },
        },
      );
      gsap.fromTo(
        cols[1],
        { y: 130 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 46%", end: END, scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="case-studies"
      className="scroll-mt-24 bg-paper text-navy"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36">
        {/* Section heading */}
        <h2
          ref={heading}
          className="mb-8 max-w-4xl font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-light leading-[1.08] tracking-[-0.02em] md:mb-10"
        >
          Proof in the work —{" "}
          <span className="text-green-dark">featured case studies</span>
        </h2>

        {/* Two pillars */}
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-x-16">
          {CASE_STUDIES.map((p) => (
            <article key={p.title} data-col className="will-change-transform">
              {/* Image + caption */}
              <figure>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0d1f16]">
                  <img
                    src={p.image}
                    alt={p.caption}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/60" />
                  <span className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-beige/60" />
                </div>
                <figcaption className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
                  {p.caption}
                </figcaption>
              </figure>

              {/* Title + body + pill */}
              <div className="mt-10 grid gap-6 sm:grid-cols-5 sm:items-start sm:gap-8">
                <h3 className="font-display text-[clamp(1.75rem,1rem+2vw,2.75rem)] font-light leading-tight tracking-[-0.01em] sm:col-span-2">
                  {p.title}
                </h3>
                <div className="sm:col-span-3">
                  <p className="text-base leading-relaxed text-ink-dim md:text-lg">
                    {p.body}
                  </p>
                  <a
                    href={p.href}
                    className="group mt-7 inline-flex items-center gap-3 rounded-full bg-beige-light py-2.5 pl-5 pr-2.5 text-sm font-medium text-navy transition-colors duration-300 hover:bg-beige"
                  >
                    {p.cta}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-paper transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
