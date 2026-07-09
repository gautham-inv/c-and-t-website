"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    image: "/calinova-case-study.jpg",
    caption: "Calinova Data Centre, MEP & BIM · 2.4 MW | Calicut",
    title: "A 2.4 MW data centre, coordinated clash-free",
    body: "A hyperscale-ready facility with no tolerance for downtime. We delivered full MEP design plus a LOD 400 BIM model, with CFD-validated cooling, and the coordination paid off: a clash-free model and a faster, rework-free install.",
    cta: "View project",
    href: "/projects/calinova-data-centre",
  },
  {
    image: "/trivandrum-airport-case-study.jpg",
    caption: "Trivandrum Airport T2, MEP Design & BIM | Kerala",
    title: "A new terminal, engineered for millions",
    body: "Systems built for millions of passengers a year. Every MEP discipline was modelled to LOD 400, with CFD across the concourse balancing comfort against energy use, delivered coordinated and on programme.",
    cta: "View project",
    href: "/projects/trivandrum-airport-t2",
  },
];

export function Difference() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      // Heading only — simple translate-up reveal (no fade, no card stagger).
      // Plays once on the way in; unlike a scrubbed tween, it doesn't run
      // backward when you scroll back up past the trigger.
      gsap.from(heading.current, {
        y: 48,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="case-studies"
      className="scroll-mt-24 bg-paper text-navy"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-20">
        {/* Section heading */}
        <h2
          ref={heading}
          className="mb-8 max-w-4xl font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] md:mb-10"
        >
          Proof in the work:{" "}
          <span className="text-green-dark">featured case studies</span>
        </h2>

        {/* Two case studies */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {CASE_STUDIES.map((p) => (
            <article key={p.title}>
              {/* Image with the CTA overlaid inside */}
              <figure className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[#0d1f16]">
                <img
                  src={p.image}
                  alt={p.caption}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(9,33,44,0.7), transparent 50%)",
                  }}
                />
                <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/60" />
                <a
                  href={p.href}
                  className="group absolute bottom-4 right-4 inline-flex items-center gap-2.5 rounded-full bg-paper py-2 pl-4 pr-2 text-xs font-medium text-navy transition-colors duration-300 hover:bg-beige-light"
                >
                  {p.cta}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-paper transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </figure>

              {/* Title + body */}
              <div className="mt-6 grid gap-4 sm:grid-cols-5 sm:items-start sm:gap-8">
                <h3 className="font-display text-[clamp(1.6rem,1rem+1.6vw,2.4rem)] font-medium leading-tight tracking-[-0.01em] sm:col-span-2">
                  {p.title}
                </h3>
                <div className="sm:col-span-3">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-dim">
                    {p.caption}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-ink-dim">
                    {p.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
