import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { SectorView } from "@/components/sectors/SectorView";
import { SECTORS, getSector } from "@/lib/sectors";

// Static export: every sector route must be known at build time.
export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
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
  const sector = getSector(slug);
  if (!sector) notFound();

  return (
    <main>
      <Navbar />
      <SectorView sector={sector} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
