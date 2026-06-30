"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VISION, MISSION, LOCATIONS, CAPABILITIES } from "@/lib/company";
import { Globe } from "@/components/about/Globe";
import { ValuesList } from "@/components/about/ValuesList";
import { JourneyCarousel } from "@/components/about/JourneyCarousel";

gsap.registerPlugin(ScrollTrigger);

export function AboutView() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const globeWrap = useRef<HTMLDivElement>(null);
  const heroCopy = useRef<HTMLDivElement>(null);
  const heroTag = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Section reveals (skip the hero — it has its own scroll choreography).
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (reduce) return;
        gsap.from(el.querySelectorAll("[data-up]"), {
          y: 44,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      if (reduce) {
        gsap.set(globeWrap.current, { scale: 1.05 });
        gsap.set(heroTag.current, { opacity: 1 });
        return;
      }

      // Hero: the globe grows and rises as you scroll the tall section, the
      // heading lifts away, and the "where we are" line resolves in.
      gsap.fromTo(
        globeWrap.current,
        { scale: 0.68, yPercent: 12 },
        {
          scale: 1.22,
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        heroCopy.current,
        { opacity: 1, yPercent: 0 },
        {
          opacity: 0,
          yPercent: -36,
          ease: "none",
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "48% top",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        heroTag.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero.current,
            start: "32% top",
            end: "72% top",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-mist text-ink">
      {/* ── 1. Globe hero — scroll-grow ── */}
      <section ref={hero} className="relative h-[200vh] bg-mist">
        <div className="sticky top-0 flex h-screen items-start justify-center overflow-hidden">
          {/* Blueprint grid — matches the other index/hero pages */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right,#729d35 1px,transparent 1px),linear-gradient(to bottom,#729d35 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <span className="absolute left-6 top-28 z-0 h-6 w-6 border-l border-t border-beige md:left-10" />
          <div
            ref={heroCopy}
            className="relative z-20 mx-auto max-w-4xl px-6 pt-[17vh] text-center will-change-transform"
          >
            <h1 className="mx-auto max-w-3xl font-display text-[clamp(2rem,1rem+3.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              A <span className="text-green-dark">global</span> engineering
              practice, built since 2011.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-dim">
              A professionally managed team of qualified engineers — building
              complete Infrastructure, Architectural &amp; MEP systems across
              three continents.
            </p>
          </div>

          <div
            ref={globeWrap}
            className="absolute left-1/2 top-[28%] z-10 aspect-square w-[min(94vw,780px)] -translate-x-1/2 will-change-transform"
          >
            <Globe className="h-full w-full" />
          </div>

          <div
            ref={heroTag}
            className="absolute bottom-[7vh] left-1/2 z-20 -translate-x-1/2 opacity-0"
          >
            <p className="flex items-center gap-4 font-mono text-[0.74rem] uppercase tracking-[0.2em] text-ink">
              <span>India</span>
              <span className="h-1 w-1 rounded-full bg-green" />
              <span>UAE</span>
              <span className="h-1 w-1 rounded-full bg-green" />
              <span>Canada</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Global group — entities ── */}
      <section data-reveal className="bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2
              data-up
              className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              One <span className="text-green-dark">global group</span>, three
              countries.
            </h2>
            <ul data-up className="divide-y divide-line border-t border-line">
              {LOCATIONS.map((l) => (
                <li
                  key={l.name}
                  className="grid gap-2 py-6 md:grid-cols-[0.5fr_1fr] md:gap-8"
                >
                  <div className="flex items-baseline justify-between gap-4 md:block">
                    <p className="font-display text-xl font-medium leading-tight">
                      {l.name}
                    </p>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-green-dark">
                      {l.role}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {l.entities.map((e) => (
                      <li
                        key={e}
                        className="flex items-center gap-2.5 text-base text-ink-dim"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. History — two-column ── */}
      <section data-reveal className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <h2
            data-up
            className="max-w-3xl font-display text-[clamp(2rem,1rem+3.4vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          >
            <span className="text-ink-dim">Our story —</span>
            <br />
            from one engineer to a global practice
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <div data-up className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone">
              <img
                src="/large-image-who-are-we.jpg"
                alt="C&T engineering team on site"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div data-up className="flex flex-col justify-center">
              <p className="font-display text-[clamp(1.3rem,0.9rem+1.3vw,1.85rem)] font-normal leading-[1.32] tracking-[-0.01em]">
                C&amp;T began in 2011 as{" "}
                <span className="text-green-dark">Climate Designers</span> — a
                single engineer specialising in HVAC. By 2013 it had grown into{" "}
                <span className="text-green-dark">C&amp;T Consulting Engineers</span>
                , a full multidiscipline MEP practice.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-dim">
                A professionally managed team of qualified engineers across
                design, estimation, execution, commissioning and testing —
                delivering complete Infrastructure, Architectural &amp; MEP
                systems for commercial and industrial projects.
              </p>
            </div>
          </div>

          <div
            data-up
            className="mt-12 grid gap-x-16 gap-y-6 border-t border-line pt-10 md:grid-cols-2"
          >
            <p className="text-base leading-relaxed text-ink-dim">
              Our first clients — Aries Marine and EIDC — remain valued clients
              today, reflecting the trust, quality and long-term relationships at
              the foundation of our business.
            </p>
            <p className="text-base leading-relaxed text-ink-dim">
              Today the group spans India, the UAE and Canada, delivering
              sustainable, ESG-aligned MEP and BIM services worldwide — engineered
              for the lasting performance of every asset.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Journey — horizontal carousel ── */}
      <section data-reveal className="bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <div data-up>
            <JourneyCarousel />
          </div>
        </div>
      </section>

      {/* ── 5. Values — interactive list ── */}
      <section data-reveal className="bg-stone">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <h2
            data-up
            className="max-w-3xl font-display text-[clamp(2rem,1rem+3.4vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          >
            Our values unite every{" "}
            <span className="text-green-dark">C&amp;T project</span>
          </h2>

          <div
            data-up
            className="mt-12 grid gap-8 border-t border-ink/10 pt-8 md:grid-cols-[0.4fr_1.6fr] md:gap-16"
          >
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-green-dark">
              Why it matters
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-base leading-relaxed text-ink-dim">{VISION}</p>
              <p className="text-base leading-relaxed text-ink-dim">{MISSION}</p>
            </div>
          </div>

          <div data-up className="mt-14">
            <ValuesList />
          </div>
        </div>
      </section>

      {/* ── 6. What we engineer ── */}
      <section data-reveal className="bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <h2
            data-up
            className="max-w-3xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
          >
            What we <span className="text-green-dark">engineer</span>
          </h2>
          <ul data-up className="mt-12 border-t border-line">
            {CAPABILITIES.map((c) => {
              const inner = (
                <>
                  <span className="font-display text-xl font-medium leading-tight md:text-2xl">
                    {c.label}
                  </span>
                  {c.href && (
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-green-dark transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                    />
                  )}
                </>
              );
              return c.href ? (
                <li key={c.label} className="border-b border-line">
                  <a
                    href={c.href}
                    className="group flex items-center justify-between gap-4 py-5 transition-colors duration-300 hover:text-green-dark"
                  >
                    {inner}
                  </a>
                </li>
              ) : (
                <li
                  key={c.label}
                  className="flex items-center justify-between gap-4 border-b border-line py-5 text-ink/85"
                >
                  {inner}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
