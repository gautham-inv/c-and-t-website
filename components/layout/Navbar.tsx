"use client";

import { useCallback, useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/** Full menu shown in the overlay (opened by the hamburger). */
const OVERLAY_NAV = [
  { label: "Sectors", target: "sectors" },
  { label: "Services", target: "services" },
  { label: "Projects", target: "projects" },
  { label: "Case Studies", target: "case-studies" },
  { label: "About", target: "about" },
  { label: "Insights", target: "blog" },
  { label: "Contact", target: "contact" },
];

const SOCIAL = ["LinkedIn", "Instagram", "X", "YouTube"];
const LEGAL = ["Privacy Policy", "Terms of Use", "ISO 9001:2015"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide on scroll-down, reveal on scroll-up (always shown near the top).
  // Driven by GSAP ScrollTrigger; the slide is positional, never opacity.
  useEffect(() => {
    let last = 0;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        if (Math.abs(y - last) > 6) {
          setHidden(y > 90 && y > last);
          last = y;
        }
      },
    });
    return () => st.kill();
  }, []);

  // Lock scroll while the overlay is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      setHidden(false);
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = useCallback(
    (target: string) => {
      const scroll = () => {
        const el = document.getElementById(target);
        if (!el) return;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        else el.scrollIntoView({ behavior: "smooth" });
      };
      if (open) {
        setOpen(false);
        window.setTimeout(scroll, 480); // let the overlay close first
      } else {
        scroll();
      }
    },
    [open],
  );

  const pill =
    "rounded-2xl border border-line bg-paper/90 backdrop-blur-md shadow-[0_4px_24px_-10px_rgba(9,33,44,0.35)]";

  return (
    <>
      {/* ── Top bar — single pill; slides up on scroll-down, reveals on up ── */}
      <header
        className={`fixed inset-x-0 top-0 z-[70] py-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          hidden ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-4 md:px-6">
          <div
            className={`relative flex items-center justify-between px-5 py-3.5 md:px-7 ${pill}`}
          >
            {/* Hamburger — opens the overlay menu */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="-ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-navy transition-colors duration-200 hover:bg-navy/[0.06]"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-[2px] w-6 rounded-full bg-navy" />
                <span className="block h-[2px] w-6 rounded-full bg-navy" />
              </span>
            </button>

            {/* Logo — centred */}
            <button
              onClick={() => go("top")}
              aria-label="C&T Consulting Engineers — home"
              className="absolute left-1/2 -translate-x-1/2"
            >
              <img
                src="/logo.webp"
                alt="C&T Consulting Engineers"
                width={462}
                height={200}
                className="h-8 w-auto object-contain md:h-9"
                draggable={false}
              />
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-navy"
            >
              Contact
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </header>

      {/* ── Overlay menu ── */}
      <div
        className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Staggered colour layers sliding down from the top */}
        <div
          className="absolute inset-0 bg-beige-light transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            transform: open ? "translateY(0)" : "translateY(-100%)",
            transitionDelay: open ? "0ms" : "300ms",
          }}
        />
        <div
          className="absolute inset-0 bg-green transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            transform: open ? "translateY(0)" : "translateY(-100%)",
            transitionDelay: open ? "90ms" : "190ms",
          }}
        />
        {/* Navy layer carries the content, so it hides with the layer when closed */}
        <div
          className="absolute inset-0 flex flex-col bg-navy text-paper transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            transform: open ? "translateY(0)" : "translateY(-100%)",
            transitionDelay: open ? "180ms" : "0ms",
          }}
        >
          <div className="flex h-full flex-col px-6 py-6 md:px-10 md:py-8">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-2.5 text-sm font-medium tracking-wide"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/30 transition-colors duration-300 group-hover:border-paper">
                  <X className="h-4 w-4" strokeWidth={2} />
                </span>
                Close
              </button>
              <img
                src="/logo.webp"
                alt="C&T Consulting Engineers"
                className="h-8 w-auto object-contain md:h-9"
                draggable={false}
              />
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("contact");
                }}
                className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-paper/85 transition-colors hover:text-paper"
              >
                Contact
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>

            {/* Body */}
            <div className="flex flex-1 items-center">
              <div className="grid w-full grid-cols-1 items-end gap-12 md:grid-cols-2">
                {/* Secondary — social + legal */}
                <div className="order-2 flex flex-col gap-8 md:order-1">
                  <ul className="flex flex-col gap-2">
                    {SOCIAL.map((s, i) => (
                      <li key={s} className="overflow-hidden">
                        <a
                          href="#"
                          className="block translate-y-full font-mono text-sm uppercase tracking-[0.14em] text-paper/70 transition-[transform,color] duration-[550ms] ease-[cubic-bezier(0.76,0,0.24,1)] hover:text-paper data-[open=true]:translate-y-0"
                          data-open={open}
                          style={{ transitionDelay: open ? `${420 + i * 45}ms` : "0ms" }}
                        >
                          {s}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul className="flex flex-col gap-1.5">
                    {LEGAL.map((l, i) => (
                      <li key={l} className="overflow-hidden">
                        <span
                          className="block translate-y-full font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/45 transition-transform duration-[550ms] ease-[cubic-bezier(0.76,0,0.24,1)] data-[open=true]:translate-y-0"
                          data-open={open}
                          style={{ transitionDelay: open ? `${560 + i * 40}ms` : "0ms" }}
                        >
                          {l}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Big nav — slides up one by one */}
                <ul className="order-1 flex flex-col items-start gap-1 md:order-2 md:items-end">
                  {OVERLAY_NAV.map((n, i) => (
                    <li key={n.target} className="overflow-hidden">
                      <button
                        onClick={() => go(n.target)}
                        data-open={open}
                        style={{ transitionDelay: open ? `${300 + i * 55}ms` : "0ms" }}
                        className="block translate-y-full font-display text-[clamp(2.25rem,1rem+5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper transition-[transform,color] duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] hover:text-green data-[open=true]:translate-y-0"
                      >
                        {n.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/55">
              <span>Since 2013</span>
              <span className="h-1 w-1 rounded-full bg-green" />
              <span>India · UAE · Canada</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
