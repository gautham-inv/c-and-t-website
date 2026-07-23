/**
 * Company content — single source of truth for the /about page.
 * Narrative, vision/mission/values, the dual journey timeline (the practice's
 * own evolution + projects awarded), the global group footprint, and the
 * capabilities list (which links out to the pages that own each in detail).
 */

import { INDUSTRIES } from "./industries";

/** Industries with at least one tagged, published project — see
 * lib/projects.ts PORTFOLIO. Only these get a link; the rest of
 * INDUSTRIES still appear as plain labels below. */
const LINKED_INDUSTRIES = new Set([
  "aviation-airports",
  "data-centres",
  "commercial-mercantile",
  "high-rise-buildings",
  "chiller-plants",
]);

export const VISION =
  "C&T shall be a professionally managed engineering services company committed to total stakeholder satisfaction while delivering SMART ENGINEERING solutions to the desired standards.";

export const MISSION =
  "To deliver sustainable MEP engineering & BIM services across the globe, compliant with local ESG criteria, for the better performance of every asset we touch.";

export type Value = { name: string; body: string };

export const VALUES: Value[] = [
  {
    name: "Ethics",
    body: "Honest, principled conduct in every engagement, the standard our clients and partners rely on.",
  },
  {
    name: "Integrity",
    body: "We do what we say and say what we mean, holding the line even when no one is watching.",
  },
  {
    name: "Growth & Development",
    body: "We enjoy the journey, investing in our people so they grow alongside the practice.",
  },
];

/** The practice evolving — corporate formation & geographic expansion. */
export type Milestone = {
  year: string;
  title: string;
  detail?: string;
  place?: string;
};

export const COMPANY_MILESTONES: Milestone[] = [
  {
    year: "2011",
    title: "Climate Designers",
    detail: "Founded as a single-engineer HVAC practice.",
    place: "India",
  },
  {
    year: "2013",
    title: "C&T Consulting Engineers Pvt Ltd",
    detail: "Rebranded to a full multidiscipline MEP consultancy.",
    place: "India",
  },
  {
    year: "2024",
    title: "Fortis Technical Services LLC",
    place: "Dubai, UAE",
  },
  {
    year: "2024",
    title: "C&T Consulting Inc.",
    place: "Canada",
  },
  {
    year: "2025",
    title: "Fortis Contracting & General Maintenance LLC",
    place: "Abu Dhabi, UAE",
  },
];

/** Projects awarded — the work that landed as the practice grew. */
export type Award = { year: string; name: string; meta: string };

export const PROJECT_AWARDS: Award[] = [
  { year: "2015", name: "Muscat MRO & Cargo Airport", meta: "Oman" },
  { year: "2016", name: "Mall of Muscat", meta: "Oman" },
  { year: "2017", name: "AHAD Tower", meta: "46 storeys · Dubai" },
  { year: "2021", name: "Duqm Refinery", meta: "Oman" },
  { year: "2025", name: "Major Airport, South India", meta: "South India" },
];

/** Global group footprint — drives both the locations rail and the globe markers. */
export type Location = {
  name: string;
  role: string;
  lat: number;
  lng: number;
  entities: string[];
};

export const LOCATIONS: Location[] = [
  {
    name: "India",
    role: "Headquarters",
    lat: 10.85,
    lng: 76.27,
    entities: ["C&T Consulting Engineers Pvt Ltd"],
  },
  {
    name: "United Arab Emirates",
    role: "Regional offices",
    lat: 24.45,
    lng: 54.38,
    entities: [
      "Fortis Technical Services LLC, Dubai",
      "Fortis Contracting & General Maintenance LLC, Abu Dhabi",
    ],
  },
  {
    name: "Canada",
    role: "North America",
    lat: 56.13,
    lng: -106.35,
    entities: ["C&T Consulting Inc."],
  },
];

/** Leadership team. `photo` left undefined renders a monogram card; `bio`
 * left undefined skips the hover wipe-reveal (no content to show). */
export type Leader = { name: string; role: string; photo?: string; bio?: string };

