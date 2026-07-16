import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WithUs } from "@/components/sections/WithUs";
import { DivisionView, type DivisionIndustry } from "@/components/divisions/DivisionView";
import {
  getDivisions,
  getServices,
  getPortfolio,
} from "@/sanity/lib/data";
import { INDUSTRIES } from "@/lib/industries";
import type { Service } from "@/lib/services";

// Static export: every division route must be known at build time.
export async function generateStaticParams() {
  const divisions = await getDivisions();
  return divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const divisions = await getDivisions();
  const division = divisions.find((d) => d.slug === slug);
  if (!division) return {};
  const title = `${division.name} | C&T Consulting Engineers`;
  return {
    title,
    description: division.tagline,
    alternates: {
      canonical: `/divisions/${slug}`,
    },
    openGraph: { title, description: division.tagline },
  };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [divisions, services, portfolio] = await Promise.all([
    getDivisions(),
    getServices(),
    getPortfolio(),
  ]);
  const division = divisions.find((d) => d.slug === slug);
  if (!division) notFound();

  const other = divisions.find((d) => d.slug !== division.slug);
  // Only industries with a tagged, published project link anywhere — the
  // rest still show (so the chip cloud reflects everything the division
  // serves), just as a plain label rather than a link to an empty list.
  const industries: DivisionIndustry[] = division.hasIndustries
    ? INDUSTRIES.map((ind) => ({
        slug: ind.slug,
        label: ind.label,
        projectCount: portfolio.filter(
          (p) => p.division === division.slug && p.industries?.includes(ind.slug),
        ).length,
      }))
    : [];
  const divisionServices = division.serviceSlugs
    .map((serviceSlug) => {
      const svc = services.find((s) => s.slug === serviceSlug);
      const scope = svc?.byDivision[division.slug];
      return svc && scope ? { svc, scope } : null;
    })
    .filter((s): s is { svc: Service; scope: { subDisciplines: string[]; body: string } } => !!s);
  const projects = portfolio.filter((p) => p.division === division.slug);

  return (
    <main>
      <DivisionView
        division={division}
        other={other}
        industries={industries}
        services={divisionServices}
        projects={projects}
      />
      <WithUs rounded={false} />
    </main>
  );
}
