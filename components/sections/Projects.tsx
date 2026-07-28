"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { name: "Major Airport, South India", meta: "MEP Design & BIM · South India", image: "/projects/airport-terminal-case-study.jpg", size: "wide" },
  { name: "Calinova 2.4 MW Data Centre", meta: "MEP & BIM · 2.4 MW · Calicut", image: "/projects/calinova-case-study.jpg", size: "tall" },
  { name: "Vega Tower, Dubai", meta: "MEP Design & BIM · LOD 400", image: "/projects/images.jpeg", size: "standard" },
  { name: "EXPO 2020 Campus, Dubai", meta: "BIM Modelling · CINQ / Voltas", image: "/projects/expocampus.jpg", size: "wide" },
  { name: "Duqm Refinery, Oman", meta: "Detailed Engineering · LOD 500", image: "/projects/duqm-refinery.jpeg", size: "tall" },
  { name: "Yamal LNG, Russia", meta: "Detailed Engineering & 3D · Technip", image: "/projects/yamal.webp", size: "wide" },
  { name: "Compression 4-NFPS", meta: "Offshore · Qatar Energy", image: "/projects/Compression-4-NFPS.jpeg", size: "standard" },
];

// Sizes only apply from md up (the pinned horizontal track). On mobile every
// card is a uniform full-width, equal-height block in a plain vertical stack.
const SIZES = {
  wide: {
    card: "md:w-[clamp(24rem,52vw,46rem)] md:h-[clamp(17rem,46vh,30rem)]",
    img: "w-[46%] md:w-[42%]",
  },
  tall: {
    card: "md:w-[clamp(18rem,30vw,26rem)] md:h-[clamp(21rem,60vh,38rem)]",
    img: "w-[56%] md:w-[64%]",
  },
  standard: {
    card: "md:w-[clamp(21rem,40vw,34rem)] md:h-[clamp(19rem,53vh,34rem)]",
    img: "w-[50%]",
  },
};

