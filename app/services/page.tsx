import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { ServicesIndex } from "@/components/services/ServicesIndex";

export const metadata: Metadata = {
  title: "Our Services — C&T Consulting Engineers",
  description:
    "MEP design, BIM & 3D modelling, clash coordination, CFD/FEA, and MTO/BOQ & walkthrough videos — delivered across our Buildings & Infrastructure and Oil & Gas teams.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesIndex />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
