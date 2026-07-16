import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { getInsights } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Insights | C&T Consulting Engineers",
  description:
    "Articles from C&T's engineers on BIM, CFD and MEP, and the methods behind our building and energy projects.",
  alternates: {
    canonical: "/insights",
  },
};

export default async function InsightsPage() {
  const items = await getInsights();
  return (
    <main>
      <InsightsIndex items={items} />
      <WithUs rounded={false} />
    </main>
  );
}
