/**
 * Tiny event bus for the global "C&T Project Enquiry" modal.
 *
 * <EnquiryModal/> is mounted once in the root layout and listens for this
 * event; any CTA anywhere on the site opens the modal by calling openEnquiry().
 * This avoids threading modal state through every page in the static export.
 */
export const ENQUIRY_EVENT = "ct:open-enquiry";

export function openEnquiry(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ENQUIRY_EVENT));
  }
}
