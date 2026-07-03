"use client";

import { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";
import type { CareersPageData, JobOpeningCard } from "@/sanity/lib/data";
import { OpeningsGrid } from "@/components/careers/OpeningsGrid";

gsap.registerPlugin(ScrollTrigger);

/** Smooth-scroll to an in-page anchor via Lenis (falls back to native). */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function CareersView({
  careers,
  openings,
}: {
  careers: CareersPageData;
  openings: JobOpeningCard[];
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-up]"), {
          y: 44,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-mist text-ink">
      {/* ── 1. Hero — full-bleed image + overlaid intro card ── */}
      <section className="relative min-h-[92vh] overflow-hidden bg-navy">
        <img
          src="/careers1.avif"
          alt="The C&T team at work"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Legibility wash — lifts the card off the photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-navy/70 via-navy/25 to-transparent"
        />
        {/* Blueprint grid — matches the other hero pages */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#729d35 1px,transparent 1px),linear-gradient(to bottom,#729d35 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative mx-auto flex min-h-[92vh] max-w-[1600px] items-center px-6 pb-16 pt-32 md:px-10">
          <div className="relative max-w-xl rounded-3xl bg-paper/95 p-8 shadow-[0_40px_120px_-45px_rgba(9,33,44,0.6)] ring-1 ring-navy/10 backdrop-blur-sm md:p-12">
            <span className="absolute left-6 top-6 h-5 w-5 border-l border-t border-beige md:left-8 md:top-8" />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-green-dark">
              Careers at C&amp;T
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,1rem+4vw,4rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-ink">
              A new standard of <span className="text-green-dark">engineering</span>.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-dim md:text-lg">
              {careers.intro}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToId("openings")}
                className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:bg-green-dark"
              >
                View openings
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </button>
              <button
                onClick={() => scrollToId("why")}
                className="group inline-flex items-center gap-2 rounded-full border border-navy/20 px-6 py-3 text-sm font-medium tracking-wide text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-paper"
              >
                Life at C&amp;T
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Why join — numbered reasons grid ── */}
      <section id="why" data-reveal className="scroll-mt-24 bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <h2
            data-up
            className="max-w-3xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
          >
            Why build your career <span className="text-green-dark">with us</span>
          </h2>

          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {careers.reasons.map((r, i) => (
              <div key={r.title} data-up className="border-t border-line pt-6">
                <span className="font-mono text-[0.8rem] tracking-[0.1em] text-green-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-[-0.01em] md:text-2xl">
                  {r.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-dim">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Why choose C&T — copy + media ── */}
      <section data-reveal className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div data-up>
              <h2 className="max-w-lg font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
                {careers.whyTitle}
              </h2>
              {careers.whyBody.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-ink-dim first:mt-6">
                  {p}
                </p>
              ))}
              <button
                onClick={() => scrollToId("openings")}
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:bg-green-dark"
              >
                See current openings
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </button>
            </div>

            <div
              data-up
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone"
            >
              <img
                src="/careers2.jpeg"
                alt="C&T engineering team on site"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 h-5 w-5 border-l border-t border-beige/80" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Team mosaic ── */}
      <section data-reveal className="bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
          <p data-up className="label text-green-dark">
            Life at C&amp;T
          </p>
          <div data-up className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {careers.teamPhotos.map((src) => (
              <div
                key={src}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-stone"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Openings — cards → /careers/[slug] ── */}
      <OpeningsGrid openings={openings} />
    </div>
  );
}
