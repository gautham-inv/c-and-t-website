/**
 * Tiny event bus for the global job-application modal.
 *
 * <ApplyModal/> is mounted once in the root layout and listens for this event;
 * any "Apply now" CTA (on a /careers/[slug] page) opens it by calling
 * openApply(roleTitle). The role rides along on the event detail so the modal
 * can prefill + label the submission. Mirrors lib/enquiry.ts.
 */
export const APPLY_EVENT = "ct:open-apply";

export function openApply(role?: string): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: { role } }));
  }
}
