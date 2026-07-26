import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Stats } from "@/components/sections/Stats";
import { Divisions } from "@/components/sections/Divisions";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Clients } from "@/components/sections/Clients";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/Insights";
import { GreenZone } from "@/components/sections/GreenZone";
import { WithUs } from "@/components/sections/WithUs";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";
import { COMPANY_FAQS } from "@/lib/faqs";
import { getDivisions, getServices, getInsights } from "@/sanity/lib/data";

export default async function Home() {
  // Data-backed homepage sections read from Sanity (fallback to lib/* when the
  // dataset isn't seeded) so the homepage stays in sync with the detail pages.
  const [divisions, services, insights] = await Promise.all([
    getDivisions(),
    getServices(),
    getInsights(),
  ]);

  return (
    <main>
      <Hero />
      <WhoWeAre />
      <Stats />
      {/* Divisions → services → featured work: the two divisions first (how the
          firm is organised), then the services, then the projects showcase. */}
      <Divisions divisions={divisions} />
      <Services services={services} />
      <Projects />

      {/* Off-white → green scrubbed colour zone for the social-proof block. */}
      <GreenZone>
        <Clients />
        <Testimonials />
      </GreenZone>

      <Insights insights={insights} />

      <JsonLd data={faqSchema(COMPANY_FAQS)} />
      <Faq />

      <WithUs />
    </main>
  );
}
