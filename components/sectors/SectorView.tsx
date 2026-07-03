"use client";

import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Sector } from "@/lib/sectors";
import type { Division } from "@/lib/divisions";
import { projectSlug } from "@/lib/projects";
import { SectorCapabilities } from "@/components/sectors/SectorCapabilities";

export function SectorView({
  sector,
  division,
}: {
  sector: Sector;
  division?: Division;
}) {
  return (
    <div className="bg-mist text-ink">
      {/* ── Hero — full viewport, no overlay gradient ── */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={sector.image}
          alt={sector.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 pt-40 md:px-10 md:pb-24">
          {division && (
            <a
              href={`/divisions/${division.slug}`}
              className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-beige-light transition-colors duration-300 hover:text-paper"
              style={{ textShadow: "0 1px 18px rgba(9,33,44,0.55)" }}
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={1.75}
              />
              {division.shortName}
            </a>
          )}
          <h1
            className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,1rem+6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-paper"
            style={{ textShadow: "0 2px 30px rgba(9,33,44,0.45)" }}
          >
            {sector.name}
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-paper md:text-xl"
            style={{ textShadow: "0 1px 18px rgba(9,33,44,0.55)" }}
          >
            {sector.tagline}
          </p>
        </div>
      </section>

      {/* ── Overview + stats ── */}
      <section className="scroll-mt-24 bg-mist">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:gap-20 md:px-10 md:py-24">
          <div>
            <div className="space-y-5">
              {sector.overview.map((p, i) => (
                <p
                  key={i}
                  data-up
                  className="text-lg leading-relaxed text-ink-dim md:text-xl"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8 border-t border-line pt-10 md:border-l md:border-t-0 md:pl-16 md:pt-0">
            {sector.stats.map((s) => (
              <div key={s.label} data-up>
                <p className="font-display text-[clamp(2.25rem,1.5rem+2vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-dim">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we approach the sector (optional) ── */}
      {sector.approach && sector.approach.length > 0 && (
        <section className="bg-green-dark text-paper">
          <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
            <h2
              data-up
              className="max-w-3xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              How we approach{" "}
              <span className="text-beige-light">{sector.name.toLowerCase()}</span>
            </h2>
            <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
              {sector.approach.map((a) => (
                <div key={a.title} data-up>
                  <h3 className="font-display text-xl font-medium leading-snug md:text-2xl">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-paper/70">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── What we bring — pinned wipe + zoom scrollytelling ── */}
      <SectorCapabilities services={sector.services} name={sector.name} />

      {/* ── Our expertise — sub-disciplines grid (optional) ── */}
      {sector.expertise && sector.expertise.length > 0 && (
        <section className="bg-green-dark text-paper">
          <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
              <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
                Our expertise in{" "}
                <span className="text-beige-light">
                  {sector.name.toLowerCase()}
                </span>
              </h2>
              <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {sector.expertise.map((e) => (
                  <li
                    key={e}
                    className="flex items-center gap-4 border-b border-paper/15 py-4 text-base text-paper/90 md:text-lg"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── Featured projects ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              data-up
              className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              Featured {sector.name.toLowerCase()} projects
            </h2>
            <a
              data-up
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-green-dark transition-colors duration-300 hover:text-green"
            >
              All projects
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {sector.projects.map((p) => {
              const slug = projectSlug(p.name);
              const inner = (
                <>
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[#0a1c25]">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
                  </div>
                  <div className="mt-4">
                    <p className="font-display text-xl font-medium leading-snug transition-colors duration-300 group-hover:text-green-dark">
                      {p.name}
                    </p>
                    <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
                      {p.meta}
                    </p>
                  </div>
                </>
              );
              return slug ? (
                <a key={p.name} data-up href={`/projects/${slug}`} className="group">
                  {inner}
                </a>
              ) : (
                <article key={p.name} data-up className="group">
                  {inner}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Related insights — editorial two-card layout (optional) ── */}
      {sector.insights && sector.insights.length > 0 && (
        <section className="bg-mist">
          <div className="mx-auto max-w-[1600px] px-6 pb-4 md:px-10 md:pb-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
                Learn more from{" "}
                <span className="text-green-dark">our experts</span>
              </h2>
              <a
                href="/insights"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-mist"
              >
                View all insights
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>

            <div className="mt-12 grid items-stretch gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
              {/* Card 1 — title beside a tall portrait image; the image drives
                  the row height so Card 2 can bottom-align to it. */}
              {sector.insights[0] && (
                <a
                  href={sector.insights[0].href}
                  className="group grid items-stretch gap-6 sm:grid-cols-[1fr_1.05fr] sm:gap-8"
                >
                  <div className="order-2 flex flex-col justify-center sm:order-1">
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-dim">
                      Article · {sector.insights[0].tag}
                    </span>
                    <h3 className="mt-4 font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-green-dark">
                      {sector.insights[0].title}
                    </h3>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-green-dark transition-colors duration-300 group-hover:text-green">
                      {sector.insights[0].read}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.75}
                      />
                    </span>
                  </div>
                  <div className="relative order-1 min-h-[22rem] overflow-hidden rounded-2xl bg-[#0a1c25] sm:order-2 sm:min-h-[30rem]">
                    <img
                      src={sector.insights[0].image}
                      alt={sector.insights[0].title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
                  </div>
                </a>
              )}

              {/* Card 2 — shorter image (grows to fill) above its title, so
                  image + text equals Card 1's full height. */}
              {sector.insights[1] && (
                <a
                  href={sector.insights[1].href}
                  className="group flex h-full flex-col gap-6"
                >
                  <div className="relative min-h-[12rem] flex-1 overflow-hidden rounded-2xl bg-[#0a1c25]">
                    <img
                      src={sector.insights[1].image}
                      alt={sector.insights[1].title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-beige/40" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-dim">
                      Article · {sector.insights[1].tag}
                    </span>
                    <h3 className="mt-3 font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-green-dark">
                      {sector.insights[1].title}
                    </h3>
                  </div>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <h2
              data-up
              className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              Frequently <span className="text-green-dark">asked</span>
            </h2>
            <dl className="divide-y divide-line border-t border-line">
              {sector.faqs.map((f) => (
                <div key={f.q} data-up className="py-6">
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
    </div>
  );
}
