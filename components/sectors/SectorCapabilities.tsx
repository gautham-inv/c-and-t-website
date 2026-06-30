"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Sector, SectorService } from "@/lib/sectors";

gsap.registerPlugin(ScrollTrigger);

const DOT_BASE = "h-1.5 rounded-full transition-all duration-500 ";
const DOT_ON = "w-8 bg-green";
const DOT_OFF = "w-1.5 bg-navy/20";

/**
 * "What we bring" — a pinned, full-viewport-height stage. Everything is driven
 * by one scrubbed timeline, so image + text move exactly with scroll position
 * (no jumps, no React re-renders mid-scroll). On reaching the next service the
 * image WIPES in (clip-path), then ZOOMS back (scale 1.08 → 1); the text panel
 * slides the old copy up and the new copy in — translate only, no fades.
 *
 * The "Fig." plate and progress dots are updated via direct DOM writes inside
 * onUpdate (refs), never setState, to keep the scrub perfectly smooth.
 *
 * Reduced-motion / small screens fall back to a plain stacked list.
 */
export function SectorCapabilities({
  services,
  name,
}: {
  services: SectorService[];
  name: Sector["name"];
}) {
  const root = useRef<HTMLDivElement>(null);
  const pinEl = useRef<HTMLDivElement>(null);
  const imgLayers = useRef<HTMLDivElement[]>([]);
  const txtLayers = useRef<HTMLDivElement[]>([]);
  const dotRefs = useRef<HTMLSpanElement[]>([]);
  const figRef = useRef<HTMLSpanElement>(null);
  const lastIdx = useRef(0);
  const [simple, setSimple] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    setSimple(reduce || small);
  }, []);

  useGSAP(
    () => {
      if (simple || services.length === 0) return;

      const imgs = imgLayers.current.filter(Boolean);
      const txts = txtLayers.current.filter(Boolean);

      imgs.forEach((el, i) => {
        gsap.set(el, {
          zIndex: i,
          scale: i === 0 ? 1 : 1.08,
          clipPath:
            i === 0 ? "inset(0px 0px 0px 0px)" : "inset(0px 0px 0px 100%)",
          transformOrigin: "center center",
        });
      });
      txts.forEach((el, i) => {
        gsap.set(el, { yPercent: i === 0 ? 0 : 100, zIndex: i });
      });

      const n = services.length;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // a little smoothing on the scrub for extra smoothness
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)));
            if (idx === lastIdx.current) return;
            lastIdx.current = idx;
            if (figRef.current) {
              figRef.current.textContent = `Fig. ${String(idx + 1).padStart(
                2,
                "0",
              )} / ${n}`;
            }
            dotRefs.current.forEach((d, j) => {
              if (d) d.className = DOT_BASE + (j === idx ? DOT_ON : DOT_OFF);
            });
          },
        },
      });

      for (let i = 1; i < n; i++) {
        const label = `s${i}`;
        tl.addLabel(label);
        // Wipe the new image in + slide text panels, all on the same beat…
        tl.to(imgs[i], { clipPath: "inset(0px 0px 0px 0px)", duration: 0.5 }, label)
          .to(txts[i - 1], { yPercent: -100, duration: 0.5 }, label)
          .fromTo(
            txts[i],
            { yPercent: 100 },
            { yPercent: 0, duration: 0.5 },
            label,
          )
          // …then settle the zoom back to 1.
          .to(
            imgs[i],
            { scale: 1, duration: 0.5, ease: "power2.out" },
            `${label}+=0.5`,
          );
      }
    },
    { scope: root, dependencies: [simple, services.length] },
  );

  return (
    <section
      ref={root}
      className="bg-paper"
      style={simple ? undefined : { height: `${services.length * 100}vh` }}
    >
      {simple ? (
        /* ── Fallback: simple stacked list ── */
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10">
          <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-navy">
            What we bring to{" "}
            <span className="text-green-dark">{name.toLowerCase()}</span>
          </h2>
          <div className="mt-10 space-y-12">
            {services.map((svc, i) => (
              <div key={svc.label} className="grid gap-6 md:grid-cols-2 md:gap-12">
                <div className="relative aspect-[4/3] overflow-hidden rounded-br-[3.5rem] bg-[#0a1c25] md:rounded-br-[5rem]">
                  <img
                    src={svc.image}
                    alt={svc.label}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <CapabilityText svc={svc} index={i} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── Pinned full-height stage ── */
        <div ref={pinEl} className="sticky top-0 h-screen overflow-hidden">
          <div className="grid h-full md:grid-cols-[1.05fr_1fr]">
            {/* Image — full viewport height; curved only on the bottom-right.
                The container clips every image layer, so one radius covers all. */}
            <div className="relative h-full overflow-hidden rounded-br-[5rem] bg-[#0a1c25] md:rounded-br-[8rem]">
              {services.map((svc, i) => (
                <div
                  key={svc.label}
                  ref={(el) => {
                    if (el) imgLayers.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <img
                    src={svc.image}
                    alt={svc.label}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
              <div className="absolute right-6 top-6 z-[40] rounded-xl border border-paper/30 bg-navy/30 px-3 py-2 backdrop-blur-sm">
                <span
                  ref={figRef}
                  className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-paper"
                >
                  Fig. 01 / {services.length}
                </span>
              </div>
            </div>

            {/* Text panel */}
            <div className="flex h-full items-center px-6 py-16 md:px-12 lg:px-20">
              <div className="w-full">
                <h2 className="font-display text-[clamp(1.6rem,1rem+2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-navy">
                  What we bring to{" "}
                  <span className="text-green-dark">{name.toLowerCase()}</span>
                </h2>

                {/* Swapping stage — text layers translate, clipped by overflow */}
                <div className="relative mt-6 min-h-[24rem] overflow-hidden">
                  {services.map((svc, i) => (
                    <div
                      key={svc.label}
                      ref={(el) => {
                        if (el) txtLayers.current[i] = el;
                      }}
                      className="absolute inset-0 will-change-transform"
                    >
                      <CapabilityText svc={svc} index={i} />
                    </div>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="mt-8 flex items-center gap-2.5">
                  {services.map((s, i) => (
                    <span
                      key={s.label}
                      ref={(el) => {
                        if (el) dotRefs.current[i] = el;
                      }}
                      className={DOT_BASE + (i === 0 ? DOT_ON : DOT_OFF)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CapabilityText({
  svc,
  index,
}: {
  svc: SectorService;
  index: number;
}) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">
        {svc.label}
      </h3>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-dim md:text-lg">
        {svc.body}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {svc.points.map((pt) => (
          <li
            key={pt}
            className="rounded-full border border-line px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-navy/70"
          >
            {pt}
          </li>
        ))}
      </ul>
      <a
        href={svc.href}
        className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-green-dark transition-colors duration-300 hover:text-green"
      >
        Explore {svc.label}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      </a>
    </div>
  );
}
