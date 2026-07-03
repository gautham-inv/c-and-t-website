import { defineCliConfig } from "sanity/cli";

/**
 * CLI config for `sanity` commands (deploy, dataset, etc.). Reads the same env
 * vars as the Studio so `npx sanity deploy` targets the right project.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  /** Hosted Studio hostname → https://<studioHost>.sanity.studio */
  studioHost: "ct-consulting-engineers",
  deployment: { autoUpdates: true, appId: "j3xbh21zmp65kwclh1sowseb" },
});
