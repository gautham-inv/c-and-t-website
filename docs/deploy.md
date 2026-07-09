# Deployment

The site is a static export (`next.config.ts` → `output: "export"`). Sanity
content is fetched at build time only — there's no server runtime for ISR or
API routes, so publishing in Sanity does nothing until the site is rebuilt.
`.github/workflows/deploy.yml` handles the rebuild + deploy: `next build`
produces `out/`, then `wrangler pages deploy` pushes it to the Cloudflare
Pages project `c-and-t`. No `wrangler.toml` is needed — the project name and
output directory are passed as CLI flags.

## Triggers

- Push to `main`
- Manual run (`workflow_dispatch`)
- `repository_dispatch` with type `sanity-publish` — fired by a Sanity webhook
  on every publish, so content edits go live within a normal CI run.

## One-time setup

### Cloudflare Pages project

`wrangler pages deploy` does NOT auto-create the project in a non-interactive
context (CI, or a local shell with no TTY to answer its prompt) — it just
fails with "Project not found" (code 8000007). Create the project once,
before the first deploy:

- Dashboard: Workers & Pages → Create → Pages → Upload assets → name it
  `c-and-t`, or
- CLI (needs an authenticated `wrangler login` or a scoped
  `CLOUDFLARE_API_TOKEN` in your shell):
  `wrangler pages project create c-and-t --production-branch=main`

### Hosting under the client's Cloudflare account

Everything above works the same regardless of *whose* Cloudflare account
holds the project — nothing in this repo is account-specific, since the
project name and output directory are passed as CLI flags rather than baked
into a `wrangler.toml`. Moving hosting to the client's account is a
credentials swap, not a code change:

1. **In the client's Cloudflare account** (they'll need to do this, or grant
   temporary access to whoever is running this) — Workers & Pages → Create →
   Pages → create a project named `c-and-t` (or whatever name they prefer;
   update the `--project-name` flag in `.github/workflows/deploy.yml` and
   `package.json`'s `deploy` script to match if so).
2. Generate a scoped API token: Cloudflare dashboard → **My Profile → API
   Tokens → Create Token** → "Edit Cloudflare Workers" template (covers
   Pages) restricted to their account. Note their **Account ID** too (right
   sidebar of the dashboard overview, or `wrangler whoami` once logged in as
   them).
3. In **this repo's** GitHub Settings → Secrets and variables → Actions,
   replace `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` with the new
   values from step 2. Paste secrets directly into GitHub's UI — never share
   API tokens in chat/email.
4. Re-enter the Pages Function environment variables (see below) on the
   **new** project — they don't carry over from the old account's project.
5. If the client wants a custom domain, add it under the new Pages project →
   Custom domains (requires the domain's DNS on Cloudflare, or a CNAME at
   their registrar pointing to the `pages.dev` subdomain).
6. Push to `main` (or re-run the workflow manually) — the next deploy lands
   on the client's account.

### Contact + application form email (Cloudflare Pages Functions)

`functions/api/enquiry.js` handles the "Get in touch" modal
(`components/forms/EnquiryModal.tsx`) and `functions/api/apply.js` handles the
job-application modal (`components/forms/ApplyModal.tsx`) — the static export
has no server, so both Pages Functions send their submission as an email via
[Resend](https://resend.com). `wrangler pages deploy` bundles anything under
`functions/` automatically (no `--no-bundle` flag is used, so this keeps
working).

Set these in the Cloudflare dashboard → Workers & Pages → `c-and-t` →
Settings → Environment variables (do this for both Production and Preview):

- `RESEND_API_KEY` — secret, from the Resend dashboard, shared by both forms
- `CONTACT_TO_EMAIL` — the inbox that should receive enquiries
- `HR_TO_EMAIL` — the inbox that should receive job applications
- `CONTACT_FROM_EMAIL` — optional, e.g. `"C&T Website <enquiries@yourdomain.com>"`,
  shared by both forms. Without a verified sending domain in Resend, mail
  sends from a shared sandbox address and can only be delivered to the email
  on the Resend account — verify a domain in Resend to send to
  `CONTACT_TO_EMAIL`/`HR_TO_EMAIL` for real.

These are Pages project variables, not GitHub Actions secrets — the build
step never touches them, only the deployed Functions do at request time.

### Google Analytics

`components/analytics/GoogleAnalytics.tsx` renders the GA4 `gtag.js` snippet,
mounted once in `app/layout.tsx`. It reads `NEXT_PUBLIC_GA_ID` and renders
nothing if that's unset, so it's safe to leave empty until the client's
Measurement ID is available.

Like the Sanity `NEXT_PUBLIC_*` values, this is baked in at **build time**, so
it's a GitHub Actions **Variable**, not a secret (a GA4 Measurement ID is
public by design — it's visible in every page's own script tag):

- `NEXT_PUBLIC_GA_ID` — the client's GA4 Measurement ID, e.g. `G-XXXXXXXXXX`,
  from their Google Analytics account → Admin → Data Streams → Web stream.

For local dev, add the same key to `.env.local` if you want analytics to fire
while running `npm run dev` (usually not needed).

### GitHub

Repo **Settings → Secrets and variables → Actions**:

- Secrets: `CLOUDFLARE_API_TOKEN` (Cloudflare "Cloudflare Pages: Edit"
  permission), `CLOUDFLARE_ACCOUNT_ID`
- Variables (optional, fall back to the defaults baked into `sanity/env.ts`,
  except `NEXT_PUBLIC_GA_ID` which just no-ops if unset):
  `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
  `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_GA_ID`

Create a fine-grained GitHub PAT with **only** the "Contents: read and
write" permission on this repo — this is what Sanity uses to fire
`repository_dispatch` (the `/dispatches` endpoint checks Contents, not
Actions, permissions). Don't reuse a broad classic PAT.

### Sanity webhook

In [sanity.io/manage](https://sanity.io/manage) → project → API → Webhooks,
create a webhook:

| Field | Value |
|---|---|
| URL | `https://api.github.com/repos/<owner>/<repo>/dispatches` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| HTTP method | `POST` |
| API version | `v2021-03-25` |
| Payload | not required (repository_dispatch ignores the body's shape) |
| Body | `{"event_type": "sanity-publish"}` |
| HTTP headers | `Authorization: Bearer <the GitHub PAT above>`, `Accept: application/vnd.github+json` |
| Secret | not needed — GitHub authenticates via the PAT, not a shared secret |

Sanity stores the header value encrypted; the PAT never touches this repo.

## Manual deploy

```
npm run deploy   # next build && wrangler pages deploy out --project-name=c-and-t --branch=main
```

Requires `wrangler login` (or `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID`
in the environment) locally, and the `c-and-t` Pages project to already exist
(see "Cloudflare Pages project" above).
