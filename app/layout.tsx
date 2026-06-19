import type { Metadata } from "next";
import { Spectral, Red_Hat_Display, Red_Hat_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

/* Spectral — editorial serif, carries the whole site (no italics). */
const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

/* Red Hat Display — sleek geometric sans for UI + body. */
const redhat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* Red Hat Mono — technical labels, eyebrows, specs. */
const redhatMono = Red_Hat_Mono({
  subsets: ["latin"],
  variable: "--font-redhat-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "C&T Consulting Engineers — Smart Engineering | MEP · BIM · CFD",
  description:
    "Precision Engineered. Globally Delivered. C&T delivers MEP design, BIM modelling and CFD analysis for buildings, airports, industrial and oil & gas projects worldwide since 2013.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${redhat.variable} ${redhatMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
