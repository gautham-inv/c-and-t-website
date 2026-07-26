#!/usr/bin/env node
/**
 * IndexNow submitter — pings the IndexNow API so Bing (and other participating
 * engines: Yandex, Naver, Seznam) re-crawl our URLs within seconds. Bing's
 * index feeds Microsoft Copilot and ChatGPT search, so fast inclusion here
 * directly helps AI-answer visibility. Google does NOT use IndexNow — it still
 * relies on the sitemap.
 *
 * Run after each production deploy:
 *   node scripts/indexnow.mjs
 *
 * It fetches the live sitemap.xml, extracts every <loc>, and submits the list.
 * No dependencies, no secrets beyond the public IndexNow key file.
 */

const HOST = "www.candtengineers.com";
const ORIGIN = `https://${HOST}`;
const KEY = "b9afaf6cd47ddfcb195f486b699aef57";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap (${res.status})`);
  const xml = await res.text();

  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(ORIGIN));

  if (urlList.length === 0) throw new Error("No URLs found in sitemap.");
  console.log(`Submitting ${urlList.length} URLs to IndexNow…`);

  const submit = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // IndexNow returns 200 or 202 on success; 4xx signals a key/format problem.
  console.log(`IndexNow responded ${submit.status} ${submit.statusText}`);
  if (!submit.ok) {
    console.error(await submit.text());
    process.exit(1);
  }
  console.log("Done. Bing/Copilot will re-crawl the submitted URLs shortly.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
