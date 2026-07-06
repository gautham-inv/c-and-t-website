# Deployment

The site is a static export (`next.config.ts` → `output: "export"`). Sanity
content is fetched at build time only — there's no server runtime for ISR or
API routes, so publishing in Sanity does nothing until the site is rebuilt.
`.github/workflows/deploy.yml` handles the rebuild + deploy: `next build`
produces `out/`, then `wrangler deploy` pushes it to Cloudflare Workers as
static assets (no Worker script needed — see `wrangler.toml`).

## Triggers

- Push to `main`
- Manual run (`workflow_dispatch`)
- `repository_dispatch` with type `sanity-publish` — fired by a Sanity webhook
  on every publish, so content edits go live within a normal CI run.

## One-time setup

### GitHub

Repo **Settings → Secrets and variables → Actions**:

- Secrets: `CLOUDFLARE_API_TOKEN` (Cloudflare "Edit Cloudflare Workers"
  permission), `CLOUDFLARE_ACCOUNT_ID`
- Variables (optional, fall back to the defaults baked into `sanity/env.ts`):
  `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
  `NEXT_PUBLIC_SANITY_API_VERSION`

Create a fine-grained GitHub PAT with **only** the "Contents: read" +
"Actions: read and write" permission on this repo — this is what Sanity uses
to fire `repository_dispatch`. Don't reuse a broad classic PAT.

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
npm run deploy   # next build && wrangler deploy
```

Requires `wrangler login` (or `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID`
in the environment) locally.
