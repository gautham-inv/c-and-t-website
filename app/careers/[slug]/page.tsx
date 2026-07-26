import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WithUs } from "@/components/sections/WithUs";
import { JobDescription } from "@/components/careers/JobDescription";
import { JsonLd } from "@/components/seo/JsonLd";
import { jobPostingSchema, breadcrumbSchema } from "@/lib/seo";
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
    alternates: {
      canonical: `/careers/${slug}`,
    },
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
      <JsonLd
        data={[
          jobPostingSchema(opening, {
            datePosted: "2026-07-16",
            validThrough: "2027-07-16",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
            { name: opening.title, path: `/careers/${slug}` },
          ]),
        ]}
      />
      <JobDescription opening={opening} />
      <WithUs rounded={false} />
    </main>
  );
}
