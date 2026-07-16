/**
 * ---------------------------------------------------------------------------
 * Sanity content seed / migration script
 * ---------------------------------------------------------------------------
 * WHAT THIS DOES
 *   Pushes every piece of content that currently lives in `lib/*.ts` into the
 *   Sanity dataset, uploading local `/public/*` images as real Sanity image
 *   assets. After it runs, the CMS is fully populated so the frontend (wired up
 *   separately) can read live data. It is idempotent: every document uses a
 *   deterministic `_id` and is written with `createOrReplace`, so re-running the
 *   script upserts rather than duplicating.
 *
 *   Document types seeded:
 *     service, division, project, insight, jobOpening (collections)
 *     homePage, aboutPage, careersPage, siteSettings (singletons)
 *
 * REQUIREMENTS
 *   A Sanity write token in the SANITY_API_WRITE_TOKEN environment variable.
 *   Create one at https://sanity.io → Manage → your project → API → Tokens
 *   with "Editor" (write) permissions.
 *
 * RUN
 *   SANITY_API_WRITE_TOKEN=sk_xxx npm run seed
 * ---------------------------------------------------------------------------
 */

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "../sanity/env";
import { SERVICES } from "../lib/services";
import { DIVISIONS } from "../lib/divisions";
import { PROJECTS, PORTFOLIO } from "../lib/projects";
import { INSIGHTS } from "../lib/insights";
import {
  VISION,
  MISSION,
  VALUES,
  COMPANY_MILESTONES,
  PROJECT_AWARDS,
  LOCATIONS,
  CAPABILITIES,
  LEADERSHIP,
  ISO_CERTIFICATION,
} from "../lib/company";
import { CAREERS_INTRO, REASONS, OPENINGS, TEAM_PHOTOS } from "../lib/careers";
import { TOOLS } from "../lib/tools";
import { SITE_SETTINGS } from "../lib/site";

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    [
      "",
      "  ✗ SANITY_API_WRITE_TOKEN is not set.",
      "",
      "  This script needs a write token to push documents into Sanity.",
      "  Create one:",
      "    1. Go to https://sanity.io/manage and open this project.",
      "    2. API → Tokens → Add API token.",
      "    3. Give it a name and choose the 'Editor' (write) permission.",
      "    4. Copy the token and run:",
      "",
      "       SANITY_API_WRITE_TOKEN=sk_xxx npm run seed",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// Project root is one level up from /scripts.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

// ---------------------------------------------------------------------------
// Types + helpers
// ---------------------------------------------------------------------------

type Ref = { _type: "reference"; _ref: string };
type ImageRef = { _type: "image"; asset: Ref; alt?: string };
type FileRef = { _type: "file"; asset: Ref };
type SlugValue = { _type: "slug"; current: string };

let keyCounter = 0;
/** Stable-ish unique key for an array item (Sanity requires `_key`). */
function key(prefix = "k"): string {
  keyCounter += 1;
  return `${prefix}${keyCounter.toString(36)}`;
}

function slug(current: string): SlugValue {
  return { _type: "slug", current };
}

function ref(id: string): Ref {
  return { _type: "reference", _ref: id };
}

/** Slugify a free-text name into a URL-safe slug (used for PORTFOLIO-only projects). */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Deterministic id builders.
const idService = (s: string) => `service-${s}`;
const idDivision = (s: string) => `division-${s}`;
const idProject = (s: string) => `project-${s}`;
const idInsight = (s: string) => `insight-${s}`;
const idJobOpening = (s: string) => `jobOpening-${s}`;

// ---------------------------------------------------------------------------
// Image upload (cached / deduped by /public path)
// ---------------------------------------------------------------------------

const imageCache = new Map<string, string | null>();

/**
 * Given a `/public/...` path from the lib data, upload the file as a Sanity
 * image asset (once) and return an image reference object. Missing files are
 * warned about and skipped (returns undefined so the field is simply omitted).
 */
async function uploadImage(
  publicPath: string | undefined | null,
  alt?: string,
): Promise<ImageRef | undefined> {
  if (!publicPath) return undefined;

  // Cache lookup (null = known-missing, skip silently on repeat).
  if (imageCache.has(publicPath)) {
    const cached = imageCache.get(publicPath);
    if (!cached) return undefined;
    return alt
      ? { _type: "image", asset: ref(cached), alt }
      : { _type: "image", asset: ref(cached) };
  }

  const relative = publicPath.replace(/^\//, "");
  const filePath = path.join(PUBLIC_DIR, relative);

  if (!existsSync(filePath)) {
    console.warn(`  ! image not found, skipping: ${publicPath}`);
    imageCache.set(publicPath, null);
    return undefined;
  }

  try {
    const buffer = await readFile(filePath);
    const filename = path.basename(filePath);
    const asset = await client.assets.upload("image", buffer, { filename });
    imageCache.set(publicPath, asset._id);
    return alt
      ? { _type: "image", asset: ref(asset._id), alt }
      : { _type: "image", asset: ref(asset._id) };
  } catch (err) {
    console.warn(`  ! failed to upload ${publicPath}: ${(err as Error).message}`);
    imageCache.set(publicPath, null);
    return undefined;
  }
}

const fileCache = new Map<string, string | null>();

/** Same as uploadImage, but for non-image files (e.g. certificate PDFs). */
async function uploadFile(
  publicPath: string | undefined | null,
): Promise<FileRef | undefined> {
  if (!publicPath) return undefined;

  if (fileCache.has(publicPath)) {
    const cached = fileCache.get(publicPath);
    return cached ? { _type: "file", asset: ref(cached) } : undefined;
  }

  const relative = publicPath.replace(/^\//, "");
  const filePath = path.join(PUBLIC_DIR, relative);

  if (!existsSync(filePath)) {
    console.warn(`  ! file not found, skipping: ${publicPath}`);
    fileCache.set(publicPath, null);
    return undefined;
  }

  try {
    const buffer = await readFile(filePath);
    const filename = path.basename(filePath);
    const asset = await client.assets.upload("file", buffer, { filename });
    fileCache.set(publicPath, asset._id);
    return { _type: "file", asset: ref(asset._id) };
  } catch (err) {
    console.warn(`  ! failed to upload ${publicPath}: ${(err as Error).message}`);
    fileCache.set(publicPath, null);
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Portable Text helpers (for project.description + insight body kept simple)
// ---------------------------------------------------------------------------

type SpanChild = { _type: "span"; _key: string; text: string; marks: string[] };
type Block = {
  _type: "block";
  _key: string;
  style: string;
  listItem?: string;
  level?: number;
  markDefs: never[];
  children: SpanChild[];
};

function textBlock(text: string, style = "normal", listItem?: string): Block {
  const block: Block = {
    _type: "block",
    _key: key("b"),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key("s"), text, marks: [] }],
  };
  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }
  return block;
}

// ---------------------------------------------------------------------------
// Date parsing for insights ("May 2026" -> ISO datetime, best effort)
// ---------------------------------------------------------------------------

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseInsightDate(input: string): string | undefined {
  const m = input.trim().toLowerCase().match(/^([a-z]{3})[a-z]*\s+(\d{4})$/);
  if (!m) return undefined;
  const month = MONTHS[m[1]];
  const year = Number(m[2]);
  if (month === undefined || Number.isNaN(year)) return undefined;
  return new Date(Date.UTC(year, month, 1)).toISOString();
}

// ---------------------------------------------------------------------------
// Seed: base documents (pass 1 — no cross references yet)
// ---------------------------------------------------------------------------

async function seedServices(): Promise<void> {
  let n = 0;
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    const image = await uploadImage(s.image, s.name);
    const doc: Record<string, unknown> = {
      _id: idService(s.slug),
      _type: "service",
      name: s.name,
      slug: slug(s.slug),
      blurb: s.blurb,
      featured: s.featured ?? false,
      order: i,
    };
    if (image) doc.image = image;
    // byDivision references are wired in pass 2; create with body/subDisciplines now.
    await client.createOrReplace(doc as never);
    n++;
  }
  console.log(`  ✓ services: ${n}`);
}

async function seedDivisions(): Promise<void> {
  let n = 0;
  for (const d of DIVISIONS) {
    const image = await uploadImage(d.image);
    const doc: Record<string, unknown> = {
      _id: idDivision(d.slug),
      _type: "division",
      name: d.name,
      shortName: d.shortName,
      slug: slug(d.slug),
      tagline: d.tagline,
      overview: d.overview,
      stats: d.stats.map((st) => ({ _type: "stat", _key: key("st"), value: st.value, label: st.label })),
      faqs: d.faqs.map((f) => ({ _type: "faq", _key: key("faq"), question: f.q, answer: f.a })),
    };
    if (image) doc.image = image;
    await client.createOrReplace(doc as never);
    n++;
  }
  console.log(`  ✓ divisions: ${n}`);
}

/**
 * Projects: merge PORTFOLIO (cards) with PROJECTS (detail pages) into one doc
 * per project, keyed by slug. Slug comes from PROJECTS where a detail entry
 * exists, otherwise slugified from the portfolio name.
 */
async function seedProjects(): Promise<Map<string, string>> {
  // name -> detail Project
  const detailByName = new Map(PROJECTS.map((p) => [p.name, p]));
  // name -> resolved slug (used later for homePage/caseStudy refs)
  const slugByName = new Map<string, string>();

  // Union of names: every PORTFOLIO card + any PROJECTS entry not in portfolio.
  const names = new Set<string>(PORTFOLIO.map((p) => p.name));
  for (const p of PROJECTS) names.add(p.name);

  // Quick lookup for portfolio card data.
  const portfolioByName = new Map(PORTFOLIO.map((p) => [p.name, p]));

  let n = 0;
  for (const name of names) {
    const card = portfolioByName.get(name);
    const detail = detailByName.get(name);

    const projectSlug = detail?.slug ?? slugify(name);
    slugByName.set(name, projectSlug);

    // Division: prefer the portfolio tag; else infer from detail info "Division" row.
    let divisionSlug = card?.division;
    if (!divisionSlug && detail) {
      const row = detail.info.find((r) => r.label === "Division");
      const val = Array.isArray(row?.value) ? row?.value[0] : row?.value;
      divisionSlug = val === "Oil & Gas" ? "oil-and-gas" : "building";
    }
    divisionSlug = divisionSlug ?? "building";

    const cardImage = await uploadImage(card?.image, name);

    const doc: Record<string, unknown> = {
      _id: idProject(projectSlug),
      _type: "project",
      name,
      slug: slug(projectSlug),
      division: ref(idDivision(divisionSlug)),
      enableDetailPage: Boolean(detail),
    };
    if (card?.meta) doc.meta = card.meta;
    if (cardImage) doc.image = cardImage;
    if (card?.industries?.length) doc.industries = card.industries;

    if (detail) {
      if (detail.tagline) doc.tagline = detail.tagline;

      const heroImage = await uploadImage(detail.heroImage, name);
      if (heroImage) doc.heroImage = heroImage;

      // Portable Text description.
      const description: Block[] = [];
      for (const block of detail.description) {
        if (block.type === "p") description.push(textBlock(block.text, "normal"));
        else if (block.type === "heading") description.push(textBlock(block.text, "h3"));
        else if (block.type === "list") {
          for (const item of block.items) description.push(textBlock(item, "normal", "bullet"));
        }
      }
      if (description.length) doc.description = description;

      if (detail.info.length) {
        doc.info = detail.info.map((r) => ({
          _type: "infoRow",
          _key: key("ir"),
          label: r.label,
          value: Array.isArray(r.value) ? r.value : [r.value],
        }));
      }

      if (detail.personnel.length) {
        const personnel = [];
        for (const p of detail.personnel) {
          const photo = await uploadImage(p.photo, p.name);
          const item: Record<string, unknown> = {
            _type: "personnel",
            _key: key("pn"),
            name: p.name,
            role: p.role,
          };
          if (photo) item.photo = photo;
          personnel.push(item);
        }
        doc.personnel = personnel;
      }

      if (detail.gallery.length) {
        const gallery = [];
        for (const g of detail.gallery) {
          const image = await uploadImage(g.image, g.alt);
          if (!image) continue;
          gallery.push({
            _type: "galleryItem",
            _key: key("gi"),
            image,
            span: g.span,
            ...(g.alt ? { alt: g.alt } : {}),
          });
        }
        if (gallery.length) doc.gallery = gallery;
      }

      if (detail.testimonials && detail.testimonials.length) {
        const testimonials = [];
        for (const t of detail.testimonials) {
          const photo = await uploadImage(t.photo, t.name);
          const item: Record<string, unknown> = {
            _type: "testimonial",
            _key: key("ts"),
            quote: t.quote,
            name: t.name,
            role: t.role,
          };
          if (photo) item.photo = photo;
          testimonials.push(item);
        }
        doc.testimonials = testimonials;
      }
    }

    await client.createOrReplace(doc as never);
    n++;
  }
  console.log(`  ✓ projects: ${n}`);
  return slugByName;
}

/** Returns a map: insight title -> insight _id (used for homePage insight refs). */
async function seedInsights(): Promise<Map<string, string>> {
  const idByTitle = new Map<string, string>();
  let n = 0;
  for (let i = 0; i < INSIGHTS.length; i++) {
    const ins = INSIGHTS[i];
    const s = slugify(ins.title);
    const id = idInsight(s || String(i));
    idByTitle.set(ins.title, id);

    const image = await uploadImage(ins.image, ins.title);
    const doc: Record<string, unknown> = {
      _id: id,
      _type: "insight",
      title: ins.title,
      slug: slug(s || String(i)),
      tag: ins.tag,
      readTime: ins.read,
      excerpt: ins.excerpt,
    };
    const date = parseInsightDate(ins.date);
    if (date) doc.date = date;
    if (image) doc.image = image;
    await client.createOrReplace(doc as never);
    n++;
  }
  console.log(`  ✓ insights: ${n}`);
  return idByTitle;
}

async function seedJobOpenings(): Promise<void> {
  let n = 0;
  for (const o of OPENINGS) {
    const doc: Record<string, unknown> = {
      _id: idJobOpening(o.slug),
      _type: "jobOpening",
      title: o.title,
      slug: slug(o.slug),
      team: o.team,
      location: o.location,
      type: o.type,
      experience: o.experience,
      summary: o.summary,
      about: o.about,
      responsibilities: o.responsibilities,
      requirements: o.requirements,
    };
    if (o.niceToHave && o.niceToHave.length) doc.niceToHave = o.niceToHave;
    await client.createOrReplace(doc as never);
    n++;
  }

  // Prune: OPENINGS is the single source of truth for the *current* roles, so
  // remove any jobOpening documents left over from earlier seeds (different
  // slugs / withdrawn roles) — after this the dataset holds exactly these.
  const keep = new Set(OPENINGS.map((o) => idJobOpening(o.slug)));
  const existing = await client.fetch<string[]>(`*[_type == "jobOpening"]._id`);
  const stale = (existing ?? []).filter((id) => !keep.has(id));
  for (const id of stale) {
    await client.delete(id);
    console.log(`  – removed stale jobOpening: ${id}`);
  }

  console.log(`  ✓ jobOpenings: ${n} (removed ${stale.length} stale)`);
}

// ---------------------------------------------------------------------------
// Pass 2 — patch/replace documents that carry cross references
// ---------------------------------------------------------------------------

async function wireServiceReferences(): Promise<void> {
  // service.byDivision[].division -> division reference (divisionScope object).
  for (const s of SERVICES) {
    const byDivision = (Object.keys(s.byDivision) as Array<keyof typeof s.byDivision>).map(
      (divSlug) => {
        const scope = s.byDivision[divSlug]!;
        return {
          _type: "divisionScope",
          _key: key("ds"),
          division: ref(idDivision(divSlug)),
          subDisciplines: scope.subDisciplines,
          body: scope.body,
        };
      },
    );
    await client.patch(idService(s.slug)).set({ byDivision }).commit();
  }
  console.log(`  ✓ wired service.byDivision`);
}

async function wireDivisionReferences(): Promise<void> {
  // division.services[] -> service refs.
  for (const d of DIVISIONS) {
    const services = d.serviceSlugs.map((slugId) => ({
      _type: "reference",
      _key: key("svc"),
      _ref: idService(slugId),
    }));
    await client.patch(idDivision(d.slug)).set({ services, hasIndustries: d.hasIndustries }).commit();
  }
  console.log(`  ✓ wired division.services + division.hasIndustries`);
}

// ---------------------------------------------------------------------------
// Singletons
// ---------------------------------------------------------------------------

async function seedHomePage(
  projectSlugByName: Map<string, string>,
  insightIdByTitle: Map<string, string>,
): Promise<void> {
  // Featured projects: first four portfolio entries that have detail pages.
  const featuredNames = PROJECTS.slice(0, 6).map((p) => p.name);
  const featuredProjects = featuredNames
    .map((name) => projectSlugByName.get(name))
    .filter((s): s is string => Boolean(s))
    .map((s) => ({ _type: "reference", _key: key("fp"), _ref: idProject(s) }));

  const featuredInsights = INSIGHTS
    .map((ins) => insightIdByTitle.get(ins.title))
    .filter((id): id is string => Boolean(id))
    .map((id) => ({ _type: "reference", _key: key("fi"), _ref: id }));

  // Case studies: first three detail projects with their hero image + a ref.
  const caseStudies = [];
  for (const p of PROJECTS.slice(0, 3)) {
    const image = await uploadImage(p.heroImage, p.name);
    const s = projectSlugByName.get(p.name);
    const item: Record<string, unknown> = {
      _type: "caseStudy",
      _key: key("cs"),
      title: p.name,
    };
    if (image) item.image = image;
    if (s) item.project = ref(idProject(s));
    caseStudies.push(item);
  }

  const doc: Record<string, unknown> = {
    _id: "homePage",
    _type: "homePage",
    heroHeadline: "Smart Engineering",
    heroSubhead:
      "MEP design, BIM coordination and detailed engineering for the buildings, infrastructure and energy projects the world depends on.",
    stats: [
      { _type: "stat", _key: key("st"), value: "2011", label: "Engineering since" },
      { _type: "stat", _key: key("st"), value: "3", label: "Continents" },
      { _type: "stat", _key: key("st"), value: "LOD 500", label: "BIM detail delivered" },
    ],
    caseStudies,
    featuredProjects,
    featuredInsights,
  };

  await client.createOrReplace(doc as never);
  console.log(`  ✓ homePage`);
}

async function seedAboutPage(): Promise<void> {
  const leadership = [];
  for (const l of LEADERSHIP) {
    const photo = await uploadImage(l.photo, l.name);
    const item: Record<string, unknown> = { _type: "leader", _key: key("ldr"), name: l.name, role: l.role };
    if (photo) item.photo = photo;
    if (l.bio) item.bio = l.bio;
    leadership.push(item);
  }

  const isoLogo = await uploadImage(ISO_CERTIFICATION.logo, ISO_CERTIFICATION.name);
  const isoDocument = await uploadFile(ISO_CERTIFICATION.documentPath);

  const doc: Record<string, unknown> = {
    _id: "aboutPage",
    _type: "aboutPage",
    vision: VISION,
    mission: MISSION,
    values: VALUES.map((v) => ({ _type: "value", _key: key("val"), name: v.name, body: v.body })),
    companyMilestones: COMPANY_MILESTONES.map((m) => {
      const item: Record<string, unknown> = {
        _type: "milestone",
        _key: key("ms"),
        year: m.year,
        title: m.title,
      };
      if (m.detail) item.detail = m.detail;
      if (m.place) item.place = m.place;
      return item;
    }),
    projectAwards: PROJECT_AWARDS.map((a) => ({
      _type: "award",
      _key: key("aw"),
      year: a.year,
      name: a.name,
      meta: a.meta,
    })),
    locations: LOCATIONS.map((l) => ({
      _type: "location",
      _key: key("loc"),
      name: l.name,
      role: l.role,
      lat: l.lat,
      lng: l.lng,
      entities: l.entities,
    })),
    capabilities: CAPABILITIES.map((c) => {
      const item: Record<string, unknown> = { _type: "capability", _key: key("cap"), label: c.label };
      if (c.href) item.href = c.href;
      return item;
    }),
    leadership,
  };
  if (isoLogo) doc.isoLogo = isoLogo;
  if (isoDocument) doc.isoDocument = isoDocument;

  await client.createOrReplace(doc as never);
  console.log(`  ✓ aboutPage`);
}

async function seedCareersPage(): Promise<void> {
  const teamPhotos = [];
  for (const p of TEAM_PHOTOS) {
    const image = await uploadImage(p);
    if (image) teamPhotos.push({ ...image, _key: key("tp") });
  }

  const doc: Record<string, unknown> = {
    _id: "careersPage",
    _type: "careersPage",
    intro: CAREERS_INTRO,
    reasons: REASONS.map((r) => ({
      _type: "careerReason",
      _key: key("rsn"),
      title: r.title,
      body: r.body,
    })),
    whyTitle: "More than engineers",
    whyBody: [
      "We are a genuinely multicultural team spread across India, the UAE and Canada, united by one delivery model and one standard of smart engineering.",
      "Grow with a practice that has been building since 2011 — mentored by industry veterans, on projects that define skylines and careers.",
    ],
    teamPhotos,
  };
  await client.createOrReplace(doc as never);
  console.log(`  ✓ careersPage`);
}

async function seedSiteSettings(): Promise<void> {
  const tools = [];
  for (const t of TOOLS) {
    const logo = await uploadImage(t.logo, t.name);
    const item: Record<string, unknown> = { _type: "tool", _key: key("tool"), name: t.name };
    if (logo) item.logo = logo;
    if (t.href) item.url = t.href;
    tools.push(item);
  }

  const doc: Record<string, unknown> = {
    _id: "siteSettings",
    _type: "siteSettings",
    tools,
    navItems: SITE_SETTINGS.navItems.map((n) => ({ _type: "navItem", _key: key("nav"), ...n })),
    footerLinks: SITE_SETTINGS.footerLinks.map((n) => ({ _type: "navItem", _key: key("fnav"), ...n })),
    footerTagline: "Precision engineered. Globally delivered.",
    offices: SITE_SETTINGS.offices.map((o) => ({ _type: "office", _key: key("off"), ...o })),
    socials: SITE_SETTINGS.socials.map((s) => ({ _type: "socialLink", _key: key("soc"), ...s })),
    isoBadge: "ISO 9001:2015",
    copyright: SITE_SETTINGS.copyright,
  };
  await client.createOrReplace(doc as never);
  console.log(`  ✓ siteSettings`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log(`\nSeeding Sanity dataset "${dataset}" (project ${projectId})…\n`);

  console.log("Pass 1 — base documents:");
  await seedServices();
  await seedDivisions();
  const projectSlugByName = await seedProjects();
  const insightIdByTitle = await seedInsights();
  await seedJobOpenings();

  console.log("\nPass 2 — wiring references:");
  await wireServiceReferences();
  await wireDivisionReferences();

  console.log("\nSingletons:");
  await seedHomePage(projectSlugByName, insightIdByTitle);
  await seedAboutPage();
  await seedCareersPage();
  await seedSiteSettings();

  const summary = {
    services: SERVICES.length,
    divisions: DIVISIONS.length,
    projects: projectSlugByName.size,
    insights: insightIdByTitle.size,
    jobOpenings: OPENINGS.length,
    singletons: 4,
    imagesUploaded: [...imageCache.values()].filter(Boolean).length,
    imagesMissing: [...imageCache.values()].filter((v) => v === null).length,
  };

  console.log("\n✓ Seed complete.");
  console.table(summary);
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err);
  process.exit(1);
});
