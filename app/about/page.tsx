import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AboutView } from "@/components/about/AboutView";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { getAboutPage } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Who we are — C&T Consulting Engineers",
  description:
    "From a single-engineer HVAC practice in 2011 to a global MEP & BIM engineering group across India, the UAE and Canada — our story, vision, journey and the work we deliver.",
};

export default async function AboutPage() {
  const about = await getAboutPage();
  return (
    <main>
      <Navbar />
      <AboutView about={about} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
