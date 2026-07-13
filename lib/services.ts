/**
 * Service content — the services C&T offers, with scope authored PER DIVISION.
 *
 * The same service is delivered differently by each division (different teams,
 * different sub-disciplines), so the scope lives in `byDivision`. This is the
 * single source of truth: division pages render a service's scope from its own
 * division key; the homepage accordion and /services index just list services
 * and point INTO the relevant division sections. There are deliberately no
 * per-service detail pages — that would duplicate the division-page scope.
 *
 * `featured` marks the original six flagship services shown in the homepage
 * accordion (components/sections/Services.tsx) — the full list (including the
 * consulting/management services added later) always shows on /services and
 * on each division page.
 */

import type { DivisionSlug } from "./divisions";

export type ServiceScope = {
  /** Sub-disciplines delivered for this service in this division. */
  subDisciplines: string[];
  /** How the service reads for this division. */
  body: string;
};

export type Service = {
  slug: string;
  name: string;
  image: string;
  /** One-line summary for cards / accordion. */
  blurb: string;
  /** Shown in the homepage accordion when true; always shown on /services and division pages. */
  featured?: boolean;
  /** Scope keyed by division — only the divisions that offer the service. */
  byDivision: Partial<Record<DivisionSlug, ServiceScope>>;
};

export const SERVICES: Service[] = [
  {
    slug: "mep",
    name: "MEP Engineering Design",
    image: "/mep-engineering-design.jpg",
    blurb: "Multidiscipline mechanical, electrical and public-health design.",
    featured: true,
    byDivision: {
      building: {
        subDisciplines: [
          "Architectural & space planning",
          "Structural",
          "Electrical (HV & LV)",
          "HVAC",
          "Public health (PHE)",
          "Fire protection & gas suppression",
          "Fire alarm systems",
          "Voice evacuation",
          "Aspiration / smoke detection",
          "Emergency & exit lighting",
          "CCTV & surveillance",
          "Access control",
          "Public address",
          "Water leak detection",
          "Rodent repellant",
          "Nurse call",
          "Disabled alarm",
          "Intrusion detection",
          "Telecom & ICT",
          "LPG",
          "Building management system",
          "SCADA",
          "Life safety",
        ],
        body: "Building services designed as one coordinated system, architecture and structure through HVAC, power, public health, fire, life safety, the full ELV suite, telecom and building management, sized for real loads across data centres, terminals and complex buildings.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Architectural",
          "Structural",
          "Electrical & Instrumentation",
          "Plumbing & Piping",
          "Fire Protection",
          "Fire & Gas",
          "SCADA",
        ],
        body: "Detailed engineering for refineries, LNG and offshore facilities, covering process-adjacent buildings, E&I, piping, fire & gas and SCADA taken to fabrication detail and international code.",
      },
    },
  },
  {
    slug: "bim",
    name: "BIM & 3D Modelling",
    image: "/bim-models/3d-view-1.jpg",
    blurb: "Federated, data-rich models from LOD 100 to LOD 500.",
    featured: true,
    byDivision: {
      building: {
        subDisciplines: [
          "LOD 100–500 modelling",
          "Federated coordination",
          "Quantity extraction",
          "As-built handover",
        ],
        body: "Federated Revit models spanning LOD 100 through LOD 500 give architecture, structure and services one coordinated source of truth across a building, with quantities and as-builts pulled straight from the model.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "LOD 100–500 modelling",
          "Plant & piping models",
          "Clash-free routing",
          "As-builts",
        ],
        body: "Fabrication- and construction-ready models across the full LOD range, up to LOD 500. Plant, piping and structure are modelled and clash-resolved, as delivered on Yamal LNG and the Duqm Refinery.",
      },
    },
  },
  {
    slug: "clash",
    name: "Clash Detection & Coordination",
    image: "/bim-models/chw-pump-room-1.jpg",
    blurb: "Multidiscipline coordination that turns models build-ready.",
    featured: true,
    byDivision: {
      building: {
        subDisciplines: [
          "Navisworks clash runs",
          "Constructability review",
          "Site-rework reduction",
        ],
        body: "Every service route is clash-checked before it reaches site, so dense ceilings and plant rooms install right the first time.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Piping vs structure clash",
          "Module coordination",
          "Rework reduction",
        ],
        body: "Clash detection across dense piping, structure and equipment cuts rework on tight fabrication and construction programmes.",
      },
    },
  },
  {
    slug: "cad",
    name: "CAD Drafting",
    image: "/bim-models/rp3s-ducting-layout.jpg",
    blurb: "Design, detail, shop and as-built drawings, from concept to construction.",
    byDivision: {
      building: {
        subDisciplines: [
          "Design drawings (concept / schematic)",
          "Detail drawings (GFC / IFC)",
          "Shop drawings",
          "As-built drawings",
        ],
        body: "2D CAD drawings across the full project lifecycle: concept and schematic design drawings, GFC/IFC detail drawings, shop drawings and as-builts, drafted in AutoCAD alongside the coordinated BIM model.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Design drawings (concept / schematic)",
          "Detail drawings (GFC / IFC)",
          "Shop drawings",
          "As-built drawings",
        ],
        body: "CAD drafting for energy-sector projects: concept, GFC/IFC detail, shop and as-built drawings produced to project and client standards.",
      },
    },
  },
  {
    slug: "cfd",
    name: "CFD & FEA Analysis",
    image: "/bim-models/rp9s-navis-hvac.jpg",
    blurb: "Performance validated in simulation before construction.",
    featured: true,
    byDivision: {
      building: {
        subDisciplines: [
          "Airflow & ventilation",
          "Thermal & hotspot",
          "Smoke movement",
          "Hydraulic calculations",
          "ETAP power system studies",
        ],
        body: "Airflow, thermal and smoke-movement simulation validates cooling, comfort and evacuation safety before any equipment is energised, backed by hydraulic calculations and ETAP power-system studies where the project needs them.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Ventilation analysis",
          "Gas dispersion",
          "Thermal modelling",
          "Hydraulic calculations",
          "ETAP power system studies",
        ],
        body: "Ventilation, gas-dispersion and thermal analysis for enclosed plant and offshore modules, backed by hydraulic calculations and ETAP power-system studies where airflow and safety margins are tightly governed.",
      },
    },
  },
  {
    slug: "mto",
    name: "Tendering & MTO",
    image: "/bmt-moq.jpg",
    blurb: "Model-based take-offs and tender-ready bills of quantities.",
    featured: true,
    byDivision: {
      building: {
        subDisciplines: [
          "Model-based MTO",
          "Bill of quantities",
          "Tender documents",
          "Technical specifications",
          "Cost estimates",
        ],
        body: "Material take-offs, BOQ, technical specifications and cost estimates are extracted directly from the model for procurement and tender, with quantities pulled straight from the coordinated design.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Fabrication MTO",
          "Bill of quantities",
          "Tender documents",
          "Cost estimates",
        ],
        body: "Fabrication-grade material take-offs, BOQ and tender documentation from high-LOD models, ready for procurement and construction planning.",
      },
    },
  },
  {
    slug: "walkthrough",
    name: "Walkthrough Videos",
    image: "/oil-and-gas-walkthrough.jpg",
    blurb: "Photoreal walkthrough and flythrough videos generated from the model.",
    featured: true,
    byDivision: {
      building: {
        subDisciplines: [
          "Walkthrough videos",
          "Flythrough animations",
          "Stakeholder review",
        ],
        body: "Walkthrough and flythrough videos rendered straight from the BIM model. They communicate design intent and spatial coordination for stakeholder review.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Construction walkthroughs",
          "Sequence & access animation",
          "3D plant flythroughs",
        ],
        body: "Construction walkthrough videos from high-LOD plant models that communicate sequence, access and constructability to site teams.",
      },
    },
  },
  {
    slug: "cobie",
    name: "cOBie Asset Management",
    image: "/detailed-engineering.jpg",
    blurb: "Structured asset data handed over in cOBie format, ready for facility management.",
    byDivision: {
      building: {
        subDisciplines: [
          "Asset data capture",
          "cOBie-formatted handover",
          "FM-ready documentation",
        ],
        body: "Asset and equipment data is captured through design and construction and handed over in cOBie format, so facility teams inherit a structured record they can use from day one.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Asset data capture",
          "cOBie-formatted handover",
          "O&M-ready documentation",
        ],
        body: "Equipment and asset data from the model is handed over in cOBie format, giving operations and maintenance teams a structured record from handover rather than a stack of PDFs.",
      },
    },
  },
  {
    slug: "dpr",
    name: "Detailed Project Reports",
    image: "/muscat-cargo-oman.jpg",
    blurb: "DPRs prepared for government-funded infrastructure projects.",
    byDivision: {
      building: {
        subDisciplines: [
          "Feasibility & scope",
          "Cost estimation",
          "Technical documentation",
          "Approval-ready reporting",
        ],
        body: "Detailed Project Reports for government-funded developments, covering feasibility, technical scope and cost estimation in the format public agencies need for approval.",
      },
    },
  },
  {
    slug: "pmo",
    name: "Project Monitoring (PMO)",
    image: "/engineering.jpg",
    blurb: "Independent programme tracking across design and construction.",
    byDivision: {
      building: {
        subDisciplines: [
          "Programme tracking",
          "Progress reporting",
          "Risk flagging",
        ],
        body: "Independent monitoring of programme and progress across design and construction, surfacing risk early rather than at the next missed milestone.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Programme tracking",
          "Progress reporting",
          "Risk flagging",
        ],
        body: "Independent programme monitoring across engineering and construction on energy-sector projects, keeping delivery risk visible before it becomes delay.",
      },
    },
  },
  {
    slug: "pmc",
    name: "Project Management (PMC)",
    image: "/bim-clash-detection.jpg",
    blurb: "On-site and remote project management for delivery-critical programmes.",
    byDivision: {
      building: {
        subDisciplines: [
          "Programme control",
          "Site supervision",
          "Stakeholder coordination",
          "Risk & change management",
        ],
        body: "We manage delivery end to end, programme, site supervision, stakeholder coordination and risk, so the design intent survives contact with construction.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Programme control",
          "Contractor coordination",
          "Risk & change management",
        ],
        body: "Project management support for energy-sector programmes, keeping contractors, programme and risk under one disciplined process through to completion.",
      },
    },
  },
  {
    slug: "peer-review",
    name: "Peer Review Consultation",
    image: "/expocampus.jpg",
    blurb: "Independent technical review before designs go for approval or construction.",
    byDivision: {
      building: {
        subDisciplines: [
          "Design review",
          "Code compliance check",
          "Constructability check",
        ],
        body: "An independent technical review of MEP designs before they reach approval or site, checking code compliance, coordination and constructability so issues surface on paper, not on site.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Design review",
          "Code compliance check",
          "Constructability check",
        ],
        body: "Independent review of process and utility designs against code and constructability before they're released for construction.",
      },
    },
  },
  {
    slug: "value-engineering",
    name: "Value Engineering",
    image: "/large-image-who-are-we.jpg",
    blurb: "Design alternatives that protect performance while controlling cost.",
    byDivision: {
      building: {
        subDisciplines: [
          "Cost-performance trade-off analysis",
          "Alternative system evaluation",
          "Lifecycle cost review",
        ],
        body: "We evaluate design alternatives against cost, performance and lifecycle impact, so budget decisions get made with the full picture, not just the sticker price.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Cost-performance trade-off analysis",
          "Alternative system evaluation",
          "Lifecycle cost review",
        ],
        body: "Alternative system and equipment options evaluated against cost, performance and lifecycle impact for energy-sector projects under budget pressure.",
      },
    },
  },
  {
    slug: "cost-consultancy",
    name: "Cost Consultancy",
    image: "/small-image-who-we-are.jpeg",
    blurb: "Cost planning and control from concept through construction.",
    byDivision: {
      building: {
        subDisciplines: [
          "Cost planning",
          "Budget estimation",
          "Cost control through delivery",
        ],
        body: "Cost planning and control tracked from concept design through construction, so budgets are set on real quantities and held through delivery.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Cost planning",
          "Budget estimation",
          "Cost control through delivery",
        ],
        body: "Cost planning and control for energy-sector programmes, from early estimate through to as-built cost tracking.",
      },
    },
  },
  {
    slug: "resource-deployment",
    name: "Engineering Resource Deployment",
    image: "/Compression-4-NFPS.jpeg",
    blurb: "Engineers, drafters and modellers deployed directly into client teams.",
    byDivision: {
      building: {
        subDisciplines: [
          "Design engineers",
          "CAD draftsmen",
          "BIM modellers",
          "Flexible deployment terms",
        ],
        body: "Engineers, draftsmen and BIM modellers deployed directly into a client's own team on flexible terms, for programmes that need extra capacity without a long hiring cycle.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Design engineers",
          "CAD draftsmen",
          "BIM modellers",
          "Flexible deployment terms",
        ],
        body: "Engineering, drafting and modelling resource deployed into client teams on energy-sector projects, scaled up or down as the programme needs.",
      },
    },
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Divisions that offer a service, in canonical order (Building → Oil & Gas). */
export function serviceDivisions(service: Service): DivisionSlug[] {
  const order: DivisionSlug[] = ["building", "oil-and-gas"];
  return order.filter((d) => service.byDivision[d]);
}
