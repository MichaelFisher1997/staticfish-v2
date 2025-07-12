# Use the official Bun image as a parent image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies. This is cached by Docker.
COPY package.json bun.lockb* ./
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5050

# Set the host to allow external connections
ENV HOST=0.0.0.0

# Run the Astro development server
# This will use the Cloudflare adapter's dev server (wrangler) automatically.
CMD ["bun", "run", "dev", "--", "--host", "--port", "5050"]