/**
 * Project content — single source of truth for every /projects/[slug] page.
 * One shared template (ProjectView) renders these; adding a project = one
 * entry here.
 *
 * `name` is also the join key used by the project cards elsewhere on the site
 * (homepage carousel, sector & service "featured projects"): a card links
 * through to /projects/[slug] when projectSlug(card.name) finds a match.
 */

import type { DivisionSlug } from "@/lib/divisions";

export type ProjectBlock =
  | { type: "p"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type ProjectInfoRow = { label: string; value: string | string[] };
export type Personnel = { name: string; role: string; photo?: string };
/** Bento tile size — sm = square, wide = 2-wide, tall = 2-high, lg = 2×2. */
export type GallerySpan = "sm" | "wide" | "tall" | "lg";
export type GalleryItem = { image: string; span: GallerySpan; alt?: string };
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Hero sub-line under the name. */
  tagline?: string;
  heroImage: string;
  description: ProjectBlock[];
  info: ProjectInfoRow[];
  personnel: Personnel[];
  gallery: GalleryItem[];
  /** Optional — band hidden when absent. */
  testimonials?: Testimonial[];
};

export const PROJECTS: Project[] = [
  {
    slug: "expo-2020-dubai",
    name: "EXPO 2020 Campus, Dubai",
    tagline: "Plant-room BIM · LOD 400",
    heroImage: "/expocampus.jpg",
    description: [
      {
        type: "p",
        text: "C&T delivered BIM modelling for the plant rooms across the EXPO 2020 campus in Dubai — a 300,000 m² commercial development — coordinating dense mechanical, electrical and public-health plant for one of the region's highest-profile events.",
      },
      {
        type: "p",
        text: "Working for CINQ / Voltas International, our team modelled the plant rooms to LOD 400, producing fabrication-ready, clash-resolved models so the services could be prefabricated and installed against a fixed, immovable opening date.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "LOD 400 BIM modelling of plant rooms",
          "Multidiscipline MEP coordination",
          "Clash detection and resolution",
          "Fabrication-ready model output",
        ],
      },
    ],
    info: [
      { label: "Client", value: "CINQ / Voltas International" },
      { label: "Type", value: "Commercial Building — Expo Campus" },
      { label: "Area", value: "300,000 m²" },
      {
        label: "Services",
        value: "BIM Modelling for Plant Rooms (LOD 400)",
      },
      { label: "Location", value: "Dubai, UAE" },
      { label: "Year", value: "2019" },
    ],
    personnel: [],
    gallery: [
      { image: "/expocampus.jpg", span: "lg", alt: "Expo 2020 campus" },
      { image: "/bim-and-3d-modelling.jpg", span: "tall", alt: "Plant-room BIM model" },
      { image: "/mep-engineering-design.jpg", span: "sm", alt: "MEP design" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
      { image: "/engineering.jpg", span: "wide", alt: "Plant room services" },
      { image: "/bim-clash-detection.jpg", span: "sm", alt: "Clash detection" },
      { image: "/cfd-fea-analysis.webp", span: "sm", alt: "CFD analysis" },
    ],
  },
];

/** The full portfolio shown on the /projects index (bento grid). A card links
 * through to a detail page when projectSlug(name) finds one. `division` tags
 * each project to a division so the division pages can show all of their work
 * (derived from this one list — no separate, drift-prone curated set). */
export type PortfolioItem = {
  name: string;
  meta: string;
  /** Omitted when there's no real project photo — surfaces render a branded
   * placeholder card rather than reusing an unrelated image. */
  image?: string;
  division: DivisionSlug;
};

export const PORTFOLIO: PortfolioItem[] = [
  { name: "EXPO 2020 Campus, Dubai", meta: "BIM · Plant Rooms LOD 400 · 300,000 m² · 2019", image: "/expocampus.jpg", division: "building" },
  { name: "Trivandrum Airport T2", meta: "MEP Design & BIM · 163,000 m² · Kerala", image: "/trivandrum-airport-case-study.jpg", division: "building" },
  { name: "Calinova 2.4 MW Data Centre", meta: "MEP Design & BIM · Calicut", image: "/calinova-case-study.jpg", division: "building" },
  { name: "Yamal LNG, Russia", meta: "Detailed Engineering · 3D · TECHNIP", image: "/yamallng.jpeg", division: "oil-and-gas" },
  { name: "BIAL, Bangalore", meta: "MEP Design · BIM LOD 300 · AECOM", image: "/airport.webp", division: "building" },
  { name: "Duqm Refinery, Oman", meta: "Detailed Engineering · LOD 500 · PETROFAC", image: "/duqmrefinery.jpeg", division: "oil-and-gas" },
  { name: "Compression 4-NFPS", meta: "Process Piping · Offshore · Qatar Energy", image: "/Compression-4-NFPS.jpeg", division: "oil-and-gas" },
  { name: "Balwin 4 (2 GW)", meta: "HVAC & E&I Design · Offshore Platform · Dry Dock World", division: "oil-and-gas" },
  { name: "Vega Tower, Dubai", meta: "MEP Design & BIM · LOD 400", division: "building" },
  { name: "Muscat Cargo, Oman", meta: "MEP Design & BIM LOD 300 · Commercial · EIDC/J&P", division: "building" },
  { name: "Mall of Muscat, Oman", meta: "MEP Design · 1.8M sqft · EIDC · 2016", division: "building" },
  { name: "Al Khoud Mall, Oman", meta: "MEP Design · 100,000 m² · EIDC · 2017", division: "building" },
  { name: "Emaar District Cooling Plant, Dubai", meta: "BIM LOD 500 · Voltas · 2020", division: "building" },
  { name: "AHAD Tower, Dubai", meta: "MEP Design · 5B+G+31 · VX Studio · 2018", division: "building" },
  { name: "IGO 101, Dubai", meta: "MEP Design · 6B+G+31 · VX Studio · 2018", division: "building" },
  { name: "Commercial Boulevard, Qatar", meta: "BIM LOD 350–500 · 5 Buildings · Voltas · 2020–21", division: "building" },
  { name: "NER & WICR Site Utilities", meta: "MEP Design & BIM · Artelia / NEOM · KSA", division: "oil-and-gas" },
];

/** Projects belonging to a division, in portfolio order. */
export function projectsByDivision(division: DivisionSlug): PortfolioItem[] {
  return PORTFOLIO.filter((p) => p.division === division);
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

const SLUG_BY_NAME = new Map(PROJECTS.map((p) => [p.name, p.slug]));

/** Resolve a project card's name to its detail-page slug, if a page exists. */
export function projectSlug(name: string): string | undefined {
  return SLUG_BY_NAME.get(name);
}
