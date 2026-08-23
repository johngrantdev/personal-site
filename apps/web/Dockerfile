FROM node:22.17.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/cms-config/package.json ./packages/cms-config/
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM deps AS builder
COPY . .
RUN --mount=type=secret,id=build_env \
    node --env-file=/run/secrets/build_env -e "require('child_process').execSync('corepack enable pnpm && pnpm --filter @personal-site/web build', { stdio: 'inherit' })"

FROM node:22.17.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 astro
COPY --from=builder --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=astro:nodejs /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder --chown=astro:nodejs /app/apps/web/dist ./apps/web/dist
COPY --from=builder --chown=astro:nodejs /app/packages/cms-config/node_modules ./packages/cms-config/node_modules
USER astro
EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
CMD ["node", "apps/web/dist/server/entry.mjs"]
