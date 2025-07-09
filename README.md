# Staticfish Astro Website

A high-performance static website built with Astro, featuring a Nordic dark theme and modern design.

## 🚀 Quick Start

### Development
```bash
bun install
cp .env.example .env
# Edit .env with your Resend API credentials
bun run dev
```

### Production

#### Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
RESEND_API_KEY=your_resend_api_key_here
TO_EMAIL=your-email@example.com
FROM_EMAIL=noreply@yourdomain.com
```

#### Using Docker
```bash
# Build and run with Docker
docker build -t staticfish-astro .
docker run -p 5050:5050 \
  -e RESEND_API_KEY=your_key \
  -e TO_EMAIL=your@email.com \
  -e FROM_EMAIL=noreply@yourdomain.com \
  staticfish-astro
```

#### Using Docker Compose
```bash
# Set environment variables in .env file
docker-compose up --build

# Run in background
docker-compose up -d --build
```

The site will be available at http://localhost:5050

## 📦 Docker Features

- **Bun runtime** for faster builds and smaller bundle sizes
- **Multi-stage build** for optimized image size
- **Nginx** for high-performance static file serving
- **Gzip compression** enabled
- **Security headers** configured
- **Health checks** included
- **Non-root user** for security
- **Production optimizations**

## 🛠 Development

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
```

## 📁 Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── layouts/     # Page layouts
│   ├── pages/       # File-based routing
│   └── styles/      # Global styles
├── Dockerfile       # Production container
├── nginx.conf       # Nginx configuration
└── docker-compose.yml
```

## 🎨 Features

- **Nordic Dark Theme** with custom CSS variables
- **Responsive Design** with Tailwind CSS
- **Hybrid Rendering** with static pages and API routes
- **Interactive Components** with React integration
- **Contact Form** with Resend email integration
- **SEO Optimized** with proper meta tags
- **Production Ready** with Docker deployment
