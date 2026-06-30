/**
 * Sector content — single source of truth for every /sectors/[slug] page.
 * One shared template renders these; adding a sector = one entry here.
 *
 * All copy, projects and stats are grounded in CT-Presentation.md. Sectors
 * live under a division (divisionSlug); the per-sector service body/points are
 * the sector-specific application, while the division pages hold the canonical
 * per-division service scope (see lib/services.ts → byDivision).
 */

import type { DivisionSlug } from "./divisions";

export type SectorStat = { value: string; label: string };
export type SectorFAQ = { q: string; a: string };
export type SectorApproach = { title: string; body: string };
export type SectorService = {
  label: string;
  image: string;
  href: string;
  /** Sector-specific description of how this service applies here. */
  body: string;
  /** Sector-specific scope highlights (3). */
  points: string[];
};
export type SectorProject = {
  name: string;
  meta: string;
  image: string;
};
export type SectorInsight = {
  title: string;
  tag: string;
  read: string;
  href: string;
  image: string;
};

export type Sector = {
  slug: string;
  name: string;
  /** Parent division (sectors live under a division in the IA). */
  divisionSlug: DivisionSlug;
  /** Hero one-liner. */
  tagline: string;
  /** Hero image — same asset as the homepage card for visual continuity. */
  image: string;
  /** Overview paragraphs. */
  overview: string[];
  stats: SectorStat[];
  /** How we work in this sector — optional; section hidden when absent. */
  approach?: SectorApproach[];
  services: SectorService[];
  /** Sub-disciplines covered in this sector — reusable grid. */
  expertise?: string[];
  projects: SectorProject[];
  /** Related thought-leadership — optional; section hidden when absent. */
  insights?: SectorInsight[];
  faqs: SectorFAQ[];
};

/* Shared, sector-agnostic service metadata. The body + points are written
 * per sector via svc() so each capability reads in that sector's language;
 * label / image / href stay consistent across the site. */
const SVC_META = {
  mep: {
    label: "MEP Engineering Design",
    image: "/mep-engineering-design.jpg",
    href: "/divisions/building#mep",
  },
  bim: {
    label: "BIM & 3D Modelling",
    image: "/bim-and-3d-modelling.jpg",
    href: "/divisions/building#bim",
  },
  clash: {
    label: "Clash Detection & Coordination",
    image: "/clash-detection-and-coordination.jpg",
    href: "/divisions/building#clash",
  },
  cfd: {
    label: "CFD & FEA Analysis",
    image: "/cfd-fea-analysis.webp",
    href: "/divisions/building#cfd",
  },
  mto: {
    label: "MTO & BOQ",
    image: "/bmt-moq.jpg",
    href: "/divisions/building#mto",
  },
  walkthrough: {
    label: "Walkthrough Videos",
    image: "/oil-and-gas-walkthrough.jpg",
    href: "/divisions/building#walkthrough",
  },
} as const;

const svc = (
  key: keyof typeof SVC_META,
  body: string,
  points: string[],
): SectorService => ({ ...SVC_META[key], body, points });

