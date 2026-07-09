import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { EnquiryModal } from "@/components/forms/EnquiryModal";
import { ApplyModal } from "@/components/forms/ApplyModal";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
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

export const metadata: Metadata = {
  title: "C&T Consulting Engineers | MEP, BIM & CFD | Smart Engineering",
  description:
    "Precision Engineered. Globally Delivered. C&T delivers MEP design, BIM modelling and CFD analysis for buildings, airports, industrial and oil & gas projects worldwide since 2013.",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        <GoogleAnalytics />
        <SmoothScroll>{children}</SmoothScroll>
        <EnquiryModal />
        <ApplyModal />
      </body>
    </html>
  );
}
