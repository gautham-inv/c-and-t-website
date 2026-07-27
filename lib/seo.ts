/**
 * Central SEO / structured-data module — the single source of truth for the
 * site's canonical URL, organisation identity, and every JSON-LD schema we
 * emit. Builders here return plain objects; `components/seo/JsonLd.tsx`
 * serialises them into <script type="application/ld+json"> tags.
 *
 * Identity fields (socials, offices, contact) are imported from the existing
 * content modules so there's no second copy to drift out of sync.
 */
import { SITE_SETTINGS } from "./site";
import { CAREERS_CONTACT } from "./careers";
import type { Insight } from "./insights";
import type { Division } from "./divisions";
import type { Opening } from "./careers";

export const SITE_URL = "https://www.candtengineers.com";
export const SITE_NAME = "C&T Consulting Engineers";
const LEGAL_NAME = "C&T Consulting Engineers Pvt Ltd";
const LOGO_URL = `${SITE_URL}/logo.webp`;
/** Default social share image (1200×630-ish). Optimised from the source art. */
export const OG_IMAGE = "/og.jpg";

/** Stable @id anchors so nodes can cross-reference the one Organization /
 * WebSite defined site-wide in the root layout. */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Map an office `place` label (from lib/site) to an ISO country code. */
function countryCode(place: string): string {
  const p = place.toLowerCase();
  if (p.includes("uae") || p.includes("dubai") || p.includes("abu dhabi")) return "AE";
  if (p.includes("canada")) return "CA";
  return "IN";
}

function officeAddresses() {
  return SITE_SETTINGS.offices.map((o) => {
    const [locality] = o.detail.split(",").map((s) => s.trim());
    return {
      "@type": "PostalAddress",
      addressLocality: locality || o.detail,
      addressCountry: countryCode(o.place),
    };
  });
}

/** Canonical Organization node — emitted once, site-wide, in the root layout.
 * Other schemas reference it by @id. Includes the AEO-friendly `knowsAbout`
 * and `areaServed` hints that help answer engines describe the company. */
export function organizationSchema() {
  const addresses = officeAddresses();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 462, height: 200 },
    foundingDate: "2011",
    description:
      "C&T Consulting Engineers is a multidisciplinary engineering practice delivering architectural and MEP design, BIM modelling and CFD analysis for buildings, airports, data centres, industrial and oil & gas projects worldwide.",
    sameAs: SITE_SETTINGS.socials.map((s) => s.href),
    address: addresses,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CAREERS_CONTACT.email,
        telephone: CAREERS_CONTACT.phone,
        areaServed: ["IN", "AE", "CA", "QA", "SA"],
        availableLanguage: ["en"],
      },
    ],
    areaServed: ["India", "United Arab Emirates", "Qatar", "Saudi Arabia", "Canada", "Europe"],
    knowsAbout: [
      "MEP engineering design",
      "BIM modelling",
      "CFD analysis",
      "Building services engineering",
      "Oil & gas detailed engineering",
      "Data centre engineering",
    ],
  };
}

/** WebSite node — emitted once site-wide alongside Organization. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** Compact publisher/org used inline where Google requires the fields present
 * on the node itself (Article publisher, JobPosting hiringOrganization). */
function inlineOrg() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    sameAs: SITE_SETTINGS.socials.map((s) => s.href),
  };
}

/** Absolute-ise a `/path` (or pass through an already-absolute URL). */
function abs(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

/** BlogPosting/Article node for an insight article. A named author becomes a
 * Person node (with bio + jobTitle for E-E-A-T); otherwise the Organization
 * is credited. */
export function articleSchema(insight: Insight) {
  const url = `${SITE_URL}/insights/${insight.slug}`;
  const published = insight.datePublished || undefined;
  const author = insight.author
    ? {
        "@type": "Person",
        name: insight.author.name,
        ...(insight.author.role ? { jobTitle: insight.author.role } : {}),
        ...(insight.author.bio ? { description: insight.author.bio } : {}),
        worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      }
    : { "@type": "Organization", name: SITE_NAME, url: SITE_URL };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: insight.title,
    description: insight.excerpt,
    image: abs(insight.image),
    articleSection: insight.tag,
    ...(published ? { datePublished: published, dateModified: published } : {}),
    author,
    publisher: inlineOrg(),
    url,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** JobPosting node for a careers opening. */
export function jobPostingSchema(
  opening: Opening,
  opts: { datePosted: string; validThrough: string },
) {
  const description = [
    opening.about,
    opening.responsibilities?.length
      ? `Responsibilities:\n${opening.responsibilities.map((r) => `• ${r}`).join("\n")}`
      : "",
    opening.requirements?.length
      ? `Requirements:\n${opening.requirements.map((r) => `• ${r}`).join("\n")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const [locality] = opening.location.split(",").map((s) => s.trim());

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opening.title,
    description,
    datePosted: opts.datePosted,
    validThrough: opts.validThrough,
    employmentType:
      opening.type === "Full-time"
        ? "FULL_TIME"
        : opening.type === "Contract"
          ? "CONTRACTOR"
          : "INTERN",
    hiringOrganization: inlineOrg(),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: locality || opening.location,
        addressCountry: countryCode(opening.location),
      },
    },
    directApply: false,
  };
}

/** FAQPage node from a division's Q&A list. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList from an ordered trail of {name, path} crumbs. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** Convenience: CollectionPage breadcrumb for a top-level section. */
export function sectionBreadcrumb(name: string, path: string) {
  return breadcrumbSchema([
    { name: "Home", path: "/" },
    { name, path },
  ]);
}

/** Division type re-exported for callers that build breadcrumbs for it. */
export type { Division };