export const SECTORS: Sector[] = [
  {
    slug: "airports",
    name: "Airports",
    divisionSlug: "building",
    tagline:
      "MEP design and BIM coordination for terminals where downtime is not an option.",
    image: "/airport.webp",
    overview: [
      "Airport terminals are among the most systems-dense buildings we engineer — HVAC, smoke control, baggage power, life-safety and ELV all converging in landside and airside zones that must stay operational around the clock.",
      "C&T delivers fully coordinated MEP designs and federated BIM models for terminals and cargo facilities, resolving clashes before they reach site so construction stays on programme.",
    ],
    stats: [
      { value: "163,000 m²", label: "Trivandrum T2 terminal" },
      { value: "LOD 300", label: "BIM coordination · BIAL" },
      { value: "3", label: "airport projects delivered" },
    ],
    approach: [
      {
        title: "Coordination-first BIM",
        body: "We resolve clashes in a federated model before they reach site, so dense terminal ceilings and plant rooms install right the first time and construction stays on programme.",
      },
      {
        title: "Integrated multi-discipline MEP",
        body: "HVAC, electrical, plumbing, fire and ELV are designed as a single coordinated system across airside and landside — not stitched together from separate silos.",
      },
      {
        title: "We fit your delivery model",
        body: "We work direct-to-authority, as on Trivandrum T2, or as the MEP and BIM partner to the lead consultant, as we did with AECOM on BIAL — slotting into whatever structure the project runs on.",
      },
    ],
    services: [
      svc(
        "mep",
        "Terminal MEP designed as one system — HVAC and smoke control sized for peak passenger loads, baggage-handling power and life-safety integrated from airside to landside.",
        ["HVAC & smoke control", "Baggage & FIDS power", "Plumbing & firefighting"],
      ),
      svc(
        "bim",
        "Federated LOD 300–400 models give architects, structure and services one coordinated source of truth across a 160,000 m² terminal.",
        ["LOD 300–400 models", "Federated coordination", "Quantity extraction"],
      ),
      svc(
        "clash",
        "Every service route is clash-checked in Navisworks before it reaches site, so dense terminal ceilings and plant rooms install right the first time.",
        ["Navisworks clash runs", "Constructability review", "Site-rework reduction"],
      ),
      svc(
        "cfd",
        "Airflow and smoke-movement simulation for large terminal volumes — validating ventilation comfort and evacuation safety before construction begins.",
        ["Terminal airflow", "Smoke movement", "Thermal comfort"],
      ),
    ],
    expertise: [
      "Terminal HVAC & smoke control",
      "Baggage-handling power",
      "Airside & apron services",
      "Fire detection & suppression",
      "Plumbing & drainage",
      "ELV, IBMS & controls",
    ],
    projects: [
      {
        name: "Trivandrum Airport T2",
        meta: "MEP Design & BIM · 163,000 m² · Kerala · 2024",
        image: "/trivandrum-airport-case-study.jpg",
      },
      {
        name: "BIAL, Bangalore",
        meta: "MEP Design · BIM LOD 300 · AECOM · 2024",
        image: "/airport.webp",
      },
      {
        name: "Muscat Cargo, Oman",
        meta: "MEP Design · BIM LOD 300 · 20,000 m² · 2015",
        image: "/expocampus.jpg",
      },
    ],
    insights: [
      {
        title: "How federated BIM keeps airport programmes on schedule",
        tag: "BIM",
        read: "5 min read",
        href: "/#blog",
        image: "/bim-and-3d-modelling.jpg",
      },
      {
        title: "CFD in terminal ventilation: balancing comfort and safety",
        tag: "CFD",
        read: "7 min read",
        href: "/#blog",
        image: "/cfd-fea-analysis.webp",
      },
    ],
    faqs: [
      {
        q: "Do you work directly with airport authorities or with the lead consultant?",
        a: "Both. On Trivandrum T2 we delivered design and BIM directly; on BIAL Bangalore we worked as the MEP and BIM partner to AECOM. We adapt to whichever delivery model the project runs on.",
      },
      {
        q: "Can you handle airside life-safety and smoke-control design?",
        a: "Yes. Terminal smoke control, staircase pressurisation and fire-suppression design are part of our standard MEP scope, coordinated against the architectural and structural models.",
      },
      {
        q: "What level of BIM detail do you deliver for terminals?",
        a: "Typically LOD 300 for coordination and LOD 400 where fabrication-level detail is required, delivered as federated, clash-checked Navisworks models.",
      },
    ],
  },
  {
    slug: "data-centres",
    name: "Data Centres",
    divisionSlug: "building",
    tagline:
      "Mission-critical cooling and power design for hyperscale and edge facilities.",
    image: "/datacenter.jpeg",
    overview: [
      "Data centres live and die by thermal performance and power resilience. Every watt of IT load is a watt of heat to reject, and redundancy has to be designed in, not bolted on.",
      "C&T delivers MEP design and BIM for critical facilities — pairing detailed mechanical and electrical design with CFD analysis to validate airflow and hotspot risk before commissioning.",
    ],
    stats: [
      { value: "2.4 MW", label: "Calinova critical IT load" },
      { value: "MEP + BIM", label: "full design scope" },
      { value: "CFD", label: "airflow & hotspot validation" },
    ],
    services: [
      svc(
        "mep",
        "Mechanical and electrical design built around the critical IT load — cooling topology, power distribution and redundancy engineered to the facility's uptime target.",
        ["Cooling topology", "Power distribution", "Redundancy design"],
      ),
      svc(
        "cfd",
        "CFD airflow modelling of cold and hot aisles proves rack-level cooling and surfaces hotspots before any equipment is energised.",
        ["Cold/hot aisle CFD", "Hotspot detection", "PUE-aware airflow"],
      ),
      svc(
        "bim",
        "Federated BIM of white space and plant rooms keeps high-density services coordinated and serviceable through the facility's life.",
        ["White-space modelling", "Plant-room coordination", "As-built handover"],
      ),
      svc(
        "mto",
        "Material take-offs and BOQ generated directly from the model keep procurement on fast-track data-centre programmes accurate and on time.",
        ["Model-based MTO", "BOQ", "Tender support"],
      ),
      svc(
        "walkthrough",
        "Walkthrough and flythrough videos from the model give stakeholders a clear read of white-space layout and serviceability before construction.",
        ["Walkthrough videos", "Flythrough animations", "Stakeholder review"],
      ),
    ],
    expertise: [
      "Cooling & CRAC/CRAH design",
      "UPS & power distribution",
      "N+1 / 2N redundancy",
      "CFD airflow validation",
      "Clean-agent fire suppression",
      "BMS & monitoring",
    ],
    projects: [
      {
        name: "Calinova 2.4 MW Data Centre",
        meta: "MEP Design & BIM · 2.4 MW · Cyber Park, Calicut · 2026",
        image: "/calinova-case-study.jpg",
      },
    ],
    faqs: [
      {
        q: "Do you use CFD to validate data-centre cooling?",
        a: "Yes. CFD airflow modelling is core to our data-centre work — we simulate cold/hot aisle behaviour and identify hotspots so the cooling design is proven before it is built.",
      },
      {
        q: "What redundancy levels can you design to?",
        a: "We design mechanical and electrical systems to the redundancy tier the client's uptime target requires, with the supporting single-line and equipment schedules captured in the BIM model.",
      },
      {
        q: "Can you scale a design for phased capacity?",
        a: "Yes. We model facilities so additional capacity can be brought online in phases without re-engineering the base infrastructure.",
      },
    ],
  },
  {
    slug: "industrial",
    name: "Industrial Facilities",
    divisionSlug: "building",
    tagline:
      "Detailed engineering for process plants, utilities and multi-building campuses.",
    image: "/engineering.jpg",
    overview: [
      "Industrial campuses combine process, utility and support buildings — each with its own MEP, ELV and structural coordination demands across a single site.",
      "C&T delivers detailed engineering and high-LOD 3D modelling across multi-building industrial developments, keeping every discipline coordinated from utilities to plant rooms.",
    ],
    stats: [
      { value: "30,000 m²", label: "Duqm Refinery footprint" },
      { value: "12", label: "buildings · LOD 500" },
      { value: "3D", label: "detailed-engineering models" },
    ],
    services: [
      svc(
        "mto",
        "Model-based take-offs and BOQ across a multi-building industrial site keep procurement and sequencing on track.",
        ["Model-based MTO", "BOQ", "Procurement support"],
      ),
      svc(
        "walkthrough",
        "Construction walkthrough videos across the campus communicate sequence, access and constructability to site and contractor teams.",
        ["Construction walkthroughs", "Sequence animation", "3D flythroughs"],
      ),
      svc(
        "bim",
        "Federated LOD 500 models keep a 12-building campus like Duqm coordinated across every discipline and contractor.",
        ["LOD 500 models", "Campus-wide federation", "Discipline coordination"],
      ),
      svc(
        "mep",
        "Integrated MEP for process and utility buildings — HVAC, power, plumbing and ELV designed to operate as one site-wide system.",
        ["HVAC & power", "Plumbing & ELV", "Site-wide systems"],
      ),
      svc(
        "clash",
        "Clash detection across dense industrial services and structures cuts site rework on tight construction programmes.",
        ["Navisworks clash runs", "Structure vs services", "Rework reduction"],
      ),
    ],
    expertise: [
      "Process & utility MEP",
      "Compressed air & utilities",
      "Electrical & power distribution",
      "ELV & controls",
      "Firefighting systems",
      "Multi-building coordination",
    ],
    projects: [
      {
        name: "Duqm Refinery, Oman",
        meta: "Detailed Engineering · 3D Modelling LOD 500 · 12 buildings · OSCO / PETROFAC · 2018",
        image: "/duqmrefinery.jpeg",
      },
      {
        name: "NER & WICR Site Utilities",
        meta: "MEP Design & BIM · Utility Buildings · NEOM · 2022",
        image: "/engineering.jpg",
      },
    ],
    faqs: [
      {
        q: "Can you coordinate across a multi-building industrial site?",
        a: "Yes — the Duqm Refinery comprised 12 buildings modelled to LOD 500, federated so utilities, process and support structures stayed coordinated across the whole site.",
      },
      {
        q: "Do you deliver construction-ready documentation?",
        a: "Yes. Our detailed-engineering scope produces fabrication- and construction-ready drawings and schedules derived directly from the 3D model.",
      },
      {
        q: "Which standards do you design to?",
        a: "We design to the international codes and client specifications applicable to each project, with QA aligned to our ISO 9001:2015 processes.",
      },
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}
