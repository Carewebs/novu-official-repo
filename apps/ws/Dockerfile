FROM node:20-alpine3.16

ENV NX_DAEMON=false

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app && chown -R 1000:1000 /usr/src/app

RUN npm install -g pnpm@8.9.0 --loglevel notice && \
    npm install -g pm2 && \
    apk --no-cache add g++ make py3-pip

COPY .npmrc package.json pnpm-lock.yaml ./
RUN chown -R 1000:1000 /usr/src/app

USER 1000

RUN pnpm config set auto-install-peers true && \
    pnpm config set node-linker hoisted

RUN pnpm install --frozen-lockfile --verbose

COPY providers ./providers
COPY apps/ws ./apps/ws
COPY libs/dal ./libs/dal
COPY libs/shared ./libs/shared
COPY libs/testing ./libs/testing
COPY packages/client ./packages/client
COPY packages/stateless ./packages/stateless
COPY packages/node ./packages/node
COPY packages/application-generic ./packages/application-generic
COPY tsconfig.json tsconfig.base.json pnpm-workspace.yaml ./

RUN pnpm build:ws

WORKDIR /usr/src/app/apps/ws
RUN cp src/.example.env dist/src/.env && \
    cp src/.env.test dist/src/.env.test && \
    cp src/.env.development dist/src/.env.development && \
    cp src/.env.production dist/src/.env.production

CMD [ "pm2-runtime", "dist/src/main.js" ]
