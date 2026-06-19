"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Portion of the scroll spent rising + scaling the frame to fullscreen.
 *  The remainder (pinned) scrubs the video's currentTime. */
const SCALE_PHASE = 0.4;

// Frame geometry: at rest the frame is full-bleed (full width, no radius) and
// pushed down, so the viewport reads as a window sliding over a full-bleed
// container. It then settles into a near-full panel with a small consistent
// margin on all four edges + a border radius.
const START_W = 100; // vw — full bleed, no side margin
const START_H = 58; // vh
const START_RADIUS = 0; // px — no radius while peeking
const PEEK_OFFSET = 0.42; // vh fraction the frame starts pushed down

const END_W = 97; // vw — ~1.5vw side margins when expanded
const END_H = 94; // vh
const END_RADIUS = 16; // px
const END_OFFSET = 0.03; // vh fraction — ~3vh top/bottom margin when expanded

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const punchline = useRef<HTMLDivElement>(null);
  const vignette = useRef<HTMLDivElement>(null);

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

      if (!frame.current || !pin.current || !stage.current) return;

      // Reduced motion: drop the scroll choreography, show a static card.
      if (reduce) {
        gsap.set(pin.current, { height: "auto" });
        gsap.set(stage.current, { position: "relative", height: "auto" });
        gsap.set(frame.current, {
          position: "relative",
          width: "95vw",
          height: "70vh",
          xPercent: 0,
          y: 0,
          margin: "1.5rem auto 4rem",
          borderRadius: 12,
        });
        gsap.set(punchline.current, { y: 0, opacity: 1 });
        gsap.set(vignette.current, { opacity: 1 });
        return;
      }

      // Hidden until the frame is almost full (set each tick in onUpdate).
      gsap.set(punchline.current, { opacity: 0 });
      gsap.set(vignette.current, { opacity: 0 });

      const ease = gsap.parseEase("power2.out");

      // Phase 1: punchline rises away while the frame rises from its bottom
      // peek and scales to full-bleed. Phase 2: pinned, scrub the video.
      ScrollTrigger.create({
        trigger: pin.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const e = ease(gsap.utils.clamp(0, 1, p / SCALE_PHASE));

          gsap.set(frame.current, {
            width: START_W + (END_W - START_W) * e + "vw",
            height: START_H + (END_H - START_H) * e + "vh",
            borderRadius: START_RADIUS + (END_RADIUS - START_RADIUS) * e,
            y: window.innerHeight * (PEEK_OFFSET + (END_OFFSET - PEEK_OFFSET) * e),
          });

          // Punchline simply drifts up as the frame takes over (no fade).
          gsap.set(headline.current, {
            y: -window.innerHeight * 0.55 * e,
          });

          // Centre punchline fades in only once the frame is almost filling
          // the screen, holds briefly centred, then slides UP and off the top
          // (starting a touch early). Bound to progress so it tracks the
          // video-fill point on every viewport.
          const appear = gsap.utils.clamp(
            0,
            1,
            (p - (SCALE_PHASE - 0.16)) / 0.1,
          );
          const exit = gsap.utils.clamp(
            0,
            1,
            (p - (SCALE_PHASE + 0.015)) / 0.16,
          );
          gsap.set(punchline.current, {
            opacity: appear,
            y: -window.innerHeight * 1.05 * exit,
          });

          // Vignette rides with the text: on while the punchline is present
          // for legibility, then fades out as it slides up so the video plays
          // at full clarity once the text is gone.
          gsap.set(vignette.current, { opacity: appear * (1 - exit) });

          const v = video.current;
          if (v && Number.isFinite(v.duration) && v.duration > 0) {
            const vp =
              p <= SCALE_PHASE ? 0 : (p - SCALE_PHASE) / (1 - SCALE_PHASE);
            const t = vp * v.duration;
            if (Number.isFinite(t)) v.currentTime = t;
          }
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative bg-paper text-navy">
      <div ref={pin} className="relative h-[440vh]">
        <div ref={stage} className="sticky top-0 h-screen overflow-hidden">
          {/* Punchline — left aligned; drifts up + fades on scroll */}
          <div
            ref={headline}
            className="absolute inset-x-0 top-0 z-10 mx-auto max-w-[1500px] px-6 pt-28 md:px-10 md:pt-32"
          >
            <h1 className="font-display text-[clamp(2rem,1rem+3.4vw,3.9rem)] font-light leading-[1.02] tracking-[-0.02em]">
              <span data-rise className="block">
                Precision Engineered.
              </span>
              <span data-rise className="block text-green-dark">
                Globally Delivered.
              </span>
            </h1>
          </div>

          {/* Video frame — peeks at the bottom, rises + scales to fullscreen */}
          <div
            ref={frame}
            className="absolute inset-x-0 top-0 z-20 mx-auto overflow-hidden bg-navy shadow-[0_40px_120px_-50px_rgba(9,33,44,0.5)]"
            style={{
              width: `${START_W}vw`,
              height: `${START_H}vh`,
              borderRadius: `${START_RADIUS}px`,
              transform: `translateY(${PEEK_OFFSET * 100}vh)`,
            }}
          >
            {/* Fallback gradient — sits behind the video (shown if it fails). */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(155deg, #1b2420 0%, #243027 45%, #3c4a31 100%)",
              }}
            />

            {/* Scroll-scrubbed video — paints on top of the fallback. */}
            <video
              ref={video}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              preload="auto"
              tabIndex={-1}
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>

            {/* Vignette for punchline legibility — fades out once the text
                has slid up, leaving the video at full clarity. */}
            <div
              ref={vignette}
              aria-hidden
              className="absolute inset-0"
              style={{
                opacity: 0,
                background:
                  "radial-gradient(120% 90% at 50% 50%, transparent 35%, rgba(9,33,44,0.4) 100%)",
              }}
            />

            {/* Centre punchline — slides up as the video starts playing */}
            <div
              ref={punchline}
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 will-change-transform"
              style={{ opacity: 0 }}
            >
              <p
                className="text-center font-display text-[clamp(2.25rem,1rem+4vw,5rem)] font-light leading-[1.05] text-paper"
                style={{ textShadow: "0 2px 50px rgba(9,33,44,0.6)" }}
              >
                Modeled. Coordinated. Delivered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
