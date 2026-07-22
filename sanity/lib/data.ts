/**
 * Server-side data access — the single boundary between the frontend and
 * Sanity. Every getter fetches from Sanity and FALLS BACK to the static
 * `lib/*` content when the query errors or returns nothing. This keeps the
 * static-export build green whether or not the dataset is seeded yet: run
 * `npm run seed` to populate Sanity, and content flows automatically.
 *
 * Only call these from Server Components (they run at build time). Client
 * components receive the resolved data as props.
 */
import { client } from "./client";
import {
  portfolioQuery,
  projectBySlugQuery,
  allProjectSlugsQuery,
  insightsQuery,
  insightBySlugQuery,
  allInsightSlugsQuery,
  allServicesQuery,
  allDivisionsQuery,
  aboutPageQuery,
  careersPageQuery,
  jobOpeningsQuery,
  jobOpeningBySlugQuery,
  allJobOpeningSlugsQuery,
  servicesPageQuery,
  siteSettingsQuery,
} from "./queries";
import { TOOLS, type Tool } from "@/lib/tools";
import { SITE_SETTINGS, type SiteSettings } from "@/lib/site";
import {
  PORTFOLIO,
  PROJECTS,
  projectSlug,
  type Project,
  type ProjectBlock,
  type GallerySpan,
} from "@/lib/projects";
import { INSIGHTS, type Insight } from "@/lib/insights";
import { SERVICES, type Service } from "@/lib/services";
import { DIVISIONS, type Division, type DivisionSlug } from "@/lib/divisions";
import {
  VISION,
  MISSION,
  VALUES,
  COMPANY_MILESTONES,
  PROJECT_AWARDS,
  LOCATIONS,
  CAPABILITIES,
  LEADERSHIP,
  ISO_CERTIFICATIONS,
} from "@/lib/company";
import {
  CAREERS_INTRO,
  REASONS,
  OPENINGS,
  TEAM_PHOTOS,
  CELEBRATION_PHOTOS,
  type Opening,
  type CelebrationPhoto,
} from "@/lib/careers";

