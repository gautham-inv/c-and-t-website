"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES, serviceDivisions } from "@/lib/services";
import type { DivisionSlug } from "@/lib/divisions";

gsap.registerPlugin(ScrollTrigger);

// Compact division labels for the per-card pointers (the data's shortName for
// Buildings is too long for these small links).
const DIV_SHORT: Record<DivisionSlug, string> = {
  building: "Buildings",
  "oil-and-gas": "Oil & Gas",
};

export function Services() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap.from("[data-up]", {
        y: 48,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="scroll-mt-24 bg-paper text-navy">
      <div className="mx-auto grid max-w-[1600px] items-stretch gap-8 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-12">
        {/* ── Left: image card — fast crossfade as you move across the grid ── */}
        <div
          data-up
          className="relative min-h-[24rem] overflow-hidden rounded-3xl bg-[#0c1f18] lg:min-h-[34rem]"
        >
          {SERVICES.map((s, i) => (
            <img
              key={s.slug}
              src={s.image}
              alt={s.name}
              aria-hidden={i !== active}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,43,35,0.85) 0%, rgba(15,43,35,0.2) 50%, transparent 78%)",
            }}
          />
          {/* "Service" pill */}
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            Service
          </span>
          <div className="absolute inset-x-6 bottom-6 text-paper">
            <p className="font-display text-2xl font-medium leading-tight md:text-3xl">
              {SERVICES[active].name}
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/70">
              {SERVICES[active].blurb}
            </p>
          </div>
        </div>

        {/* ── Right: heading + service grid ── */}
        <div data-up className="flex flex-col justify-center">
          <h2 className="font-display text-[clamp(2rem,1rem+3vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            The disciplines we{" "}
            <span className="text-ink-dim">deliver</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-dim">
            The same disciplines, delivered by both teams to different scopes —
            from Buildings &amp; Infrastructure to Oil &amp; Gas. Hover a service
            to preview it.
          </p>

          <a
            href="/services"
            className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-line py-2.5 pl-5 pr-2.5 text-sm font-medium text-navy transition-colors duration-300 hover:border-navy"
          >
            See all services
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green text-white">
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </span>
          </a>

          {/* Grid of services — hovering swaps the image on the left. Each
              service is delivered by BOTH divisions, so every card points
              separately into its Buildings and Oil & Gas scope. */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s, i) => {
              const open = i === active;
              return (
                <div
                  key={s.slug}
                  onMouseEnter={() => setActive(i)}
                  className={`relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-2xl p-5 transition-all duration-300 ${
                    open
                      ? "bg-white shadow-[0_12px_34px_-20px_rgba(9,33,44,0.45)] ring-1 ring-green-dark/45"
                      : "bg-stone ring-1 ring-transparent"
                  }`}
                >
                  <span
                    className={`font-mono text-sm tracking-[0.1em] transition-colors duration-300 ${
                      open ? "text-green-dark" : "text-ink-dim"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <span className="font-display text-lg font-medium leading-tight text-navy md:text-xl">
                      {s.name}
                    </span>

                    {/* Per-division pointers — explicit pill buttons so it's
                        clear THESE are the links (the card itself only previews
                        the image on the left). */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-dim">
                        View in
                      </span>
                      {serviceDivisions(s).map((d) => (
                        <a
                          key={d}
                          href={`/divisions/${d}#${s.slug}`}
                          onFocus={() => setActive(i)}
                          className="group/link inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white/70 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-navy/80 transition-colors duration-300 hover:border-green-dark hover:bg-green-dark hover:text-white"
                        >
                          {DIV_SHORT[d]}
                          <ArrowUpRight
                            className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            strokeWidth={2}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
