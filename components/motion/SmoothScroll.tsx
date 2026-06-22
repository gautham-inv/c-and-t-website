"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth-scroll wrapper, integrated with GSAP ScrollTrigger on a single
 * clock: Lenis emits scroll → ScrollTrigger.update, and the GSAP ticker drives
 * lenis.raf (no separate rAF loop, so the two never desync). Respects
 * prefers-reduced-motion by bailing out entirely.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Pin jumps come from stale measurements: ScrollTrigger caches pin start/end
    // positions on init, but the Satoshi webfont (display:swap) and images change
    // element heights afterwards — shifting everything below them. Recompute once
    // those settle so the pinned sections engage exactly where expected.
    ScrollTrigger.config({ ignoreMobileResize: true });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    // Belt-and-braces: late refreshes catch anything that loads after.
    const t1 = window.setTimeout(refresh, 600);
    const t2 = window.setTimeout(refresh, 1800);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
