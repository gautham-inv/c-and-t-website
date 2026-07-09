"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Client = { name: string; logo: string; h: number; url: string };

// Client → logo asset in /public/clients. `h` is the rendered logo height (px),
// tuned PER LOGO for equal optical weight: wide wordmarks stay short, compact /
// square marks get more height so they don't read as tiny. (OSCO and ACCEL have
// no logo file yet, so they are omitted until artwork is supplied.)
const CLIENTS: Client[] = [
  { name: "NEOM", logo: "/clients/neom.png", h: 52, url: "https://www.neom.com" },
  { name: "AECOM", logo: "/clients/aecom.png", h: 32, url: "https://aecom.com" },
  { name: "Voltas", logo: "/clients/voltas.png", h: 32, url: "https://www.voltas.in" },
  { name: "Artelia", logo: "/clients/artelia.png", h: 42, url: "https://www.arteliagroup.com" },
  { name: "EIDC", logo: "/clients/eidc.webp", h: 58, url: "https://www.eidcoman.com" },
  { name: "Petrofac", logo: "/clients/petrofaclogo.png", h: 46, url: "https://www.petrofac.com" },
  { name: "Technip", logo: "/clients/technip.webp", h: 50, url: "https://www.ten.com/en" },
  { name: "Qatar Energy", logo: "/clients/qatarenergy.webp", h: 56, url: "https://www.qatarenergy.qa" },
  { name: "L&T", logo: "/clients/l&t.png", h: 54, url: "https://www.larsentoubro.com" },
  { name: "KIIFB", logo: "/clients/kiifb.webp", h: 44, url: "https://www.kiifb.org" },
  { name: "CINQ", logo: "/clients/cinq.webp", h: 52, url: "https://www.cinq.ae" },
  { name: "ADNOC", logo: "/clients/adnoc.png", h: 42, url: "https://www.adnoc.ae" },
  { name: "AHI Carrier", logo: "/clients/ahicarrier.png", h: 50, url: "https://www.ahi-carrier.com" },
  { name: "Dry Docks World", logo: "/clients/drydocksworld.webp", h: 44, url: "https://www.drydocks.gov.ae" },
  { name: "Aries", logo: "/clients/ariesglobal.webp", h: 44, url: "https://www.ariesmar.com" },
  { name: "Marinor", logo: "/clients/marinor.webp", h: 38, url: "https://www.marinor.co.in" },
];

// Distribute round-robin into three columns (6 / 5 / 5).
const COLUMNS: Client[][] = [[], [], []];
CLIENTS.forEach((c, i) => COLUMNS[i % 3].push(c));

const DURATIONS = ["26s", "32s", "29s"];

const MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

// Static, non-animated logo wall for small screens — three scrolling columns
// read as cluttered/cramped on narrow widths, so mobile gets one still grid
// instead (each logo shown once, properly focusable, no duplication).
function LogoGridItem({ client }: { client: Client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={client.name}
      className="flex h-16 items-center justify-center px-2"
    >
      <img
        src={client.logo}
        alt={client.name}
        loading="lazy"
        style={{ height: Math.round(client.h * 0.7) }}
        className="w-auto max-w-full object-contain opacity-80 brightness-0 invert"
      />
    </a>
  );
}

function TickerColumn({ items, duration }: { items: Client[]; duration: string }) {
  // Two stacked copies → seamless loop (content moves top → down). Fixed-height
  // rows keep the -50% loop exact (no flex gap to throw it off).
  const loop = [...items, ...items];
  return (
    <div
      className="h-[19rem] overflow-hidden md:h-[30rem]"
      style={{ WebkitMaskImage: MASK, maskImage: MASK }}
    >
      <div
        className="flex flex-col"
        style={{ animation: `ct-ticker-down ${duration} linear infinite` }}
      >
        {loop.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex h-24 items-center justify-center px-3 md:px-4"
          >
            <a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={client.name}
              tabIndex={-1}
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                style={{ height: client.h }}
                className="w-auto max-w-full object-contain opacity-80 brightness-0 invert transition-opacity duration-300 hover:opacity-100"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap.from("[data-up]", {
        y: 46,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="trust" className="scroll-mt-24 text-paper">
      {/* Inline keyframes — Tailwind v4 purges unreferenced @keyframes from
          the stylesheet, so the vertical ticker animation lives here. */}
      <style>{`@keyframes ct-ticker-down{from{transform:translateY(-50%)}to{transform:translateY(0)}}`}</style>
      <div className="mx-auto grid max-w-[1600px] items-center gap-6 px-6 pt-14 pb-20 md:gap-10 md:px-10 md:pt-28 md:pb-36 lg:grid-cols-2 lg:gap-14 lg:pt-36 lg:pb-44">
        {/* Left — heading, intro, ISO, CTA */}
        <div className="lg:max-w-md">
          <h2
            data-up
            className="font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
          >
            Trusted across four continents
          </h2>
          <p
            data-up
            className="mt-6 max-w-md text-base leading-relaxed text-paper/80 md:mt-10 md:text-lg"
          >
            Since 2013, C&amp;T has delivered engineering for developers, EPCs
            and energy majors worldwide. The work is backed by an
            ISO&nbsp;9001:2015 certified quality system.
          </p>

          <div data-up className="mt-6 md:mt-8">
            <span className="inline-flex h-12 items-center rounded-md border border-paper/30 px-4 font-mono text-xs uppercase tracking-[0.16em] text-paper">
              ISO 9001:2015
            </span>
          </div>

          <a
            data-up
            href="#contact"
            className="group mt-7 inline-flex items-center gap-3 rounded-full bg-paper py-3.5 pl-6 pr-2.5 text-sm font-medium text-navy transition-colors duration-300 hover:bg-beige-light md:mt-10"
          >
            Start a project
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        {/* Right — static logo wall on small screens, three scrolling logo
            tickers (top → down) from md up, no boxes/borders either way */}
        <div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 md:hidden">
            {CLIENTS.map((c) => (
              <LogoGridItem key={c.name} client={c} />
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-3">
            {COLUMNS.map((col, i) => (
              <TickerColumn key={i} items={col} duration={DURATIONS[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
