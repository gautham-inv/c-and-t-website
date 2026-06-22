/**
 * Sector content — single source of truth for every /sectors/[slug] page.
 * One shared template renders these; adding a sector = one entry here.
 *
 * All copy, projects and stats are grounded in CT-Presentation.md. Service
 * cross-links point at the homepage Services section for now (#services);
 * once dedicated /services/[slug] pages exist they can be repointed here.
 */

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
};

export type Sector = {
  slug: string;
  name: string;
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
    href: "/#services",
  },
  bim: {
    label: "BIM & 3D Modelling",
    image: "/bim-and-3d-modelling.jpg",
    href: "/#services",
  },
  clash: {
    label: "Clash Detection & Coordination",
    image: "/clash-detection-and-coordination.jpg",
    href: "/#services",
  },
  cfd: {
    label: "CFD & FEA Analysis",
    image: "/cfd-fea-analysis.webp",
    href: "/#services",
  },
  detailed: {
    label: "Detailed Engineering",
    image: "/detailed-engineering.jpg",
    href: "/#services",
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
    tagline:
      "MEP design and BIM coordination for terminals where downtime is not an option.",
    image: "/airport.jpg",
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
        image: "/airport.jpg",
      },
      {
        name: "Muscat Cargo, Oman",
        meta: "MEP Design · BIM LOD 300 · 20,000 m² · 2015",
        image: "/expocampus.jpg",
      },
    ],
    insights: [
      {
        title: "Designing terminal smoke control for peak passenger loads",
        tag: "MEP Design",
        read: "6 min read",
        href: "/#blog",
      },
      {
        title: "How federated BIM keeps airport programmes on schedule",
        tag: "BIM",
        read: "5 min read",
        href: "/#blog",
      },
      {
        title: "CFD in terminal ventilation: balancing comfort and safety",
        tag: "CFD",
        read: "7 min read",
        href: "/#blog",
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
        "detailed",
        "Construction-ready documentation and schedules generated directly from the model keep fast-track data-centre programmes on track.",
        ["Construction drawings", "Equipment schedules", "Fast-track delivery"],
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
    slug: "oil-and-gas",
    name: "Oil & Gas",
    tagline:
      "Detailed engineering and 3D modelling for refineries, LNG and offshore platforms.",
    image: "/duqmrefinery.jpeg",
    overview: [
      "Energy projects demand engineering that holds up under scrutiny — process piping, HVAC, electrical and instrumentation designed to international code and modelled to fabrication detail.",
      "C&T supports operators and EPC contractors across refineries, LNG plants and offshore platforms, delivering detailed engineering and high-LOD 3D models for some of the sector's most demanding clients.",
    ],
    stats: [
      { value: "LOD 500", label: "Yamal LNG 3D modelling" },
      { value: "2 GW", label: "Balwin 4 offshore platform" },
      { value: "9+", label: "energy-sector clients" },
    ],
    services: [
      svc(
        "detailed",
        "Detailed engineering to international code for refineries, LNG and offshore facilities — process piping, HVAC, electrical and instrumentation taken to fabrication detail.",
        ["Process piping", "HVAC & E&I", "Code compliance"],
      ),
      svc(
        "bim",
        "High-LOD 3D models up to LOD 500 — fabrication- and construction-ready, as delivered on Yamal LNG and the Duqm Refinery.",
        ["LOD 500 modelling", "Fabrication-ready", "Clash-free routing"],
      ),
      svc(
        "mep",
        "Building services for living quarters, control rooms and utility blocks across onshore and offshore facilities, designed for harsh-environment duty.",
        ["LQ & control rooms", "Utility buildings", "Harsh-environment HVAC"],
      ),
      svc(
        "cfd",
        "Thermal, ventilation and dispersion analysis for enclosed plant and offshore modules where airflow and safety margins are tightly governed.",
        ["Ventilation analysis", "Gas dispersion", "Thermal modelling"],
      ),
    ],
    expertise: [
      "Process piping design",
      "HVAC for hazardous areas",
      "Electrical & instrumentation",
      "Living-quarters services",
      "Firefighting & F&G",
      "3D modelling to LOD 500",
    ],
    projects: [
      {
        name: "Yamal LNG, Russia",
        meta: "Detailed Engineering · 3D Modelling · TECHNIP · 2018",
        image: "/yamallng.jpeg",
      },
      {
        name: "Compression 4-NFPS",
        meta: "Process Piping & Plumbing · Offshore · L&T / Qatar Energy · 2025",
        image: "/Compression-4-NFPS.jpeg",
      },
      {
        name: "Balwin 4 (2 GW)",
        meta: "HVAC & E&I Design · Offshore Platform · Dry Dock World · 2025",
        image: "/duqmrefinery.jpeg",
      },
      {
        name: "NER & WICR Site Utilities",
        meta: "MEP Design & BIM · NEOM · Saudi Arabia · 2022",
        image: "/engineering.jpg",
      },
    ],
    faqs: [
      {
        q: "Do you work on offshore as well as onshore facilities?",
        a: "Both. Recent offshore work includes living-quarters piping for Compression 4-NFPS (L&T / Qatar Energy) and HVAC/E&I for the Balwin 4 platform, alongside onshore LNG and refinery projects.",
      },
      {
        q: "What 3D modelling detail do you deliver for energy projects?",
        a: "Up to LOD 500 — fabrication- and construction-ready models, as delivered on Yamal LNG and the Duqm Refinery.",
      },
      {
        q: "Which clients have you delivered for in this sector?",
        a: "Operators and EPCs including ADNOC, Petrofac, TECHNIP, L&T / Qatar Energy, NEOM and Aries Marine.",
      },
    ],
  },
  {
    slug: "industrial",
    name: "Industrial Facilities",
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
        "detailed",
        "Detailed engineering across multi-building industrial sites — every process, utility and support structure taken to construction-ready detail.",
        ["Construction docs", "Multi-building scope", "Utility coordination"],
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
