"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { name: "Trivandrum Airport T2", meta: "MEP Design & BIM · Kerala", ratio: "4 / 3", from: "#13313a", to: "#0a1c25" },
  { name: "Calinova Data Centre", meta: "MEP & BIM · 2.4 MW · Calicut", ratio: "3 / 4", from: "#1b2420", to: "#0d1f16" },
  { name: "Vega Tower, Dubai", meta: "MEP Design & BIM · LOD 400", ratio: "4 / 5", from: "#0d2a37", to: "#0a1c25" },
  { name: "Expo 2020 Campus, Dubai", meta: "BIM Modelling · CINQ / Voltas", ratio: "1 / 1", from: "#243027", to: "#0d1f16" },
  { name: "Duqm Refinery, Oman", meta: "Detailed Engineering · LOD 500", ratio: "3 / 4", from: "#102a2c", to: "#0a1c25" },
  { name: "Yamal LNG, Russia", meta: "Detailed Engineering & 3D · Technip", ratio: "4 / 5", from: "#13313a", to: "#0d1f16" },
  { name: "Compression 4-NFPS", meta: "Offshore · Qatar Energy", ratio: "4 / 3", from: "#1b2420", to: "#0a1c25" },
];

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      // Heading reveal fires before the pin engages (translate only, no fade).
      gsap.from("[data-up]", {
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      const trackEl = track.current;
      if (!trackEl) return;

      // Distance the track must travel so its right edge meets the viewport
      // edge — proportional to the number/width of cards.
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

      // Pin the (full-viewport) section and drive the cards left as the user
      // scrolls vertically; unpin once the last card is revealed. The section
      // is exactly 100vh, so pinning at "top top" engages the instant it is
      // fully in view — no jump. scrub:true keeps the track locked 1:1 to
      // scroll (x starts at 0 at the pin, so there is nothing to snap from).
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="projects"
      className="relative scroll-mt-24 overflow-hidden bg-paper text-navy"
    >
      <div className="flex h-screen flex-col">
        {/* Heading + intro */}
        <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pt-24 md:px-10 md:pt-28">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <h2
              data-up
              className="font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-light leading-[1.08] tracking-[-0.02em]"
            >
              The C&amp;T footprint —{" "}
              <span className="text-green-dark">projects built to endure</span>
            </h2>
            <p
              data-up
              className="max-w-xl text-base leading-relaxed text-ink-dim md:text-lg"
            >
              Data centres, airports, refineries and offshore platforms — these
              projects must perform for generations. Scroll to move through the
              work; we engineer systems that endure, adapt and improve lives.
            </p>
          </div>
        </div>

        {/* Pinned horizontal track */}
        <div className="flex flex-1 items-center overflow-hidden">
          <div
            ref={track}
            className="flex items-center gap-6 px-6 will-change-transform md:gap-8 md:px-10"
          >
            {PROJECTS.map((p) => (
              <article
                key={p.name}
                data-card
                className="w-[clamp(15rem,30vw,22rem)] shrink-0"
              >
                <div
                  className="relative w-full overflow-hidden rounded-2xl border border-line"
                  style={{
                    aspectRatio: p.ratio,
                    background: `linear-gradient(155deg, ${p.from}, ${p.to})`,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.14]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #729d35 1px, transparent 1px), linear-gradient(to bottom, #729d35 1px, transparent 1px)",
                      backgroundSize: "44px 44px",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(70% 55% at 78% 16%, rgba(197,176,111,0.2), transparent 60%), radial-gradient(55% 50% at 16% 92%, rgba(114,157,53,0.24), transparent 65%)",
                    }}
                  />
                  <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
                </div>
                <div className="mt-4 pr-4">
                  <p className="font-display text-xl font-light leading-snug">
                    {p.name}
                  </p>
                  <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
                    {p.meta}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
