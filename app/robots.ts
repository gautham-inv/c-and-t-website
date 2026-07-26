import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// AI answer-engine / LLM crawlers we explicitly welcome (AEO). They're already
// covered by the "*" allow rule, but naming them documents intent and keeps
// them allowed even if the wildcard is ever tightened.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT live browsing
  "ClaudeBot", // Anthropic
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot", // Common Crawl (feeds many LLMs)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://www.candtengineers.com/sitemap.xml",
    host: "https://www.candtengineers.com",
  };
}
