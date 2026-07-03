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
  allServicesQuery,
  allDivisionsQuery,
  allSectorsQuery,
  aboutPageQuery,
  careersPageQuery,
  jobOpeningsQuery,
  jobOpeningBySlugQuery,
  allJobOpeningSlugsQuery,
} from "./queries";
import {
  PORTFOLIO,
  PROJECTS,
  projectSlug,
  type Project,
} from "@/lib/projects";
import { INSIGHTS, type Insight } from "@/lib/insights";
import { SERVICES, type Service } from "@/lib/services";
import { DIVISIONS, type Division, type DivisionSlug } from "@/lib/divisions";
import { SECTORS, type Sector } from "@/lib/sectors";
import {
  VISION,
  MISSION,
  VALUES,
  COMPANY_MILESTONES,
  PROJECT_AWARDS,
  LOCATIONS,
  CAPABILITIES,
} from "@/lib/company";
import {
  CAREERS_INTRO,
  REASONS,
  OPENINGS,
  TEAM_PHOTOS,
  type Opening,
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
};

export function getPortfolio(): Promise<PortfolioCard[]> {
  const fallback: PortfolioCard[] = PORTFOLIO.map((p) => ({
    name: p.name,
    meta: p.meta,
    image: p.image,
    division: p.division,
    slug: projectSlug(p.name),
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
        // No per-article pages yet — mirror lib/insights.ts behaviour.
        href: "/insights",
      }));
    },
    INSIGHTS,
    nonEmpty,
  );
}

// ── Services / Divisions / Sectors ──────────────────────────────────────
// Small collections (a handful of docs each) — fetch the whole set once per
// request and resolve individual entries in JS rather than round-tripping a
// by-slug query per lookup.

type ByDivisionRow = { division?: DivisionSlug; subDisciplines?: string[]; body?: string };

export function getServices(): Promise<Service[]> {
  return withFallback(
    async () => {
      const rows = await client.fetch<
        (Omit<Service, "byDivision"> & { byDivision?: ByDivisionRow[] })[]
      >(allServicesQuery);
      return (rows ?? []).map((r) => ({
        slug: r.slug,
        name: r.name,
        image: r.image,
        blurb: r.blurb,
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
    () => client.fetch<Division[]>(allDivisionsQuery),
    DIVISIONS,
    nonEmpty,
  );
}

export async function getDivision(slug: string): Promise<Division | undefined> {
  const divisions = await getDivisions();
  return divisions.find((d) => d.slug === slug);
}

export function getSectors(): Promise<Sector[]> {
  return withFallback(
    () => client.fetch<Sector[]>(allSectorsQuery),
    SECTORS,
    nonEmpty,
  );
}

export async function getSector(slug: string): Promise<Sector | undefined> {
  const sectors = await getSectors();
  return sectors.find((s) => s.slug === slug);
}

// ── About page ───────────────────────────────────────────────────────────

export type AboutPageData = {
  vision: string;
  mission: string;
  values: { name: string; body: string }[];
  companyMilestones: typeof COMPANY_MILESTONES;
  projectAwards: typeof PROJECT_AWARDS;
  locations: typeof LOCATIONS;
  capabilities: typeof CAPABILITIES;
};

const ABOUT_FALLBACK: AboutPageData = {
  vision: VISION,
  mission: MISSION,
  values: VALUES,
  companyMilestones: COMPANY_MILESTONES,
  projectAwards: PROJECT_AWARDS,
  locations: LOCATIONS,
  capabilities: CAPABILITIES,
};

export function getAboutPage(): Promise<AboutPageData> {
  return withFallback(
    () => client.fetch<AboutPageData | null>(aboutPageQuery).then((r) => r ?? ABOUT_FALLBACK),
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
};

export function getCareersPage(): Promise<CareersPageData> {
  return withFallback(
    () =>
      client
        .fetch<CareersPageData | null>(careersPageQuery)
        .then((r) => (r ?? CAREERS_PAGE_FALLBACK)),
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
