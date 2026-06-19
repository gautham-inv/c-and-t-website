"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WhoWeAre() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const portraitInner = useRef<HTMLDivElement>(null);
  const square = useRef<HTMLDivElement>(null);
  const squareInner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      // Text reveal — down → up stagger (translate only, no fade).
      gsap.from("[data-up]", {
        y: 52,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: content.current, start: "top 78%" },
      });

      // Scroll-scrubbed layered parallax on the images.
      // Each container translates upward (positive parallax); the inner image
      // translates the opposite, smaller amount so it drifts behind as the
      // container races ahead. The smaller/foreground square moves faster than
      // the larger/background portrait, reinforcing depth.
      const st = {
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };
      // The foreground square travels ~2x the distance of the background
      // portrait (square is ~half the height, so it needs ~4x the percentage
      // to cover double the pixels) — exaggerated depth layering.
      gsap.to(portrait.current, { yPercent: -18, ease: "none", scrollTrigger: st });
      gsap.to(square.current, { yPercent: -72, ease: "none", scrollTrigger: st });
      gsap.to(portraitInner.current, { yPercent: 12, ease: "none", scrollTrigger: st });
      gsap.to(squareInner.current, { yPercent: 14, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative scroll-mt-24 bg-navy text-paper"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-12 gap-y-16 lg:gap-x-10">
          {/* Sticky heading rail */}
          <div className="col-span-12 lg:col-span-2">
            <h2 className="label sticky top-28 text-beige">Who we are</h2>
          </div>

          <div
            ref={content}
            className="col-span-12 grid grid-cols-12 items-center gap-y-16 lg:col-span-10"
          >
            {/* Text — hugs the left, slides in from the left */}
            <div data-up className="col-span-12 lg:col-span-5 lg:pr-8">
              <div className="space-y-8 font-display text-[clamp(1.6rem,1rem+1.9vw,2.6rem)] font-light leading-[1.28] tracking-[-0.01em]">
                <p>
                  C&amp;T Consulting Engineers unites smart{" "}
                  <span className="text-beige-light">MEP design</span>, BIM
                  modelling and CFD analysis to deliver engineering that
                  performs — worldwide, since 2013.
                </p>
                <p className="text-paper/70">
                  From data centres and airports to industrial plants and
                  offshore platforms, our teams across India, the UAE and
                  Canada build sustainable, ESG-aligned systems that endure.
                </p>
              </div>

              <a
                href="/about"
                className="group mt-12 inline-flex items-center gap-3 font-display text-lg text-paper"
              >
                <span className="border-b border-green pb-1 transition-colors duration-300 group-hover:border-beige">
                  About C&amp;T
                </span>
                <span className="text-green transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* Images — large portrait + overlapping square, layered parallax */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <div className="relative ml-auto w-full max-w-[34rem] pb-12 pl-10">
                {/* Portrait (primary, background — slower) */}
                <div
                  ref={portrait}
                  className="relative ml-auto aspect-[3/4] w-[82%] overflow-hidden rounded-2xl border border-paper/10 will-change-transform"
                >
                  <div
                    ref={portraitInner}
                    className="absolute inset-x-0 -top-[18%] h-[136%] bg-gradient-to-br from-[#0d2a37] to-[#0a1c25] will-change-transform"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.16]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #729d35 1px, transparent 1px), linear-gradient(to bottom, #729d35 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(70% 55% at 75% 15%, rgba(197,176,111,0.22), transparent 60%)",
                      }}
                    />
                    <p className="absolute bottom-[22%] left-5 right-5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper/45">
                      Built environment · image placeholder
                    </p>
                  </div>
                </div>

                {/* Square (secondary, foreground — faster) */}
                <div
                  ref={square}
                  className="absolute bottom-0 left-0 aspect-square w-[48%] overflow-hidden rounded-2xl border border-paper/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] will-change-transform"
                >
                  <div
                    ref={squareInner}
                    className="absolute inset-x-0 -top-[28%] h-[156%] bg-gradient-to-br from-[#243027] to-[#0d1f16] will-change-transform"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #c5b06f 1px, transparent 1px), linear-gradient(to bottom, #c5b06f 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    <span className="absolute left-4 top-[24%] h-4 w-4 border-l border-t border-beige/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