/** Run `fn`; on throw or a "not useful" result, return `fallback`. */
async function withFallback<T>(
  fn: () => Promise<T>,
  fallback: T,
  useful: (v: T) => boolean,
): Promise<T> {
  try {
    const v = await fn();
    return useful(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

const nonEmpty = (v: unknown) => Array.isArray(v) && v.length > 0;

/** Portfolio card — a `slug` is present only when a detail page exists. */
export type PortfolioCard = {
  name: string;
  meta: string;
  image?: string;
  division: string;
  slug?: string;
  industries?: string[];
};

export function getPortfolio(): Promise<PortfolioCard[]> {
  const fallback: PortfolioCard[] = PORTFOLIO.map((p) => ({
    name: p.name,
    meta: p.meta,
    image: p.image,
    division: p.division,
    slug: projectSlug(p.name),
    industries: p.industries,
  }));
  return withFallback(
    async () => {
      const rows = await client.fetch<
        (PortfolioCard & { hasDetailPage?: boolean })[]
      >(portfolioQuery);
      return (rows ?? []).map((r) => ({
        name: r.name,
        meta: r.meta,
        image: r.image,
        division: r.division,
        slug: r.hasDetailPage ? r.slug : undefined,
        industries: r.industries,
      }));
    },
    fallback,
    nonEmpty,
  );
}

export function getProject(slug: string): Promise<Project | undefined> {
  const fallback = PROJECTS.find((p) => p.slug === slug);
  return withFallback(
    () =>
      client.fetch<Project | null>(projectBySlugQuery, { slug }).then((r) => {
        if (!r) return fallback;
        // GROQ returns `null` (not omitted) for array fields the doc didn't
        // set — normalize back to the shapes `Project` guarantees.
        return {
          ...r,
          description: r.description ?? [],
          info: r.info ?? [],
          personnel: r.personnel ?? [],
          gallery: r.gallery ?? [],
          testimonials: r.testimonials ?? undefined,
        };
      }),
    fallback,
    (v) => !!v,
  );
}

export function getProjectSlugs(): Promise<string[]> {
  const fallback = PROJECTS.map((p) => p.slug);
  return withFallback(
    async () => {
      const rows = await client.fetch<{ slug: string }[]>(allProjectSlugsQuery);
      return (rows ?? []).map((r) => r.slug);
    },
    fallback,
    nonEmpty,
  );
}

export function getInsights(): Promise<Insight[]> {
  return withFallback(
    async () => {
      const rows = await client.fetch<
        (Omit<Insight, "href"> & { slug?: string })[]
      >(insightsQuery);
      return (rows ?? []).map((a) => ({
        title: a.title,
        tag: a.tag,
        read: a.read,
        date: a.date,
        image: a.image,
        excerpt: a.excerpt,
        slug: a.slug ?? "",
        href: a.slug ? `/insights/${a.slug}` : "/insights",
      }));
    },
    INSIGHTS,
    nonEmpty,
  );
}

/** Sanity's real Portable Text (`_type: "block"`) → the simple
 * heading/paragraph/list shape `RichBlocks` renders. Consecutive bullet
 * blocks collapse into one `list` entry, mirroring how they were authored. */
type PortableTextBlock = {
  _type: string;
  style?: string;
  listItem?: string;
  children?: { text?: string }[];
};

function portableTextToBlocks(blocks: PortableTextBlock[]): ProjectBlock[] {
  const out: ProjectBlock[] = [];
  for (const b of blocks) {
    if (b._type !== "block") continue;
    const text = (b.children ?? []).map((c) => c.text ?? "").join("");
    if (b.listItem) {
      const last = out[out.length - 1];
      if (last?.type === "list") last.items.push(text);
      else out.push({ type: "list", items: [text] });
    } else if (b.style === "h3" || b.style === "h2") {
      out.push({ type: "heading", text });
    } else {
      out.push({ type: "p", text });
    }
  }
  return out;
}

export function getInsight(slug: string): Promise<Insight | undefined> {
  const fallback = INSIGHTS.find((i) => i.slug === slug);
  return withFallback(
    () =>
      client
        .fetch<(Omit<Insight, "body"> & { body?: PortableTextBlock[] }) | null>(
          insightBySlugQuery,
          { slug },
        )
        .then((r) => {
          if (!r) return fallback;
          return {
            ...r,
            href: `/insights/${r.slug}`,
            body: r.body?.length ? portableTextToBlocks(r.body) : undefined,
          };
        }),
    fallback,
    (v) => !!v,
  );
}

export function getInsightSlugs(): Promise<string[]> {
  const fallback = INSIGHTS.map((i) => i.slug);
  return withFallback(
    async () => {
      const rows = await client.fetch<{ slug: string }[]>(allInsightSlugsQuery);
      return (rows ?? []).map((r) => r.slug).filter(Boolean);
    },
    fallback,
    nonEmpty,
  );
}

// ── Services / Divisions ────────────────────────────────────────────────
// Small collections (a handful of docs each) — fetch the whole set once per
// request and resolve individual entries in JS rather than round-tripping a
// by-slug query per lookup.

type ByDivisionRow = { division?: DivisionSlug; subDisciplines?: string[]; body?: string };

export function getServices(): Promise<Service[]> {
  return withFallback(
    async () => {
      const rows = await client.fetch<
        (Omit<Service, "byDivision"> & { featured?: boolean; byDivision?: ByDivisionRow[] })[]
      >(allServicesQuery);
      return (rows ?? []).map((r) => ({
        slug: r.slug,
        name: r.name,
        image: r.image,
        blurb: r.blurb,
        // `featured` (drives the homepage accordion) may be absent on older
        // Sanity docs — backfill from the lib default by slug so the homepage
        // never ends up with an empty featured set.
        featured: r.featured ?? SERVICES.find((s) => s.slug === r.slug)?.featured ?? false,
        byDivision: Object.fromEntries(
          (r.byDivision ?? [])
            .filter((b): b is Required<ByDivisionRow> => !!b.division)
            .map((b) => [b.division, { subDisciplines: b.subDisciplines ?? [], body: b.body ?? "" }]),
        ) as Service["byDivision"],
      }));
    },
    SERVICES,
    nonEmpty,
  );
}

export async function getService(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((s) => s.slug === slug);
}

export function getDivisions(): Promise<Division[]> {
  return withFallback(
    async () => {
      const rows = await client.fetch<Division[]>(allDivisionsQuery);
      // GROQ returns `null` (not omitted) for array fields a doc hasn't set —
      // normalize to [] so the division page/DivisionView never `.map` a null.
      return (rows ?? []).map((d) => ({
        ...d,
        overview: d.overview ?? [],
        stats: d.stats ?? [],
        serviceSlugs: d.serviceSlugs ?? [],
        faqs: d.faqs ?? [],
        hasIndustries: !!d.hasIndustries,
      }));
    },
    DIVISIONS,
    nonEmpty,
  );
}

export async function getDivision(slug: string): Promise<Division | undefined> {
  const divisions = await getDivisions();
  return divisions.find((d) => d.slug === slug);
}

// ── About page ───────────────────────────────────────────────────────────

/** Resolved ISO certification — `logo`/`document` are Sanity CDN URLs once
 * seeded (absolute, so they work identically on localhost and hosted); the
 * fallback below points at local `/certifications/*` paths instead. */
export type IsoCert = { name: string; logo?: string; document?: string };

const ISO_FALLBACK: IsoCert[] = ISO_CERTIFICATIONS.map((c) => ({
  name: c.name,
  logo: c.logo,
  document: c.documentPath,
}));

export type AboutPageData = {
  vision: string;
  mission: string;
  values: { name: string; body: string }[];
  companyMilestones: typeof COMPANY_MILESTONES;
  projectAwards: typeof PROJECT_AWARDS;
  locations: typeof LOCATIONS;
  capabilities: typeof CAPABILITIES;
  leadership: typeof LEADERSHIP;
  isoCertifications: IsoCert[];
};

const ABOUT_FALLBACK: AboutPageData = {
  vision: VISION,
  mission: MISSION,
  values: VALUES,
  companyMilestones: COMPANY_MILESTONES,
  projectAwards: PROJECT_AWARDS,
  locations: LOCATIONS,
  capabilities: CAPABILITIES,
  leadership: LEADERSHIP,
  isoCertifications: ISO_FALLBACK,
};

export function getAboutPage(): Promise<AboutPageData> {
  return withFallback(
    () =>
      client.fetch<AboutPageData | null>(aboutPageQuery).then((r) => {
        if (!r) return ABOUT_FALLBACK;
        // GROQ returns `null` (not omitted) for array fields the doc hasn't
        // set yet — normalize back to the shapes AboutPageData guarantees.
        return {
          ...r,
          leadership: r.leadership?.length ? r.leadership : LEADERSHIP,
          isoCertifications: r.isoCertifications?.length
            ? r.isoCertifications
            : ISO_FALLBACK,
        };
      }),
    ABOUT_FALLBACK,
    (v) => !!v && !!v.vision,
  );
}

// ── Careers ──────────────────────────────────────────────────────────────

export type CareersPageData = {
  intro: string;
  reasons: { title: string; body: string }[];
  whyTitle: string;
  whyBody: string[];
  teamPhotos: string[];
  celebrationPhotos: CelebrationPhoto[];
};

const CAREERS_PAGE_FALLBACK: CareersPageData = {
  intro: CAREERS_INTRO,
  reasons: REASONS,
  whyTitle: "More than engineers",
  whyBody: [
    "At C&T we are pioneers, problem-solvers and future-makers. Working with us means the freedom to take on ambitious briefs, be bold, and push the limits of what MEP and BIM engineering can deliver.",
    "When you join us, you join a team working toward one goal — to build a better, more sustainable tomorrow, one asset at a time.",
  ],
  teamPhotos: TEAM_PHOTOS,
  celebrationPhotos: CELEBRATION_PHOTOS,
};

/** Layout cycle for celebration photos that come from Sanity without a
 * curated `span` (Studio just uploads plain images) — repeats to fit
 * whatever count is actually uploaded. */
const CELEBRATION_SPAN_CYCLE: GallerySpan[] = [
  "lg", "tall", "tall", "wide", "wide", "sm", "sm", "sm", "sm", "sm",
];

export function getCareersPage(): Promise<CareersPageData> {
  return withFallback(
    () =>
      client
        .fetch<
          (Omit<CareersPageData, "celebrationPhotos"> & {
            celebrationPhotos?: { image?: string; alt?: string }[] | null;
          })
          | null
        >(careersPageQuery)
        .then((r) => {
          if (!r) return CAREERS_PAGE_FALLBACK;
          const photos = (r.celebrationPhotos ?? []).filter((p) => p.image);
          return {
            ...r,
            teamPhotos: r.teamPhotos ?? TEAM_PHOTOS,
            celebrationPhotos: photos.length
              ? photos.map((p, i) => ({
                  image: p.image!,
                  alt: p.alt ?? "",
                  span: CELEBRATION_SPAN_CYCLE[i % CELEBRATION_SPAN_CYCLE.length],
                }))
              : CELEBRATION_PHOTOS,
          };
        }),
    CAREERS_PAGE_FALLBACK,
    (v) => !!v && !!v.intro,
  );
}

/** Job opening card — the /careers grid only needs the summary fields. */
export type JobOpeningCard = Pick<
  Opening,
  "slug" | "title" | "team" | "location" | "type" | "experience" | "summary"
>;

export function getJobOpenings(): Promise<JobOpeningCard[]> {
  return withFallback(
    () => client.fetch<JobOpeningCard[]>(jobOpeningsQuery),
    OPENINGS,
    nonEmpty,
  );
}

export function getJobOpening(slug: string): Promise<Opening | undefined> {
  const fallback = OPENINGS.find((o) => o.slug === slug);
  return withFallback(
    () => client.fetch<Opening | null>(jobOpeningBySlugQuery, { slug }).then((r) => r ?? fallback),
    fallback,
    (v) => !!v,
  );
}

export function getJobOpeningSlugs(): Promise<string[]> {
  const fallback = OPENINGS.map((o) => o.slug);
  return withFallback(
    async () => {
      const rows = await client.fetch<{ slug: string }[]>(allJobOpeningSlugsQuery);
      return (rows ?? []).map((r) => r.slug);
    },
    fallback,
    nonEmpty,
  );
}

// ── Services page content ──────────────────────────────────────────────────

export type ServicesPageData = {
  title: string;
  blurb: string;
  tools: Tool[];
};

const SERVICES_PAGE_FALLBACK: ServicesPageData = {
  title: "Our services",
  blurb: "Every engagement hands over the engineering design documents, drawings, reports, CFD analysis, hydraulic calculations and 3D models/renders behind it, to the codes and standards that apply at the project's location.",
  tools: TOOLS,
};

export function getServicesPage(): Promise<ServicesPageData> {
  return withFallback(
    async () => {
      const data = await client.fetch<Partial<ServicesPageData> | null>(servicesPageQuery);
      if (!data) return SERVICES_PAGE_FALLBACK;
      return {
        title: data.title || SERVICES_PAGE_FALLBACK.title,
        blurb: data.blurb || SERVICES_PAGE_FALLBACK.blurb,
        tools: data.tools?.length ? data.tools.filter((t) => t.name && t.logo) : SERVICES_PAGE_FALLBACK.tools,
      };
    },
    SERVICES_PAGE_FALLBACK,
    (v) => !!v && !!v.title,
  );
}

// ── Site chrome (Navbar + Footer) ──────────────────────────────────────────

export function getSiteSettings(): Promise<SiteSettings> {
  return withFallback(
    () =>
      client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery).then((r) => {
        if (!r) return SITE_SETTINGS;
        // Each field falls back independently so a partially-filled settings
        // doc never blanks out a menu or the offices list.
        return {
          navItems: r.navItems?.length ? r.navItems : SITE_SETTINGS.navItems,
          footerLinks: r.footerLinks?.length ? r.footerLinks : SITE_SETTINGS.footerLinks,
          offices: r.offices?.length ? r.offices : SITE_SETTINGS.offices,
          socials: r.socials?.length ? r.socials : SITE_SETTINGS.socials,
          copyright: r.copyright || SITE_SETTINGS.copyright,
        };
      }),
    SITE_SETTINGS,
    (v) => !!v && Array.isArray(v.navItems) && v.navItems.length > 0,
  );
}
