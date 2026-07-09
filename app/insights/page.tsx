import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { getInsights } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Insights | C&T Consulting Engineers",
  description:
    "Articles from C&T's engineers on BIM, CFD and MEP, and the methods behind our building and energy projects.",
};

export default async function InsightsPage() {
  const items = await getInsights();
  return (
    <main>
      <Navbar />
      <InsightsIndex items={items} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
