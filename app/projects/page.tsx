import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects — C&T Consulting Engineers",
  description:
    "Selected projects across airports, data centres, refineries and offshore platforms, engineered by C&T's Buildings & Infrastructure and Oil & Gas teams.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <ProjectsIndex />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
