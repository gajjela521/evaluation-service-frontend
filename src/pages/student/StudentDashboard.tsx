import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function StudentDashboard() {
  const { user } = useAuth();

  const menuItems = [
    { title: 'Browse Subjects', path: '/student/subjects', description: 'View available subjects' },
    { title: 'Book Exam', path: '/student/book-exam', description: 'Schedule your exams' },
    { title: 'My Scores', path: '/student/scores', description: 'View your exam results' },
    { title: 'Profile', path: '/student/profile', description: 'Manage your profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h2>
          <p className="mt-2 text-gray-600">Manage your exams and view your academic progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
