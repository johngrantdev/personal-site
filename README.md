# johngrant.dev

Payload CMS and the public Astro site share one PostgreSQL-backed workspace.

## Development

Requires Node.js 20.9+ and pnpm 10.

```sh
pnpm install
pnpm dev
```

Next serves Payload locally at `http://localhost:3000/admin`; Astro serves the site at `http://localhost:4321`. Astro also uses `http://localhost:4321` as its default canonical origin. Both applications load the shared Payload config directly.

Required local variables:

```dotenv
DATABASE_URI=postgres://user:password@localhost:5432/database
PAYLOAD_SECRET=replace-with-a-long-random-secret
```

Optional S3 variables are `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY`. Without `S3_BUCKET`, uploads use local storage.

Useful checks:

```sh
pnpm generate:types
pnpm generate:importmap
pnpm typecheck
pnpm build
```

## Deployment

Production uses one public host. Set `SERVER_URL=https://your-domain.example` — Astro uses it for canonical and OG URLs. Payload's own `serverURL` is left unset so its generated URLs stay relative and resolve against whichever origin the admin is served on. Set `IS_LIVE=true` when search indexing should be enabled.

Configure the reverse proxy separately: `/api/payload*` goes to the CMS, while every other path goes to Astro. Upload files are served from `/api/payload/uploads/file/*`, so that prefix must reach the CMS or images 404.

The admin does not have to be public. List the origin you reach it on in `ADMIN_ORIGINS` (comma-separated) or Payload's CSRF check rejects the admin's own requests. Leave it empty and the allowlist is empty, which disables the check.

The runtime `.env.prod` must include `DATABASE_URI`, `PAYLOAD_SECRET`, `SERVER_URL`, `ADMIN_ORIGINS` (if the admin is on another origin), `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and any storage variables. Set `FRONTEND_PURGE_URL=http://web:4321/api/purge` and use the same random `FRONTEND_PURGE_SECRET` in both services. In Compose, `DATABASE_URI` uses `postgresql` as its database hostname. Build and run both images with:

```sh
./docker-build.sh .env.prod
docker compose up -d
```

The CMS and Astro ports bind to localhost at `3000` and `4321`. PostgreSQL is isolated on the internal backend network. Local uploads persist in the `media` volume.

Astro caches Payload reads in its single process for five minutes. Payload changes purge matching entries through the authenticated internal endpoint.
