FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /home/node/app

RUN apk add --no-cache make gcc g++ python3

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .

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
COPY --from=builder /home/node/app/migrations ./migrations
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/media ./media

EXPOSE 80

CMD ["node", "dist/server.js"]
