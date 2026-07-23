/**
 * Industries served — the client's own taxonomy, used to tag projects and to
 * surface "sectors" on the division pages without a dedicated page per
 * industry (there aren't enough projects yet to justify one each). An
 * industry becomes a clickable link to its filtered /projects view once at
 * least one project is tagged with it; until then it renders as a plain,
 * non-clickable label, so nothing implies a page or a project list that
 * doesn't actually exist yet.
 */

export type Industry = { slug: string; label: string };

// Order matters: this drives the "Sectors we serve" chip order on the building
// division page. High-rise leads; the strong, project-backed sectors sit up
// front; hospitality / interior fitouts / base build / roads / infrastructure
// are pushed to the back. (Corporate Interior Fitouts removed.)
export const INDUSTRIES: Industry[] = [
  { slug: "high-rise-buildings", label: "High Rise Buildings" },
  { slug: "commercial-mercantile", label: "Commercial & Mercantile" },
  { slug: "data-centres", label: "Data Centres" },
  { slug: "aviation-airports", label: "Aviation (Airports)" },
  { slug: "hospitals", label: "Hospitals" },
  { slug: "offices", label: "Offices" },
  { slug: "residential", label: "Residential" },
  { slug: "industrial", label: "Industrial" },
  { slug: "factories", label: "Factories" },
  { slug: "manufacturing-centres", label: "Manufacturing centres" },
  { slug: "laboratories", label: "Laboratories" },
  { slug: "chiller-plants", label: "Chiller plants" },
  { slug: "pumping-stations", label: "Pumping stations" },
  { slug: "hospitality", label: "Hospitality" },
  { slug: "interior-fitouts", label: "Interior Fitouts" },
  { slug: "base-build", label: "Base Build" },
  { slug: "roads-transportation", label: "Roads & Transportation" },
  { slug: "infrastructure-town-planning", label: "Infrastructure & Town planning" },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
