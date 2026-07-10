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
    slug: "electrical-lv-bim-modeler",
    title: "Electrical & LV BIM Modeler",
    team: "BIM",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Model electrical and LV systems in Revit, coordinated and clash-free across the federated project model.",
    about:
      "You will build and maintain electrical and low-voltage (LV) Revit models for live projects, working from design intent through to coordinated, construction-ready detail.",
    responsibilities: [
      "Model electrical distribution, lighting and LV systems in Revit to the project's LOD requirement.",
      "Coordinate the electrical model against architecture, structure and other MEP disciplines.",
      "Resolve clashes flagged in Navisworks coordination runs.",
      "Maintain model standards, naming conventions and family libraries.",
    ],
    requirements: [
      "Diploma or degree in Electrical Engineering or a related field.",
      "3+ years of electrical/LV BIM modelling experience.",
      "Working knowledge of Revit MEP and Navisworks.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "hvac-bim-modeler",
    title: "HVAC BIM Modeler",
    team: "BIM",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Model HVAC systems in Revit, coordinated and clash-free across the federated project model.",
    about:
      "You will build and maintain HVAC Revit models for live projects, from ductwork and piping layouts through to coordinated, construction-ready detail.",
    responsibilities: [
      "Model ductwork, piping and HVAC equipment in Revit to the project's LOD requirement.",
      "Coordinate the HVAC model against architecture, structure and other MEP disciplines.",
      "Resolve clashes flagged in Navisworks coordination runs.",
      "Maintain model standards, naming conventions and family libraries.",
    ],
    requirements: [
      "Diploma or degree in Mechanical Engineering or a related field.",
      "3+ years of HVAC BIM modelling experience.",
      "Working knowledge of Revit MEP and Navisworks.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "electrical-lv-design-engineer",
    title: "Electrical & LV Design Engineer",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "2+ years",
    summary: "Design LV power, lighting and low-current systems for building projects.",
    about:
      "You will support the electrical scope on building projects: LV distribution, lighting design and load calculations, working closely with the wider MEP and BIM teams.",
    responsibilities: [
      "Prepare LV distribution, lighting and small-power designs.",
      "Perform load calculations, cable sizing and single-line diagrams.",
      "Support low-current system coordination (fire alarm, data, CCTV).",
    ],
    requirements: [
      "Bachelor's degree in Electrical Engineering.",
      "2+ years in building services electrical design.",
      "Proficiency in Dialux / AutoCAD.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "phe-firefighting-bim-modeler",
    title: "PHE & Firefighting BIM Modeler",
    team: "BIM",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Model plumbing, public health and firefighting systems in Revit, coordinated and clash-free.",
    about:
      "You will build and maintain plumbing, public health engineering (PHE) and firefighting Revit models for live projects, from layout through to coordinated, construction-ready detail.",
    responsibilities: [
      "Model PHE and firefighting systems (drainage, water supply, sprinklers, hydrants) in Revit to the project's LOD requirement.",
      "Coordinate the model against architecture, structure and other MEP disciplines.",
      "Resolve clashes flagged in Navisworks coordination runs.",
      "Maintain model standards, naming conventions and family libraries.",
    ],
    requirements: [
      "Diploma or degree in Mechanical/Civil Engineering or a related field.",
      "3+ years of PHE/firefighting BIM modelling experience.",
      "Working knowledge of Revit MEP and Navisworks.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "bim-coordinator",
    title: "BIM Coordinator",
    team: "BIM",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "5+ years",
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
      "5+ years of BIM coordination on MEP-heavy projects.",
      "Expert in Revit and Navisworks.",
      "Working knowledge of ISO 19650 workflows.",
    ],
    niceToHave: ["Middle East project experience.", "Dynamo / scripting for model automation."],
  },
  {
    slug: "electrical-cad-draftsman",
    title: "Electrical CAD Draftsman",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary: "Produce electrical CAD drawings from design intent through to issued-for-construction.",
    about:
      "You will produce electrical design and detail drawings in AutoCAD, working from engineers' design intent through to construction-ready sheets.",
    responsibilities: [
      "Prepare electrical layout, schematic and detail drawings in AutoCAD.",
      "Incorporate engineer and BIM markups into drawing updates.",
      "Maintain drawing registers, revisions and title blocks to project standards.",
    ],
    requirements: [
      "Diploma in Electrical Engineering or Draftsmanship.",
      "3+ years as an electrical CAD draftsman.",
      "Proficiency in AutoCAD.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "hvac-cad-draftsman",
    title: "HVAC CAD Draftsman",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary: "Produce HVAC CAD drawings from design intent through to issued-for-construction.",
    about:
      "You will produce HVAC design and detail drawings in AutoCAD, working from engineers' design intent through to construction-ready sheets.",
    responsibilities: [
      "Prepare ductwork, piping and equipment layout drawings in AutoCAD.",
      "Incorporate engineer and BIM markups into drawing updates.",
      "Maintain drawing registers, revisions and title blocks to project standards.",
    ],
    requirements: [
      "Diploma in Mechanical Engineering or Draftsmanship.",
      "3+ years as an HVAC CAD draftsman.",
      "Proficiency in AutoCAD.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "plumbing-firefighting-draftsman",
    title: "Plumbing and Firefighting Draftsman",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary: "Produce plumbing and firefighting CAD drawings from design intent through to issued-for-construction.",
    about:
      "You will produce plumbing, public health and firefighting design and detail drawings in AutoCAD, working from engineers' design intent through to construction-ready sheets.",
    responsibilities: [
      "Prepare plumbing, drainage and firefighting layout drawings in AutoCAD.",
      "Incorporate engineer and BIM markups into drawing updates.",
      "Maintain drawing registers, revisions and title blocks to project standards.",
    ],
    requirements: [
      "Diploma in Mechanical/Civil Engineering or Draftsmanship.",
      "3+ years as a plumbing/firefighting draftsman.",
      "Proficiency in AutoCAD.",
    ],
    niceToHave: ["Middle East project experience."],
  },
];

/** Direct contact for candidates who'd rather email/call than use the apply
 * form — shown alongside the openings list on the careers page. */
export const CAREERS_CONTACT = {
  email: "mail@candtengineers.com",
  phone: "+91 974-728-2551",
};

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
