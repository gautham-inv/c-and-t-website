"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GallerySpan } from "@/lib/projects";

export type BentoItem = { image: string; alt?: string; span: GallerySpan };

// Bento spans → grid placement. Row height is fixed via auto-rows so tall/lg
// tiles occupy two rows cleanly.
const SPAN: Record<GallerySpan, string> = {
  sm: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  lg: "col-span-2 row-span-2",
};

/** Shared bento grid + click-to-open lightbox, used by the project gallery
 * and any other photo set that wants the same look (e.g. the careers
 * celebrations gallery). */
export function BentoGallery({ heading, items }: { heading: ReactNode; items: BentoItem[] }) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
      if (e.key === "ArrowRight") setOpenAt((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setOpenAt((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openAt, items.length]);

  if (items.length === 0) return null;

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
          {heading}
        </h2>

        <div className="mt-12 grid auto-rows-[clamp(8rem,13vw,11rem)] grid-cols-2 gap-6 md:mt-14 md:grid-cols-4 md:gap-8">
          {items.map((item, i) => (
            <figure
              key={`${item.image}-${i}`}
              className={`group relative overflow-hidden rounded-2xl bg-stone ${SPAN[item.span]}`}
            >
              <button
                type="button"
                onClick={() => setOpenAt(i)}
                aria-label={`Open ${item.alt || "gallery image"} full-size`}
                className="absolute inset-0 h-full w-full cursor-zoom-in"
              >
                <img
                  src={item.image}
                  alt={item.alt ?? ""}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                />
              </button>
              <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/40" />
            </figure>
          ))}
        </div>
      </div>

      {openAt !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 md:p-10"
          onClick={() => setOpenAt(null)}
        >
          <button
            type="button"
            onClick={() => setOpenAt(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-mist/25 text-mist transition-colors duration-300 hover:bg-mist hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenAt((i) => (i === null ? i : (i - 1 + items.length) % items.length));
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mist/25 text-mist transition-colors duration-300 hover:bg-mist hover:text-ink md:left-6"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenAt((i) => (i === null ? i : (i + 1) % items.length));
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mist/25 text-mist transition-colors duration-300 hover:bg-mist hover:text-ink md:right-6"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </>
          )}

          <img
            src={items[openAt].image}
            alt={items[openAt].alt ?? ""}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {items.length > 1 && (
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mist/70">
              {openAt + 1} / {items.length}
            </span>
          )}
        </div>
      )}
    </section>
  );
}
