FROM node:22.17.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL
# Baked into the build output, not read at runtime:
#   NEXT_PUBLIC_IS_LIVE -> the X-Robots-Tag noindex header in next.config.mjs
#   SITE_NAME / SITE_DESCRIPTION -> Open Graph metadata on prerendered pages
ARG NEXT_PUBLIC_IS_LIVE
ARG SITE_NAME
ARG SITE_DESCRIPTION
ARG SITE_OG_IMAGE
ENV DATABASE_URI=$DATABASE_URI
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL=$NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL
ENV NEXT_PUBLIC_IS_LIVE=$NEXT_PUBLIC_IS_LIVE
ENV SITE_NAME=$SITE_NAME
ENV SITE_DESCRIPTION=$SITE_DESCRIPTION
ENV SITE_OG_IMAGE=$SITE_OG_IMAGE
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
