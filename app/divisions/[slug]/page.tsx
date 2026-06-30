import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { DivisionView } from "@/components/divisions/DivisionView";
import { DIVISIONS, getDivision } from "@/lib/divisions";

// Static export: every division route must be known at build time.
export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) return {};
  const title = `${division.name} — C&T Consulting Engineers`;
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
  const division = getDivision(slug);
  if (!division) notFound();

  return (
    <main>
      <Navbar />
      <DivisionView division={division} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
