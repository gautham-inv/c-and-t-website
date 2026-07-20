import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        <div className="relative mx-auto max-w-[1600px] px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
          <h1 className="max-w-4xl font-display text-[clamp(2rem,1rem+3.5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.025em]">
            What we <span className="text-green-dark">do</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim">
            C&amp;T delivers MEP engineering, BIM, drafting and consultancy
            through two divisions with dedicated teams. Choose a practice to see
            the services, scope and projects it delivers.
          </p>

          <div className="mt-14 flex flex-col gap-6 md:mt-16 md:flex-row">
            {divisions.map((d) => (
              <Link
                key={d.slug}
                href={`/divisions/${d.slug}`}
                className="group relative flex aspect-[16/11] flex-col justify-end overflow-hidden rounded-2xl bg-stone p-8 md:aspect-[4/5] md:flex-1 md:p-10"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10"
                />
                <div className="relative">
                  <h2 className="max-w-xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-mist md:text-4xl">
                    {d.name}
                  </h2>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-mist/85 md:text-lg">
                    {d.tagline}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-base font-medium text-mist">
                    Explore division
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
