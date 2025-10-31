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
   git clone <repository-url>
   cd evaluation-service-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env.development
   ```

   Update the API base URL in `.env.development`:
   ```env
   VITE_API_BASE_URL=https://evaluation-service.onrender.com
   VITE_APP_NAME=Evaluation Service
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

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

The app connects to the backend API at `https://evaluation-service.onrender.com`

### Key Endpoints

- `/api/auth/*` - Authentication
- `/api/students/*` - Student management
- `/api/exams/*` - Exam and subject management
- `/api/evaluation/*` - Scores and grading
- `/actuator/health` - System health check

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

### GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to GitHub Pages

### Other Platforms

The built files in `dist` can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React + TypeScript**
