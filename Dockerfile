# Use Node.js (full image for Cloudflare workerd compatibility)
FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

ENV HOST=0.0.0.0

CMD ["npx", "astro", "dev", "--host", "--port", "5050"]