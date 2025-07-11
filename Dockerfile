FROM oven/bun:latest AS runtime
WORKDIR /app

# Install wget for the healthcheck, which is required by the deployment platform
RUN apt-get update && apt-get install -y --no-install-recommends wget && rm -rf /var/lib/apt/lists/*

COPY . .

RUN bun install
RUN bun run build

ENV HOST=0.0.0.0
ENV PORT=5050
EXPOSE 5050

# Healthcheck to allow the deployment platform to verify the app is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5050/ || exit 1

CMD ["bun", "run", "dist/server/entry.mjs"]