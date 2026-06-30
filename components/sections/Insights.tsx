"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INSIGHTS } from "@/lib/insights";

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage Insights teaser — a taste of the thought-leadership that lives in
 * full on /insights. Editorial two-card layout (shared with the sector pages):
 * a tall lead article beside a shorter second one, heights balanced.
 */
export function Insights() {
  const root = useRef<HTMLElement>(null);
  const featured = INSIGHTS.slice(0, 2);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap.from("[data-up]", {
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="blog" className="scroll-mt-24 bg-paper text-navy">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              data-up
              className="font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]"
            >
              Innovative <span className="text-green-dark">thinking</span>
            </h2>
          </div>
          <a
            data-up
            href="/insights"
            className="group inline-flex items-center gap-2.5 rounded-full border border-navy/20 px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-paper"
          >
            View all insights
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </a>
        </div>

        <div
          data-up
          className="mt-12 grid items-stretch gap-10 md:mt-14 md:grid-cols-2 md:gap-16"
        >
          {/* Card 1 — title beside a tall portrait image. */}
          {featured[0] && (
            <a
              href={featured[0].href}
              className="group grid items-stretch gap-6 sm:grid-cols-[1fr_1.05fr] sm:gap-8"
            >
              <div className="order-2 flex flex-col justify-center sm:order-1">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-dim">
                  Article · {featured[0].tag}
                </span>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.01em] text-navy transition-colors duration-300 group-hover:text-green-dark">
                  {featured[0].title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-green-dark transition-colors duration-300 group-hover:text-green">
                  {featured[0].read}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </span>
              </div>
              <div className="relative order-1 min-h-[22rem] overflow-hidden rounded-2xl bg-[#0a1c25] sm:order-2 sm:min-h-[30rem]">
                <img
                  src={featured[0].image}
                  alt={featured[0].title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
              </div>
            </a>
          )}

          {/* Card 2 — image above title; together they match Card 1's height. */}
          {featured[1] && (
            <a href={featured[1].href} className="group flex h-full flex-col gap-6">
              <div className="relative min-h-[12rem] flex-1 overflow-hidden rounded-2xl bg-[#0a1c25]">
                <img
                  src={featured[1].image}
                  alt={featured[1].title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
              </div>
              <div>
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-dim">
                  Article · {featured[1].tag}
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.01em] text-navy transition-colors duration-300 group-hover:text-green-dark">
                  {featured[1].title}
                </h3>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
