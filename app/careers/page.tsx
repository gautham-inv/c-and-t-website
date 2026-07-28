import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { CareersView } from "@/components/careers/CareersView";
import { JsonLd } from "@/components/seo/JsonLd";
import { sectionBreadcrumb } from "@/lib/seo";
import { getCareersPage, getJobOpenings } from "@/sanity/lib/data";

const TITLE = "Careers | C&T Consulting Engineers";
const DESCRIPTION =
  "Architectural design, MEP, BIM and CFD job openings at C&T Consulting Engineers, with teams in India, the UAE and Canada.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/careers",
  },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/careers" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default async function CareersPage() {
  const [careers, openings] = await Promise.all([
    getCareersPage(),
    getJobOpenings(),
  ]);
  return (
    <main>
      <JsonLd data={sectionBreadcrumb("Careers", "/careers")} />
      <CareersView careers={careers} openings={openings} />
      <WithUs rounded={false} />
    </main>
  );
}
