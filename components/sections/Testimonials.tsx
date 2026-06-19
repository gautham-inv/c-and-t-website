"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    quote:
      "C&T's BIM coordination took our plant rooms from concept to a clash-free model faster than any team we'd worked with.",
    name: "BIM Manager",
    role: "International EPC partner",
  },
  {
    quote:
      "Their MEP design held up under the toughest review cycles — precise, well-documented and delivered on time across time zones.",
    name: "Project Director",
    role: "Data centre developer",
  },
  {
    quote:
      "From detailed engineering to CFD validation, C&T gave us the confidence to build right the first time.",
    name: "Engineering Lead",
    role: "Energy major",
  },
];

export function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap.from("[data-up]", {
        y: 46,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 74%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="testimonials"
      className="scroll-mt-24 bg-paper text-navy"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36">
        <h2
          data-up
          className="mb-20 font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-light leading-[1.08] tracking-[-0.02em] md:mb-28"
        >
          What our clients say
        </h2>

        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {QUOTES.map((q) => (
            <figure key={q.name} data-up>
              <span className="block h-px w-full bg-line" />
              <blockquote className="mt-12 text-lg leading-relaxed text-navy md:text-xl">
                {q.quote}
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-display text-lg">{q.name}</p>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
                  {q.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
