import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { CAREERS_CONTACT } from "@/lib/careers";

const TITLE = "Terms of Service | C&T Consulting Engineers";
const DESCRIPTION =
  "The terms that apply to using the C&T Consulting Engineers website.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/terms" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Acceptance of these terms",
    paragraphs: [
      "By using www.candtengineers.com (the \"site\"), you agree to these terms. If you don't agree with them, please don't use the site. These terms apply to browsing the site, submitting the enquiry form, and submitting a job application through the careers pages.",
    ],
  },
  {
    heading: "2. What this site is for",
    paragraphs: [
      "This site is a marketing and informational website for C&T Consulting Engineers Pvt Ltd (\"C&T\", \"we\", \"us\") — an engineering practice delivering architectural and MEP design, BIM modelling, and CFD analysis. It describes our services, divisions, and projects, publishes articles, lists job openings, and lets you get in touch about a project or a role.",
      "Nothing on this site is a binding offer to provide services or an offer of employment. Project scopes, pricing, timelines, and job terms are agreed separately, in writing, once we're in direct contact with you.",
    ],
  },
  {
    heading: "3. Acceptable use",
    paragraphs: [
      "You agree not to misuse the site — for example, by attempting to gain unauthorised access to it or the systems behind it, scraping or harvesting content at scale, submitting the enquiry or application forms with false information or malicious attachments, or using the site in any way that could damage, disable, or impair it for other visitors.",
    ],
  },
  {
    heading: "4. Intellectual property",
    paragraphs: [
      "The text, images, project photography, logos, and other content on this site belong to C&T or are used with the relevant permissions, and are protected by copyright and other intellectual property laws. You may view and share pages of this site for personal, non-commercial reference, but you may not reproduce, redistribute, or create derivative works from this content — including project photography and case-study material — without our prior written permission.",
    ],
  },
  {
    heading: "5. Submitting enquiries and job applications",
    paragraphs: [
      "When you submit the project enquiry form or a job application, you confirm that the information you provide is accurate and that you have the right to share any file you attach (drawings, a résumé, or otherwise).",
      "Submitting an enquiry does not create a client relationship, and submitting a job application does not create any obligation on our part to respond, interview, or hire — we review submissions and follow up where there's a fit.",
    ],
  },
  {
    heading: "6. Third-party links",
    paragraphs: [
      "This site links out to third-party destinations — our LinkedIn and Instagram profiles, and occasionally other external resources. We aren't responsible for the content, privacy practices, or availability of any third-party site you reach through these links.",
    ],
  },
  {
    heading: "7. No warranty",
    paragraphs: [
      "This site and its content are provided \"as is.\" We make reasonable efforts to keep project details, service descriptions and other information accurate and current, but we don't guarantee that everything on the site is complete, error-free, or up to date at all times.",
    ],
  },
  {
    heading: "8. Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, C&T is not liable for any indirect, incidental, or consequential loss arising from your use of, or inability to use, this site. Nothing in these terms limits liability that cannot lawfully be limited.",
    ],
  },
  {
    heading: "9. Governing law",
    paragraphs: [
      "These terms are governed by the laws of India, and any dispute arising from them is subject to the exclusive jurisdiction of the courts of Kerala, India, without regard to conflict-of-law principles.",
    ],
  },
  {
    heading: "10. Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time as the site changes. The \"Last updated\" date at the top of this page will always reflect the most recent version — continuing to use the site after an update means you accept the revised terms.",
    ],
  },
  {
    heading: "11. Contact us",
    paragraphs: [
      `Questions about these terms can be sent to ${CAREERS_CONTACT.email} or ${CAREERS_CONTACT.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <LegalDocument
        title="Terms of Service"
        lastUpdated="28 July 2026"
        intro="These terms govern your use of the C&T Consulting Engineers website — the rules of the road for browsing the site, reading about our work, and getting in touch about a project or a role."
        sections={SECTIONS}
      />
      <WithUs rounded={false} />
    </main>
  );
}
