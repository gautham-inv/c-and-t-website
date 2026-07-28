"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { openEnquiry } from "@/lib/enquiry";

gsap.registerPlugin(ScrollTrigger);

// SSR fallbacks for the overlap between this section and the footer, which
// pulls itself up behind the card by that amount. Once mounted, WithUs measures
// its card and publishes the exact height as --withus-overlap (see below); the
// footer prefers that, so these two only cover the first paint and the
// no-JS case. Both deliberately UNDERSHOOT the real card height: too small and
// the band is simply shorter than the card, too large and the footer's green
// pokes out above the card into the section before it.
export const WITHUS_OVERLAP_VH = 68;
export const WITHUS_OVERLAP_VH_MOBILE = 42;

/**
 * `rounded` (homepage only) runs the inset → full-bleed margin + border-radius
 * collapse as you scroll in. Other pages pass rounded={false}: the card is
 * full-bleed from the start, no radius, like before. The footer wipe runs in
 * both cases.
 */
export function WithUs({ rounded = true }: { rounded?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  // The paper fill, blueprint mesh and structure photo — everything the wipe
  // peels away. Kept separate from the card so the heading and button can sit
  // ON TOP of the wipe rather than be clipped with it.
  const surface = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLDivElement>(null);

  // Publish the card's exact height as --withus-overlap so the footer pulls
  // itself up by precisely this section — no more, no less. Measured rather
  // than matched against a pair of vh constants because that equality is what
  // lets the wipe clear the WHOLE card: the green band behind it is guaranteed
  // to be exactly as tall as the thing being peeled off, at any viewport.
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    let last = 0;
    const publish = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      if (h === last) return; // ResizeObserver fires on observe(); also stops
      last = h; // the refresh below from re-entering here.
      document.documentElement.style.setProperty("--withus-overlap", `${h}px`);
      ScrollTrigger.refresh();
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    // ResizeObserver notifications are delivered per animation frame, so a
    // viewport change that produces no frame (a backgrounded tab) can leave the
    // published height stale — and a band taller than the card means the
    // footer's green pokes out above it. The resize listener closes that gap.
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
      document.documentElement.style.removeProperty("--withus-overlap");
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reveal + the margin/radius "flaps" collapse are desktop/tablet only —
      // on phones the card is full-bleed from the start (no side flaps).
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.from("[data-up]", {
            y: 40,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: root.current, start: "top 78%" },
          });

          // Margin + radius collapse: card → full-bleed as you scroll through.
          // Homepage only — other pages render the card flush from the start.
          // Two elements, one timeline: the inset is the card's own margin, but
          // the radius belongs to the surface layer that draws the fill.
          if (card.current && rounded) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 88%",
                  end: "top 22%",
                  scrub: true,
                },
              })
              .fromTo(
                card.current,
                { marginLeft: "5vw", marginRight: "5vw" },
                { marginLeft: "0vw", marginRight: "0vw", ease: "none" },
                0,
              )
              .fromTo(
                surface.current,
                { borderRadius: "2.25rem" },
                { borderRadius: "0rem", ease: "none" },
                0,
              )
              // The gutters the inset leaves either side of the card. They exist
              // only to hide the footer's green band, which is full-bleed and as
              // tall as this whole section, so without them the band shows past
              // the card's edges and the section reads as green-framed instead of
              // white like every other one. Same 5vw → 0 as the margins above, so
              // they close exactly as the card fills the width.
              .fromTo(
                "[data-gutter]",
                { width: "5vw" },
                { width: "0vw", ease: "none" },
                0,
              );
          }
        },
      );

      // The wipe, on all widths (with motion): clip the surface's bottom edge
      // upward faster than the page scrolls, uncovering the footer's green band
      // behind it — the photo dissolving into the blueprint aligned behind it.
      // The peel distance is the card's FULL height, so the green ends up behind
      // the heading and button too, not just the photo. Where the line is when
      // that happens is the range's job; see the trigger below.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cardEl = card.current;
        const surfaceEl = surface.current;
        if (!cardEl || !surfaceEl) return;

        const peel = () => cardEl.getBoundingClientRect().height;

        // Flip each CTA element's colours as the wipe line crosses its middle.
        // Note the crossing is only *visible* where the card fits the screen:
        // the peel ends at the card's top edge, which for a card taller than
        // the viewport is necessarily already above it, so on short screens the
        // heading and button change colour as they leave the top. That's
        // geometry, not a bug — the two can only both be on screen if the card
        // is shorter than the viewport, i.e. if the render shrinks.
        //
        // The flip itself still has to happen exactly with the line —
        // the heading and button stay put while the ground under them changes
        // from paper to green, so they have to switch independently and at their
        // own moment. Cheap: two rects.
        // Midpoint rather than either edge because both extremes are worse: flip
        // at the top edge and the text's lower half is navy over green (the same
        // colour), flip at the bottom and its upper half is paper over paper.
        // Halfway splits that unreadable moment in two, and the switch itself is
        // short (duration-150) so it stays glued to the moving line.
        const syncCta = (progress: number) => {
          if (!cta.current) return;
          const rect = cardEl.getBoundingClientRect();
          const line = rect.bottom - rect.height * progress;
          for (const el of cta.current.querySelectorAll<HTMLElement>(
            "[data-wipe]",
          )) {
            const r = el.getBoundingClientRect();
            el.dataset.green = String(line <= r.top + r.height / 2);
          }
        };

        gsap.fromTo(
          surfaceEl,
          { clipPath: "inset(0px 0px 0px 0px)" },
          {
            clipPath: () => `inset(0px 0px ${peel()}px 0px)`,
            ease: "none",
            scrollTrigger: {
              trigger: cardEl,
              // The clip line sits at cardBottom − H·p, so where it *is* on
              // screen at p=0 is entirely down to where this range starts.
              // Anchoring it to the card's TOP entering the viewport (what this
              // used to do) put the line a full card height — 1084px at
              // 1280×800 — below the fold, so more than half the peel, the
              // whole photo included, was already spent before any of it could
              // be seen. Starting at "bottom bottom" instead puts p=0 exactly
              // when the card's bottom edge (= the photo's bottom edge, = the
              // top of the footer's blueprint band behind it) reaches the
              // bottom of the screen: the render is fully in view, untouched,
              // and the green starts eating it from there.
              //
              // "max" for the end because the scroll left after that point is
              // precisely the footer's own content height, and spending all of
              // it means the peel completes exactly as the page bottoms out —
              // no arbitrary distance to keep in sync with the footer, and the
              // green's arrival is what carries you into it.
              start: "bottom bottom",
              end: "max",
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => syncCta(self.progress),
              // Also on refresh, so a load that lands mid-wipe (a /#contact
              // deep link, or a short page where the section is already in view)
              // starts with the right colours instead of navy-on-green.
              onRefresh: (self) => syncCta(self.progress),
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" className="relative z-20 scroll-mt-24">
      {/* Paper gutters beside the inset card (see the timeline above). Painted
          before the card so it always covers them, and only while the card is
          actually inset — below md and on rounded={false} pages it's full-bleed
          and there's nothing to cover. */}
      {rounded && (
        <>
          <div
            aria-hidden
            data-gutter
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[5vw] bg-paper md:block"
          />
          <div
            aria-hidden
            data-gutter
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[5vw] bg-paper md:block"
          />
        </>
      )}
      <div
        ref={card}
        className={`relative text-navy md:will-change-transform ${
          rounded ? "md:mx-[5vw]" : ""
        }`}
      >
        {/* ── The wiped surface: paper fill, blueprint mesh, structure photo ──
            Absolutely positioned so the CTA above it isn't clipped with it. The
            card's height comes from the content + the spacer further down. */}
        <div
          ref={surface}
          className={`absolute inset-0 overflow-hidden bg-paper ${
            rounded
              ? "md:rounded-[2.25rem] md:shadow-[0_40px_120px_-45px_rgba(9,33,44,0.5)] md:ring-1 md:ring-navy/10"
              : ""
          }`}
        >
          {/* Blueprint mesh — green on the off-white fill */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #729d35 1px, transparent 1px), linear-gradient(to bottom, #729d35 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* Finished-structure hero. Bottom-anchored so its bottom edge meets
              the card bottom — exactly where the footer's green band begins —
              making the two layers pixel-aligned across the wipe. Width steps
              up on small/medium so the render fills the frame instead of
              stranding a tiny image; the footer's blueprint band (s.png) MUST
              mirror these exact widths to stay aligned. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none justify-center"
          >
            <img
              src="/og.png"
              alt=""
              draggable={false}
              className="w-[128vw] max-w-none sm:w-[98vw] md:w-[78vw]"
            />
          </div>
        </div>

        {/* Heading + CTA — above the wipe, so they survive it and end up
            sitting on the green. `data-wipe` marks the elements whose colours
            invert as the wipe line passes them (see onUpdate above); without
            that, navy-on-navy would make both disappear. */}
        <div
          ref={cta}
          className="relative z-10 mx-auto max-w-[1600px] px-6 pt-24 text-center md:px-10 md:pt-32"
        >
          <h2
            data-up
            data-wipe
            className="mx-auto max-w-3xl font-display text-[clamp(2rem,1rem+3.4vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] transition-colors duration-150 data-[green=true]:text-paper"
          >
            Ready to start your next project?
          </h2>
          <div
            data-up
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={openEnquiry}
              data-wipe
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors duration-150 hover:bg-green-dark data-[green=true]:bg-paper data-[green=true]:text-navy data-[green=true]:hover:bg-beige"
            >
              Request a proposal
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        {/* Spacer reserving the structure photo's space in the flow — the photo
            itself lives in the clipped surface above. Height is capped by vw
            (not just vh): og.png's aspect ratio means its rendered height
            tracks viewport WIDTH, so a pure vh value overshoots badly on
            tall/narrow viewports — min() takes whichever is smaller. */}
        <div
          aria-hidden
          className="pointer-events-none relative mt-8 h-[42vh] md:mt-14 md:h-[min(88vh,54vw)]"
        />
      </div>
    </section>
  );
}
