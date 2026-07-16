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
export type DivisionStat = { value: string; label: string };
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
  stats: DivisionStat[];
  /** Services offered in this division (slugs into lib/services.ts), in order. */
  serviceSlugs: string[];
  /** Whether this division shows the industries-served chip cloud (see
   * lib/industries.ts). Building only; Oil & Gas isn't broken into sectors. */
  hasIndustries: boolean;
  faqs: DivisionFAQ[];
};

export const DIVISIONS: Division[] = [
  {
    slug: "building",
    name: "Buildings & Infrastructure",
    shortName: "Buildings & Infrastructure",
    tagline:
      "MEP design and BIM coordination for the buildings and infrastructure the world depends on.",
    image: "/building-division.jpg",
    overview: [
      "Our Buildings & Infrastructure team designs the mechanical, electrical and public-health systems for hyperscale data centres, international airport terminals, towers, malls and industrial campuses, keeping complex, systems-dense facilities running.",
      "A dedicated team delivers fully coordinated MEP designs and federated BIM models across data centres, airports and industrial facilities. Clashes are resolved in the model before they reach site, so construction stays on programme.",
    ],
    stats: [
      { value: "163,000 m²", label: "South India airport terminal" },
      { value: "2.4 MW", label: "Calinova data centre" },
      { value: "LOD 300–400", label: "BIM coordination" },
    ],
    serviceSlugs: [
      "mep",
      "bim",
      "clash",
      "cad",
      "cfd",
      "mto",
      "walkthrough",
      "cobie",
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
        a: "Both. On our South India airport terminal project we delivered design and BIM directly; on BIAL Bangalore we worked as the MEP and BIM partner to AECOM. We adapt to whichever delivery model the project runs on.",
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
    stats: [
      { value: "LOD 500", label: "Yamal LNG 3D modelling" },
      { value: "2 GW", label: "Balwin 4 offshore platform" },
      { value: "9+", label: "energy-sector clients" },
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
  },
];

export function getDivision(slug: string): Division | undefined {
  return DIVISIONS.find((d) => d.slug === slug);
}
