import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { DivisionsIndex } from "@/components/divisions/DivisionsIndex";
import { EngineeringScope } from "@/components/divisions/EngineeringScope";
import { ToolsStrip } from "@/components/services/ToolsStrip";
import { getDivisions, getServicesPage } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Divisions | C&T Consulting Engineers",
  description:
    "C&T runs two divisions with dedicated teams: Buildings & Infrastructure and Oil & Gas. Explore each practice and the software behind the work.",
  alternates: {
    canonical: "/divisions",
  },
};

export default async function DivisionsPage() {
  const [divisions, servicesPageData] = await Promise.all([
    getDivisions(),
    getServicesPage(),
  ]);
  return (
    <main>
      <DivisionsIndex divisions={divisions} />
      <EngineeringScope />
      <ToolsStrip tools={servicesPageData.tools} />
      <WithUs rounded={false} />
    </main>
  );
}
