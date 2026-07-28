import { DivisionCard } from "@/components/divisions/DivisionCard";
import type { Division } from "@/lib/divisions";

// Divisions landing hero — the two verticals as two clickable banner cards.
// Deliberately simple: the rich scope lives on each division page, so this is
// just a way in. The tools strip and engineering scope render after it.
export function DivisionsIndex({ divisions }: { divisions: Division[] }) {
  return (
    <div className="bg-mist text-ink">
      {/* ── Heading + division cards ── */}
      <section className="relative overflow-hidden bg-mist">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#729d35 1px,transparent 1px),linear-gradient(to bottom,#729d35 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-[1600px] px-6 pb-16 pt-36 text-center md:px-10 md:pb-24 md:pt-44">
          <h1 className="mx-auto max-w-4xl font-display text-[clamp(2.5rem,1rem+5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
            What we <span className="text-green-dark">do</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim">
            C&amp;T delivers architectural, structural and MEP engineering, BIM,
            drafting and consultancy through two divisions with dedicated teams.
            Choose a practice to see the services, scope and projects it
            delivers.
          </p>

          {/* Same card as the homepage Divisions section (see DivisionCard) —
              a grid rather than the old flex row so the two match at every
              breakpoint, not just on desktop. */}
          <div className="mt-14 grid gap-6 text-left md:mt-16 md:grid-cols-2 md:gap-8">
            {divisions.map((d) => (
              <DivisionCard
                key={d.slug}
                division={d}
                cta="Explore division"
                headingLevel="h2"
                loading="eager"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
