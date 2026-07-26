import { ArrowUpRight } from "lucide-react";
import type { Division } from "@/lib/divisions";
import type { Service } from "@/lib/services";
import type { PortfolioCard } from "@/sanity/lib/data";
import { ProjectCard } from "@/components/projects/ProjectCard";

/** An industry this division serves, with how many portfolio projects are
 * tagged with it. Only industries with `projectCount > 0` link anywhere —
 * there are too few projects to justify a page per industry, so the rest
 * render as plain labels rather than a link that leads to an empty list. */
export type DivisionIndustry = { slug: string; label: string; projectCount: number };

export function DivisionView({
  division,
  other,
  industries,
  services,
  projects,
}: {
  division: Division;
  other?: Division;
  industries: DivisionIndustry[];
  services: { svc: Service; scope: { subDisciplines: string[]; body: string } }[];
  projects: PortfolioCard[];
}) {
  return (
    <div className="bg-mist text-ink">
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={division.image}
          alt={division.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 pt-40 md:px-10 md:pb-24">
          <h1
            className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-paper"
            style={{ textShadow: "0 2px 30px rgba(9,33,44,0.45)" }}
          >
            {division.name}
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-paper md:text-xl"
            style={{ textShadow: "0 1px 18px rgba(9,33,44,0.55)" }}
          >
            {division.tagline}
          </p>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-4xl space-y-5">
            {division.overview.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-dim md:text-xl">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sectors (Building only) — a chip cloud, not cards: with 19
          industries and only a handful of showcased projects so far, a
          picture-card grid would either need photos we don't have or imply a
          page behind every tile. All chips read the same and are purely
          informational (non-clickable). ── */}
      {industries.length > 0 && (
        <section className="flex min-h-screen items-center bg-green-dark text-paper">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
            <h2 className="max-w-3xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              Sectors we serve in{" "}
              <span className="text-beige-light">{division.shortName.toLowerCase()}</span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-3 md:mt-14">
              {industries.map((ind) => (
                <span
                  key={ind.slug}
                  className="inline-flex items-center rounded-full border border-paper/30 bg-paper/[0.04] px-5 py-2.5 font-display text-base font-medium leading-none text-paper md:text-lg"
                >
                  {ind.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Services we deliver — anchored per service ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 pt-16 md:px-10 md:pt-24">
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
            What we deliver in{" "}
            <span className="text-green-dark">{division.shortName.toLowerCase()}</span>
          </h2>
        </div>

        {services.map(({ svc, scope }, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={svc.slug}
              id={svc.slug}
              className="scroll-mt-28 border-t border-line first:mt-12 md:first:mt-16"
            >
              <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 py-12 md:grid-cols-2 md:gap-16 md:px-10 md:py-16">
                <div className={flip ? "md:order-2" : "md:order-1"}>
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">
                    {svc.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-dim md:text-lg">
                    {scope.body}
                  </p>
                  <ul className="mt-6 grid gap-x-10 gap-y-0 sm:grid-cols-2">
                    {scope.subDisciplines.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-3 border-b border-line py-3 text-base text-ink/90 md:text-[1.05rem]"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0a1c25] ${
                    flip ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <img
                    src={svc.image}
                    alt={svc.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Projects ── */}
      {projects.length > 0 && (
        <section className="bg-mist">
          <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
            <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              {division.shortName} projects
            </h2>
            {/* Same card as the /projects grid (shared ProjectCard) — details
                sit on the card itself, and nothing links out: projects have no
                detail pages. */}
            <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.name} project={p} className="aspect-[3/2]" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-4 md:px-10 md:pb-24">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              Frequently <span className="text-green-dark">asked</span>
            </h2>
            <dl className="divide-y divide-line border-t border-line">
              {division.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="font-display text-lg font-medium leading-snug md:text-xl">
                    {f.q}
                  </dt>
                  <dd className="mt-3 max-w-2xl text-base leading-relaxed text-ink-dim">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Cross-link to the other division ── */}
      {other && (
        <section className="bg-mist">
          <div className="mx-auto max-w-[1600px] px-6 pb-20 md:px-10 md:pb-28">
            <a
              href={`/divisions/${other.slug}`}
              className="group flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line px-8 py-8 transition-colors duration-300 hover:border-ink md:px-12"
            >
              <span>
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-green-dark">
                  The other side of our expertise
                </span>
                <span className="mt-2 block font-display text-2xl font-medium leading-tight md:text-3xl">
                  {other.name}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink">
                Explore
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </span>
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
