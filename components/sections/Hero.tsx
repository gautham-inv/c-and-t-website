"use client";

import { useEffect, useState } from "react";

/**
 * Homepage hero. The looping background video is a `md`+, motion-safe
 * enhancement — it never reaches a phone.
 *
 * `autoplay` forces a browser to start fetching a video regardless of
 * `preload`, and hiding the element with CSS (`hidden md:block`) does NOT
 * stop that fetch — it just hides the already-downloading bytes. So the only
 * way to keep it off mobile is to not put a `<video>` in the DOM at all until
 * JS has confirmed the viewport qualifies; `showVideo` starts `false` (an SSR
 * page has no `window` to check), which is also the correct state for mobile,
 * reduced-motion, and no-JS visitors — they simply keep the poster.
 *
 * The poster is a real, always-rendered `<img>` (not a `video[poster]`, which
 * a browser only bothers painting once it starts loading the video): it's the
 * first thing to paint for every visitor, `fetchPriority="high"` since it's
 * the page's likely LCP element, and the video crossfades in on top of it
 * once it's actually ready to play — never a swap to a blank frame.
 */
export function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setShowVideo(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section id="top" className="relative h-svh overflow-hidden bg-navy">
      <img
        src="/hero-poster.webp"
        alt=""
        aria-hidden
        width={1600}
        height={900}
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
      />
      {showVideo && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src="/final.webm"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          onCanPlay={() => setVideoReady(true)}
        />
      )}

      {/* Dark overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 bg-navy/45" />

      {/* Headline */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="font-display text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-transparent"
          style={{
            WebkitTextStroke: "clamp(1px, 0.15vw, 2px) var(--color-paper)",
            mixBlendMode: "exclusion",
          }}
        >
          <span className="block">Engineered to Endure</span>
        </h1>
      </div>
    </section>
  );
}
