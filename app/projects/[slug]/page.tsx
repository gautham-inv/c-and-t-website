import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { ProjectView } from "@/components/projects/ProjectView";
import { PROJECTS, getProject } from "@/lib/projects";

// Static export: every project route must be known at build time.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} — C&T Consulting Engineers`;
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
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <Navbar />
      <ProjectView project={project} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
