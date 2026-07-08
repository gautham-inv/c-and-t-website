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

### Contact form email (Cloudflare Pages Function)

`functions/api/enquiry.js` handles the "Get in touch" modal
(`components/forms/EnquiryModal.tsx`) — the static export has no server, so
this Pages Function sends the submission as an email via
[Resend](https://resend.com). `wrangler pages deploy` bundles anything under
`functions/` automatically (no `--no-bundle` flag is used, so this keeps
working).

Set these in the Cloudflare dashboard → Workers & Pages → `c-and-t` →
Settings → Environment variables (do this for both Production and Preview):

- `RESEND_API_KEY` — secret, from the Resend dashboard
- `CONTACT_TO_EMAIL` — the inbox that should receive enquiries
- `CONTACT_FROM_EMAIL` — optional, e.g. `"C&T Website <enquiries@yourdomain.com>"`.
  Without a verified sending domain in Resend, mail sends from a shared
  sandbox address and can only be delivered to the email on the Resend
  account — verify a domain in Resend to send to `CONTACT_TO_EMAIL` for real.

These are Pages project variables, not GitHub Actions secrets — the build
step never touches them, only the deployed Function does at request time.

### GitHub

Repo **Settings → Secrets and variables → Actions**:

- Secrets: `CLOUDFLARE_API_TOKEN` (Cloudflare "Cloudflare Pages: Edit"
  permission), `CLOUDFLARE_ACCOUNT_ID`
- Variables (optional, fall back to the defaults baked into `sanity/env.ts`):
  `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
  `NEXT_PUBLIC_SANITY_API_VERSION`

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
