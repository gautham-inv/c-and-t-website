"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AboutPageData } from "@/sanity/lib/data";
import { Globe } from "@/components/about/Globe";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { MissionVisionStack } from "@/components/about/MissionVisionStack";
import { ValuesSplit } from "@/components/about/ValuesSplit";
import { Leadership } from "@/components/about/Leadership";
import { ISO_CERTIFICATIONS } from "@/lib/company";

gsap.registerPlugin(ScrollTrigger);

export function AboutView({ about }: { about: AboutPageData }) {
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

      const mm = gsap.matchMedia();

      // Desktop/tablet + motion: the globe grows and rises as you scroll the
      // tall section, the heading lifts away, and the "where we are" line
      // resolves in.
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
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
      );

      // Mobile (any motion setting) or reduced motion at any width: no scroll
      // scrubbing. Show the globe at full size, the copy, and the India · UAE ·
      // Canada line statically so the hero reads immediately with no empty gap.
      mm.add(
        "(max-width: 767px), (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(globeWrap.current, { scale: 1, yPercent: 0 });
          gsap.set(heroCopy.current, { opacity: 1, yPercent: 0 });
          gsap.set(heroTag.current, { opacity: 1, y: 0 });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-mist text-ink">
      {/* ── 1. Globe hero — scroll-grow ── */}
      <section ref={hero} className="relative h-screen bg-mist md:h-[200vh]">
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
          <div
            ref={heroCopy}
            className="relative z-20 mx-auto max-w-4xl px-6 pt-[17vh] text-center will-change-transform"
          >
            <h1 className="mx-auto max-w-3xl font-display text-[clamp(2rem,1rem+3.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              <span className="text-green-dark">MEP &amp; BIM</span>{" "}
              engineering, built since 2011.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-dim">
              A professionally managed team of qualified engineers delivering
              complete Infrastructure, Architectural &amp; MEP systems, from
              design and BIM coordination through to commissioning.
            </p>
          </div>

          <div
            ref={globeWrap}
            className="absolute left-1/2 top-[48%] z-10 aspect-square w-[72vw] -translate-x-1/2 will-change-transform md:top-[28%] md:w-[min(94vw,780px)]"
          >
            <Globe className="h-full w-full" markers={about.locations} />
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
              {about.locations.map((l) => (
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
            <span className="text-ink-dim">Our story</span>
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
                <span className="text-green-dark">Climate Designers</span>, a
                single engineer specialising in HVAC. By 2013 it had grown into{" "}
                <span className="text-green-dark">C&amp;T Consulting Engineers</span>
                , a full multidiscipline MEP practice.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-dim">
                A professionally managed team of qualified engineers spans
                design, estimation, execution, commissioning and testing, and
                delivers complete Infrastructure, Architectural &amp; MEP
                systems for commercial and industrial projects.
              </p>
            </div>
          </div>

          {ISO_CERTIFICATIONS.length > 0 && (
            <div
              data-up
              className="mt-12 flex flex-wrap items-center justify-end gap-x-8 gap-y-5"
            >
              {ISO_CERTIFICATIONS.map((c) => {
                const inner = (
                  <>
                    {c.logo && (
                      <span className="flex h-11 w-11 items-center justify-center overflow-hidden">
                        <img
                          src={c.logo}
                          alt={c.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </span>
                    )}
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink/70 transition-colors group-hover:text-green-dark">
                      {c.name}
                    </span>
                  </>
                );
                return c.documentPath ? (
                  <a
                    key={c.name}
                    href={c.documentPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.name} className="inline-flex items-center gap-3">
                    {inner}
                  </div>
                );
              })}
            </div>
          )}

          <div
            data-up
            className="mt-6 grid gap-x-16 gap-y-6 border-t border-line pt-10 md:grid-cols-2"
          >
            <p className="text-base leading-relaxed text-ink-dim">
              Our first clients, Aries Marine and EIDC, are still clients today,
              a relationship that goes back to the company&apos;s earliest
              projects.
            </p>
            <p className="text-base leading-relaxed text-ink-dim">
              Today the group spans India, the UAE and Canada, and delivers
              sustainable, ESG-aligned MEP and BIM services worldwide, built to
              perform over the life of every asset. The practice is ISO
              9001:2015 registered and IGBC certified, with team credentials
              spanning a KSEI Class A Supervisory Licence, IME Chartered
              Engineering, a KSECBC Energy Simulation Expert Licence and PMP
              certification.
            </p>
          </div>
        </div>

      </section>

      {/* ── 4. Journey — horizontal carousel ── */}
      <section data-reveal className="bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <div data-up>
            <JourneyTimeline milestones={about.companyMilestones} />
          </div>
        </div>
      </section>

      {/* ── 5. Mission → Vision — sticky-pinned stack ── */}
      <MissionVisionStack mission={about.mission} vision={about.vision} />

      {/* ── 6. Values — full-bleed split ── */}
      <ValuesSplit values={about.values} />

      {/* ── 7. Leadership ── */}
      <section data-reveal className="bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <Leadership leaders={about.leadership} />
        </div>
      </section>
    </div>
  );
}
