FROM node:20-alpine3.16

ENV NX_DAEMON=false

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app && chown -R 1000:1000 /usr/src/app

RUN npm install -g pnpm@8.9.0 --loglevel notice && \
    npm install -g pm2 && \
    apk --no-cache add g++ make py3-pip

USER 1000

COPY --chown=1000:1000 .npmrc .npmrc-cloud package.json pnpm-lock.yaml ./

RUN pnpm config set auto-install-peers true && \
    pnpm config set node-linker hoisted

RUN pnpm install --frozen-lockfile --verbose

COPY --chown=1000:1000 providers ./providers
COPY --chown=1000:1000 apps/ws ./apps/ws
COPY --chown=1000:1000 libs/dal ./libs/dal
COPY --chown=1000:1000 libs/shared ./libs/shared
COPY --chown=1000:1000 libs/testing ./libs/testing
COPY --chown=1000:1000 packages/client ./packages/client
COPY --chown=1000:1000 packages/stateless ./packages/stateless
COPY --chown=1000:1000 packages/node ./packages/node
COPY --chown=1000:1000 packages/application-generic ./packages/application-generic
COPY --chown=1000:1000 tsconfig.json tsconfig.base.json pnpm-workspace.yaml ./

RUN pnpm build:ws

WORKDIR /usr/src/app/apps/ws
RUN cp src/.example.env dist/src/.env && \
    cp src/.env.test dist/src/.env.test && \
    cp src/.env.development dist/src/.env.development && \
    cp src/.env.production dist/src/.env.production

# Comando de execução
CMD [ "pm2-runtime", "dist/src/main.js" ]
