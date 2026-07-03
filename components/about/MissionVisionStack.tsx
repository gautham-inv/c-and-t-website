"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mission → Vision as a sticky-pinned stack. Each panel is `position: sticky`
 * and fills the viewport with centered copy on a clean mist field — no image,
 * no grid. As you scroll, Mission pins, then Vision rises and stacks over it
 * (rounded top + shadow sell the layering), while the panel underneath scrubs
 * down in scale + dims so the stack reads as physical cards. Inner content
 * reveals on enter. Reduced-motion → static.
 */

type Panel = {
  key: string;
  eyebrow: string;
  heading: string;
  text: string;
  tone: "green" | "light";
};

export function MissionVisionStack({
  mission,
  vision,
}: {
  mission: string;
  vision: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  const PANELS: Panel[] = [
    {
      key: "mission",
      eyebrow: "Our mission",
      heading: "Engineering for the\nperformance of every asset.",
      text: mission,
      tone: "green",
    },
    {
      key: "vision",
      eyebrow: "Our vision",
      heading: "Smart engineering,\nto the desired standard.",
      text: vision,
      tone: "light",
    },
  ];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");

      panels.forEach((panel, i) => {
        // Inner content reveal as each panel enters.
        gsap.from(panel.querySelectorAll("[data-up]"), {
          y: 38,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: panel, start: "top 65%" },
        });

        // Recede the panel beneath as the next one covers it.
        if (i < panels.length - 1) {
          const inner = panel.querySelector<HTMLElement>("[data-panel-inner]");
          gsap.fromTo(
            inner,
            { scale: 1, filter: "brightness(1)" },
            {
              scale: 0.94,
              filter: "brightness(0.88)",
              ease: "none",
              scrollTrigger: {
                trigger: panels[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {PANELS.map((p, i) => {
        const green = p.tone === "green";
        return (
          <section
            key={p.key}
            data-panel
            className="sticky top-0 h-screen overflow-hidden"
          >
            <div
              data-panel-inner
              className={`relative flex h-full flex-col items-center justify-center px-6 text-center will-change-transform ${
                green ? "bg-green-dark" : "bg-mist"
              } ${
                i > 0
                  ? "rounded-t-[2.5rem] shadow-[0_-30px_80px_-40px_rgba(15,43,35,0.45)] md:rounded-t-[4rem]"
                  : ""
              }`}
            >
              <p
                data-up
                className={`font-mono text-[0.72rem] uppercase tracking-[0.24em] ${
                  green ? "text-beige-light" : "text-green-dark"
                }`}
              >
                {p.eyebrow}
              </p>
              <h2
                data-up
                className={`mx-auto mt-7 max-w-4xl whitespace-pre-line font-display text-[clamp(2rem,1rem+3.6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.03em] ${
                  green ? "text-paper" : "text-ink"
                }`}
              >
                {p.heading}
              </h2>
              <p
                data-up
                className={`mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:text-xl ${
                  green ? "text-paper/80" : "text-ink-dim"
                }`}
              >
                {p.text}
              </p>

              {/* Scroll cue (first panel only) */}
              {i === 0 && (
                <div
                  aria-hidden
                  className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                  <span
                    className={`flex h-10 w-6 items-start justify-center rounded-full p-1.5 ${
                      green ? "border border-paper/40" : "border border-ink/30"
                    }`}
                  >
                    <span
                      className={`h-2 w-1 animate-bounce rounded-full ${
                        green ? "bg-paper/70" : "bg-ink/50"
                      }`}
                    />
                  </span>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
