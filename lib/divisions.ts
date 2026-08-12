/**
 * Division content — the top tier of the IA. C&T runs two divisions with
 * separate teams: Buildings & Infrastructure and Oil & Gas. A division page is the rich
 * destination; it lists the services it offers (scope authored once in
 * lib/services.ts → byDivision) and, for Building, the sectors beneath it.
 *
 * Oil & Gas is intentionally NOT broken into sub-sectors (the firm is a
 * newcomer there) — it is organised purely by the services it offers.
 */

export type DivisionSlug = "building" | "oil-and-gas";
export type DivisionFAQ = { q: string; a: string };

export type Division = {
  slug: DivisionSlug;
  /** Full name for hero / metadata. */
  name: string;
  /** Short label for cards, nav, breadcrumbs. */
  shortName: string;
  tagline: string;
  image: string;
  overview: string[];
  /** Services offered in this division (slugs into lib/services.ts), in order. */
  serviceSlugs: string[];
  /** Whether this division shows the industries-served chip cloud (see
   * lib/industries.ts). Building only; Oil & Gas isn't broken into sectors. */
  hasIndustries: boolean;
  faqs: DivisionFAQ[];
  /** ── Division-scoped capability statement (all optional) ──
   * Only Oil & Gas carries these today. Buildings & Infrastructure is covered
   * by the shared A–O scope on /divisions (lib/company.ts ENGINEERING_SCOPE),
   * which is written as what BOTH divisions deliver; this is the discipline
   * list specific to energy work, which that shared list doesn't reach.
   * Every block below renders only when present, so leaving them off a
   * division changes nothing about its page. */
  capabilities?: string[];
  /** What the client actually receives at handover. */
  deliverables?: string[];
  /** Software/platforms, as plain names — deliberately NOT the logo-bearing
   * global TOOLS list (lib/tools.ts): several of these have no logo asset in
   * /public/tools, and a logo strip with holes in it looks broken. */
  tools?: string[];
  /** Codes and client standards the work is delivered to. */
  standards?: string[];
  /** Descriptive sector labels. Distinct from `hasIndustries` above: those
   * chips come from the INDUSTRIES taxonomy and link to filtered /projects
   * views, so they only exist where projects are tagged. These are plain
   * text — a statement of where the division works, nothing clickable. */
  industriesServed?: string[];
};

