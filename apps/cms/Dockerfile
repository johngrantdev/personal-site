FROM node:22.17.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/
COPY packages/cms-config/package.json ./packages/cms-config/
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=deps /app/packages/cms-config/node_modules ./packages/cms-config/node_modules
COPY . .

RUN --mount=type=secret,id=build_env \
    node --env-file=/run/secrets/build_env -e "require('child_process').execSync('corepack enable pnpm && pnpm --filter @personal-site/cms build', { stdio: 'inherit' })"

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/static ./apps/cms/.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "apps/cms/server.js"]
