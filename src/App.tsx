import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ApprovalPendingPage } from './pages/auth/ApprovalPendingPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { SubjectsPage } from './pages/student/SubjectsPage';
import { BookExamPage } from './pages/student/BookExamPage';
import { ScoresPage } from './pages/student/ScoresPage';
import { ProfilePage } from './pages/student/ProfilePage';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { GradingPage } from './pages/teacher/GradingPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StatusPage } from './pages/status/StatusPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/approval-pending" element={<ApprovalPendingPage />} />

            {/* Student routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/subjects"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <SubjectsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/book-exam"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <BookExamPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/scores"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <ScoresPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/profile"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Teacher routes */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/grading"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <GradingPage />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Status page - public */}
            <Route path="/status" element={<StatusPage />} />

            {/* Fallback */}
            <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
            </Routes>
            <Toaster position="top-right" />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
