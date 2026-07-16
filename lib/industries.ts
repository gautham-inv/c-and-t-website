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

export const INDUSTRIES: Industry[] = [
  { slug: "commercial-mercantile", label: "Commercial & Mercantile" },
  { slug: "offices", label: "Offices" },
  { slug: "hospitals", label: "Hospitals" },
  { slug: "hospitality", label: "Hospitality" },
  { slug: "interior-fitouts", label: "Interior Fitouts" },
  { slug: "pumping-stations", label: "Pumping stations" },
  { slug: "chiller-plants", label: "Chiller plants" },
  { slug: "base-build", label: "Base Build" },
  { slug: "corporate-interior-fitouts", label: "Corporate Interior Fitouts" },
  { slug: "residential", label: "Residential" },
  { slug: "data-centres", label: "Data Centres" },
  { slug: "aviation-airports", label: "Aviation (Airports)" },
  { slug: "roads-transportation", label: "Roads & Transportation" },
  { slug: "industrial", label: "Industrial" },
  { slug: "infrastructure-town-planning", label: "Infrastructure & Town planning" },
  { slug: "high-rise-buildings", label: "High Rise Buildings" },
  { slug: "factories", label: "Factories" },
  { slug: "manufacturing-centres", label: "Manufacturing centres" },
  { slug: "laboratories", label: "Laboratories" },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
