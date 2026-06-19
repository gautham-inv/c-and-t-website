"use client";

import { useCallback, useEffect, useState } from "react";
import { getLenis } from "@/lib/lenis";

/** Grouped navigation model — mirrors the homepage section architecture. */
const NAV_GROUPS: {
  label: string;
  links: { label: string; target: string }[];
}[] = [
  {
    label: "About",
    links: [
      { label: "Who We Are", target: "about" },
      { label: "Philosophy", target: "philosophy" },
      { label: "Certifications", target: "trust" },
    ],
  },
  {
    label: "What We Do",
    links: [
      { label: "Services", target: "services" },
      { label: "Sectors", target: "sectors" },
      { label: "Projects", target: "projects" },
    ],
  },
];

const NAV_SECONDARY: { label: string; target: string }[] = [
  { label: "Insights", target: "blog" },
  { label: "FAQ", target: "faq" },
  { label: "Connect", target: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sticky header: once past the first viewport-ish, show a translucent bar so
  // the logo + toggle stay legible over dark sections.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the overlay is open (stop Lenis + native overflow guard).
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC closes the overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = useCallback((target: string) => {
    setOpen(false);
    // Wait for the overlay close + scroll-unlock before scrolling.
    window.setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      else el.scrollIntoView({ behavior: "smooth" });
    }, 320);
  }, []);

  return (
    <>
      {/* Sticky top bar. z above the overlay so the toggle morphs to a visible
          X on the open white panel. A translucent bar fades in once scrolled so
          the logo + toggle stay legible over dark sections. */}
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-300 ${
          scrolled && !open
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-[padding] duration-300 md:px-10 ${
            scrolled ? "py-3.5 md:py-4" : "py-6 md:py-8"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => go("top")}
            className="flex shrink-0 items-center"
            aria-label="C&T Consulting Engineers — home"
          >
            <img
              src="/logo.webp"
              alt="C&T Consulting Engineers"
              width={462}
              height={200}
              className="h-9 w-auto shrink-0 object-contain md:h-11"
              draggable={false}
            />
          </button>

          {/* Hamburger → X toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[60] flex h-11 w-11 items-center justify-center"
          >
            <span className="relative block h-4 w-7">
              <span
                className={`absolute left-0 block h-[2px] w-7 origin-center bg-navy transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-7 origin-center bg-navy transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-navy/30 backdrop-blur-[2px] ${
          open ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden
      />

      {/* Slide-in overlay panel */}
      <nav
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col overflow-y-auto bg-white transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:w-[clamp(28rem,42vw,40rem)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex min-h-dvh flex-col px-8 pb-10 pt-28 md:px-16">
          {/* Nav — centred in the available space */}
          <div className="flex flex-1 flex-col justify-center gap-10">
          {/* Primary groups */}
          <div className="space-y-10">
            {NAV_GROUPS.map((group, gi) => (
              <div key={group.label}>
                <p className="label mb-4 text-green-dark">{group.label}</p>
                <ul className="space-y-1.5">
                  {group.links.map((link, li) => (
                    <li key={link.target}>
                      <button
                        onClick={() => go(link.target)}
                        style={{
                          transitionDelay: open
                            ? `${180 + (gi * 3 + li) * 45}ms`
                            : "0ms",
                        }}
                        className={`font-display text-4xl font-light leading-tight tracking-tight text-navy transition-transform duration-500 ease-out hover:text-green md:text-5xl ${
                          open ? "translate-y-0" : "translate-y-4"
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-16 bg-green" />

          {/* Secondary links */}
          <ul className="space-y-1">
            {NAV_SECONDARY.map((link, i) => (
              <li key={link.target}>
                <button
                  onClick={() => go(link.target)}
                  style={{
                    transitionDelay: open ? `${420 + i * 45}ms` : "0ms",
                  }}
                  className={`font-display text-2xl font-light text-navy/80 transition-transform duration-500 ease-out hover:text-green md:text-3xl ${
                    open ? "translate-y-0" : "translate-y-4"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          </div>

          {/* Footer meta — pinned to the bottom, two clean lines */}
          <div className="mt-10 space-y-1.5 border-t border-line pt-8 font-display text-[0.74rem] uppercase tracking-[0.16em] text-ink-dim">
            <p>Since 2013 · ISO 9001:2015</p>
            <p>India · UAE · Canada</p>
          </div>
        </div>
      </nav>
    </>
  );
}
