import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function AdminDashboard() {
  const { user } = useAuth();

  const menuItems = [
    {
      title: 'System Status',
      path: '/status',
      description: 'Monitor API health and performance',
    },
    {
      title: 'User Management',
      path: '/admin/users',
      description: 'Manage students and teachers',
    },
    {
      title: 'Reports',
      path: '/admin/reports',
      description: 'View system reports and analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h2>
          <p className="mt-2 text-gray-600">Manage the evaluation system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <p className="text-3xl font-bold text-blue-600">-</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-1">Total Teachers</p>
            <p className="text-3xl font-bold text-green-600">-</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-1">Active Exams</p>
            <p className="text-3xl font-bold text-purple-600">-</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-1">System Status</p>
            <p className="text-3xl font-bold text-orange-600">UP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
