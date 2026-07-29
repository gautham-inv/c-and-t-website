import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { CAREERS_CONTACT } from "@/lib/careers";

const TITLE = "Privacy Policy | C&T Consulting Engineers";
const DESCRIPTION =
  "How C&T Consulting Engineers collects, uses and protects information submitted through this website.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Who this policy covers",
    paragraphs: [
      "This policy applies to www.candtengineers.com, operated by C&T Consulting Engineers Pvt Ltd (\"C&T\", \"we\", \"us\"), headquartered in Thiruvananthapuram, Keralam, India, with offices in the UAE and Canada. It explains what information the site collects, how we use it, and the choices you have.",
      "This site does not have user accounts, logins, or e-commerce — there is nothing to purchase and nothing to sign into. The only personal information we collect is what you choose to give us through the enquiry form, the careers application form, or by emailing or calling us directly.",
    ],
  },
  {
    heading: "2. Information you submit to us",
    paragraphs: [
      "When you use the \"Get in touch\" enquiry form, we collect your company name, email address, phone number, the practice and services you select, your project message, and, optionally, a file you attach (such as architectural drawings).",
      "When you apply for a role through the careers application form, we collect your name, email address, phone number, your résumé/CV, and optionally a LinkedIn or portfolio link and a cover note.",
    ],
  },
  {
    heading: "3. Information collected automatically",
    paragraphs: [
      "Where Google Analytics (GA4) is enabled on this site, it collects standard usage data — pages viewed, approximate location derived from IP address, device and browser type, and referral source — to help us understand how the site is used. This is aggregate, analytics-oriented data; we do not use it to identify you personally.",
      "We do not use advertising cookies, retargeting pixels, or any tracking that follows you across other websites.",
    ],
  },
  {
    heading: "4. How we use your information",
    paragraphs: [
      "We use the information you submit solely to respond to your enquiry, evaluate your job application, or otherwise handle the specific request you made. We use aggregate analytics data to understand which content is useful and to improve the site.",
      "We do not use your contact details for marketing emails or newsletters, and we do not sell, rent, or trade your personal information to any third party.",
    ],
  },
  {
    heading: "5. How your submission is handled",
    paragraphs: [
      "This site is a static website with no backend database. When you submit the enquiry or application form, it is sent as an email — via Resend, a transactional email provider — directly to the relevant team's inbox (sales for enquiries, HR for applications). From that point, it's handled like any other email we receive: it lives in that inbox until we act on it or delete it.",
      "Attachments (drawings, résumés) are transmitted the same way, as part of that email, and are not stored anywhere else by the website itself.",
    ],
  },
  {
    heading: "6. Cookies",
    paragraphs: [
      "Where Google Analytics is active, it sets cookies to distinguish visitors and sessions, governed by Google's own privacy practices. You can control or block these through your browser's cookie settings, or by installing Google's Analytics opt-out browser add-on. No other cookies are set by this site.",
    ],
  },
  {
    heading: "7. Data security",
    paragraphs: [
      "This site is served over HTTPS, and form submissions are transmitted over an encrypted connection to our email provider. No method of transmission or storage is completely secure, but we take reasonable, industry-standard steps to protect information you share with us.",
    ],
  },
  {
    heading: "8. International transfers",
    paragraphs: [
      "C&T operates from India, the UAE and Canada, and our email and analytics providers may process data on servers located in other countries. Wherever your information is processed, we expect it to be handled consistently with this policy.",
    ],
  },
  {
    heading: "9. Your rights",
    paragraphs: [
      "Depending on where you're located, you may have rights under applicable data protection law — for example, India's Digital Personal Data Protection Act, the UAE's data protection regime, or (for EU/UK visitors) the GDPR — to ask what information we hold about you, request a correction, or request deletion.",
      "To exercise any of these, email us at the address below. Since we don't operate a database, honouring a deletion request generally means removing the relevant email thread and any attachment from our systems.",
    ],
  },
  {
    heading: "10. Children's privacy",
    paragraphs: [
      "This site is intended for business and professional use and is not directed at children. We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "11. Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time to reflect changes to the site or how we handle information. The \"Last updated\" date at the top of this page will always reflect the most recent version.",
    ],
  },
  {
    heading: "12. Contact us",
    paragraphs: [
      `Questions about this policy, or requests regarding your information, can be sent to ${CAREERS_CONTACT.email} or ${CAREERS_CONTACT.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <LegalDocument
        title="Privacy Policy"
        lastUpdated="28 July 2026"
        intro="This policy explains what information C&T Consulting Engineers collects through this website, why, and how it's handled — in plain terms, since there's no account system or e-commerce here, just a couple of contact forms."
        sections={SECTIONS}
      />
      <WithUs rounded={false} />
    </main>
  );
}
