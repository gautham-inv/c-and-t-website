"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, Paperclip, Check } from "lucide-react";
import { APPLY_EVENT } from "@/lib/apply";
import { getLenis } from "@/lib/lenis";

/**
 * Job-application modal — global, mounted once in the root layout. Opens on the
 * APPLY_EVENT dispatched by openApply(role) from any "Apply now" CTA. Adapts
 * the EnquiryModal: same field/validation/upload idiom, plus a prefilled role.
 *
 * Static export → no server. Set ENDPOINT to a forms endpoint (Web3Forms,
 * Formspree, etc.) to actually deliver applications; until then it validates,
 * shows the success state and logs the payload to the console.
 */
const ENDPOINT = ""; // e.g. "https://api.web3forms.com/submit"

// PDF · Word — the usual résumé formats.
const ACCEPT = ".pdf,.doc,.docx";
const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

type Errors = Partial<Record<string, string>>;

const FIELD =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-navy placeholder:text-ink-dim/60 outline-none transition-colors duration-200 focus:border-green";
const LABEL =
  "font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-dim";

export function ApplyModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [role, setRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Open on the global event; capture the role from the event detail.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ role?: string }>).detail;
      setRole(detail?.role ?? "");
      setSent(false);
      setOpen(true);
    };
    window.addEventListener(APPLY_EVENT, onOpen);
    return () => window.removeEventListener(APPLY_EVENT, onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Lock scroll (lenis + body) while open; reset transient state on close.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      setErrors({});
      setSubmitting(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_BYTES) {
      setErrors((p) => ({ ...p, file: "File exceeds the 25 MB limit." }));
      setFile(null);
      e.target.value = "";
      return;
    }
    setErrors((p) => ({ ...p, file: undefined }));
    setFile(f);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = "Please add your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(get("email")))
      next.email = "Enter a valid email address.";
    if (!get("phone")) next.phone = "Please add a contact number.";
    if (!file) next.file = "Please attach your résumé.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", body: data });
        if (!res.ok) throw new Error("Submission failed");
      } else {
        // No endpoint wired yet — log the payload so nothing is silently lost.
        console.info("[Application] (no ENDPOINT set)", {
          role,
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          linkedin: get("linkedin"),
          message: get("message"),
          resume: file?.name,
        });
      }
      form.reset();
      setFile(null);
      setSent(true);
    } catch {
      setErrors({ form: "Something went wrong — please email us directly." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[100] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0 }}
      />

      {/* Panel — outer layer scrolls, inner flex centres when short and lets the
          dialog scroll into view when taller than the viewport. data-lenis-prevent:
          Lenis hijacks wheel/touch globally, so the modal must opt out. */}
      <div data-lenis-prevent className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 md:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Apply for this role"
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-paper text-navy shadow-[0_40px_120px_-40px_rgba(9,33,44,0.6)] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:max-h-[calc(100dvh-3rem)]"
            style={{
              transform: open
                ? "translateY(0) scale(1)"
                : "translateY(24px) scale(0.98)",
              opacity: open ? 1 : 0,
            }}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-navy transition-colors duration-200 hover:bg-navy hover:text-paper"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            {/* Inner scroll — keeps a tall form inside the viewport */}
            <div data-lenis-prevent className="overflow-y-auto">
            {sent ? (
              <div className="flex flex-col items-center px-8 py-20 text-center md:px-12">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/15 text-green-dark">
                  <Check className="h-7 w-7" strokeWidth={2} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                  Application received
                </h2>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-dim">
                  Thanks for applying{role ? ` for ${role}` : ""} — our team will
                  review your résumé and be in touch if there&apos;s a fit.
                </p>
                <button
                  onClick={close}
                  className="mt-8 rounded-full bg-navy px-7 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:bg-green-dark"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="px-6 pb-8 pt-9 md:px-10 md:pb-10 md:pt-11">
                {role && (
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-green-dark">
                    Applying for
                  </p>
                )}
                <h2 className="mt-2 font-display text-[clamp(1.7rem,1rem+2vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em]">
                  {role || "Apply to C&T"}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                  Tell us a little about yourself and attach your résumé. When you
                  submit, our team will see your details.
                </p>

                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  className="mt-7 space-y-5"
                >
                  <input type="hidden" name="role" value={role} />

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={LABEL}>
                      Full name <span className="text-green-dark">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={FIELD}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={LABEL}>
                        Email <span className="text-green-dark">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={FIELD}
                        placeholder="you@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className={LABEL}>
                        Phone <span className="text-green-dark">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={FIELD}
                        placeholder="+91 …"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* LinkedIn / portfolio */}
                  <div>
                    <label htmlFor="linkedin" className={LABEL}>
                      LinkedIn or portfolio{" "}
                      <span className="font-sans normal-case tracking-normal text-ink-dim/70">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      className={FIELD}
                      placeholder="https://…"
                    />
                  </div>

                  {/* Cover note */}
                  <div>
                    <label htmlFor="message" className={LABEL}>
                      Cover note{" "}
                      <span className="font-sans normal-case tracking-normal text-ink-dim/70">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`${FIELD} resize-y`}
                      placeholder="Why this role, and what you'd bring…"
                    />
                  </div>

                  {/* Résumé upload */}
                  <div>
                    <span className={LABEL}>
                      Résumé / CV <span className="text-green-dark">*</span>
                    </span>
                    <input
                      ref={fileRef}
                      id="resume"
                      name="resume"
                      type="file"
                      accept={ACCEPT}
                      onChange={onFile}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="mt-2 flex w-full items-center gap-3 rounded-xl border border-dashed border-line bg-white px-4 py-3.5 text-left text-sm text-ink-dim transition-colors duration-200 hover:border-green"
                    >
                      <Paperclip
                        className="h-4 w-4 shrink-0 text-green-dark"
                        strokeWidth={1.75}
                      />
                      <span className="truncate text-navy/80">
                        {file ? file.name : "Choose a file"}
                      </span>
                      {file && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                            if (fileRef.current) fileRef.current.value = "";
                          }}
                          className="ml-auto shrink-0 rounded-full p-1 text-ink-dim hover:text-navy"
                          aria-label="Remove file"
                        >
                          <X className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                      )}
                    </button>
                    <p className="mt-1.5 text-[0.7rem] text-ink-dim/80">
                      PDF or Word · max 25 MB.
                    </p>
                    {errors.file && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.file}</p>
                    )}
                  </div>

                  {errors.form && (
                    <p className="text-sm text-red-600">{errors.form}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:bg-green-dark disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Submit application"}
                    {!submitting && (
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    )}
                  </button>
                </form>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
