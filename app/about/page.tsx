import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";
import { WithUs } from "@/components/sections/WithUs";
import { getAboutPage } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Engineering Excellence, Delivered with Integrity.",
  description:
    "A professionally managed team of qualified engineers delivering complete Infrastructure, Architectural & MEP systems, from design and BIM coordination through to commissioning.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const about = await getAboutPage();
  return (
    <main>
      <AboutView about={about} />
      <WithUs rounded={false} />
    </main>
  );
}
