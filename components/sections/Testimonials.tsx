"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    quote:
      "C&T's BIM coordination got our plant rooms to a clash-free model faster than any team we've worked with.",
    name: "BIM Manager",
    role: "International EPC partner",
  },
  {
    quote:
      "Their MEP design held up under the toughest review cycles we've run. It was precise, well documented, and they hit deadlines even coordinating across time zones.",
    name: "Project Director",
    role: "Data centre developer",
  },
  {
    quote:
      "C&T ran detailed engineering and CFD validation for us, and we built it right the first time.",
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
      className="scroll-mt-24 text-paper"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-10 md:px-10 md:py-36">
        <h2
          data-up
          className="mb-8 font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] md:mb-28"
        >
          What our clients say
        </h2>

        <div className="grid gap-6 md:grid-cols-3 md:gap-10">
          {QUOTES.map((q) => (
            <figure key={q.name} data-up>
              <span className="block h-px w-full bg-paper/25" />
              <blockquote className="mt-6 text-lg leading-relaxed text-paper md:mt-12 md:text-xl">
                {q.quote}
              </blockquote>
              <figcaption className="mt-5 md:mt-8">
                <p className="font-display text-lg">{q.name}</p>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/70">
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