// Rotating brand-colour panels (editorial-card reference). Each entry pairs a
// background with readable ink + a muted caption tone.
const PALETTE = [
  { bg: "bg-navy", text: "text-paper", sub: "text-paper/60" },
  { bg: "bg-green", text: "text-navy", sub: "text-navy/65" },
  { bg: "bg-beige", text: "text-navy", sub: "text-navy/70" },
  { bg: "bg-green-dark", text: "text-paper", sub: "text-paper/70" },
];

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  // In-flow spacer below the pinned screen. Its height IS the pin: CSS sticky
  // holds the rail for exactly as long as the section has room left. Set from
  // JS (md+ only) and collapsed to 0 once the rail is done — see release().
  const runway = useRef<HTMLDivElement>(null);
  // The pin's ScrollTrigger, so the arrows know which axis to drive.
  const rail = useRef<ScrollTrigger | null>(null);

  // Step the rail by exactly one card.
  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    // Card width + gap, straight off the DOM, so it survives the responsive
    // size classes without repeating any of those numbers here.
    const amount =
      cards.length > 1
        ? cards[1].getBoundingClientRect().left -
          cards[0].getBoundingClientRect().left
        : el.clientWidth * 0.8;
    // While the section is pinned, scrollLeft is a pure function of scroll
    // progress at 1:1, and the next frame overwrites anything set here — so a
    // step has to be a *vertical* scroll of the same distance.
    if (rail.current?.isActive) {
      const y = window.scrollY + dir * amount;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 0.8 });
      else window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-up]", {
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      const mm = gsap.matchMedia();

      // ── Forward-only pin ────────────────────────────────────────────────
      // Pin + horizontal scrub on the way down; nothing at all on the way back
      // up. A pin can't be made one-directional by animating differently in
      // reverse: the dead scroll distance IS the pin, and CSS sticky holds in
      // both directions for the section's whole spare height. So the runway is
      // taken away the moment the rail finishes, and the scroll position is
      // rewound by the same amount in the same frame — the two cancel exactly
      // (the sticky offset is at its maximum right then, so the pinned screen
      // sits in the identical place before and after), which is why nothing
      // jumps. What's left behind is a one-screen section that scrolls like any
      // other. It re-arms once it's fully below the fold, where growing it back
      // can't shift anything the viewer can see.
      mm.add("(min-width: 768px)", () => {
        const trackEl = track.current;
        const runwayEl = runway.current;
        const rootEl = root.current;
        if (!trackEl || !runwayEl || !rootEl) return;

        // Exactly the horizontal distance the rail has left to travel, so the
        // wheel moves the cards 1:1 and the pin is never longer than the rail.
        const overflow = () =>
          Math.max(0, trackEl.scrollWidth - trackEl.clientWidth);
        const sync = (progress: number) => {
          trackEl.scrollLeft = overflow() * progress;
        };
        let armed = false;

        // Declared before the two functions that use it, assigned after them,
        // because they're what its own onLeave calls. ScrollTrigger can fire a
        // callback synchronously from inside create() — a trigger built already
        // past its end does exactly that — and release() is safe under that
        // because `armed` is still false then, so it returns before reading st.
        let st: ScrollTrigger;

        // Both paths change the document height, so both have to refresh — and
        // ScrollTrigger.refresh() signs off by restoring the scroll position it
        // had cached, which is not always where we actually are (that cache is
        // only rewritten on the GSAP ticker, so a scroll it never saw leaves it
        // stale — measured: it restored a position 1200px off). Neither path can
        // afford to be wrong about this, so each states the scroll it wants
        // after the refresh instead of trusting the restore.
        const settle = (y: number) => {
          if (Math.abs(window.scrollY - y) < 1) return;
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
          else window.scrollTo(0, y);
        };

        const arm = () => {
          if (armed) return;
          armed = true;
          const y = window.scrollY;
          runwayEl.style.height = `${overflow()}px`;
          st.enable(false, false); // one refresh below, not two
          ScrollTrigger.refresh();
          settle(y); // the runway is all below the fold: nothing should move
        };

        const release = () => {
          if (!armed) return;
          armed = false;
          const d = runwayEl.offsetHeight;
          const y = window.scrollY;
          trackEl.scrollLeft = overflow(); // hold the end of the rail
          runwayEl.style.height = "0px";
          st.disable(false);
          ScrollTrigger.refresh();
          // Same magnitude as the runway just removed, opposite direction — the
          // two cancel and the pinned screen doesn't move a pixel.
          settle(y - d);
        };

        st = ScrollTrigger.create({
          trigger: rootEl,
          start: "top top",
          end: () => `+=${overflow()}`,
          invalidateOnRefresh: true,
          // A resize changes how much the rail has left to travel, and the pin's
          // length is the runway's height — so re-state it before ScrollTrigger
          // measures, or the scrub and the pin disagree about where the end is.
          // Only while armed: after a release the runway must stay collapsed.
          onRefreshInit: () => {
            if (armed) runwayEl.style.height = `${overflow()}px`;
          },
          onUpdate: (self) => sync(self.progress),
          // Covers a load that lands mid-section, where onUpdate hasn't run.
          onRefresh: (self) => sync(self.progress),
          onLeave: release,
        });
        rail.current = st;

        ScrollTrigger.create({
          trigger: rootEl,
          start: "top bottom",
          onLeaveBack: arm,
        });

        arm();
        // A load that lands *below* the section (hash link, scroll restore)
        // never crosses the end, so onLeave never fires and an armed runway
        // would be left sitting above the viewer — the reverse trap again.
        if (st.progress >= 1) release();

        return () => {
          runwayEl.style.height = "";
          rail.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="projects"
      className="relative scroll-mt-24 bg-paper text-navy"
    >
      {/* The pinned screen. One viewport tall from md up and vertically centred,
          so the heading and the rail hold still together while the runway below
          is consumed. */}
      <div className="flex w-full flex-col md:sticky md:top-0 md:h-screen md:justify-center md:overflow-hidden">
        {/* Heading + intro */}
        <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pt-20 md:px-10 md:pt-0">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <h2
              data-up
              className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              The C&amp;T footprint:{" "}
              <span className="text-green-dark">projects built to endure</span>
            </h2>
            <div data-up className="max-w-xl">
              <p className="text-base leading-relaxed text-ink-dim md:text-lg">
                Data centres, airports, refineries and offshore platforms:
                these projects have to perform for decades. Browse the work
                below to see how each one was engineered.
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-green-dark transition-colors duration-300 hover:text-green"
                >
                  All projects
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
                {/* Prev/next — the only way through the rail below md, and a
                    keyboard/click route through the pin above it. */}
                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={() => scrollByCard(-1)}
                    aria-label="Previous project"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy transition-colors duration-300 active:bg-navy active:text-paper"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollByCard(1)}
                    aria-label="Next project"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy transition-colors duration-300 active:bg-navy active:text-paper"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* One horizontal scroller at every width. Below md it's a native snap
            rail (swipe / arrows); from md up the pin drives its scrollLeft, so
            snapping is off there — mandatory snap would fight every frame of
            the scrub. Cards keep their varied md+ sizes, centred on the cross
            axis so the tall ones don't drag the short ones' baselines around. */}
        <div className="flex pb-16 pt-8 md:pb-0 md:pt-10">
          <div
            ref={track}
            // scroll-pl matches the px inset: without it snap-start aligns the
            // first card to the scroll container's edge, eating the padding and
            // leaving the card flush against the viewport.
            className="flex snap-x snap-mandatory items-center gap-6 overflow-x-auto scroll-pl-6 px-6 [-ms-overflow-style:none] [scrollbar-width:none] md:snap-none md:gap-8 md:scroll-pl-10 md:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {PROJECTS.map((p, i) => {
              const c = PALETTE[i % PALETTE.length];
              const sizeConfig = SIZES[p.size as keyof typeof SIZES] || SIZES.standard;
              const cardClass = `relative flex h-[26rem] w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] p-8 md:p-10 ${c.bg} ${c.text} ${sizeConfig.card}`;
              // Cards are a showcase, not links — projects no longer have
              // detail pages, and "All projects" above already covers that.
              return (
                <div key={p.name} data-card className={cardClass}>
                  <h3 className="max-w-[74%] font-display text-[clamp(1.6rem,1rem+1.5vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.01em]">
                    {p.name}
                  </h3>
                  {/* Bottom row: meta and image are siblings, so text can never
                      sit under the image regardless of card size. */}
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <p
                      className={`font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] ${c.sub}`}
                    >
                      {p.meta}
                    </p>
                    <div
                      className={`${sizeConfig.img} shrink-0 overflow-hidden rounded-2xl`}
                    >
                      <div className="aspect-[4/3]">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pin runway — height set by JS to the rail's remaining travel, then
          taken back to 0 on the way out (md+ only; below md there's no pin). */}
      <div ref={runway} aria-hidden className="hidden md:block" />
    </section>
  );
}
