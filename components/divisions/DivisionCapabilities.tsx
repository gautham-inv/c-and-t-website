import type { Division } from "@/lib/divisions";

/**
 * Division-scoped capability statement — the discipline list, deliverables,
 * software, standards and sectors for one division.
 *
 * Separate from EngineeringScope (/divisions), which states what BOTH
 * divisions deliver as one shared A–O list. That list can't carry
 * energy-specific disciplines like pipeline or marine engineering without
 * implying the buildings team does them too, so this sits on the division
 * page instead.
 *
 * Every block is independently optional: a division with none of these fields
 * renders nothing at all, which is how Buildings & Infrastructure keeps its
 * current page unchanged.
 */
export function DivisionCapabilities({ division }: { division: Division }) {
  const { capabilities, deliverables, tools, standards, industriesServed } =
    division;

  const hasAny =
    capabilities?.length ||
    deliverables?.length ||
    tools?.length ||
    standards?.length ||
    industriesServed?.length;

  if (!hasAny) return null;

  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
          Capabilities &amp; <span className="text-green-dark">standards</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim">
          The disciplines the {division.shortName} team covers, what you receive
          at handover, and the platforms and codes the work is delivered to.
        </p>

        <div className="mt-14 border-t border-line md:mt-16">
          {capabilities?.length ? (
            <Row title="Engineering capabilities">
              {/* Two columns from sm: 25 disciplines in a single column is a
                  long scroll, and each item is short enough to pair up. */}
              <ul className="gap-x-8 sm:columns-2">
                {capabilities.map((item) => (
                  <li
                    key={item}
                    className="mb-2.5 flex gap-2.5 break-inside-avoid text-sm leading-relaxed text-ink-dim md:text-base"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </Row>
          ) : null}

          {deliverables?.length ? (
            <Row title="What you receive">
              <ul className="gap-x-8 sm:columns-2">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className="mb-2.5 flex gap-2.5 break-inside-avoid text-sm leading-relaxed text-ink-dim md:text-base"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </Row>
          ) : null}

          {tools?.length ? (
            <Row title="Software & platforms">
              <Chips items={tools} />
            </Row>
          ) : null}

          {standards?.length ? (
            <Row title="Codes & standards">
              <div>
                <Chips items={standards} />
                <p className="mt-4 text-sm leading-relaxed text-ink-dim/80">
                  Applied as the project requires — client, statutory and
                  international codes are confirmed per scope at kick-off.
                </p>
              </div>
            </Row>
          ) : null}

          {industriesServed?.length ? (
            <Row title="Industries served" last>
              <Chips items={industriesServed} />
            </Row>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Title left, content right — the same divider-row rhythm EngineeringScope
 *  uses on /divisions, so the two read as one family. */
function Row({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-x-12 gap-y-4 py-8 md:grid-cols-[0.8fr_1.2fr] ${
        last ? "" : "border-b border-line"
      }`}
    >
      <h3 className="font-display text-xl font-medium leading-snug text-ink md:text-2xl">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-sm text-ink/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
