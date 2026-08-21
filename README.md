# johngrant.dev

Personal portfolio and blog built with Payload 3, Next.js, React, PostgreSQL, and optional S3 storage.

## Development

Requires Node.js 20.9+ and pnpm 10.

```sh
pnpm install
pnpm dev
```

Required environment variables:

```dotenv
DATABASE_URI=postgres://user:password@localhost:5432/database
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Set `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` to store uploads in S3. Without `S3_BUCKET`, uploads use local storage.

To enable Plausible, set `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` to the full site-specific script URL from the Plausible dashboard. Pass the same optional value as a Docker build argument.

Useful checks:

```sh
pnpm generate:types
pnpm generate:importmap
pnpm typecheck
pnpm build
```

The admin panel is at `/admin`; Payload REST and GraphQL are at `/api/payload` and `/api/payload/graphql`.

## Docker

`docker-build.sh` passes the env file as a BuildKit
secret:

```sh
./docker-build.sh .env.prod
docker compose up -d
```

Runtime variables are still supplied by an `.env` in `docker-compose.yml`.
