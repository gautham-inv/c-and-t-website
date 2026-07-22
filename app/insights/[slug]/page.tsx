import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WithUs } from "@/components/sections/WithUs";
import { InsightView } from "@/components/insights/InsightView";
import { getInsight, getInsightSlugs } from "@/sanity/lib/data";

// Static export: every article route must be known at build time.
export async function generateStaticParams() {
  const slugs = await getInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return {};
  const title = `${insight.title} | Insights | C&T Consulting Engineers`;
  return {
    title,
    description: insight.excerpt,
    alternates: {
      canonical: `/insights/${slug}`,
    },
    openGraph: { title, description: insight.excerpt },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  return (
    <main>
      <InsightView insight={insight} />
      <WithUs rounded={false} />
    </main>
  );
}
