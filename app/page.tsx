import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Stats } from "@/components/sections/Stats";
import { Sectors } from "@/components/sections/Sectors";
import { Difference } from "@/components/sections/Difference";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Clients } from "@/components/sections/Clients";
import { Testimonials } from "@/components/sections/Testimonials";
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
      {/* Markets → capabilities → proof: sectors, then services, then the
          case studies that back them up. */}
      <Sectors />
      <Services />
      <Difference />
      <Projects />

      {/* Off-white → green scrubbed colour zone for the social-proof block. */}
      <GreenZone>
        <Clients />
        <Testimonials />
      </GreenZone>

      {/* Placeholder anchors for sections built in later phases — they keep
          the nav links resolvable while the homepage is assembled. */}
      <section id="philosophy" className="scroll-mt-24" />
      <section id="blog" className="scroll-mt-24" />
      <section id="faq" className="scroll-mt-24" />

      <WithUs />
      <Footer />
    </main>
  );
}
