import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Division } from "@/lib/divisions";

/**
 * The division banner card, shared by the homepage Divisions section and the
 * /divisions index so the two can't drift apart. They previously sized
 * themselves differently — min-height here, aspect-ratio there — which left the
 * index cards roughly half the height of the homepage ones on phones and
 * tablets.
 *
 * `cta` and `headingLevel` are the only knobs, because they're the only things
 * that genuinely differ by context: the index sits under an h1 and says
 * "Explore division", the homepage sits under an h2 and names the practice.
 * Nothing visual is configurable — that's the point.
 *
 * Carries `data-up` for the homepage's scroll reveal. Inert on the index page,
 * which has no animator (each section's gsap.from is scoped to its own root).
 */
export function DivisionCard({
  division: d,
  cta,
  headingLevel: Heading = "h3",
  loading = "lazy",
}: {
  division: Division;
  cta?: string;
  headingLevel?: "h2" | "h3";
  /** "eager" where the card is above the fold — on the /divisions index these
   * are the first images on the page, and the Sanity originals are large, so
   * deferring them leaves two empty dark rectangles in the opening view. The
   * homepage section is several screens down, hence the lazy default. */
  loading?: "lazy" | "eager";
}) {
  return (
    <Link
      data-up
      href={`/divisions/${d.slug}`}
      className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-[#0a1c25] p-8 md:min-h-[34rem] md:p-10"
    >
      <img
        src={d.image}
        alt={d.name}
        loading={loading}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(9,33,44,0.92) 0%, rgba(9,33,44,0.5) 40%, rgba(9,33,44,0.12) 75%)",
        }}
      />
      <span className="absolute left-6 top-6 h-5 w-5 border-l border-t border-beige/60" />

      <div className="relative text-paper">
        <Heading className="font-display text-[clamp(1.9rem,1rem+2vw,3rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
          {d.shortName}
        </Heading>
        <p className="mt-3 max-w-md text-base leading-relaxed text-paper/80">
          {d.tagline}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-beige-light transition-colors duration-300 group-hover:text-green">
          {cta ?? `Explore ${d.shortName}`}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </Link>
  );
}
