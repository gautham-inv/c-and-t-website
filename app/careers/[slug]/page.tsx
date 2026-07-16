import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WithUs } from "@/components/sections/WithUs";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": opening.title,
    "description": `${opening.about}\n\nResponsibilities:\n${(opening.responsibilities ?? []).map((r) => `* ${r}`).join("\n")}\n\nRequirements:\n${(opening.requirements ?? []).map((r) => `* ${r}`).join("\n")}`,
    "datePosted": "2026-07-16",
    "validThrough": "2027-07-16",
    "employmentType":
      opening.type === "Full-time"
        ? "FULL_TIME"
        : opening.type === "Contract"
          ? "CONTRACTOR"
          : "INTERN",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "C&T Consulting Engineers",
      "sameAs": "https://www.candtengineers.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": opening.location,
        "addressCountry": "IN"
      }
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobDescription opening={opening} />
      <WithUs rounded={false} />
    </main>
  );
}
