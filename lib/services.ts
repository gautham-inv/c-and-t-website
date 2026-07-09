/**
 * Service content — the services C&T offers, with scope authored PER DIVISION.
 *
 * The same service is delivered differently by each division (different teams,
 * different sub-disciplines), so the scope lives in `byDivision`. This is the
 * single source of truth: division pages render a service's scope from its own
 * division key; the homepage accordion and /services index just list services
 * and point INTO the relevant division sections. There are deliberately no
 * per-service detail pages — that would duplicate the division-page scope.
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
  /** Scope keyed by division — only the divisions that offer the service. */
  byDivision: Partial<Record<DivisionSlug, ServiceScope>>;
};

export const SERVICES: Service[] = [
  {
    slug: "mep",
    name: "MEP Engineering Design",
    image: "/mep-engineering-design.jpg",
    blurb: "Multidiscipline mechanical, electrical and public-health design.",
    byDivision: {
      building: {
        subDisciplines: [
          "Architectural",
          "Structural",
          "HVAC",
          "Electrical",
          "Fire Protection & Life Safety",
          "ELV & IBMS",
          "Plumbing",
        ],
        body: "Building services designed as one coordinated system (HVAC, power, public health, fire and ELV), sized for real loads across data centres, terminals and complex buildings.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Architectural",
          "Structural",
          "Electrical & Instrumentation",
          "Plumbing & Piping",
          "Fire Protection",
          "Fire & Gas",
        ],
        body: "Detailed engineering for refineries, LNG and offshore facilities, covering process-adjacent buildings, E&I, piping and fire & gas taken to fabrication detail and international code.",
      },
    },
  },
  {
    slug: "bim",
    name: "BIM & 3D Modelling",
    image: "/bim-and-3d-modelling.jpg",
    blurb: "Federated, data-rich models from LOD 300 to LOD 500.",
    byDivision: {
      building: {
        subDisciplines: [
          "LOD 300–400 models",
          "Federated coordination",
          "Quantity extraction",
          "As-built handover",
        ],
        body: "Federated models give architecture, structure and services one coordinated source of truth across a building, with quantities and as-builts pulled straight from the model.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "LOD 500 modelling",
          "Plant & piping models",
          "Clash-free routing",
          "As-builts",
        ],
        body: "Fabrication- and construction-ready models up to LOD 500. Plant, piping and structure are modelled and clash-resolved, as delivered on Yamal LNG and the Duqm Refinery.",
      },
    },
  },
  {
    slug: "clash",
    name: "Clash Detection & Coordination",
    image: "/clash-detection-and-coordination.jpg",
    blurb: "Multidiscipline coordination that turns models build-ready.",
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
    slug: "cfd",
    name: "CFD & FEA Analysis",
    image: "/cfd-fea-analysis.webp",
    blurb: "Performance validated in simulation before construction.",
    byDivision: {
      building: {
        subDisciplines: [
          "Airflow & ventilation",
          "Thermal & hotspot",
          "Smoke movement",
        ],
        body: "Airflow, thermal and smoke-movement simulation validates cooling, comfort and evacuation safety before any equipment is energised.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Ventilation analysis",
          "Gas dispersion",
          "Thermal modelling",
        ],
        body: "Ventilation, gas-dispersion and thermal analysis for enclosed plant and offshore modules where airflow and safety margins are tightly governed.",
      },
    },
  },
  {
    slug: "mto",
    name: "MTO & BOQ",
    image: "/bmt-moq.jpg",
    blurb: "Model-based take-offs and tender-ready bills of quantities.",
    byDivision: {
      building: {
        subDisciplines: [
          "Model-based MTO",
          "Bill of quantities",
          "Tender & procurement support",
        ],
        body: "Material take-offs and BOQ are extracted directly from the model for procurement and tender, with quantities pulled straight from the coordinated design.",
      },
      "oil-and-gas": {
        subDisciplines: [
          "Fabrication MTO",
          "Bill of quantities",
          "Procurement support",
        ],
        body: "Fabrication-grade material take-offs and BOQ from high-LOD models, ready for procurement and construction planning.",
      },
    },
  },
  {
    slug: "walkthrough",
    name: "Walkthrough Videos",
    image: "/oil-and-gas-walkthrough.jpg",
    blurb: "Photoreal walkthrough and flythrough videos generated from the model.",
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
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Divisions that offer a service, in canonical order (Building → Oil & Gas). */
export function serviceDivisions(service: Service): DivisionSlug[] {
  const order: DivisionSlug[] = ["building", "oil-and-gas"];
  return order.filter((d) => service.byDivision[d]);
}
