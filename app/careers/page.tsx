import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { CareersView } from "@/components/careers/CareersView";
import { getCareersPage, getJobOpenings } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Careers | C&T Consulting Engineers",
  description:
    "MEP, BIM and CFD job openings at C&T Consulting Engineers, with teams in India, the UAE and Canada.",
  alternates: {
    canonical: "/careers",
  },
};

export default async function CareersPage() {
  const [careers, openings] = await Promise.all([
    getCareersPage(),
    getJobOpenings(),
  ]);
  return (
    <main>
      <CareersView careers={careers} openings={openings} />
      <WithUs rounded={false} />
    </main>
  );
}
