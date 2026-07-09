import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AboutView } from "@/components/about/AboutView";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { getAboutPage } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Who we are | C&T Consulting Engineers",
  description:
    "C&T started as a single-engineer HVAC practice in 2011 and is now an MEP and BIM engineering group with offices in India, the UAE and Canada.",
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
