import { COMPANY_FAQS } from "@/lib/faqs";

/**
 * Homepage FAQ — answer-first Q&A for both readers and answer engines. Uses
 * native <details>/<summary> so it's interactive without client JS (works in
 * the static export) and keeps every answer in the crawled HTML. Mirrors the
 * divider-list FAQ idiom used on the division pages. Emitted alongside
 * FAQPage JSON-LD from app/page.tsx.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              Frequently <span className="text-green-dark">asked</span>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-dim">
              What clients most often ask about how C&amp;T works, what we
              deliver and where.
            </p>
          </div>

          {/* A plain div, not <dl>: <dl> may only directly contain dt/dd
              pairs (optionally single-div-wrapped) or script/template — a
              <details> element doesn't qualify, so wrapping this accordion in
              dl/dt/dd was invalid markup axe correctly flagged on two counts.
              This is an accordion of questions, not a glossary of terms, so
              dl/dt/dd was never the right model anyway. <h3> for the question
              also gives screen-reader users heading-based navigation between
              FAQ entries, which a <dt> never offered. */}
          <div className="border-t border-line">
            {COMPANY_FAQS.map((f) => (
              <details
                key={f.q}
                name="company-faq"
                className="group border-b border-line py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg font-medium leading-snug md:text-xl">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-2xl font-light leading-none text-green-dark transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-dim">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
