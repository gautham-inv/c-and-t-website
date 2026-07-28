"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAPER = "#f4f1e8";
// Deep brand green — paper/cream text reads cleanly against it (the medium
// green was too close in tone to navy text). WithUs continues this colour so
// the social-proof block and the contact card share one dark-green field.
const GREEN = "#4f6f24";

/**
 * Wraps the Clients + Testimonials block. A background layer scrubs from the
 * off-white paper (matching the Projects section above) to deep green across
 * the leading gap, then holds green to the end — WithUs carries the same green
 * onward. The colour is interpolated by scroll (rewinds on reverse), no fades.
 */
export function GreenZone({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const tailGap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(bg.current, { backgroundColor: GREEN });
        return;
      }

      // Entry — paper → green, finished within the leading gap so all text sits
      // on solid green (never mid-transition).
      gsap.fromTo(
        bg.current,
        { backgroundColor: PAPER },
        {
          backgroundColor: GREEN,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "top 70%",
            scrub: true,
          },
        },
      );

      // Exit — green → paper across the trailing gap, so WithUs opens on paper
      // again (its contact card sits on the off-white page, footer reveal intact).
      gsap.fromTo(
        bg.current,
        { backgroundColor: GREEN },
        {
          backgroundColor: PAPER,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: tailGap.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <div
        ref={bg}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundColor: PAPER }}
      />
      {/* Leading gap — hosts the off-white → green transition.
          Much shorter below lg: 24vh of empty colour stacks on top of Clients'
          own top padding, which on a phone reads as a large blank green band
          before any content. The entry transition doesn't depend on this
          height (it's driven off the root, top bottom → top 70%), so shrinking
          it costs nothing.
          Both values are px-capped with min(): vh alone scales with viewport
          HEIGHT, so a tall portrait tablet (iPad Pro, 1024×1366 — wide enough
          to be `lg`) turned 24vh into 328px of empty colour. The cap keeps the
          gap proportionate to the content rather than to the screen. */}
      <div className="h-[min(8vh,3.5rem)] lg:h-[min(24vh,9rem)]" />
      {children}
      {/* Trailing gap — hosts the green → off-white transition. Unlike the
          leading gap this one IS the transition's scroll distance (it's the
          trigger), so it can't go to zero — ~10rem keeps the fade readable
          while cutting the dead space below Testimonials. Same px cap as
          above, for the same tall-viewport reason. */}
      <div ref={tailGap} className="h-[min(12vh,5rem)] lg:h-[min(24vh,10rem)]" />
    </div>
  );
}
