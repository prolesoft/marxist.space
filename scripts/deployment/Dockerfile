FROM node:13-alpine as build
WORKDIR /app
COPY --chown=node:node . .
RUN npm run install-all && \
    npm run build && \
    rm -rf node_modules server/node_modules client/node_modules && \
    cd server && \
    npm ci --production --no-optional

FROM node:13-alpine as prod
COPY --from=build /app /app
WORKDIR /app/server
USER node
ENV NODE_ENV=production \
    TERM=linux \
    TERMINFO=/etc/terminfo \
    PORT=9090
EXPOSE 9090
HEALTHCHECK --interval=30s \
    --timeout=2s \
    --retries=10 \
    CMD node /scripts/deployment/healthcheck.js
CMD ["node", "."]
