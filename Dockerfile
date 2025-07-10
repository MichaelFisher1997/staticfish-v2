FROM oven/bun:latest AS runtime
WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["bun", "run", "dist/server/entry.mjs"]