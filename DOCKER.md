# Docker Deployment Guide

This guide explains how to run the Evaluation Service Frontend using Docker.

## Prerequisites

- Docker installed (Docker Desktop for Mac/Windows or Docker Engine for Linux)
- Docker Compose (included with Docker Desktop)

## Quick Start

### Option 1: Frontend Only

```bash
# Build and run frontend container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The frontend will be available at http://localhost:3000

### Option 2: Full Stack (Frontend + Backend)

```bash
# Create .env file with your credentials
cp .env.example .env
# Edit .env with your actual values

# Run both frontend and backend
docker-compose -f docker-compose.fullstack.yml up -d

# View logs
docker-compose -f docker-compose.fullstack.yml logs -f

# Stop all services
docker-compose -f docker-compose.fullstack.yml down
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8081
- API Docs: http://localhost:8081/swagger-ui/index.html

## Docker Commands

### Build Image

```bash
docker build -t evaluation-frontend:latest .
```

### Run Container

```bash
docker run -d \
  --name evaluation-frontend \
  -p 3000:80 \
  evaluation-frontend:latest
```

### View Logs

```bash
docker logs -f evaluation-frontend
```

### Stop Container

```bash
docker stop evaluation-frontend
docker rm evaluation-frontend
```

## Environment Variables

When building the Docker image, you can pass environment variables:

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://your-api.com \
  --build-arg VITE_APP_NAME="Your App Name" \
  -t evaluation-frontend:latest .
```

## Health Check

The container includes a health check endpoint:

```bash
# Check if container is healthy
docker ps

# Access health endpoint
curl http://localhost:3000/health
```

## Deploy to Render

### Option 1: Static Site (Recommended)

The current `render.yaml` is configured for static site deployment:

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. New + → Blueprint
4. Select repository
5. Deploy automatically

### Option 2: Docker Deployment

To use Docker on Render:

1. In `render.yaml`, uncomment the Docker service section
2. Comment out the static site section
3. Push to GitHub
4. Render will build and deploy the Docker image

## Production Considerations

### Nginx Configuration

The `nginx.conf` file includes:
- SPA routing (serves index.html for all routes)
- Gzip compression
- Security headers
- Static asset caching
- Health check endpoint

### Security

- Non-root user in container
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- No sensitive data in image
- Environment variables for configuration

### Performance

- Multi-stage build (smaller final image)
- Alpine-based images (minimal size)
- Static asset caching (1 year)
- Gzip compression enabled

## Troubleshooting

### Build Fails

```bash
# Clear Docker cache and rebuild
docker build --no-cache -t evaluation-frontend:latest .
```

### Container Won't Start

```bash
# Check logs
docker logs evaluation-frontend

# Inspect container
docker inspect evaluation-frontend
```

### Port Already in Use

```bash
# Use different port
docker run -d -p 8080:80 evaluation-frontend:latest
```

### Container is Unhealthy

```bash
# Check health
docker inspect --format='{{json .State.Health}}' evaluation-frontend

# Check nginx logs
docker exec evaluation-frontend cat /var/log/nginx/error.log
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build image
        run: docker build -t evaluation-frontend:${{ github.sha }} .

      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push evaluation-frontend:${{ github.sha }}
```

## Docker Image Size

Expected image sizes:
- Build stage: ~1.5 GB (Node.js + dependencies)
- Final image: ~50 MB (Nginx + built files)

The multi-stage build ensures only the necessary files are in the final image.

## Support

- Frontend Repo: https://github.com/gajjela521/evaluation-service-frontend
- Backend Repo: https://github.com/gajjela521/evaluation_service
- Issues: https://github.com/gajjela521/evaluation-service-frontend/issues
