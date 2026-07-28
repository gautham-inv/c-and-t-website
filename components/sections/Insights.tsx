"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INSIGHTS, type Insight } from "@/lib/insights";

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage Insights teaser — a taste of the thought-leadership that lives in
 * full on /insights. Editorial two-card layout (shared with the sector pages):
 * a tall lead article beside a shorter second one, heights balanced.
 */
export function Insights({ insights = INSIGHTS }: { insights?: Insight[] } = {}) {
  const root = useRef<HTMLElement>(null);
  const featured = insights.slice(0, 2);

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
              className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              Recent <span className="text-green-dark">thinking</span>
            </h2>
          </div>
          <Link
            data-up
            href="/insights"
            className="group inline-flex items-center gap-2.5 rounded-full border border-navy/20 px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-paper"
          >
            View all insights
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </div>

        <div
          data-up
          className="mt-12 grid items-start gap-6 md:mt-14 md:grid-cols-2 md:gap-8 xl:items-stretch"
        >
          {/* Card 1 — title beside a tall portrait image, but only once there's
              room for it. The side-by-side split needs a wide column: below xl
              each card is at most ~450px, so the text half collapsed to a
              ~220px ribbon. Under xl this card mirrors Card 2 exactly — image
              on top at the SAME fixed height, caption beneath.
              The height is fixed rather than 1fr/flex-1 because the two cards'
              captions differ in length (this one carries a read time), so a
              stretched image row resolved to a different height in each card
              and the two images — and the captions under them — sat at
              different heights. */}
          {featured[0] && (
            <Link
              href={featured[0].href}
              className="group grid gap-6 xl:grid-cols-[1fr_1.05fr] xl:gap-8"
            >
              {/* Plain block below xl, flex only from xl. As a flex column the
                  eyebrow becomes a flex item and loses its half-leading, which
                  put it 7px above Card 2's inline one — enough to see side by
                  side. Only the xl split needs the vertical centring. */}
              <div className="order-2 xl:order-1 xl:flex xl:flex-col xl:justify-center">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-dim">
                  Article · {featured[0].tag}
                </span>
                {/* mt matches Card 2's below xl (so the two titles start on the
                    same line) and opens up in the wider xl split. */}
                <h3 className="mt-3 font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.01em] text-navy transition-colors duration-300 group-hover:text-green-dark xl:mt-4">
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
              <div className="relative order-1 h-[min(52vw,15rem)] overflow-hidden rounded-2xl bg-[#0a1c25] xl:order-2 xl:h-auto xl:min-h-[30rem]">
                <img
                  src={featured[0].image}
                  alt={featured[0].title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
              </div>
            </Link>
          )}

          {/* Card 2 — image above title. Below xl the image height matches Card
              1's exactly (same expression), so both captions start on the same
              line. From xl it goes back to flex-1 so it can balance against
              Card 1's taller 30rem portrait. */}
          {featured[1] && (
            <Link href={featured[1].href} className="group flex h-full flex-col gap-6">
              <div className="relative h-[min(52vw,15rem)] overflow-hidden rounded-2xl bg-[#0a1c25] xl:h-auto xl:min-h-[12rem] xl:flex-1">
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
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
