/**
 * Careers content — single source of truth for the /careers page and the
 * per-role /careers/[slug] description pages. Mirrors the pattern in
 * lib/company.ts: typed arrays edited here, read directly by the components.
 *
 * Openings below are PLACEHOLDER roles — edit titles/copy freely, or swap this
 * array for a Sanity `jobOpening` query when the CMS wiring lands site-wide.
 */
import type { GallerySpan } from "./projects";

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
    experience: "5+ years",
    summary:
      "Develop accurate 3D BIM models for electrical and low-voltage systems in Revit, up to LOD 500 including cOBie.",
    about:
      "An Electrical & LV (Low Voltage) BIM Modeler with 5 years of experience in developing accurate 3D BIM models for electrical and low-voltage systems using Autodesk Revit. Experienced in modeling power distribution, lighting, cable trays, conduits, earthing & lightning protection, containments, fire alarm, CCTV, access control, public address, structured cabling, and other ELV systems. Skilled in preparing coordinated shop drawings, installation details, and builder's work drawings while ensuring compliance with project specifications and international standards. Proficient in BIM coordination using Navisworks for clash detection and resolving multidisciplinary coordination issues. Experienced in quantity take-offs, model updates, and delivering high-quality BIM documentation throughout various stages of project execution. The modeller is expected to have experience in BIM modelling up to LOD 500 including cOBie asset management.",
    responsibilities: [
      "Develop accurate 3D BIM models for electrical and LV systems in Autodesk Revit.",
      "Model power distribution, lighting, cable trays, conduits, earthing & lightning protection, containments, fire alarm, CCTV, access control, public address, structured cabling and other ELV systems.",
      "Prepare coordinated shop drawings, installation details and builder's work drawings to project specifications and international standards.",
      "Run BIM coordination in Navisworks for clash detection and resolve multidisciplinary issues.",
      "Deliver quantity take-offs, model updates and high-quality BIM documentation across project stages.",
    ],
    requirements: [
      "5+ years of electrical/LV BIM modelling experience.",
      "Proficiency in Autodesk Revit and Navisworks.",
      "Experience modelling up to LOD 500 including cOBie asset management.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "hvac-bim-modeler",
    title: "Mechanical (HVAC) BIM Modeler",
    team: "BIM",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "5+ years",
    summary:
      "Create and coordinate detailed 3D HVAC BIM models in Revit, up to LOD 500 including cOBie.",
    about:
      "A Mechanical (HVAC) BIM Modeler with 5 years of experience in creating and coordinating detailed 3D BIM models for heating, ventilation, and air conditioning systems using Autodesk Revit. Skilled in modeling ductwork, chilled water piping, refrigerant piping, equipment, smoke management, supports, and accessories in accordance with project specifications and industry standards. Experienced in preparing coordinated shop drawings, fabrication drawings, builder's work drawings, and as-built models. Proficient in BIM coordination using Navisworks for clash detection and multidisciplinary coordination with architectural, structural, electrical, and plumbing teams. Familiar with quantity take-offs, model quality control, and BIM standards, ensuring accurate and timely project deliverables throughout all phases of construction. The modeller is expected to have experience in BIM modelling up to LOD 500 including cOBie asset management.",
    responsibilities: [
      "Create and coordinate detailed 3D HVAC BIM models in Autodesk Revit.",
      "Model ductwork, chilled water piping, refrigerant piping, equipment, smoke management, supports and accessories.",
      "Prepare coordinated shop drawings, fabrication drawings, builder's work drawings and as-built models.",
      "Run BIM coordination in Navisworks for clash detection with architectural, structural, electrical and plumbing teams.",
      "Manage quantity take-offs, model quality control and BIM standards across all phases of construction.",
    ],
    requirements: [
      "5+ years of HVAC BIM modelling experience.",
      "Proficiency in Autodesk Revit and Navisworks.",
      "Experience modelling up to LOD 500 including cOBie asset management.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "phe-firefighting-bim-modeler",
    title: "Mechanical (PHE & Firefighting) BIM Modeler",
    team: "BIM",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "5+ years",
    summary:
      "Develop and coordinate 3D BIM models for public health and firefighting systems, up to LOD 500 including cOBie.",
    about:
      "A Mechanical (PHE & Firefighting) BIM Modeler with 5 years of experience in developing and coordinating detailed 3D BIM models for public health engineering (water supply, drainage, STPs, WTPs etc.) and firefighting systems using Autodesk Revit. Skilled in modeling domestic water supply, drainage, sanitary, stormwater, irrigation, and firefighting systems, including sprinkler networks, hydrants, hose reels, and fire pumps. Experienced in preparing coordinated shop drawings, installation details, builder's work drawings, and as-built models in accordance with project specifications and applicable codes and standards. Proficient in BIM coordination using Navisworks for clash detection and multidisciplinary coordination with architectural, structural, mechanical, and other MEP teams. Familiar with quantity take-offs, model quality control, and BIM standards, ensuring accurate and timely project deliverables throughout all phases of construction. The modeller is expected to have experience in BIM modelling up to LOD 500 including cOBie asset management.",
    responsibilities: [
      "Develop and coordinate 3D BIM models for public health engineering (water supply, drainage, STPs, WTPs) and firefighting systems in Revit.",
      "Model domestic water supply, drainage, sanitary, stormwater, irrigation, and firefighting systems including sprinkler networks, hydrants, hose reels and fire pumps.",
      "Prepare coordinated shop drawings, installation details, builder's work drawings and as-built models to applicable codes and standards.",
      "Run BIM coordination in Navisworks for clash detection with architectural, structural, mechanical and other MEP teams.",
      "Manage quantity take-offs, model quality control and BIM standards across all phases of construction.",
    ],
    requirements: [
      "5+ years of PHE/firefighting BIM modelling experience.",
      "Proficiency in Autodesk Revit and Navisworks.",
      "Experience modelling up to LOD 500 including cOBie asset management.",
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
      "Manage and coordinate multidisciplinary BIM projects across architecture, structure, MEP and infrastructure.",
    about:
      "A BIM Coordinator with 5 years of experience in managing and coordinating multidisciplinary BIM projects across architectural, structural, MEP, and infrastructure disciplines. Skilled in developing and maintaining BIM execution plans (BEP), ensuring compliance with project BIM standards, and coordinating models using Autodesk Revit and Navisworks. Experienced in clash detection, model validation, issue tracking, and facilitating coordination meetings to resolve design conflicts efficiently. Proficient in preparing federated models, generating coordinated shop drawings, monitoring model quality, and supporting project teams throughout design and construction phases. Strong understanding of BIM workflows, project documentation, quantity take-offs, and collaboration with clients, consultants, and contractors to deliver accurate, coordinated, and high-quality project outcomes within schedule.",
    responsibilities: [
      "Develop and maintain BIM execution plans (BEP) and enforce project BIM standards.",
      "Coordinate models in Autodesk Revit and Navisworks; run clash detection, model validation and issue tracking.",
      "Facilitate coordination meetings to resolve design conflicts efficiently.",
      "Prepare federated models, generate coordinated shop drawings and monitor model quality.",
      "Collaborate with clients, consultants and contractors throughout design and construction phases.",
    ],
    requirements: [
      "5+ years coordinating multidisciplinary BIM projects.",
      "Proficiency in Autodesk Revit and Navisworks.",
      "Strong understanding of BIM workflows, BEPs and project documentation.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "electrical-cad-draftsman",
    title: "Electrical CAD Draftsman",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Prepare detailed electrical drawings in AutoCAD for commercial, residential, industrial, Middle East and O&G projects.",
    about:
      "An Electrical CAD Draftsman with 3 years of experience in preparing detailed electrical drawings for commercial, residential, industrial, Middle East and Oil & Gas projects using AutoCAD. Skilled in developing power layouts, lighting layouts, cable routing plans, single-line diagrams (SLDs), panel schedules, earthing and lightning protection layouts, and electrical details in accordance with project specifications and applicable standards. Experienced in revising drawings based on design changes, coordinating with electrical engineers and other disciplines, and ensuring accuracy, quality, and timely delivery of project documentation. Familiar with preparing design drawings, shop drawings, as-built drawings, quantity take-offs, and maintaining drawing registers throughout the project lifecycle.",
    responsibilities: [
      "Develop power layouts, lighting layouts, cable routing plans, single-line diagrams (SLDs) and panel schedules in AutoCAD.",
      "Prepare earthing and lightning protection layouts and electrical details to specifications and standards.",
      "Revise drawings for design changes and coordinate with electrical engineers and other disciplines.",
      "Prepare design, shop and as-built drawings, quantity take-offs and maintain drawing registers.",
    ],
    requirements: [
      "3+ years as an electrical CAD draftsman.",
      "Proficiency in AutoCAD.",
      "Experience across commercial, residential, industrial, Middle East and O&G projects.",
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
    summary:
      "Prepare detailed HVAC drawings in AutoCAD for commercial, residential, industrial, Middle East and O&G projects.",
    about:
      "An HVAC CAD Draftsman with 3 years of experience in preparing detailed HVAC drawings for commercial, residential, industrial, Middle East and Oil & Gas projects using AutoCAD. Skilled in developing ductwork layouts, chilled water piping layouts, refrigerant piping drawings, ventilation plans, equipment layouts, sections, and detailed installation drawings in accordance with project specifications and applicable standards. Experienced in preparing shop drawings, builder's work drawings, as-built drawings, and coordinating with HVAC engineers and other disciplines to incorporate design revisions. Familiar with quantity take-offs, drawing documentation, and ensuring accurate, high-quality, and timely project deliverables throughout all phases of project execution.",
    responsibilities: [
      "Develop ductwork layouts, chilled water and refrigerant piping drawings, ventilation plans and equipment layouts in AutoCAD.",
      "Prepare sections and detailed installation drawings to specifications and standards.",
      "Prepare shop drawings, builder's work drawings and as-built drawings.",
      "Coordinate with HVAC engineers and other disciplines to incorporate design revisions.",
      "Manage quantity take-offs and drawing documentation across all phases.",
    ],
    requirements: [
      "3+ years as an HVAC CAD draftsman.",
      "Proficiency in AutoCAD.",
      "Experience across commercial, residential, industrial, Middle East and O&G projects.",
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
    summary:
      "Prepare detailed plumbing and firefighting drawings in AutoCAD for commercial, residential, industrial, Middle East and O&G projects.",
    about:
      "A Plumbing & Firefighting Draftsman with 3 years of experience in preparing detailed plumbing and firefighting drawings for commercial, residential, industrial, Middle East and Oil & Gas projects using AutoCAD. Skilled in developing domestic water supply, drainage, sanitary, stormwater, and firefighting layouts, including sprinkler systems, hydrant networks, hose reels, fire pumps, and associated piping. Experienced in preparing shop drawings, builder's work drawings, installation details, and as-built drawings in accordance with project specifications and applicable codes and standards. Proficient in coordinating with design engineers and other disciplines to incorporate design revisions, ensuring accurate, high-quality, and timely project documentation throughout all phases of project execution.",
    responsibilities: [
      "Develop domestic water supply, drainage, sanitary, stormwater and firefighting layouts in AutoCAD.",
      "Draft sprinkler systems, hydrant networks, hose reels, fire pumps and associated piping.",
      "Prepare shop drawings, builder's work drawings, installation details and as-built drawings to codes and standards.",
      "Coordinate with design engineers and other disciplines to incorporate design revisions.",
    ],
    requirements: [
      "3+ years as a plumbing/firefighting draftsman.",
      "Proficiency in AutoCAD.",
      "Experience across commercial, residential, industrial, Middle East and O&G projects.",
    ],
    niceToHave: ["Middle East project experience."],
  },
  {
    slug: "electrical-lv-design-engineer",
    title: "Electrical & LV Design Engineer",
    team: "Buildings & Infrastructure",
    location: "Trivandrum, India",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Design electrical and LV/ELV systems for commercial, residential and industrial projects; Middle East experience preferred.",
    about:
      "An Electrical & LV Design Engineer with 3 years of experience in the design and engineering of electrical and low-voltage (LV/ELV) systems for commercial, residential, and industrial projects. Skilled in designing power distribution, lighting, earthing, lightning protection, cable sizing, voltage drop calculations, and load schedules. Experienced in designing ELV systems including fire alarm, CCTV, access control, public address, structured cabling, and telephone systems in accordance with project specifications and international standards. Proficient in AutoCAD and review of Revit drawings for preparing design drawings, single-line diagrams, layouts, and coordinated BIM models. Familiar with electrical calculations, BOQ preparation, technical documentation, and multidisciplinary coordination to deliver accurate and code-compliant design solutions. Middle East experience is preferred.",
    responsibilities: [
      "Design power distribution, lighting, earthing and lightning protection systems.",
      "Perform cable sizing, voltage drop calculations and load schedules.",
      "Design ELV systems: fire alarm, CCTV, access control, public address, structured cabling and telephone systems.",
      "Prepare design drawings, single-line diagrams, layouts and coordinated BIM models in AutoCAD and Revit.",
      "Handle electrical calculations, BOQ preparation, technical documentation and multidisciplinary coordination.",
    ],
    requirements: [
      "3+ years in electrical/LV design engineering.",
      "Proficiency in AutoCAD and review of Revit drawings.",
      "Strong grounding in electrical calculations and code-compliant design.",
    ],
    niceToHave: ["Middle East project experience (preferred)."],
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

/** Celebrations gallery — real event photos (Christmas, Onam, office
 * inauguration), rendered as a bento grid (same layout as the project
 * gallery). `span` is a curated layout choice for this exact 10-photo set;
 * Sanity-sourced photos beyond these get spans auto-assigned by index. */
export type CelebrationPhoto = { image: string; alt: string; span: GallerySpan };

export const CELEBRATION_PHOTOS: CelebrationPhoto[] = [
  { image: "/celebrations/onam-2024-1.jpg", alt: "Onam 2024 celebration, team photo", span: "lg" },
  { image: "/celebrations/christmas-2025-1.jpg", alt: "Christmas 2025 celebration", span: "tall" },
  { image: "/celebrations/office-inauguration-1.jpg", alt: "Office inauguration ribbon cutting", span: "tall" },
  { image: "/celebrations/christmas-2025-2.jpg", alt: "Christmas 2025 cake cutting", span: "wide" },
  { image: "/celebrations/office-inauguration-2.jpg", alt: "New office space, inauguration day", span: "wide" },
  { image: "/celebrations/onam-2024-2.jpg", alt: "Onam 2024 celebration, pookalam", span: "sm" },
  { image: "/celebrations/christmas-2025-3.jpg", alt: "Christmas 2025 celebration, team", span: "sm" },
  { image: "/celebrations/onam-2024-3.jpg", alt: "Onam 2024 celebration", span: "sm" },
  { image: "/celebrations/christmas-2025-4.jpg", alt: "Christmas 2025 celebration", span: "sm" },
  { image: "/celebrations/office-inauguration-3.jpg", alt: "Office inauguration celebration", span: "sm" },
];
