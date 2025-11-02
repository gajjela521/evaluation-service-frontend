import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { Student } from '@/types';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const student = user as Student;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <Link to="/student" className="text-blue-600 hover:text-blue-800">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
            <div className="flex items-center">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-600">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-6 text-white">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-blue-100">{student.email}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-sm text-gray-600">Enrollment Number</p>
                <p className="text-base font-medium text-gray-900">{student.enrollmentNumber}</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base font-medium text-gray-900">{student.email}</p>
              </div>
              {student.department && (
                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="text-base font-medium text-gray-900">{student.department}</p>
                </div>
              )}
              {student.semester && (
                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-600">Semester</p>
                  <p className="text-base font-medium text-gray-900">{student.semester}</p>
                </div>
              )}
              <div className="border-b border-gray-200 pb-3">
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-base font-medium text-gray-900 capitalize">{student.role}</p>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Account Status</p>
            <p className="text-lg font-semibold text-green-600">Active</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">User ID</p>
            <p className="text-lg font-semibold text-gray-900">{student.id}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Role</p>
            <p className="text-lg font-semibold text-blue-600 capitalize">{student.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
