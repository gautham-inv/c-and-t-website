"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// At rest the frame is full-bleed (full width, no radius) with the headline +
// a slight dark overlay on top. On scroll a margin + border-radius appear (it
// settles into an inset panel) and the image sequence scrubs/plays through.
// CSS sticky does the pinning — no ScrollTrigger pin, so there is no jump.
const INSET_PHASE = 0.4; // fraction of scroll spent insetting the frame
const END_W = 97.5; // vw when inset (~1.25vw side margins)
const END_H = 95; // vh when inset (~2.5vh top/bottom margins)
const END_RADIUS = 22; // px
const START_OVERLAY = 0.45;
const END_OVERLAY = 0.12;

// Scroll-scrubbed JPEG sequence (exported video frames). The current frame is
// chosen from scroll progress and painted to a canvas — no <video> seeking,
// which is far smoother to scrub on iOS/Safari.
const FRAME_COUNT = 161;
const FRAME_W = 1920;
const FRAME_H = 1080;
const framePath = (i: number) =>
  `/news-frames/frame-${String(i).padStart(3, "0")}.jpg`;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.from("[data-rise]", {
        y: 24,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.09,
        delay: 0.1,
      });

      if (!frame.current || !root.current) return;

      // ── Frame sequence: preload every JPEG, paint by index ──
      const ctx = canvas.current?.getContext("2d") ?? null;
      const images: HTMLImageElement[] = [];
      const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
      let current = -1;

      const draw = (i: number) => {
        const idx = gsap.utils.clamp(0, FRAME_COUNT - 1, Math.round(i));
        if (idx === current || !ctx || !loaded[idx]) return;
        current = idx;
        ctx.drawImage(images[idx], 0, 0, FRAME_W, FRAME_H);
      };

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i + 1);
        img.onload = () => {
          loaded[i] = true;
          // First frame ready → paint it so the hero isn't blank.
          if (i === 0 && current === -1) draw(0);
        };
        images[i] = img;
      }

      // Reduced motion: static inset panel, no scroll choreography.
      if (reduce) {
        gsap.set(frame.current, {
          width: `${END_W}vw`,
          height: `${END_H}vh`,
          borderRadius: END_RADIUS,
          y: window.innerHeight * ((100 - END_H) / 200),
        });
        gsap.set(overlay.current, { opacity: END_OVERLAY });
        return;
      }

      const ease = gsap.parseEase("power2.out");

      // Scrub timeline driven by section scroll (CSS sticky handles pinning).
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const e = ease(gsap.utils.clamp(0, 1, p / INSET_PHASE));

          const W = 100 + (END_W - 100) * e;
          const H = 100 + (END_H - 100) * e;
          gsap.set(frame.current, {
            width: `${W}vw`,
            height: `${H}vh`,
            borderRadius: END_RADIUS * e,
            // keep the (shrinking) frame vertically centred in the viewport
            y: (window.innerHeight * (100 - H)) / 200,
          });

          // Dark overlay clears as the frame insets so the video plays clean.
          gsap.set(overlay.current, {
            opacity: START_OVERLAY + (END_OVERLAY - START_OVERLAY) * e,
          });

          // Headline rides up and off (clipped by the frame) as you scroll in.
          const exit = gsap.utils.clamp(0, 1, (p - 0.06) / 0.3);
          gsap.set(headline.current, {
            y: -window.innerHeight * 0.6 * exit,
          });

          // Frame sequence scrubs with scroll — "plays" as you move through.
          draw(p * (FRAME_COUNT - 1));
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative h-[300vh] bg-paper">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video frame — full-bleed at rest, insets + rounds on scroll */}
        <div
          ref={frame}
          className="absolute inset-x-0 top-0 z-10 mx-auto overflow-hidden bg-navy will-change-transform"
          style={{ width: "100vw", height: "100vh", borderRadius: 0 }}
        >
          {/* Fallback gradient behind the video */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(155deg, #1b2420 0%, #243027 45%, #3c4a31 100%)",
            }}
          />

          {/* Scroll-scrubbed frame sequence */}
          <canvas
            ref={canvas}
            width={FRAME_W}
            height={FRAME_H}
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />

          {/* Slight dark overlay — strongest at rest for headline legibility,
              clears as the frame insets. */}
          <div
            ref={overlay}
            aria-hidden
            className="absolute inset-0 bg-navy"
            style={{ opacity: START_OVERLAY }}
          />

          {/* Headline — displayed on the video; rises away on scroll */}
          <div
            ref={headline}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center will-change-transform"
          >
            <h1
              className="font-display text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-paper"
              style={{ textShadow: "0 2px 50px rgba(9,33,44,0.55)" }}
            >
              <span data-rise className="block">
                Precision Engineered.
              </span>
              <span data-rise className="block text-beige-light">
                Globally Delivered.
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
