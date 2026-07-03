import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { SectorView } from "@/components/sectors/SectorView";
import { getSectors, getDivisions } from "@/sanity/lib/data";

// Static export: every sector route must be known at build time.
export async function generateStaticParams() {
  const sectors = await getSectors();
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sectors = await getSectors();
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) return {};
  const title = `${sector.name} — C&T Consulting Engineers`;
  return {
    title,
    description: sector.tagline,
    openGraph: { title, description: sector.tagline },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [sectors, divisions] = await Promise.all([getSectors(), getDivisions()]);
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) notFound();
  const division = divisions.find((d) => d.slug === sector.divisionSlug);

  return (
    <main>
      <Navbar />
      <SectorView sector={sector} division={division} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
