import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { getInsights } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Insights — C&T Consulting Engineers",
  description:
    "Innovative thinking from C&T's engineers — notes on BIM, CFD, MEP and the methods behind the buildings and energy projects we deliver.",
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
