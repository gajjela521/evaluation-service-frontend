# Evaluation Service Frontend

A modern, full-featured evaluation and exam management system built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Student Portal
- **Student Registration** - Create account with enrollment details
- **Subject Browser** - View available subjects and their details
- **Exam Booking** - Book exam slots with real-time availability
- **Scores & Grades** - View exam results with detailed analytics
- **Profile Management** - View and manage personal information

### Teacher Portal
- **Grading System** - Submit and manage student scores
- **Subject Management** - View assigned subjects
- **Profile** - Manage teacher profile

### Admin Portal
- **System Dashboard** - Overview of system status and statistics
- **User Management** - Manage students and teachers
- **System Reports** - Access to system analytics

### System Monitoring
- **Real-time Status Dashboard** - Monitor API health and performance
- **Response Time Tracking** - Visualize endpoint performance with Chart.js
- **Automatic Health Checks** - 30-second refresh interval
- **Public Access** - No authentication required for status page

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router v6
- **State Management**: TanStack Query v5
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v3
- **Form Validation**: React Hook Form + Zod
- **Charts**: Chart.js + react-chartjs-2
- **Notifications**: React Hot Toast
- **Testing**: Vitest + React Testing Library

## 📋 Prerequisites

- Node.js 18.x or higher (20.19+ or 22.12+ recommended for Vite 7)
- npm 10.x or higher

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gajjela521/evaluation-service-frontend.git
   cd evaluation-service-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file for local development:
   ```env
   VITE_API_BASE_URL=http://localhost:8081
   VITE_APP_NAME=Evaluation Service
   ```

   For production, the `.env.production` file is already configured:
   ```env
   VITE_API_BASE_URL=https://evaluation-service-latest.onrender.com
   VITE_APP_NAME=Evaluation Service
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

5. **Start backend (optional for local development)**

   If you want to run the backend locally:
   ```bash
   cd ../evaluation-service
   ./gradlew bootRun --args='--spring.profiles.active=local'
   ```

   Backend will run on `http://localhost:8081`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## 🗂️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── Loading.tsx
│   └── ProtectedRoute.tsx
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── pages/             # Page components
│   ├── auth/          # Authentication pages
│   ├── student/       # Student portal pages
│   ├── teacher/       # Teacher portal pages
│   ├── admin/         # Admin portal pages
│   └── status/        # System status page
├── services/          # API services
│   ├── api.ts         # Base API client
│   ├── auth.service.ts
│   ├── exam.service.ts
│   ├── score.service.ts
│   └── monitoring.service.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── config/            # Configuration files
│   └── env.ts
├── test/              # Test setup
│   └── setup.ts
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## 🔐 Authentication

The app uses JWT-based authentication. Tokens are stored in localStorage and automatically included in API requests.

### User Roles

- **Student** - Access to student portal features
- **Teacher** - Access to teacher portal features
- **Admin** - Access to admin portal features

### Protected Routes

All portal pages are protected and require authentication. Users are automatically redirected to the login page if not authenticated.

## 🌐 API Integration

The app connects to the backend API:
- **Production**: `https://evaluation-service-latest.onrender.com`
- **Local Development**: `http://localhost:8081`
- **API Documentation**: [Swagger UI](https://evaluation-service-latest.onrender.com/swagger-ui/index.html)

### Key Endpoints

- `/api/auth/*` - Authentication
- `/api/students/*` - Student management
- `/api/exams/*` - Exam and subject management
- `/evaluation/sheets` - Score submission and grading
- `/actuator/health` - System health check

### Backend Repository

The backend is built with Spring Boot and can be found at:
- Repository: [evaluation-service](https://github.com/gajjela521/evaluation_service)
- Live API: https://evaluation-service-latest.onrender.com

## 🎨 Styling

The project uses Tailwind CSS for styling. Custom configurations can be found in `tailwind.config.js`.

## 🧪 Testing

Tests are written using Vitest and React Testing Library.

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui
```

## 🚀 Deployment

This project is configured for easy deployment to multiple platforms.

### Deploy to Render (Recommended)

Render is configured via `render.yaml` and will automatically deploy on push.

**Option 1: Using Render Dashboard**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Connect repository: `gajjela521/evaluation-service-frontend`
4. Render auto-detects `render.yaml` configuration
5. Click **"Create Static Site"**
6. Wait 2-3 minutes for deployment

**Option 2: Using Blueprint (Faster)**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Select repository: `gajjela521/evaluation-service-frontend`
4. Click **"Apply"**

**Configuration (already set in render.yaml):**
- Build Command: `npm install && npm run build`
- Publish Directory: `./dist`
- Auto-Deploy: Enabled on `main` branch

Your site will be live at: `https://evaluation-service-frontend.onrender.com` (or similar)

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gajjela521/evaluation-service-frontend)

**Manual Deployment:**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. For production:
   ```bash
   vercel --prod
   ```

**Configuration:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables (in Vercel Dashboard):**
```
VITE_API_BASE_URL=https://evaluation-service-latest.onrender.com
VITE_APP_NAME=Evaluation Service
```

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gajjela521/evaluation-service-frontend)

**Manual Deployment:**

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

**Configuration (netlify.toml):**

Create a `netlify.toml` file in the root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Environment Variables (in Netlify Dashboard):**
```
VITE_API_BASE_URL=https://evaluation-service-latest.onrender.com
VITE_APP_NAME=Evaluation Service
```

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Other Platforms

The built files in `dist` can be deployed to:
- **AWS S3 + CloudFront** - Static website hosting
- **Azure Static Web Apps** - Microsoft Azure hosting
- **Firebase Hosting** - Google Firebase
- **Cloudflare Pages** - Fast global CDN

### Important Notes

1. **Backend CORS**: The backend is configured to accept requests from:
   - `http://localhost:*` (local development)
   - `https://*.onrender.com` (Render deployments)
   - `https://evaluation-service-frontend.vercel.app` (Vercel)
   - `https://gajjela521.github.io` (GitHub Pages)

2. **Environment Variables**: Make sure to set `VITE_API_BASE_URL` in your deployment platform's environment variables.

3. **Free Tier Limitations**:
   - Render free tier spins down after 15 minutes of inactivity
   - First request may take 30-60 seconds to wake up
   - Consider upgrading for production use

4. **Automatic Deployments**: All platforms support automatic deployments on git push to main branch.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React + TypeScript**
