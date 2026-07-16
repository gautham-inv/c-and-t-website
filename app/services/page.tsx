import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { getServices, getDivisions, getServicesPage } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Our Services | C&T Consulting Engineers",
  description:
    "MEP design, BIM & 3D modelling, clash coordination, CFD/FEA, and MTO/BOQ & walkthrough videos, delivered across our Buildings & Infrastructure and Oil & Gas teams.",
};

export default async function ServicesPage() {
  const [services, divisions, servicesPageData] = await Promise.all([
    getServices(),
    getDivisions(),
    getServicesPage(),
  ]);
  return (
    <main>
      <ServicesIndex
        services={services}
        divisions={divisions}
        title={servicesPageData.title}
        blurb={servicesPageData.blurb}
        tools={servicesPageData.tools}
      />
      <WithUs rounded={false} />
    </main>
  );
}
