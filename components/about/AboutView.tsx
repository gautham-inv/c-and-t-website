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
            <h1 className="mx-auto max-w-3xl font-display text-[clamp(2.5rem,1rem+5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
              Designing with <span className="text-green-dark">Precision</span>.{" "}
              Delivering <span className="text-green-dark">Lasting Value</span>.
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

      {/* ── 3. CEO's message ── */}
      <section data-reveal className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <div
              data-up
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone md:sticky md:top-28 md:self-start"
            >
              <img
                src="/leadership/jimmy.jpg"
                alt="Jimmy Bentex, Founder & CEO"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div data-up>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-green-dark">
                CEO&apos;s message
              </span>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-dim">
                <p className="font-display text-[clamp(1.3rem,0.9rem+1.3vw,1.85rem)] font-normal leading-[1.32] tracking-[-0.01em] text-ink">
                  Greetings from C&amp;T!
                </p>
                <p>
                  Our journey started at a rented office space in 2011, with a
                  single employee offering HVAC engineering services. Still in
                  its growth and consolidation phase, the company now has close
                  to 100 employees across our offices in Thiruvananthapuram,
                  Kerala, India — including two owned office buildings — and the
                  UAE, and offers engineering services for the complete MEP
                  domain, not only in the commercial segment but also in
                  specialised areas like Oil &amp; Gas, Marine, Renewable Energy
                  and Data Centres, to name a few, cutting across geographies
                  including India, the UAE, Qatar, Saudi Arabia, Canada and
                  Europe.
                </p>
                <p>
                  Our young and energetic team, supported and guided by an
                  experienced set of senior team members, is capable of rising
                  to demanding situations and delivering quality outputs within
                  stipulated timeframes.
                </p>
                <p>
                  Today, clients from various sectors and geographies continue
                  to trust us with repeat orders.
                </p>
              </div>
              <div className="mt-8 border-t border-line pt-6">
                <p className="font-display text-lg font-semibold leading-tight text-ink">
                  Jimmy Bentex
                </p>
                <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-green-dark">
                  Founder &amp; CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Certifications band — narrow full-width strip ── */}
      {about.isoCertifications.length > 0 && (
        <section data-reveal className="border-y border-line bg-surface">
          <div className="mx-auto max-w-[1600px] px-6 py-10 md:px-10 md:py-12">
            <div
              data-up
              className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-8 gap-y-6"
            >
              {about.isoCertifications.map((c) => {
                const inner = (
                  <>
                    {c.logo && (
                      <span className="flex h-12 w-12 items-center justify-center overflow-hidden">
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
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink/70 transition-colors group-hover:text-green-dark">
                      {c.name}
                    </span>
                  </>
                );
                return c.document ? (
                  <a
                    key={c.name}
                    href={c.document}
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
          </div>
        </section>
      )}

      {/* ── 5. Journey — full-viewport, scroll-driven timeline ── */}
      <JourneyTimeline milestones={about.companyMilestones} />

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
