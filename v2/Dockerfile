FROM node:12-alpine
ENV appdir /app
# hadolint ignore=DL3018
RUN mkdir -p ${appdir} && \
    apk add --no-cache tzdata && \
    mv /usr/share/zoneinfo/America/Denver /etc/localtime && \
    echo "America/Denver" > /etc/timezone && \
    apk del tzdata
WORKDIR ${appdir}
COPY --chown=node:node . .
RUN npm ci && \
    npm run build && \
    rm -rf node_modules && \
    npm ci --production --no-optional
USER node
ENV NODE_ENV=production \
    TERM=linux \
    TERMINFO=/etc/terminfo \
    PORT=4000
EXPOSE 4000 6379
HEALTHCHECK --interval=30s \
    --timeout=2s \
    --start-period=10s \
    --retries=10 \
  CMD node ${appdir}/scripts/healthcheck.js
CMD ["node", "."]
