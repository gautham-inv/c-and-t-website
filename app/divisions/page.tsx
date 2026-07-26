import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { DivisionsIndex } from "@/components/divisions/DivisionsIndex";
import { EngineeringScope } from "@/components/divisions/EngineeringScope";
import { ToolsStrip } from "@/components/services/ToolsStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { sectionBreadcrumb } from "@/lib/seo";
import { getDivisions, getServicesPage } from "@/sanity/lib/data";

const TITLE = "Divisions | C&T Consulting Engineers";
const DESCRIPTION =
  "C&T runs two divisions with dedicated teams: Buildings & Infrastructure and Oil & Gas. Explore each practice and the software behind the work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/divisions",
  },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/divisions" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default async function DivisionsPage() {
  const [divisions, servicesPageData] = await Promise.all([
    getDivisions(),
    getServicesPage(),
  ]);
  return (
    <main>
      <JsonLd data={sectionBreadcrumb("What we do", "/divisions")} />
      <DivisionsIndex divisions={divisions} />
      <EngineeringScope />
      <ToolsStrip tools={servicesPageData.tools} />
      <WithUs rounded={false} />
    </main>
  );
}
