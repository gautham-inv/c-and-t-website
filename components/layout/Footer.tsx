"use client";

import Link from "next/link";
import { useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  WITHUS_OVERLAP_VH,
  WITHUS_OVERLAP_VH_MOBILE,
} from "@/components/sections/WithUs";
import { getLenis } from "@/lib/lenis";
import { socialIcon } from "@/lib/social";
import { NavItemLink } from "@/components/layout/NavItemLink";
import {
  SITE_SETTINGS,
  type NavLink,
  type Office,
  type SocialRef,
} from "@/lib/site";

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

/** Who built the site. Sits under the footer logo, not in the legal line.
 * Hardcoded alongside LEGAL rather than pulled from Sanity: it's chrome that
 * belongs to the build, not editorial content the client would revise. */
const TECH_PARTNER = { label: "Innovin Labs", href: "https://innovinlabs.com" };

/** Footer chrome. `links`/`offices`/`socials`/`copyright` come from Sanity via
 * the root layout; they default to SITE_SETTINGS so the footer renders
 * unchanged when the dataset isn't seeded. Section links (/#id) smooth-scroll
 * on the homepage and navigate home elsewhere. */
export function Footer({
  links = SITE_SETTINGS.footerLinks,
  offices = SITE_SETTINGS.offices,
  socials = SITE_SETTINGS.socials,
  copyright = SITE_SETTINGS.copyright,
}: {
  links?: NavLink[];
  offices?: Office[];
  socials?: SocialRef[];
  copyright?: string;
} = {}) {
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
          // WithUs measures its card on mount and publishes the exact height as
          // --withus-overlap; the vh values are only the first-paint / no-JS
          // fallback. Matching the card exactly is what lets its wipe clear the
          // whole card — the band is precisely as tall as what's peeled away.
          "--overlap": `var(--withus-overlap, ${WITHUS_OVERLAP_VH}vh)`,
          "--overlap-m": `var(--withus-overlap, ${WITHUS_OVERLAP_VH_MOBILE}vh)`,
        } as React.CSSProperties
      }
    >
      {/* Static blueprint band — anchored to the footer top and revealed by the
          WithUs wipe peeling upward. Its height is the whole WithUs card, so
          the blueprint sits at the bottom (aligned to og.png) and the plain
          green above it is what ends up behind the CTA heading and button. */}
      <div
        aria-hidden
        data-footer-band
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
          <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
            Engineered to Endure
          </h2>

          {/* Nav */}
          <nav className="flex flex-col items-start gap-1">
            {links.map((n) => (
              <NavItemLink
                key={n.label}
                href={n.href}
                onClick={(e) => onNav(e, n.href)}
                className="font-display text-2xl font-normal lowercase text-paper/85 transition-colors duration-200 hover:text-green md:text-3xl"
              >
                {n.label}
              </NavItemLink>
            ))}
          </nav>

          {/* Offices */}
          <div>
            <p className="label text-beige/80">Our offices</p>
            <ul className="mt-4 space-y-2">
              {offices.map((o) => (
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
          {/* Logo + the build credit beneath it. Kept out of the legal/copyright
              cluster on the right: that line is contractual boilerplate, and a
              partner credit sitting inside it reads as more of the same fine
              print. Under the logo it's a signature, which is what it is. */}
          <div className="flex flex-col items-start gap-3">
            <img
              src="/logo.webp"
              alt="C&T Consulting Engineers"
              width={462}
              height={200}
              className="h-10 w-auto shrink-0 object-contain"
              draggable={false}
            />
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/45">
              Technology Partner
              <span className="text-paper/25">·</span>
              <a
                href={TECH_PARTNER.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-paper/70 transition-colors duration-300 hover:text-green"
              >
                {TECH_PARTNER.label}
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-8 md:gap-10">
            <div className="flex items-center gap-3">
              {socials.map(({ label, href }) => {
                const Icon = socialIcon(label);
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper/70 transition-colors duration-300 hover:border-green hover:text-green"
                  >
                    {Icon && <Icon className="h-4 w-4" strokeWidth={1.75} />}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
              {LEGAL.map((l, i) => (
                <span key={l.label} className="flex items-center gap-x-3">
                  {i > 0 && <span className="text-paper/25">·</span>}
                  <Link
                    href={l.href}
                    className="text-paper/55 transition-colors hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
              <span className="text-paper/25">·</span>
              <span className="text-paper/45">{copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
