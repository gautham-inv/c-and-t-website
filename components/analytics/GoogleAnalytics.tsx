"use client";

import Script from "next/script";

// Baked in at build time (like NEXT_PUBLIC_SANITY_*) — set as a GitHub Actions
// repo Variable, not a secret: a GA4 Measurement ID is public by design, it's
// visible in every page's own <script> tag. Renders nothing until it's set,
// so this is safe to ship ahead of having the client's real ID.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
