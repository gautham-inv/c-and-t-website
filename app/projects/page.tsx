import type { Metadata } from "next";
import { Suspense } from "react";
import { WithUs } from "@/components/sections/WithUs";
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
      {/* ProjectsIndex reads ?industry= via useSearchParams, which requires
          a Suspense boundary even in a static export (no data actually
          suspends — this just satisfies Next's CSR-bailout rule). */}
      <Suspense fallback={null}>
        <ProjectsIndex items={items} />
      </Suspense>
      <WithUs rounded={false} />
    </main>
  );
}
