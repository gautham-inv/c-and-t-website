/**
 * Shared layout for /privacy and /terms — a simple prose document matching
 * the site's editorial styling (same blueprint-grid header treatment as the
 * insight/project detail pages), since neither page has a design of its own
 * to draw from. No Tailwind typography plugin is installed, so headings and
 * paragraphs are styled by hand here rather than via a `prose` class.
 */
export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export function LegalDocument({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  /** e.g. "28 July 2026" — shown under the title. */
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-mist text-ink">
      {/* ── Header ── */}
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
        <div className="relative mx-auto max-w-[1100px] px-6 pb-10 pt-36 md:px-10 md:pt-44">
          <h1 className="font-display text-[clamp(2rem,1rem+3.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-dim">
            Last updated {lastUpdated}
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1100px] px-6 pb-24 md:px-10 md:pb-32">
          <p className="max-w-3xl text-lg leading-relaxed text-ink-dim">
            {intro}
          </p>

          <div className="mt-14 space-y-12 md:mt-16 md:space-y-14">
            {sections.map((s) => (
              <div key={s.heading} className="max-w-3xl scroll-mt-28">
                <h2 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] md:text-2xl">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-ink-dim md:text-lg">
                      {p}
                    </p>
                  ))}
                  {s.bullets && s.bullets.length > 0 && (
                    <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-dim md:text-lg">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
