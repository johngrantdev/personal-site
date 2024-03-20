FROM node:18.19-alpine as base

FROM base as builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install -g pnpm

RUN apk add --no-cache make gcc g++ python3

COPY . .
COPY .env.prod ./.env
RUN pnpm install
RUN pnpm add @swc/core
RUN pnpm build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

# WORKDIR /home/node/app
COPY package*.json  ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --production

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build
COPY --from=builder /home/node/app/.next ./.next

# Copy next.config.js and its dependencies
COPY --from=builder /home/node/app/next.config.js ./next.config.js
COPY --from=builder /home/node/app/csp.js ./csp.js
COPY --from=builder /home/node/app/redirects.js ./redirects.js

EXPOSE 80

# RUN npx next experimental-generate
CMD ["node", "dist/server.js"]
