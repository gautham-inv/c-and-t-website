import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnquiryModal } from "@/components/forms/EnquiryModal";
import { ApplyModal } from "@/components/forms/ApplyModal";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema, SITE_NAME, OG_IMAGE } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/data";
import "./globals.css";

/* Satoshi — self-hosted (Fontshare). Carries display + body. 600 requests
 * resolve to the 700 cut, so semibold headings render bold. */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const TITLE = "C&T Consulting Engineers | MEP, BIM & CFD | Smart Engineering";
const DESCRIPTION =
  "Engineered to Endure. C&T delivers architectural and MEP design, BIM modelling and CFD analysis for buildings, airports, industrial and oil & gas projects worldwide since 2013.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.candtengineers.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: TITLE,
    // Per-page `title` strings already include the brand, so no template
    // suffix — a template would double it up ("… | C&T … | C&T …").
    template: "%s",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "MEP engineering",
    "BIM modelling",
    "CFD analysis",
    "building services engineering",
    "oil and gas engineering",
    "data centre engineering",
    "engineering consultancy",
  ],
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: "/favicon.webp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "https://www.candtengineers.com",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Site chrome is rendered once here (not per page) and fed a single Sanity
  // fetch, so the Navbar/Footer stay editable from `siteSettings` in Studio.
  const settings = await getSiteSettings();
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <GoogleAnalytics />
        <SmoothScroll>
          <Navbar nav={settings.navItems} socials={settings.socials} />
          {children}
          <Footer
            links={settings.footerLinks}
            offices={settings.offices}
            socials={settings.socials}
            copyright={settings.copyright}
          />
        </SmoothScroll>
        <EnquiryModal />
        <ApplyModal />
      </body>
    </html>
  );
}
