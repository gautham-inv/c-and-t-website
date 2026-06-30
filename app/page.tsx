import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Stats } from "@/components/sections/Stats";
import { Divisions } from "@/components/sections/Divisions";
import { Difference } from "@/components/sections/Difference";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Clients } from "@/components/sections/Clients";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/Insights";
import { GreenZone } from "@/components/sections/GreenZone";
import { WithUs } from "@/components/sections/WithUs";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhoWeAre />
      <Stats />
      {/* Divisions → services → proof: the two divisions first (how the firm
          is organised), then the services, then the case studies. */}
      <Divisions />
      <Services />
      <Difference />
      <Projects />

      {/* Off-white → green scrubbed colour zone for the social-proof block. */}
      <GreenZone>
        <Clients />
        <Testimonials />
      </GreenZone>

      <Insights />

      {/* Placeholder anchors for sections built in later phases — they keep
          the nav links resolvable while the homepage is assembled. */}
      <section id="philosophy" className="scroll-mt-24" />
      <section id="faq" className="scroll-mt-24" />

      <WithUs />
      <Footer />
    </main>
  );
}
