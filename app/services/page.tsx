import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { getServices, getDivisions } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Our Services | C&T Consulting Engineers",
  description:
    "MEP design, BIM & 3D modelling, clash coordination, CFD/FEA, and MTO/BOQ & walkthrough videos, delivered across our Buildings & Infrastructure and Oil & Gas teams.",
};

export default async function ServicesPage() {
  const [services, divisions] = await Promise.all([getServices(), getDivisions()]);
  return (
    <main>
      <Navbar />
      <ServicesIndex services={services} divisions={divisions} />
      <WithUs rounded={false} />
      <Footer />
    </main>
  );
}
