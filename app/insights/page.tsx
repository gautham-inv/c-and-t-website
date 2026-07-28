import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { sectionBreadcrumb } from "@/lib/seo";
import { latestInsights } from "@/lib/insights";
import { getInsights } from "@/sanity/lib/data";

const TITLE = "Insights | C&T Consulting Engineers";
const DESCRIPTION =
  "Articles from C&T's engineers on BIM, CFD and MEP, and the methods behind our building and energy projects.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/insights",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function InsightsPage() {
  // Same ordering as the homepage teaser, so the two it features are always
  // the two at the top of this list rather than a different pair.
  const items = latestInsights(await getInsights());
  return (
    <main>
      <JsonLd data={sectionBreadcrumb("Insights", "/insights")} />
      <InsightsIndex items={items} />
      <WithUs rounded={false} />
    </main>
  );
}
