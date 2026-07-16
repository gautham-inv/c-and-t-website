/**
 * One-off migration: move legacy aboutPage.isoLogo / isoDocument into
 * isoCertifications[] and remove the stale top-level fields.
 *
 * RUN
 *   SANITY_API_WRITE_TOKEN=sk_xxx npm run migrate:about-iso
 */

import { readFileSync, existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "../sanity/env";
import { ISO_CERTIFICATIONS } from "../lib/company";

// Load .env.local when present (same pattern as Next.js local dev).
const envLocal = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local");
if (existsSync(envLocal)) {
  for (const line of readFileSync(envLocal, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const name = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[name]) process.env[name] = value;
  }
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("✗ SANITY_API_WRITE_TOKEN is not set.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

type Ref = { _type: "reference"; _ref: string };
type ImageRef = { _type: "image"; asset: Ref; alt?: string };
type FileRef = { _type: "file"; asset: Ref };
type IsoCert = {
  _type: "isoCert";
  _key: string;
  name: string;
  logo?: ImageRef;
  document?: FileRef;
};

function ref(id: string): Ref {
  return { _type: "reference", _ref: id };
}

let keyCounter = 0;
function key(prefix = "iso"): string {
  keyCounter += 1;
  return `${prefix}${keyCounter.toString(36)}`;
}

async function uploadImage(publicPath: string, alt?: string): Promise<ImageRef | undefined> {
  const relative = publicPath.replace(/^\//, "");
  const filePath = path.join(PUBLIC_DIR, relative);
  if (!existsSync(filePath)) {
    console.warn(`  ! image not found, skipping: ${publicPath}`);
    return undefined;
  }
  const buffer = await readFile(filePath);
  const asset = await client.assets.upload("image", buffer, { filename: path.basename(filePath) });
  return alt
    ? { _type: "image", asset: ref(asset._id), alt }
    : { _type: "image", asset: ref(asset._id) };
}

type ExistingAbout = {
  isoLogo?: ImageRef;
  isoDocument?: FileRef;
  isoCertifications?: IsoCert[];
};

async function main(): Promise<void> {
  const existing = await client.fetch<ExistingAbout | null>(
    `*[_id == "aboutPage"][0]{ isoLogo, isoDocument, isoCertifications }`,
  );

  if (!existing) {
    console.error("✗ aboutPage document not found.");
    process.exit(1);
  }

  const certs: IsoCert[] = [...(existing.isoCertifications ?? [])];

  const has9001 = certs.some((c) => c.name.includes("9001"));
  if (!has9001 && (existing.isoLogo || existing.isoDocument)) {
    certs.unshift({
      _type: "isoCert",
      _key: key(),
      name: "ISO 9001:2015",
      ...(existing.isoLogo && { logo: existing.isoLogo }),
      ...(existing.isoDocument && { document: existing.isoDocument }),
    });
    console.log("  → migrated legacy isoLogo / isoDocument into isoCertifications");
  }

  for (const cert of ISO_CERTIFICATIONS) {
    if (certs.some((c) => c.name === cert.name)) continue;
    const logo = cert.logo ? await uploadImage(cert.logo, cert.name) : undefined;
    if (!logo) continue;
    certs.push({ _type: "isoCert", _key: key(), name: cert.name, logo });
    console.log(`  → added ${cert.name}`);
  }

  await client
    .patch("aboutPage")
    .set({ isoCertifications: certs })
    .unset(["isoLogo", "isoDocument"])
    .commit();

  console.log(`✓ aboutPage updated — ${certs.length} ISO certification(s), legacy fields removed.`);
}

main().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
