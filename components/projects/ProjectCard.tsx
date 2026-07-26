import type { PortfolioCard } from "@/sanity/lib/data";

/**
 * Shared project card — used by the /projects bento grid and by the
 * "<division> projects" grid on each division page, so the two can't drift.
 *
 * Cards are deliberately not links: projects have no detail pages.
 *
 * The metadata panel sits over the photo. Up to `lg` it's always visible,
 * because touch and small screens have no hover to reveal it; from `lg` up it
 * wipes in on hover/focus. Cards with no photo keep the branded blueprint look
 * with the label always visible — there's no image to reveal from.
 *
 * Sizing comes from the caller (`className`): the bento grid sizes cells with
 * auto-rows + col-spans, the division grid uses a fixed aspect ratio.
 */
export function ProjectCard({
  project,
  className = "",
}: {
  project: Pick<PortfolioCard, "name" | "meta" | "image">;
  className?: string;
}) {
  const { name, meta, image } = project;

  return (
    <article
      className={`group relative block overflow-hidden rounded-2xl bg-stone ${className}`}
      tabIndex={image ? 0 : undefined}
      aria-label={image ? `${name} — ${meta}` : undefined}
    >
      {image ? (
        <>
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/50" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/92 to-ink/0 px-5 pb-5 pt-16 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:translate-y-0 motion-reduce:transition-none lg:translate-y-full lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0">
            <p className="font-display text-lg font-medium leading-tight text-paper md:text-xl">
              {name}
            </p>
            <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/60">
              {meta}
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(to right,#729d35 1px,transparent 1px),linear-gradient(to bottom,#729d35 1px,transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
          <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/50" />
          <div className="absolute inset-x-5 bottom-5 text-ink">
            <p className="font-display text-lg font-medium leading-tight md:text-xl">
              {name}
            </p>
            <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-dim">
              {meta}
            </p>
          </div>
        </>
      )}
    </article>
  );
}
