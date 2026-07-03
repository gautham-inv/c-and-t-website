"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectSlug } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { name: "Trivandrum Airport T2", meta: "MEP Design & BIM · Kerala", image: "/airport.webp", size: "wide" },
  { name: "Calinova 2.4 MW Data Centre", meta: "MEP & BIM · 2.4 MW · Calicut", image: "/datacenter.jpeg", size: "tall" },
  { name: "Vega Tower, Dubai", meta: "MEP Design & BIM · LOD 400", image: "/images.jpeg", size: "standard" },
  { name: "EXPO 2020 Campus, Dubai", meta: "BIM Modelling · CINQ / Voltas", image: "/expocampus.jpg", size: "wide" },
  { name: "Duqm Refinery, Oman", meta: "Detailed Engineering · LOD 500", image: "/duqmrefinery.jpeg", size: "tall" },
  { name: "Yamal LNG, Russia", meta: "Detailed Engineering & 3D · Technip", image: "/yamallng.jpeg", size: "wide" },
  { name: "Compression 4-NFPS", meta: "Offshore · Qatar Energy", image: "/Compression-4-NFPS.jpeg", size: "standard" },
];

const SIZES = {
  wide: {
    card: "w-[clamp(24rem,52vw,46rem)] h-[clamp(17rem,46vh,30rem)]",
    img: "w-[42%]",
  },
  tall: {
    card: "w-[clamp(18rem,30vw,26rem)] h-[clamp(21rem,60vh,38rem)]",
    img: "w-[64%]",
  },
  standard: {
    card: "w-[clamp(21rem,40vw,34rem)] h-[clamp(19rem,53vh,34rem)]",
    img: "w-[50%]",
  },
};

// Rotating brand-colour panels (editorial-card reference). Each entry pairs a
// background with readable ink + a muted caption tone.
const PALETTE = [
  { bg: "bg-navy", text: "text-paper", sub: "text-paper/60" },
  { bg: "bg-green", text: "text-navy", sub: "text-navy/65" },
  { bg: "bg-beige", text: "text-navy", sub: "text-navy/70" },
  { bg: "bg-green-dark", text: "text-paper", sub: "text-paper/70" },
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

      // Dynamically calculate and set the wrapper height so CSS sticky has room to scroll
      const updateHeight = () => {
        if (root.current && trackEl) {
          const dist = Math.max(0, trackEl.scrollWidth - window.innerWidth);
          root.current.style.height = `${window.innerHeight + dist}px`;
        }
      };

      updateHeight();
      ScrollTrigger.addEventListener("refreshInit", updateHeight);

      // Drive the cards left as the user scrolls vertically through the sticky container
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", updateHeight);
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="projects"
      className="relative scroll-mt-24 bg-paper text-navy"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Heading + intro */}
        <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pt-20 md:px-10 md:pt-24">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <h2
              data-up
              className="font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              The C&amp;T footprint —{" "}
              <span className="text-green-dark">projects built to endure</span>
            </h2>
            <div data-up className="max-w-xl">
              <p className="text-base leading-relaxed text-ink-dim md:text-lg">
                Data centres, airports, refineries and offshore platforms —
                these projects must perform for generations. Scroll to move
                through the work; we engineer systems that endure and adapt.
              </p>
              <a
                href="/projects"
                className="group mt-5 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-green-dark transition-colors duration-300 hover:text-green"
              >
                All projects
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Pinned horizontal track — centred in the remaining space so the
            tall cards never spill below the viewport */}
        <div className="flex min-h-0 flex-1 items-center overflow-hidden pb-8">
          <div
            ref={track}
            className="flex items-center gap-6 px-6 will-change-transform md:gap-8 md:px-10"
          >
            {PROJECTS.map((p, i) => {
              const c = PALETTE[i % PALETTE.length];
              const sizeConfig = SIZES[p.size as keyof typeof SIZES] || SIZES.standard;
              const slug = projectSlug(p.name);
              const cardClass = `group relative flex shrink-0 flex-col overflow-hidden rounded-[1.75rem] p-8 md:p-10 ${c.bg} ${c.text} ${sizeConfig.card}`;
              const inner = (
                <>
                  {slug && (
                    <span className="absolute right-7 top-7 inline-flex h-9 w-9 items-center justify-center rounded-full border border-current/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  )}
                  <h3 className="max-w-[74%] font-display text-[clamp(1.6rem,1rem+1.5vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.01em]">
                    {p.name}
                  </h3>
                  {/* Bottom row: meta and image are siblings, so text can never
                      sit under the image regardless of card size. */}
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <p
                      className={`font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] ${c.sub}`}
                    >
                      {p.meta}
                    </p>
                    <div
                      className={`${sizeConfig.img} shrink-0 overflow-hidden rounded-2xl`}
                    >
                      <div className="aspect-[4/3]">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
              return slug ? (
                <a key={p.name} data-card href={`/projects/${slug}`} className={cardClass}>
                  {inner}
                </a>
              ) : (
                <article key={p.name} data-card className={cardClass}>
                  {inner}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
