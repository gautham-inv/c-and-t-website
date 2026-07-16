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
    name: "Legal Compliance",
    body: "We work within the letter and the spirit of the law in every market we operate in.",
  },
  {
    name: "Transparency",
    body: "Clear, open dealings with clients, partners and our own team, without hidden terms or surprises.",
  },
  {
    name: "Integrity",
    body: "We do what we say and say what we mean, holding the line even when no one is watching.",
  },
  {
    name: "Growth & Development",
    body: "We enjoy the journey, investing in our people so they grow alongside the practice.",
  },
  {
    name: "Share & Care",
    body: "We share knowledge and success, and care for the people and communities our work serves.",
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

/** What we engineer — links out to the page that owns each capability in depth. */
export type Capability = { label: string; href?: string };

export const CAPABILITIES: Capability[] = [
  { label: "Oil & Gas · Marine · Renewable Energy", href: "/divisions/oil-and-gas" },
  { label: "Fluid Dynamics (CFD)", href: "/services" },
  ...INDUSTRIES.map((ind) => ({
    label: ind.label,
    href: LINKED_INDUSTRIES.has(ind.slug) ? `/projects?industry=${ind.slug}` : undefined,
  })),
];

/** ISO 9001 is the one company-level certification with its own logo + a
 * link to the certificate PDF. The rest (IGBC, KSEI, IME, KSECBC, PMP) are
 * held by individual engineers and are mentioned in the "Our story" copy
 * instead of getting their own logos. */
export type IsoCertification = {
  name: string;
  logo?: string;
  documentPath?: string;
};

export const ISO_CERTIFICATION: IsoCertification = {
  name: "ISO 9001:2015 Registered",
  logo: "/certifications/iso-9001-logo.png",
  documentPath: "/certifications/iso-9001-certificate.pdf",
};
