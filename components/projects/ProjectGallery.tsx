import type { GalleryItem, GallerySpan } from "@/lib/projects";

// Bento spans → grid placement. Row height is fixed via auto-rows so tall/lg
// tiles occupy two rows cleanly.
const SPAN: Record<GallerySpan, string> = {
  sm: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  lg: "col-span-2 row-span-2",
};

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
          Project <span className="text-green-dark">gallery</span>
        </h2>

        <div className="mt-12 grid auto-rows-[clamp(8rem,13vw,11rem)] grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-5">
          {items.map((item, i) => (
            <figure
              key={`${item.image}-${i}`}
              className={`group relative overflow-hidden rounded-2xl bg-stone ${SPAN[item.span]}`}
            >
              <img
                src={item.image}
                alt={item.alt ?? ""}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/40" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
