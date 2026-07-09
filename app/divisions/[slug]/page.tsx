import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { DivisionView } from "@/components/divisions/DivisionView";
import {
  getDivisions,
  getSectors,
  getServices,
  getPortfolio,
} from "@/sanity/lib/data";
import type { Sector } from "@/lib/sectors";
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
    openGraph: { title, description: division.tagline },
  };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [divisions, sectors, services, portfolio] = await Promise.all([
    getDivisions(),
    getSectors(),
    getServices(),
    getPortfolio(),
  ]);
  const division = divisions.find((d) => d.slug === slug);
  if (!division) notFound();

  const other = divisions.find((d) => d.slug !== division.slug);
  const divisionSectors = division.sectorSlugs
    .map((s) => sectors.find((x) => x.slug === s))
    .filter((s): s is Sector => !!s);
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
      <Navbar />
      <DivisionView
        division={division}
        other={other}
        sectors={divisionSectors}
        services={divisionServices}
        projects={projects}
      />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
