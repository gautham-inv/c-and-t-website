import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { CareersView } from "@/components/careers/CareersView";
import { getCareersPage, getJobOpenings } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Careers — C&T Consulting Engineers",
  description:
    "Build your career with C&T. MEP, BIM and CFD roles across India, the UAE and Canada — landmark projects, inspiring leadership and global exposure.",
};

export default async function CareersPage() {
  const [careers, openings] = await Promise.all([
    getCareersPage(),
    getJobOpenings(),
  ]);
  return (
    <main>
      <Navbar />
      <CareersView careers={careers} openings={openings} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
