import type { Metadata } from "next";
import { LaunchSequence } from "@/components/launch/LaunchSequence";

const TITLE = "Launch | C&T Consulting Engineers";

/**
 * Unveiling-ceremony page. Not part of the public site: it's left out of
 * sitemap.ts and marked noindex/nofollow here, so it stays reachable by
 * anyone who types the URL (which is how it gets used on the day) without
 * ever turning up in search results.
 *
 * Crawling is still allowed in robots.ts on purpose — a Disallow there would
 * stop crawlers reading this very noindex tag, which is the opposite of what
 * we want.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: "C&T Consulting Engineers — website launch.",
  robots: { index: false, follow: false },
};

export default function LaunchPage() {
  return (
    <main>
      <LaunchSequence />
    </main>
  );
}
