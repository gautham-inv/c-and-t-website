import type { Metadata } from "next";
import { WithUs } from "@/components/sections/WithUs";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { getServices, getDivisions, getTools } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Our Services | C&T Consulting Engineers",
  description:
    "MEP design, BIM & 3D modelling, clash coordination, CFD/FEA, and MTO/BOQ & walkthrough videos, delivered across our Buildings & Infrastructure and Oil & Gas teams.",
};

export default async function ServicesPage() {
  const [services, divisions, tools] = await Promise.all([
    getServices(),
    getDivisions(),
    getTools(),
  ]);
  return (
    <main>
      <ServicesIndex services={services} divisions={divisions} tools={tools} />
      <WithUs rounded={false} />
    </main>
  );
}
