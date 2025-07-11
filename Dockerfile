FROM oven/bun:latest AS runtime
WORKDIR /app

# Install wget for the healthcheck, which is required by the deployment platform
RUN apt-get update && apt-get install -y --no-install-recommends wget && rm -rf /var/lib/apt/lists/*

COPY . .

RUN bun install
# Define build-time arguments
ARG RESEND_API_KEY
ARG TO_EMAIL
ARG FROM_EMAIL
ARG PUBLIC_CAPTCHA_ENABLED
ARG PUBLIC_TURNSTILE_SITE_KEY
ARG TURNSTILE_SECRET_KEY
ARG PUBLIC_SANITY_PROJECT_ID
ARG PUBLIC_SANITY_DATASET
ARG SANITY_PROJECT_ID
ARG SANITY_DATASET

# Set environment variables from the build-time arguments
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV TO_EMAIL=$TO_EMAIL
ENV FROM_EMAIL=$FROM_EMAIL
ENV PUBLIC_CAPTCHA_ENABLED=$PUBLIC_CAPTCHA_ENABLED
ENV PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY
ENV TURNSTILE_SECRET_KEY=$TURNSTILE_SECRET_KEY
ENV PUBLIC_SANITY_PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID
ENV PUBLIC_SANITY_DATASET=$PUBLIC_SANITY_DATASET
ENV SANITY_PROJECT_ID=$SANITY_PROJECT_ID
ENV SANITY_DATASET=$SANITY_DATASET

RUN bun run build

ENV HOST=0.0.0.0
ENV PORT=5050
EXPOSE 5050

# Healthcheck to allow the deployment platform to verify the app is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5050/ || exit 1

CMD ["bun", "run", "dist/server/entry.mjs"]