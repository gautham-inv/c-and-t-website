"use client";

import { useCallback } from "react";
import {
  WITHUS_OVERLAP_VH,
  WITHUS_OVERLAP_VH_MOBILE,
} from "@/components/sections/WithUs";
import { getLenis } from "@/lib/lenis";
import { SOCIAL_LINKS } from "@/lib/social";

// Section links use the /#id form so they resolve from any page (navigate home,
// then scroll). "sectors" points at the Expertise/divisions block, which is the
// only sector-style section on the homepage.
const NAV = [
  { label: "services", href: "/#services" },
  { label: "sectors", href: "/#divisions" },
  { label: "projects", href: "/#projects" },
  { label: "about", href: "/about" },
  { label: "insights", href: "/#blog" },
  { label: "contact", href: "/#contact" },
  { label: "faq", href: "/#faq" },
  { label: "careers", href: "/careers" },
];

const OFFICES = [
  { place: "India (HQ)", detail: "Trivandrum, Kerala" },
  { place: "UAE", detail: "Deira, Dubai" },
  { place: "Canada", detail: "Mississauga, ON" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export function Footer() {
  // Section links (/#id) smooth-scroll on the homepage via Lenis; on other
  // pages they fall through to a normal navigation that lands on the anchor.
  const onNav = useCallback((e: React.MouseEvent, href: string) => {
    if (!href.startsWith("/#")) return;
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    const el = document.getElementById(href.slice(2));
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <footer
      className="relative z-10 mt-[calc(var(--overlap-m)*-1)] bg-navy text-paper md:mt-[calc(var(--overlap)*-1)]"
      style={
        {
          "--overlap": `${WITHUS_OVERLAP_VH}vh`,
          "--overlap-m": `${WITHUS_OVERLAP_VH_MOBILE}vh`,
        } as React.CSSProperties
      }
    >
      {/* Static blueprint band — anchored to the footer top and revealed by the
          WithUs wipe peeling upward. Shorter on phones (mobile overlap) so it
          stays aligned with the smaller CTA image. */}
      <div
        aria-hidden
        className="relative h-[var(--overlap-m)] w-full overflow-hidden md:h-[var(--overlap)]"
      >
        {/* Same width / centering / bottom-anchor as og.png in WithUs, plus a
            bbox-matching transform so the blueprint's structure superimposes
            exactly on the photo at the wipe line. */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <img
            src="/s.png"
            alt=""
            draggable={false}
            className="w-[128vw] max-w-none sm:w-[98vw] md:w-[78vw]"
            style={{
              transformOrigin: "0 0",
              transform: "translate(2.17%, 2.34%) scale(1.0647, 1.1033)",
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-4 md:px-10 md:pb-12 md:pt-8">
        <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
          {/* Tagline */}
          <h2 className="font-display text-[clamp(2rem,1rem+3vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            Precision engineered.
            <br />
            <span className="text-beige-light">Globally delivered.</span>
          </h2>

          {/* Nav */}
          <nav className="flex flex-col items-start gap-1">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={(e) => onNav(e, n.href)}
                className="font-display text-2xl font-normal lowercase text-paper/85 transition-colors duration-200 hover:text-green md:text-3xl"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Offices */}
          <div>
            <p className="label text-beige/80">Our offices</p>
            <ul className="mt-4 space-y-2">
              {OFFICES.map((o) => (
                <li key={o.place} className="text-sm text-paper/70">
                  <span className="text-paper">{o.place}</span>, {o.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider with + */}
        <div className="relative my-12 h-px w-full bg-paper/15 md:my-16">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-navy px-3 text-paper/50">
            +
          </span>
        </div>

        {/* Bottom bar — logo on one side, socials + legal grouped tightly on
            the other (md+) instead of three items spread across the full
            width, which read as disconnected islands on wide screens. */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <img
            src="/logo.webp"
            alt="C&T Consulting Engineers"
            width={462}
            height={200}
            className="h-10 w-auto shrink-0 self-start object-contain md:self-auto"
            draggable={false}
          />

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-8 md:gap-10">
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper/70 transition-colors duration-300 hover:border-green hover:text-green"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
              {LEGAL.map((l, i) => (
                <span key={l.label} className="flex items-center gap-x-3">
                  {i > 0 && <span className="text-paper/25">·</span>}
                  <a href={l.href} className="text-paper/55 transition-colors hover:text-paper">
                    {l.label}
                  </a>
                </span>
              ))}
              <span className="text-paper/25">·</span>
              <span className="text-paper/45">© 2026 C&amp;T Consulting Engineers Pvt Ltd</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
