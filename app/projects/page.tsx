import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { getPortfolio } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Projects | C&T Consulting Engineers",
  description:
    "Selected projects across airports, data centres, refineries and offshore platforms, engineered by C&T's Buildings & Infrastructure and Oil & Gas teams.",
};

export default async function ProjectsPage() {
  const items = await getPortfolio();
  return (
    <main>
      <Navbar />
      <ProjectsIndex items={items} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
