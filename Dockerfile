# Use Node.js (full image for Cloudflare workerd compatibility)
FROM node:22-slim

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5050

# Set the host to allow external connections
ENV HOST=0.0.0.0

# Run the Astro development server
CMD ["npx", "astro", "dev", "--host", "--port", "5050"]