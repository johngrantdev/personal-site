FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /home/node/app

RUN apk add --no-cache make gcc g++ python3

COPY package*.json ./
# COPY yarn.lock ./

COPY . .
COPY .env.prod ./.env
RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

WORKDIR /home/node/app
COPY package*.json  ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build
# COPY --from=builder /home/node/app/migrations ./migrations
COPY --from=builder /home/node/app/.next ./.next

# Copy next.config.js and its dependencies
COPY --from=builder /home/node/app/next.config.js ./next.config.js
COPY --from=builder /home/node/app/csp.js ./csp.js
COPY --from=builder /home/node/app/redirects.js ./redirects.js

EXPOSE 80

# RUN npx next experimental-generate
CMD ["node", "dist/server.js"]
