import { ENGINEERING_SCOPE } from "@/lib/company";

/**
 * "What we engineer" — the full A–O engineering & consultancy scope, rendered
 * as an editorial capability statement rather than a card grid: each detailed
 * discipline is a divider-separated row (title left, sub-disciplines flowing
 * right), and the standalone consultancy services collapse into one inline row.
 */
export function EngineeringScope() {
  const detailed = ENGINEERING_SCOPE.filter((g) => g.items && g.items.length);
  const standalone = ENGINEERING_SCOPE.filter((g) => !g.items || !g.items.length);

  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <h2 className="font-display text-[clamp(2rem,1rem+3.5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.025em]">
            What we <span className="text-green-dark">engineer</span>
          </h2>
          <p className="max-w-xl self-end text-lg leading-relaxed text-ink-dim">
            The full engineering, drafting, modelling and consultancy scope both
            divisions deliver, from single systems to complete developments.
          </p>
        </div>

        <div className="mt-14 border-t border-line md:mt-16">
          {detailed.map((g) => (
            <div
              key={g.title}
              className="grid gap-x-12 gap-y-4 border-b border-line py-8 md:grid-cols-[0.8fr_1.2fr]"
            >
              <h3 className="font-display text-xl font-medium leading-snug text-ink md:text-2xl">
                {g.title}
              </h3>
              <ul className="gap-x-8 sm:columns-2">
                {g.items!.map((item) => (
                  <li
                    key={item}
                    className="mb-2.5 flex gap-2.5 break-inside-avoid text-sm leading-relaxed text-ink-dim md:text-base"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="grid gap-x-12 gap-y-4 py-8 md:grid-cols-[0.8fr_1.2fr]">
            <h3 className="font-display text-xl font-medium leading-snug text-ink md:text-2xl">
              Consultancy &amp; specialist services
            </h3>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-relaxed text-ink-dim md:text-base">
              {standalone.map((g, i) => (
                <span key={g.title} className="inline-flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-green" />
                  )}
                  {g.title}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