export const DIVISIONS: Division[] = [
  {
    slug: "building",
    name: "Buildings & Infrastructure",
    shortName: "Buildings & Infrastructure",
    tagline:
      "Overall design, from concept to turnkey, and BIM coordination for the buildings and infrastructure the world depends on.",
    image: "/building-division.jpg",
    overview: [
      "Our Buildings & Infrastructure team designs the mechanical, electrical and public-health systems for hyperscale data centres, international airport terminals, towers, malls and industrial campuses, keeping complex, systems-dense facilities running.",
      "A dedicated team delivers fully coordinated architectural and MEP designs and federated BIM models across data centres, airports and industrial facilities. Clashes are resolved in the model before they reach site, so construction stays on programme.",
    ],
    serviceSlugs: [
      "mep",
      "bim",
      "cobie",
      "cad",
      "cfd",
      "mto",
      "walkthrough",
      "dpr",
      "pmo",
      "pmc",
      "peer-review",
      "value-engineering",
      "cost-consultancy",
      "resource-deployment",
    ],
    hasIndustries: true,
    faqs: [
      {
        q: "Do you work directly with owners or with the lead consultant?",
        a: "Both. On our South India airport terminal project we delivered design and BIM directly; on another major South India airport we worked as the MEP and BIM partner to AECOM. We adapt to whichever delivery model the project runs on.",
      },
      {
        q: "What level of BIM detail do you deliver for buildings?",
        a: "Typically LOD 300 for coordination and LOD 400 where fabrication-level detail is required, delivered as federated, clash-checked Navisworks models.",
      },
      {
        q: "Which building types have you delivered?",
        a: "Airport terminals and cargo, hyperscale and edge data centres, and multi-building industrial campuses. Commercial and healthcare capability is available on request.",
      },
    ],
  },
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    shortName: "Oil & Gas",
    tagline:
      "Detailed engineering and 3D modelling for refineries, LNG and offshore platforms.",
    image: "/oil-and-gas-division.jpg",
    overview: [
      "Energy projects demand engineering that holds up under scrutiny. Process-adjacent buildings, electrical and instrumentation, piping and fire & gas systems are designed to international code and modelled to fabrication detail.",
      "Our Oil & Gas team supports operators and EPC contractors across refineries, LNG plants and offshore platforms, delivering detailed engineering and high-LOD 3D models for some of the sector's most demanding clients.",
    ],
    serviceSlugs: [
      "mep",
      "bim",
      "cad",
      "mto",
      "walkthrough",
      "cfd",
      "cobie",
      "pmo",
      "pmc",
      "peer-review",
      "value-engineering",
      "cost-consultancy",
      "resource-deployment",
    ],
    hasIndustries: false,
    faqs: [
      {
        q: "You're newer to oil & gas, so what's your track record?",
        a: "We've delivered detailed engineering and high-LOD modelling on Yamal LNG, the Duqm Refinery and offshore work for L&T / Qatar Energy and Dry Dock World, for clients including ADNOC, Petrofac and TECHNIP.",
      },
      {
        q: "What 3D modelling detail do you deliver for energy projects?",
        a: "Up to LOD 500, fabrication- and construction-ready models, as delivered on Yamal LNG and the Duqm Refinery.",
      },
      {
        q: "Do you work on offshore as well as onshore facilities?",
        a: "Both. Recent offshore work includes living-quarters piping for Compression 4-NFPS and HVAC/E&I for the Balwin 4 platform, alongside onshore LNG and refinery projects.",
      },
    ],
    capabilities: [
      "Piping Engineering — stress analysis, pipe support design, material specification",
      "Structural Engineering — onshore, offshore & marine",
      "Electrical Engineering",
      "Instrumentation & Control Engineering",
      "Telecommunications & ELV Systems",
      "HVAC Engineering",
      "Fire Protection & Loss Prevention Engineering",
      "Fire & Gas Detection Systems Engineering",
      "Safety & Risk Engineering",
      "Pipeline Engineering",
      "Marine Engineering",
      "3D Modelling & Digital Engineering",
      "Drafting & CAD Services",
      "Front-End Engineering Design (FEED)",
      "Detailed Engineering Design",
      "Detailed Project Reports (DPR)",
      "Asset Integrity & Life Extension Studies",
      "Construction Engineering Support",
      "Commissioning & Start-up Support",
      "Project Management Office (PMO) Services",
      "Project Management Consultancy (PMC)",
      "Drawing & Documentation Services",
      "Independent Engineering & Peer Review",
      "Value Engineering",
      "Cost Consultancy & Commercial Services",
    ],
    deliverables: [
      "Engineering design documents",
      "Drawings & documentation",
      "Reports",
      "ROI assessment",
      "CFD analysis",
      "Calculations",
      "3D models",
    ],
    tools: [
      "Autodesk Revit (AEC Collection)",
      "Autodesk Construction Cloud (ACC)",
      "Autodesk AutoCAD & ZWCAD",
      "AVEVA E3D",
      "Tekla",
      "STAAD.Pro",
      "ETABS",
      "Dialux",
      "Hexagon Smart Instrumentation",
      "SmartPlant 3D (SP3D)",
      "ETAP",
      "Hourly Analysis Program (HAP)",
      "PlanSwift",
      "Microsoft Office",
    ],
    standards: [
      "ADNOC",
      "Aramco",
      "PDO",
      "API",
      "DNV",
      "SOLAS",
      "Qatar Energy",
      "NFPA",
      "ASME",
      "ISO",
    ],
    industriesServed: [
      "Oil & Gas (onshore & offshore)",
      "Industrial buildings",
      "Plants",
      "Refineries",
      "Modular buildings",
    ],
  },
];

export function getDivision(slug: string): Division | undefined {
  return DIVISIONS.find((d) => d.slug === slug);
}
