/**
 * Careers content — single source of truth for the /careers page and the
 * per-role /careers/[slug] description pages. Mirrors the pattern in
 * lib/company.ts: typed arrays edited here, read directly by the components.
 *
 * Openings below are PLACEHOLDER roles — edit titles/copy freely, or swap this
 * array for a Sanity `jobOpening` query when the CMS wiring lands site-wide.
 */

export const CAREERS_INTRO =
  "At C&T we are united by a single vision: smart engineering that lasts. With teams across India, the UAE and Canada, our engineers deliver MEP, BIM and CFD work on some of the most demanding projects in the world. Grow with a practice that has been building since 2011.";

/** The "why join us" reasons grid — numbered 01–06, editorial style. */
export type Reason = { title: string; body: string };

export const REASONS: Reason[] = [
  {
    title: "Exceptional career growth",
    body: "A fast track across MEP design, BIM and commissioning. We invest in the people who grow alongside the practice.",
  },
  {
    title: "Inspiring leadership",
    body: "Work under industry veterans who mentor directly, so every project deepens your craft as an engineer.",
  },
  {
    title: "Global exposure",
    body: "Offices in India, the UAE and Canada collaborate on one delivery model, so you work on international projects from day one.",
  },
  {
    title: "Landmark projects",
    body: "Airports, high-rise towers, refineries and data centres: the kind of work that defines skylines and careers.",
  },
  {
    title: "Sustainability at the core",
    body: "Every asset we engineer is tuned for ESG-aligned, long-term performance. We build for the planet, not just the brief.",
  },
  {
    title: "An inclusive culture",
    body: "A genuinely multicultural team across three continents, diverse, principled, and stronger for it.",
  },
];

/** A single open position. `slug` drives the /careers/[slug] route. */
export type Opening = {
  slug: string;
  title: string;
  team:
    | "Buildings & Infrastructure"
    | "Oil & Gas"
    | "BIM"
    | "Corporate";
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  experience: string;
  /** One-line teaser shown on the card. */
  summary: string;
  /** Opening paragraph on the description page. */
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
};

