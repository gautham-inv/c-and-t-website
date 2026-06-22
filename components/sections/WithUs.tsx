"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Height of the overlap zone — must match the footer's blueprint band
// (Footer pulls itself up behind this section by the same amount). The wipe
// peels the card away across this whole zone, so a larger value = the blueprint
// is revealed further up the structure.
export const WITHUS_OVERLAP_VH = 68;

/**
 * `rounded` (homepage only) runs the inset → full-bleed margin + border-radius
 * collapse as you scroll in. Other pages pass rounded={false}: the card is
 * full-bleed from the start, no radius, like before. The footer wipe runs in
 * both cases.
 */
export function WithUs({ rounded = true }: { rounded?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!reduce) {
        gsap.from("[data-up]", {
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        });
      }

      if (reduce || !card.current) return;

      // Margin + radius collapse: card → full-bleed as you scroll through.
      // Homepage only — other pages render the card flush from the start.
      if (rounded) {
        gsap.fromTo(
          card.current,
          { marginLeft: "5vw", marginRight: "5vw", borderRadius: "2.25rem" },
          {
            marginLeft: "0vw",
            marginRight: "0vw",
            borderRadius: "0rem",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 88%",
              end: "top 22%",
              scrub: true,
            },
          },
        );
      }

      // Wipe: clip the card's bottom edge upward faster than the page scrolls
      // (negative parallax), uncovering the footer's blueprint band behind it.
      const overlapPx = () => (window.innerHeight * WITHUS_OVERLAP_VH) / 100;
      gsap.fromTo(
        card.current,
        { clipPath: "inset(0px 0px 0px 0px)" },
        {
          clipPath: () => `inset(0px 0px ${overlapPx()}px 0px)`,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "bottom 96%",
            end: () => "+=" + overlapPx() * 0.78,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" className="relative z-20 scroll-mt-24">
      <div
        ref={card}
        className={`relative overflow-hidden bg-paper text-navy will-change-transform ${
          rounded
            ? "shadow-[0_40px_120px_-45px_rgba(9,33,44,0.5)] ring-1 ring-navy/10"
            : ""
        }`}
        style={
          rounded
            ? {
                marginLeft: "5vw",
                marginRight: "5vw",
                borderRadius: "2.25rem",
              }
            : undefined
        }
      >
        {/* Blueprint mesh — green on the off-white fill */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #729d35 1px, transparent 1px), linear-gradient(to bottom, #729d35 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Heading + CTAs */}
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 pt-24 text-center md:px-10 md:pt-32">
          <h2
            data-up
            className="mx-auto max-w-3xl font-display text-[clamp(2rem,1rem+3.4vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          >
            Let&apos;s build what&apos;s next together.
          </h2>
          <div
            data-up
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="rounded-full bg-navy px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:bg-green-dark"
            >
              Request a proposal
            </a>
            <a
              href="mailto:mail@candtengineers.com"
              className="rounded-full border border-navy/30 px-7 py-3.5 text-sm font-medium tracking-wide text-navy transition-colors duration-300 hover:border-navy"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Finished-structure hero (~2x). Bottom-anchored so its bottom edge
            meets the card bottom — exactly where the footer's blueprint band
            begins — making the two layers pixel-aligned across the wipe. */}
        <div
          aria-hidden
          className="pointer-events-none relative z-[1] mt-14 h-[88vh] select-none"
        >
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <img
              src="/og.png"
              alt=""
              draggable={false}
              className="w-[78vw] max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
