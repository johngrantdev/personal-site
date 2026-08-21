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

The production build reads Payload content while prerendering, so the builder must be able to reach PostgreSQL:

```sh
docker build --network=host \
  --build-arg DATABASE_URI="$DATABASE_URI" \
  --build-arg PAYLOAD_SECRET="$PAYLOAD_SECRET" \
  --build-arg NEXT_PUBLIC_SERVER_URL="$NEXT_PUBLIC_SERVER_URL" \
  -t personal-site .
docker compose up -d
```

Runtime variables are still supplied by `.env.prod` in `docker-compose.yml`.
