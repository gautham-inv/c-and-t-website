import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WithUs } from "@/components/sections/WithUs";
import { ProjectView } from "@/components/projects/ProjectView";
import { getProject, getProjectSlugs } from "@/sanity/lib/data";

// Static export: every project route must be known at build time.
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const title = `${project.name} | C&T Consulting Engineers`;
  const description = project.tagline ?? project.name;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <ProjectView project={project} />
      <WithUs rounded={false} />
    </main>
  );
}
