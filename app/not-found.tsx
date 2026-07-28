import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WithUs } from "@/components/sections/WithUs";

const TITLE = "Page not found | C&T Consulting Engineers";
const DESCRIPTION =
  "That page doesn't exist. Head back to the C&T Consulting Engineers homepage.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Must be set explicitly: the root layout declares `index: true`, and a page
  // inherits that, so without this override the output carries a contradictory
  // pair — Next's own injected `noindex` for not-found alongside the layout's
  // `index, follow`. This makes both emitted tags agree on noindex. (They are
  // still two tags; Next injects its own regardless, and a duplicate that
  // agrees is far better than one that conflicts.)
  robots: { index: false, follow: true },
  // The root layout also sets `canonical: "/"`, which every page inherits — on
  // a 404 that would claim the homepage as this URL's canonical, contradicting
  // the noindex above. Null clears the inherited value rather than replacing it
  // with something equally wrong.
  alternates: { canonical: null },
};

/**
 * Root 404. Rendered inside the root layout, so it inherits the Navbar and
 * Footer — which is also why it ends with <WithUs>: the Footer pulls itself up
 * by a fixed overlap (WITHUS_OVERLAP_VH) expecting that section above it, and
 * without one it would ride up over this page's content.
 *
 * One way out only (home). The nav is already on the page and the footer
 * carries the full link set, so a grid of section cards here was duplicating
 * chrome the visitor can already see.
 *
 * Under `output: "export"` this is emitted as out/404.html, which static hosts
 * (Cloudflare Pages included) serve for unmatched paths with a 404 status.
 */
export default function NotFound() {
  return (
    <main>
      <div className="bg-mist text-ink">
        {/* ── Header ── same blueprint-grid treatment as the legal and detail
            pages, so a 404 still reads as part of the site. */}
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
          <div className="relative mx-auto max-w-[1100px] px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
            {/* The status code as the headline. Tight leading and a negative
                left offset (roughly the numeral's side bearing) so the glyph
                edge lines up with the copy beneath it, not the glyph's box. */}
            <h1 className="-ml-[0.06em] font-display text-[clamp(6rem,4rem+14vw,15rem)] font-semibold leading-[0.82] tracking-[-0.04em]">
              4<span className="text-green-dark">0</span>4
            </h1>
            <p className="mt-6 max-w-2xl font-display text-[clamp(1.4rem,1rem+1.4vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em]">
              This page isn&rsquo;t here.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-dim">
              The address may have changed, or the link that brought you here may
              be out of date. Nothing is broken on your end.
            </p>

            <Link
              href="/"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-300 hover:bg-green-dark"
            >
              Back to home
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </section>
      </div>

      <WithUs rounded={false} />
    </main>
  );
}
