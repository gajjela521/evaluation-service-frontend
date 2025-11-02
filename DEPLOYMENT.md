# Deployment Guide

Quick reference guide for deploying the Evaluation Service Frontend.

## Quick Start

### 1. Render (Easiest - Recommended)

```bash
# Just push to GitHub, then:
# 1. Go to https://dashboard.render.com/
# 2. New + → Blueprint
# 3. Select repo → Apply
# Done! ✓
```

### 2. Vercel (Fast)

```bash
npm install -g vercel
vercel --prod
```

### 3. Netlify (Simple)

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## Environment Variables

All platforms need these environment variables:

```env
VITE_API_BASE_URL=https://evaluation-service-latest.onrender.com
VITE_APP_NAME=Evaluation Service
```

## Live URLs

- **Backend API**: https://evaluation-service-latest.onrender.com
- **API Docs**: https://evaluation-service-latest.onrender.com/swagger-ui/index.html
- **Frontend** (after deployment): `https://your-app.onrender.com`

## Troubleshooting

### CORS Errors
- Backend is configured for: `*.onrender.com`, `vercel.app`, `github.io`
- If using custom domain, update backend `WebConfig.java`

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 502/503 Errors
- Backend on free tier spins down after 15 min inactivity
- First request takes 30-60s to wake up
- This is normal for free tier

## Need Help?

1. Check [README.md](./README.md) for detailed instructions
2. View backend repository: https://github.com/gajjela521/evaluation_service
3. Check API status: https://evaluation-service-latest.onrender.com/actuator/health