export const OPENINGS: Opening[] = [
  {
    slug: "senior-mep-design-engineer",
    title: "Senior MEP Design Engineer",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "6+ years",
    summary:
      "Lead multidiscipline MEP design for commercial and industrial projects, from concept to IFC.",
    about:
      "As a Senior MEP Design Engineer you will own the design of mechanical, electrical and plumbing systems across landmark building projects, coordinating disciplines, mentoring juniors and holding the technical standard from concept through to issued-for-construction.",
    responsibilities: [
      "Produce and review MEP design calculations, drawings and specifications to project standards.",
      "Coordinate across HVAC, electrical, fire and plumbing disciplines to resolve interfaces early.",
      "Mentor junior engineers and review their deliverables before issue.",
      "Liaise with clients, architects and contractors through design reviews.",
    ],
    requirements: [
      "Bachelor's degree in Mechanical / Electrical Engineering.",
      "6+ years of MEP consultancy experience on commercial or industrial projects.",
      "Strong command of relevant codes (ASHRAE, NFPA, local authority requirements).",
      "Proficiency in HAP / Revit / AutoCAD MEP.",
    ],
    niceToHave: [
      "Experience with LEED / ESG-aligned design.",
      "Exposure to airport or high-rise projects.",
    ],
  },
  {
    slug: "bim-coordinator",
    title: "BIM Coordinator",
    team: "BIM",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "4+ years",
    summary:
      "Own federated models, run clash coordination and drive BIM standards across live projects.",
    about:
      "You will lead the BIM effort on live projects, building and federating discipline models, running clash detection and coordination sessions, and enforcing the modelling standards that keep delivery clean and predictable.",
    responsibilities: [
      "Set up and maintain the federated model and shared coordinates.",
      "Run clash detection cycles and chair coordination meetings.",
      "Enforce naming, LOD and modelling conventions across disciplines.",
      "Generate coordination reports and track resolution to close-out.",
    ],
    requirements: [
      "4+ years of BIM coordination on MEP-heavy projects.",
      "Expert in Revit and Navisworks.",
      "Working knowledge of ISO 19650 workflows.",
    ],
    niceToHave: ["Dynamo / scripting for model automation."],
  },
  {
    slug: "hvac-design-engineer",
    title: "HVAC Design Engineer",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Design and size HVAC systems: load calculations, equipment selection and ductwork layouts.",
    about:
      "You will handle the HVAC scope on building projects end-to-end: heat-load calculations, system selection, equipment sizing and ductwork design, working closely with the wider MEP team.",
    responsibilities: [
      "Perform heat-load calculations and system selection.",
      "Size equipment, ductwork and pipework; produce schematics and layouts.",
      "Prepare equipment schedules, specifications and tender documents.",
    ],
    requirements: [
      "Bachelor's degree in Mechanical Engineering.",
      "3+ years in HVAC design consultancy.",
      "Proficiency in HAP / Duct Sizer / AutoCAD.",
    ],
  },
  {
    slug: "piping-process-engineer",
    title: "Piping & Process Engineer",
    team: "Oil & Gas",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    experience: "5+ years",
    summary:
      "Deliver piping and process engineering for oil, gas and marine facilities.",
    about:
      "Join our Oil & Gas team to deliver piping and process engineering for refineries, marine and energy facilities, covering P&IDs, stress analysis, isometrics and MTOs.",
    responsibilities: [
      "Develop P&IDs, piping layouts and isometric drawings.",
      "Perform piping stress analysis and support design.",
      "Prepare material take-offs and technical specifications.",
    ],
    requirements: [
      "Bachelor's degree in Mechanical / Chemical Engineering.",
      "5+ years in oil & gas piping / process design.",
      "Familiarity with CAESAR II, PDMS / E3D.",
    ],
  },
  {
    slug: "electrical-design-engineer",
    title: "Electrical Design Engineer",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Design LV power, lighting and low-current systems for building projects.",
    about:
      "You will own the electrical scope on building projects: LV distribution, lighting design, load schedules and low-current systems, coordinating tightly with the mechanical and BIM teams.",
    responsibilities: [
      "Design LV distribution, lighting and small-power systems.",
      "Prepare load schedules, cable sizing and single-line diagrams.",
      "Design low-current systems (fire alarm, data, CCTV) coordination.",
    ],
    requirements: [
      "Bachelor's degree in Electrical Engineering.",
      "3+ years in building services electrical design.",
      "Proficiency in Dialux / AutoCAD.",
    ],
  },
  {
    slug: "mep-project-manager",
    title: "Project Manager, MEP",
    team: "Corporate",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "8+ years",
    summary:
      "Own delivery, programme and client relationships across a portfolio of MEP projects.",
    about:
      "As an MEP Project Manager you will steer delivery across a portfolio of projects, owning programme, resourcing and commercials while keeping clients close and the technical quality high.",
    responsibilities: [
      "Own project programme, resourcing and delivery to budget.",
      "Be the main point of contact for clients and stakeholders.",
      "Coordinate multidiscipline teams across offices.",
      "Manage risk, scope and change through delivery.",
    ],
    requirements: [
      "Bachelor's degree in Engineering; PMP a plus.",
      "8+ years in MEP delivery with 3+ managing projects.",
      "Strong client-facing and commercial acumen.",
    ],
  },
];

export function getOpening(slug: string): Opening | undefined {
  return OPENINGS.find((o) => o.slug === slug);
}

/** Team-life photo mosaic — the client-provided careers photography. */
export const TEAM_PHOTOS: string[] = [
  "/careers1.avif",
  "/careers2.jpeg",
  "/careers3.jpg",
  "/careers4.avif",
];
