# Use Bun for faster builds
FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .

ENV HOST=0.0.0.0
ENV PORT=5050

CMD ["bun", "dev", "--host", "--port", "5050"]
