"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

/**
 * Unveiling-ceremony page for /launch.
 *
 * IMPORTANT: this button is ceremonial. It does not deploy anything — the site
 * is already live before anyone walks into the room, which is deliberate: a
 * real deploy takes minutes, can fail on a bad network, and is the last thing
 * you want running live on a projector in front of a board. What this gives
 * you is the moment, with none of the risk.
 *
 * The checklist that ticks through during the sequence is made of true
 * statements about what was actually built, not invented progress — so the
 * reveal reads as a summary of the work rather than a fake loading bar.
 */

const STEPS = [
  "Design system",
  "Content platform",
  "Global delivery network",
  "Secure connection",
] as const;

const STEP_MS = 620; // per checklist item
const SETTLE_MS = 520; // beat between the last tick and the reveal

type Phase = "idle" | "launching" | "live";

export function LaunchSequence() {
  const [phase, setPhase] = useState<Phase>("idle");
  // How many checklist items have completed. -1 while idle.
  const [done, setDone] = useState(-1);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const launch = useCallback(() => {
    clearTimers();
    setPhase("launching");
    setDone(0);
    STEPS.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setDone(i + 1), STEP_MS * (i + 1)),
      );
    });
    timers.current.push(
      window.setTimeout(
        () => setPhase("live"),
        STEP_MS * STEPS.length + SETTLE_MS,
      ),
    );
  }, [clearTimers]);

  // Rehearsal: run it as many times as you like before the real thing.
  const reset = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setDone(-1);
  }, [clearTimers]);

  const progress =
    phase === "live" ? 1 : Math.max(0, done) / STEPS.length;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-paper text-ink">
      {/* Blueprint grid — the same motif the rest of the site uses. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#729d35 1px,transparent 1px),linear-gradient(to bottom,#729d35 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
        <img
          src="/logo.webp"
          alt="C&T Consulting Engineers"
          width={462}
          height={200}
          className="h-12 w-auto md:h-14"
          draggable={false}
        />

        {/* ── Idle / launching share a headline slot so the layout doesn't
            jump when the sequence starts. ── */}
        {phase !== "live" ? (
          <>
            <p className="mt-10 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-green-dark">
              {phase === "idle" ? "Ready to launch" : "Launching"}
            </p>
            

            <div className="mt-12 w-full max-w-md">
              {/* Progress rail — present from the start (at zero) so the
                  button press fills something already on screen rather than
                  inserting a new element under the reader's eye. */}
              <div
                className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                aria-label="Launch progress"
              >
                <div
                  className="h-full rounded-full bg-green transition-[width] duration-500 ease-out motion-reduce:transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <ul className="mt-7 grid gap-2.5 text-left">
                {STEPS.map((step, i) => {
                  const complete = done > i;
                  const active = phase === "launching" && done === i;
                  return (
                    <li
                      key={step}
                      className={`flex items-center gap-3 text-sm transition-opacity duration-300 motion-reduce:transition-none ${
                        phase === "idle"
                          ? "opacity-0"
                          : complete || active
                            ? "opacity-100"
                            : "opacity-35"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 motion-reduce:transition-none ${
                          complete
                            ? "border-green bg-green text-white"
                            : "border-ink/25 text-transparent"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className={complete ? "text-ink" : "text-ink-dim"}>
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              type="button"
              onClick={launch}
              disabled={phase === "launching"}
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-navy px-9 py-4 text-base font-medium text-paper transition-colors duration-300 hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-dark disabled:cursor-default disabled:opacity-55 md:text-lg"
            >
              {phase === "launching" ? "Launching…" : "Launch the site"}
              {phase === "idle" && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </span>
              )}
            </button>
          </>
        ) : (
          <>
            <p className="mt-10 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-green-dark">
              {new Date().getFullYear()} · Now live
            </p>
            <h1 className="mt-5 text-balance font-display text-[clamp(2.75rem,1rem+7vw,6rem)] font-semibold leading-[1] tracking-[-0.03em]">
              We are <span className="text-green-dark">live</span>
            </h1>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.16em] text-ink-dim">
              www.candtengineers.com
            </p>

            <Link
              href="/"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-navy px-9 py-4 text-base font-medium text-paper transition-colors duration-300 hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-dark md:text-lg"
            >
              Go to site
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/15 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>

            {/* Deliberately quiet — it's for rehearsing the moment, not for
                the audience to notice. */}
            
          </>
        )}
      </div>
    </div>
  );
}