export const LEADERSHIP: Leader[] = [
  {
    name: "Jimmy Bentex",
    role: "Founder & CEO",
    photo: "/leadership/jimmy.jpg",
    bio: "B Tech Mechanical Engineering (CET), M Tech (KU). IGBC Lead Associate & ISHRAE member. 25 years across Bilt Middle East, Voltas (TATA), Bluestar & Chalmers Engineering, Dubai.",
  },
  { name: "Vidyanand", role: "CFO", photo: "/leadership/vidyanand.jpeg" },
  {
    name: "Laxman Babu Challa",
    role: "Director",
    photo: "/leadership/laxman-babu.jpg",
    bio: "Mechanical Engineering graduate (JNTU Hyderabad) with 35 years across HVAC, MEP and steel fabrication. Senior leadership at Voltas, Airmech (Bahrain), Weathermaker (Dubai) and L&T, most recently VP Engineering (Group) at Yashoda Hospitals. Founding secretary, ISHRAE Cochin Chapter.",
  },
  {
    name: "Sriram V. S.",
    role: "Technical Advisor",
    photo: "/leadership/vs-sriram.jpg",
    bio: "Mechanical Engineering graduate with 35+ years in MEP across India, the Middle East and SE Asia. Techno-commercial background with strong analytical and problem-solving skills. Also mentors and trains engineers on technical topics.",
  },
  {
    name: "Sherjin",
    role: "Operations Manager, Buildings & Infrastructure",
    photo: "/leadership/sherjin.jpg",
    bio: "Mechanical Engineer with 20+ years in MEPF: engineering design, project management, construction supervision and operations across airport, hospitality, residential, industrial and commercial sectors.",
  },
  { name: "Saibu", role: "Operations Manager, Oil & Gas" },
  { name: "Rajeev Kumar", role: "Operations Manager, Middle East" },
];

/**
 * What we engineer — the full engineering & consultancy scope, grouped A–O,
 * shown on the About page. This is the authoritative capability list the
 * practice delivers across both divisions. Categories with sub-items list them;
 * standalone services (E–O) carry no items. Rendered as a single-view grid, not
 * links — it's a scope statement, not navigation.
 */
export type ScopeGroup = { key: string; title: string; items?: string[] };

export const ENGINEERING_SCOPE: ScopeGroup[] = [
  {
    key: "A",
    title: "Comprehensive engineering, design, review & vetting",
    items: [
      "Architectural & space planning",
      "Life safety",
      "Structural",
      "Electrical (HV & LV)",
      "HVAC",
      "PHE",
      "Fire protection & gas suppression",
      "Fire detection — fire alarm, voice evacuation, aspiration & emergency/exit lighting",
      "ELV — CCTV, access control, public address, water leakage, rodent repellant, nurse call, disabled alarm, intrusion detection & other specialist services",
      "Telecom & ICT",
      "LPG",
      "Building management system",
      "SCADA",
    ],
  },
  {
    key: "B",
    title: "Tendering support",
    items: [
      "BOQ / MIR preparation",
      "Specification documents",
      "MTO",
      "Tender documents",
      "Estimates",
    ],
  },
  {
    key: "C",
    title: "Engineering drafting service (CAD)",
    items: [
      "Design drawings — concept / schematic",
      "Detail drawings — GFC / IFC",
      "Shop drawings",
      "As-built drawings",
    ],
  },
  {
    key: "D",
    title: "Revit-based BIM modelling",
    items: [
      "LOD 100 / 200",
      "LOD 300",
      "LOD 350",
      "LOD 400",
      "LOD 500",
      "Clash coordination & detection reports",
    ],
  },
  { key: "E", title: "cOBie asset management" },
  { key: "F", title: "Detailed Project Reports (DPR) for government-funded projects" },
  { key: "G", title: "PMO — project monitoring" },
  { key: "H", title: "PMC — project management" },
  { key: "I", title: "Peer review consultation" },
  { key: "J", title: "Value engineering" },
  { key: "K", title: "Cost consultancy" },
  { key: "L", title: "Engineering / drafting / modeller resource deployment" },
  { key: "M", title: "CFD analysis" },
  { key: "N", title: "Hydraulic calculation" },
  { key: "O", title: "ETAP study" },
];

/** What we engineer — links out to the page that owns each capability in depth. */
export type Capability = { label: string; href?: string };

export const CAPABILITIES: Capability[] = [
  { label: "Oil & Gas · Marine · Renewable Energy", href: "/divisions/oil-and-gas" },
  { label: "Fluid Dynamics (CFD)", href: "/divisions" },
  ...INDUSTRIES.map((ind) => ({
    label: ind.label,
    href: LINKED_INDUSTRIES.has(ind.slug) ? `/projects?industry=${ind.slug}` : undefined,
  })),
];

/** Company-level ISO certifications shown as a logo row on the About page.
 * Each has a text label, a logo, and an optional certificate PDF. The other
 * credentials (IGBC, KSEI, IME, KSECBC, PMP) are held by individuals and are
 * mentioned in the "Our story" copy rather than shown as logos. This is the
 * fallback; the frontend reads it from Sanity (aboutPage.isoCertifications). */
export type IsoCertification = {
  name: string;
  logo?: string;
  documentPath?: string;
};

export const ISO_CERTIFICATIONS: IsoCertification[] = [
  {
    name: "ISO 9001:2015",
    logo: "/certifications/iso-9001-logo.png",
    documentPath: "/certifications/iso-9001-certificate.pdf",
  },
  { name: "ISO 45001:2015", logo: "/certifications/45001.png" },
  { name: "ISO 14001:2015", logo: "/certifications/14001.png" },
];
