"use client";

import { useCallback, useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";
import { openEnquiry } from "@/lib/enquiry";

gsap.registerPlugin(ScrollTrigger);

/** Primary nav — shown inline on desktop, in the overlay on mobile. Section
 * links (/#id) smooth-scroll on the homepage and navigate home elsewhere;
 * page links route normally. */
const NAV = [
  { label: "Who we are", href: "/about" },
  { label: "What we do", href: "/services" },
  { label: "Expertise", href: "/#divisions" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

const SOCIAL = ["LinkedIn", "Instagram", "X", "YouTube"];
const LEGAL = ["Privacy Policy", "Terms of Use", "ISO 9001:2015"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide on scroll-down, reveal on scroll-up (always shown near the top).
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

  // Section links smooth-scroll on the homepage; everything else navigates.
  const onNav = useCallback(
    (e: React.MouseEvent, href: string) => {
      const isSection = href.startsWith("/#");
      const onHome = window.location.pathname === "/";
      const close = () => open && setOpen(false);

      if (isSection && onHome) {
        e.preventDefault();
        const id = href.slice(2);
        const scroll = () => {
          const el = document.getElementById(id);
          if (!el) return;
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
          else el.scrollIntoView({ behavior: "smooth" });
        };
        if (open) {
          setOpen(false);
          window.setTimeout(scroll, 480);
        } else {
          scroll();
        }
        return;
      }
      close();
    },
    [open],
  );

  const pill =
    "rounded-2xl border border-line bg-paper/90 backdrop-blur-md shadow-[0_4px_24px_-10px_rgba(9,33,44,0.35)]";

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className={`fixed inset-x-0 top-0 z-[70] py-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          hidden ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-4 md:px-6">
          <div
            className={`relative flex items-center justify-between gap-4 px-5 py-3 md:px-7 ${pill}`}
          >
            {/* Logo — home */}
            <a
              href="/"
              aria-label="C&T Consulting Engineers — home"
              className="shrink-0"
            >
              <img
                src="/logo.webp"
                alt="C&T Consulting Engineers"
                width={462}
                height={200}
                className="h-9 w-auto md:h-10"
                draggable={false}
              />
            </a>

            {/* Desktop nav — all options listed directly */}
            <nav className="hidden items-center gap-7 lg:flex lg:gap-9">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={(e) => onNav(e, n.href)}
                  className="group relative whitespace-nowrap text-sm font-medium text-navy/80 transition-colors duration-200 hover:text-navy"
                >
                  {n.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-green transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right — Contact (desktop) + hamburger (mobile) */}
            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={openEnquiry}
                className="group hidden items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-green-dark lg:inline-flex"
              >
                Contact
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </button>

              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-navy transition-colors duration-200 hover:bg-navy/[0.06] lg:hidden"
              >
                <span className="flex flex-col gap-[5px]">
                  <span className="block h-[2px] w-6 rounded-full bg-navy" />
                  <span className="block h-[2px] w-6 rounded-full bg-navy" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay menu ── */}
      <div
        className={`fixed inset-0 z-[80] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
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
        <div
          className="absolute inset-0 flex flex-col bg-navy text-paper transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            transform: open ? "translateY(0)" : "translateY(-100%)",
            transitionDelay: open ? "180ms" : "0ms",
          }}
        >
          <div className="flex h-full flex-col px-6 py-6">
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
                width={462}
                height={200}
                className="h-9 w-auto"
                draggable={false}
              />
            </div>

            <div className="flex flex-1 items-center">
              <ul className="flex w-full flex-col items-start gap-2">
                {NAV.map((n, i) => (
                  <li key={n.label} className="overflow-hidden py-0.5">
                    <a
                      href={n.href}
                      onClick={(e) => onNav(e, n.href)}
                      data-open={open}
                      style={{ transitionDelay: open ? `${300 + i * 55}ms` : "0ms" }}
                      className="block translate-y-full pb-[0.12em] font-display text-[clamp(2.25rem,1rem+8vw,4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-paper transition-[transform,color] duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] hover:text-green data-[open=true]:translate-y-0"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
                <li className="overflow-hidden py-0.5">
                  <button
                    onClick={() => {
                      setOpen(false);
                      openEnquiry();
                    }}
                    data-open={open}
                    style={{ transitionDelay: open ? `${300 + NAV.length * 55}ms` : "0ms" }}
                    className="block translate-y-full pb-[0.12em] font-display text-[clamp(2.25rem,1rem+8vw,4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-green transition-[transform,color] duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] data-[open=true]:translate-y-0"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/55">
              <span>Since 2013</span>
              <span className="h-1 w-1 rounded-full bg-green" />
              <span>India · UAE · Canada</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/45">
              {SOCIAL.map((s) => (
                <span key={s}>{s}</span>
              ))}
              <span className="text-paper/30">·</span>
              {LEGAL.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
