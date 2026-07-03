import { ArrowUpRight } from "lucide-react";
import { serviceDivisions, type Service } from "@/lib/services";
import type { Division } from "@/lib/divisions";

// Lightweight services directory. Cards hold names, a sub-discipline preview
// and pointers INTO the division pages — the canonical scope lives there, so
// there are no per-service detail pages to duplicate.
export function ServicesIndex({
  services,
  divisions,
}: {
  services: Service[];
  divisions: Division[];
}) {
  return (
    <div className="bg-mist text-ink">
      {/* Heading */}
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
        <span className="absolute left-6 top-28 h-6 w-6 border-l border-t border-beige md:left-10" />
        <div className="relative mx-auto max-w-[1600px] px-6 pb-4 pt-36 text-center md:px-10 md:pt-44">
          <h1 className="mx-auto max-w-4xl font-display text-[clamp(2.5rem,1rem+5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Our <span className="text-green-dark">services</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim md:text-xl">
            Each service is delivered by both teams — with the scope tuned to the
            work. Pick a service to see how we apply it in Building or Oil &amp;
            Gas.
          </p>
        </div>
      </section>

      {/* Card grid */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => {
              const svcDivisions = serviceDivisions(svc);
              // Merge sub-disciplines across divisions for a preview line.
              const preview = Array.from(
                new Set(
                  svcDivisions.flatMap(
                    (d) => svc.byDivision[d]?.subDisciplines ?? [],
                  ),
                ),
              ).slice(0, 6);

              return (
                <article
                  key={svc.slug}
                  className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige/70" />
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h2 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] md:text-2xl">
                      {svc.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                      {svc.blurb}
                    </p>

                    <ul className="mt-5 grid gap-x-6 gap-y-0 sm:grid-cols-2">
                      {preview.map((d) => (
                        <li
                          key={d}
                          className="flex items-center gap-2.5 py-1.5 text-sm text-ink/80"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                          {d}
                        </li>
                      ))}
                    </ul>

                    {/* Pointers into the division pages */}
                    <div className="mt-auto flex flex-col gap-1 pt-6">
                      {svcDivisions.map((d) => {
                        const div = divisions.find((x) => x.slug === d);
                        if (!div) return null;
                        return (
                          <a
                            key={d}
                            href={`/divisions/${d}#${svc.slug}`}
                            className="group inline-flex items-center justify-between gap-3 border-t border-line py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:text-green-dark"
                          >
                            {svc.name.split(" ")[0]} in {div.shortName}
                            <ArrowUpRight
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              strokeWidth={1.75}
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
