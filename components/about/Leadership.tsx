import { User } from "lucide-react";
import type { Leader } from "@/lib/company";

/**
 * Leadership row — photo, name, role. Leaders without a `photo` render a
 * branded monogram card (stone gradient + person glyph + blueprint tick)
 * that reads clearly as "photo pending", rather than borrowing an unrelated
 * image. Leaders with a `bio` get a hover wipe: a green-dark panel rises to
 * cover the photo and the bio fades in once the wipe settles. No pointer to
 * a separate leadership page (by design).
 */
export function Leadership({ leaders }: { leaders: Leader[] }) {
  return (
    <div>
      <h2
        data-up
        className="max-w-2xl font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
      >
        Our <span className="text-green-dark">leadership</span>
      </h2>

      <div data-up className="mt-12 grid grid-cols-2 gap-5 md:mt-16 md:grid-cols-4 md:gap-6">
        {leaders.map((leader, i) => (
          <figure key={i} className="group" tabIndex={leader.bio ? 0 : undefined}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl rounded-br-[2.5rem] bg-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark">
              {leader.photo ? (
                <img
                  src={leader.photo}
                  alt={leader.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone to-mist">
                  <User className="h-12 w-12 text-ink/20" strokeWidth={1.25} />
                  <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-beige" />
                </div>
              )}

              {leader.bio && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex translate-y-full flex-col justify-end bg-green-dark p-5 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none group-hover:translate-y-0 group-focus-visible:translate-y-0"
                >
                  <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-paper/25" />
                  <p className="translate-y-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-paper/60 opacity-0 transition-all delay-150 duration-300 motion-reduce:transition-none group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {leader.role}
                  </p>
                  <p className="mt-2 translate-y-2 text-[0.9rem] leading-snug text-paper opacity-0 transition-all delay-150 duration-300 motion-reduce:transition-none group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {leader.bio}
                  </p>
                </div>
              )}
            </div>
            <figcaption className="mt-5">
              <p className="font-display text-lg font-semibold leading-tight tracking-[-0.01em] md:text-xl">
                {leader.name}
              </p>
              <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-dim">
                {leader.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
