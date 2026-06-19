"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  title: string;
  body: string;
  caption: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    title: "MEP engineering design",
    body: "HVAC, electrical, plumbing, fire protection and ELV design for residential, commercial, industrial and mission-critical buildings.",
    caption: "Multidiscipline MEP · all building types",
    image: "/mep-engineering-design.jpg",
  },
  {
    title: "BIM & 3D modelling",
    body: "LOD 300–500 models, coordination and as-builts in Revit, Navisworks and AVEVA E3D — accurate, data-rich and buildable.",
    caption: "Revit · Navisworks · AVEVA E3D",
    image: "/bim-and-3d-modelling.jpg",
  },
  {
    title: "Detailed engineering",
    body: "Concept and front-end design through detailed engineering, material selection, MTO and BOQ for turnkey delivery.",
    caption: "FEED · Detailed design · MTO / BOQ",
    image: "/detailed-engineering.jpg",
  },
  {
    title: "CFD & FEA analysis",
    body: "Computational fluid dynamics, thermal and stress analysis with Ansys Fluent — validating performance before construction.",
    caption: "Ansys Fluent · Thermal · Pipe stress",
    image: "/cfd-fea-analysis.webp",
  },
  {
    title: "Clash resolution & coordination",
    body: "Multidiscipline clash detection and resolution that turns coordinated models into conflict-free, build-ready designs.",
    caption: "Coordination · Clash-free delivery",
    image: "/clash-detection-and-coordination.jpg",
  },
];

export function Services() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap.from("[data-up]", {
        y: 48,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services"
      className="scroll-mt-24 bg-paper text-navy"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36">
        {/* Heading — same scale as other section headings */}
        <h2
          data-up
          className="font-display text-[clamp(2rem,1rem+3vw,3.6rem)] font-light leading-[1.08] tracking-[-0.02em]"
        >
          Our Services
        </h2>
        <p
          data-up
          className="mt-6 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg"
        >
          Whatever the brief, our technical teams mobilise deep multidiscipline
          expertise — applying BIM, detailed engineering and CFD to solve
          today&apos;s challenges across every market we serve.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 md:mt-20">
          {/* Accordion */}
          <ul data-up className="border-t border-line">
            {SERVICES.map((s, i) => {
              const open = i === active;
              return (
                <li key={s.title} className="border-b border-line">
                  <button
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="group flex w-full items-center gap-6 py-6 text-left md:py-7"
                  >
                    <span className="font-mono text-sm text-ink-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-display text-[clamp(1.5rem,1rem+1.6vw,2.4rem)] font-light leading-tight transition-colors duration-300 ${
                        open ? "text-green-dark" : "text-navy"
                      }`}
                    >
                      {s.title}
                    </span>
                    <Plus
                      className={`h-6 w-6 shrink-0 text-navy transition-transform duration-300 ${
                        open ? "rotate-45 text-green" : "group-hover:rotate-90"
                      }`}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-md pb-7 pl-10 text-base leading-relaxed text-ink-dim">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Image — swaps with the active service */}
          <div data-up className="lg:pl-6">
            <div className="sticky top-28">
              <div
                key={active}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-[#0a1c25]"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(9,33,44,0.85) 0%, rgba(9,33,44,0.2) 45%, transparent 70%)",
                  }}
                />
                <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/60" />
                <span className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-beige/60" />
                <div className="absolute bottom-6 left-6 right-6 text-paper">
                  <p className="label text-beige-light">
                    {String(active + 1).padStart(2, "0")} · {current.title}
                  </p>
                  <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper/55">
                    {current.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
