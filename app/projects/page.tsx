import type { Metadata } from "next";
import { Suspense } from "react";
import { WithUs } from "@/components/sections/WithUs";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { sectionBreadcrumb } from "@/lib/seo";
import { getPortfolio } from "@/sanity/lib/data";

const TITLE = "Projects | C&T Consulting Engineers";
const DESCRIPTION =
  "Selected projects across airports, data centres, refineries and offshore platforms, engineered by C&T's Buildings & Infrastructure and Oil & Gas teams.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects",
  },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/projects" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default async function ProjectsPage() {
  const items = await getPortfolio();
  return (
    <main>
      <JsonLd data={sectionBreadcrumb("Projects", "/projects")} />
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
