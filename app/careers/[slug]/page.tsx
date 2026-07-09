import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { JobDescription } from "@/components/careers/JobDescription";
import { getJobOpening, getJobOpeningSlugs } from "@/sanity/lib/data";

// Static export: every role route must be known at build time.
export async function generateStaticParams() {
  const slugs = await getJobOpeningSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const opening = await getJobOpening(slug);
  if (!opening) return {};
  const title = `${opening.title} | Careers | C&T Consulting Engineers`;
  return {
    title,
    description: opening.summary,
    openGraph: { title, description: opening.summary },
  };
}

export default async function OpeningPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const opening = await getJobOpening(slug);
  if (!opening) notFound();

  return (
    <main>
      <Navbar />
      <JobDescription opening={opening} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
