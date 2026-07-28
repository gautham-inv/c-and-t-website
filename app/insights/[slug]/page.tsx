import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WithUs } from "@/components/sections/WithUs";
import { InsightView } from "@/components/insights/InsightView";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema, OG_IMAGE } from "@/lib/seo";
import { getInsight, getInsightSlugs } from "@/sanity/lib/data";

// Unknown slugs 404 instead of erroring under `output: "export"` — see the
// note in app/divisions/[slug]/page.tsx.
export const dynamicParams = false;

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
  const image = insight.image || OG_IMAGE;
  return {
    title,
    description: insight.excerpt,
    alternates: {
      canonical: `/insights/${slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description: insight.excerpt,
      url: `/insights/${slug}`,
      images: [{ url: image }],
      ...(insight.datePublished ? { publishedTime: insight.datePublished } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: insight.excerpt,
      images: [image],
    },
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
      <JsonLd
        data={[
          articleSchema(insight),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: insight.title, path: `/insights/${slug}` },
          ]),
        ]}
      />
      <InsightView insight={insight} />
      <WithUs rounded={false} />
    </main>
  );
}
