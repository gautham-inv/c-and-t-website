/**
 * Site chrome (nav, footer, offices, socials) — the fallback source of truth
 * for the Navbar and Footer, which the root layout feeds from Sanity
 * (`siteSettings`) first and falls back to this when the dataset isn't seeded.
 * Socials carry label + href only; the icon is resolved by label in code
 * (see lib/social.ts → socialIcon).
 */
export type NavLink = { label: string; href: string };
export type Office = { place: string; detail: string };
export type SocialRef = { label: string; href: string };

export type SiteSettings = {
  /** Primary navbar menu. */
  navItems: NavLink[];
  /** Footer quick-links (a distinct, lowercase set). */
  footerLinks: NavLink[];
  offices: Office[];
  socials: SocialRef[];
  copyright: string;
};

export const SITE_SETTINGS: SiteSettings = {
  navItems: [
    { label: "Who we are", href: "/about" },
    { label: "Divisions", href: "/divisions" },
    { label: "Projects", href: "/projects" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
  ],
  footerLinks: [
    { label: "divisions", href: "/divisions" },
    { label: "projects", href: "/#projects" },
    { label: "about", href: "/about" },
    { label: "insights", href: "/#blog" },
    { label: "contact", href: "/#contact" },
    { label: "faq", href: "/#faq" },
    { label: "careers", href: "/careers" },
  ],
  offices: [
    { place: "India (HQ)", detail: "Trivandrum, Kerala" },
    { place: "UAE", detail: "Deira, Dubai" },
    { place: "Canada", detail: "Mississauga, ON" },
  ],
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
  copyright: "© 2026 C&T Consulting Engineers Pvt Ltd",
};
