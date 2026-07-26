import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";
import { WithUs } from "@/components/sections/WithUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getAboutPage } from "@/sanity/lib/data";

const TITLE = "Engineering Excellence, Delivered with Integrity.";
const DESCRIPTION =
  "A professionally managed team of qualified engineers delivering complete Infrastructure, Architectural & MEP systems, from design and BIM coordination through to commissioning.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/about" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default async function AboutPage() {
  const about = await getAboutPage();
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Who we are", path: "/about" },
        ])}
      />
      <AboutView about={about} />
      <WithUs rounded={false} />
    </main>
  );
}
