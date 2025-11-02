import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    const dashboardPath = user.role === 'student' ? '/student' : `/${user.role}`;
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome back, {user.name}!</h1>
          <Link
            to={dashboardPath}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
            Evaluation Service
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Modern evaluation and exam management system for students and teachers
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Register
            </Link>
            <Link
              to="/status"
              className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              System Status
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For Students</h3>
              <p className="text-gray-600">
                Browse subjects, book exams, view scores, and manage your academic progress
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For Teachers</h3>
              <p className="text-gray-600">
                Grade students, manage evaluations, and track student performance
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For Admins</h3>
              <p className="text-gray-600">
                Manage registrations, monitor system health, and oversee operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
