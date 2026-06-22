"use client";

import { ArrowRight } from "lucide-react";
import { WITHUS_OVERLAP_VH } from "@/components/sections/WithUs";

const NAV = [
  { label: "services", href: "#services" },
  { label: "sectors", href: "#sectors" },
  { label: "projects", href: "#projects" },
  { label: "about", href: "/about" },
  { label: "insights", href: "#blog" },
  { label: "contact", href: "#contact" },
  { label: "faq", href: "#faq" },
  { label: "careers", href: "#contact" },
];

const OFFICES = [
  { place: "India (HQ)", detail: "Trivandrum, Kerala" },
  { place: "UAE", detail: "Deira, Dubai" },
  { place: "Canada", detail: "Mississauga, ON" },
];

const SOCIALS = ["LinkedIn", "Instagram", "X", "YouTube"];

export function Footer() {
  return (
    <footer
      className="relative z-10 bg-navy text-paper"
      style={{ marginTop: `-${WITHUS_OVERLAP_VH}vh` }}
    >
      {/* Static blueprint band — anchored to the footer top and revealed by
          the WithUs wipe peeling upward. Does not scroll or animate. */}
      <div
        aria-hidden
        className="relative w-full overflow-hidden"
        style={{ height: `${WITHUS_OVERLAP_VH}vh` }}
      >
        {/* Same width / centering / bottom-anchor as og.png in WithUs, plus a
            bbox-matching transform so the blueprint's structure superimposes
            exactly on the photo at the wipe line. */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <img
            src="/s.png"
            alt=""
            draggable={false}
            className="w-[78vw] max-w-none"
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
                className="font-display text-2xl font-normal lowercase text-paper/85 transition-colors duration-200 hover:text-green md:text-3xl"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Subscribe + offices */}
          <div>
            <p className="max-w-xs font-display text-xl font-normal leading-snug md:text-2xl">
              Subscribe for the latest C&amp;T updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-3"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="h-11 flex-1 border-b border-paper/25 bg-transparent text-sm text-paper outline-none placeholder:text-paper/40 focus:border-green"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center gap-3"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 transition-colors duration-300 hover:border-green hover:bg-green/10">
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/70">
                  Join us
                </span>
              </button>
            </form>

            <div className="mt-12">
              <p className="label text-beige/80">Our offices</p>
              <ul className="mt-4 space-y-2">
                {OFFICES.map((o) => (
                  <li key={o.place} className="text-sm text-paper/70">
                    <span className="text-paper">{o.place}</span> — {o.detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider with + */}
        <div className="relative my-12 h-px w-full bg-paper/15 md:my-16">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-navy px-3 text-paper/50">
            +
          </span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex shrink-0 items-center">
            <img
              src="/logo.webp"
              alt="C&T Consulting Engineers"
              width={462}
              height={200}
              className="h-10 w-auto shrink-0 object-contain"
              draggable={false}
            />
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/55">
            <a href="#" className="transition-colors hover:text-paper">
              Privacy Policy
            </a>
            <span className="text-paper/25">·</span>
            <a href="#" className="transition-colors hover:text-paper">
              Terms of Service
            </a>
          </div>

          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/45">
            © 2026 C&amp;T Consulting Engineers Pvt Ltd
          </p>

          <div className="flex flex-wrap gap-x-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/55">
            {SOCIALS.map((s) => (
              <a key={s} href="#" className="transition-colors hover:text-paper">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
