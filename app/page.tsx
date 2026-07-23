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
import { getDivisions, getServices, getInsights } from "@/sanity/lib/data";

export default async function Home() {
  // Data-backed homepage sections read from Sanity (fallback to lib/* when the
  // dataset isn't seeded) so the homepage stays in sync with the detail pages.
  const [divisions, services, insights] = await Promise.all([
    getDivisions(),
    getServices(),
    getInsights(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "C&T Consulting Engineers",
    "image": "https://www.candtengineers.com/logo.webp",
    "url": "https://www.candtengineers.com",
    "telephone": "+914712555026",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Trivandrum",
      "addressLocality": "Trivandrum",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "description": "C&T is a multidisciplinary engineering services company delivering MEP engineering design, BIM modeling, and detailed engineering worldwide."
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      {/* Placeholder anchors for sections built in later phases — they keep
          the nav links resolvable while the homepage is assembled. */}
      <section id="philosophy" className="scroll-mt-24" />
      <section id="faq" className="scroll-mt-24" />

      <WithUs />
    </main>
  );
}
