"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, Paperclip, Check } from "lucide-react";
import { ENQUIRY_EVENT } from "@/lib/enquiry";
import { getLenis } from "@/lib/lenis";

/**
 * "Get in touch" project-enquiry modal — global, mounted once in the root
 * layout. Opens on the ENQUIRY_EVENT dispatched by openEnquiry() from any CTA.
 *
 * Static export → no server. Set ENDPOINT to a forms endpoint (Web3Forms,
 * Formspree, etc.) to actually deliver submissions; until then the modal
 * validates, shows the success state and logs the payload to the console.
 */
const ENDPOINT = ""; // e.g. "https://api.web3forms.com/submit"

const PROJECT_TYPES = [
  "MEP Design",
  "HVAC",
  "Oil and Gas",
  "Fire Fighting",
  "3D Modelling",
] as const;

// Word · Excel · PowerPoint · PDF · Images · Videos · Audio
const ACCEPT =
  ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,image/*,video/*,audio/*";
const MAX_BYTES = 100 * 1024 * 1024; // 100 MB

type Errors = Partial<Record<string, string>>;

const FIELD =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-navy placeholder:text-ink-dim/60 outline-none transition-colors duration-200 focus:border-green";
const LABEL =
  "font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-dim";

export function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Open on the global event.
  useEffect(() => {
    const onOpen = () => {
      setSent(false);
      setOpen(true);
    };
    window.addEventListener(ENQUIRY_EVENT, onOpen);
    return () => window.removeEventListener(ENQUIRY_EVENT, onOpen);
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
      setErrors((p) => ({ ...p, file: "File exceeds the 100 MB limit." }));
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
    if (!get("company")) next.company = "Please add your company name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(get("email")))
      next.email = "Enter a valid email address.";
    if (!get("phone")) next.phone = "Please add a contact number.";
    if (!projectType) next.projectType = "Pick a project type.";
    if (!get("message")) next.message = "Tell us a little about the project.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", body: data });
        if (!res.ok) throw new Error("Submission failed");
      } else {
        // No endpoint wired yet — log the payload so nothing is silently lost.
        console.info("[Enquiry] (no ENDPOINT set)", {
          company: get("company"),
          email: get("email"),
          phone: get("phone"),
          projectType,
          message: get("message"),
          file: file?.name,
        });
      }
      form.reset();
      setProjectType("");
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

      {/* Panel — outer layer scrolls, inner flex centres when short and lets
          the dialog scroll into view when it's taller than the viewport.
          data-lenis-prevent: Lenis hijacks wheel/touch globally, so the modal
          must opt out or its native scroll never fires. */}
      <div data-lenis-prevent className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 md:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Get in touch"
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-paper text-navy shadow-[0_40px_120px_-40px_rgba(9,33,44,0.6)] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:max-h-[calc(100dvh-3rem)]"
            style={{
              transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
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
                Enquiry received
              </h2>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-dim">
                Thanks — our team will review your project and get back to you
                shortly.
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
              <h2 className="font-display text-[clamp(1.7rem,1rem+2vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em]">
                Get in touch
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                When you submit this form, the owner will see your name and email
                address.
              </p>

              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                className="mt-7 space-y-5"
              >
                {/* Company */}
                <div>
                  <label htmlFor="company" className={LABEL}>
                    Your company name <span className="text-green-dark">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={FIELD}
                    placeholder="Company name"
                  />
                  {errors.company && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.company}</p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={LABEL}>
                      Contact email <span className="text-green-dark">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={FIELD}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className={LABEL}>
                      Contact phone <span className="text-green-dark">*</span>
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
                      <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Project type */}
                <div>
                  <span className={LABEL}>
                    Project type <span className="text-green-dark">*</span>
                  </span>
                  <input type="hidden" name="projectType" value={projectType} />
                  <div className="mt-2.5 flex flex-wrap gap-2.5">
                    {PROJECT_TYPES.map((t) => {
                      const active = projectType === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setProjectType(t);
                            setErrors((p) => ({ ...p, projectType: undefined }));
                          }}
                          aria-pressed={active}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                            active
                              ? "border-green bg-green text-white"
                              : "border-line bg-white text-navy/80 hover:border-navy/40"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  {errors.projectType && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={LABEL}>
                    Tell us about your project{" "}
                    <span className="text-green-dark">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`${FIELD} resize-y`}
                    placeholder="Scope, location, timeline, anything useful…"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* File upload */}
                <div>
                  <span className={LABEL}>
                    Upload architectural drawings{" "}
                    <span className="font-sans normal-case tracking-normal text-ink-dim/70">
                      (optional)
                    </span>
                  </span>
                  <input
                    ref={fileRef}
                    id="file"
                    name="file"
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
                    <Paperclip className="h-4 w-4 shrink-0 text-green-dark" strokeWidth={1.75} />
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
                    Max 1 file · 100 MB · Word, Excel, PowerPoint, PDF, images,
                    video or audio.
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
                  {submitting ? "Sending…" : "Submit enquiry"}
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
