import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { canAccessSystem } from '@/utils/approval';

export const ApprovalPendingPage = () => {
  const { user, logout } = useAuth();

  const isApproved = canAccessSystem(user);

  // If approved, show different message
  if (isApproved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Registration Approved!
            </h2>
            <p className="text-gray-600 mb-6">
              Your registration has been approved. You can now access all features.
            </p>
            <Link
              to={user?.role === 'student' ? '/student' : `/${user?.role?.replace('_', '-')}`}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
            <svg
              className="h-6 w-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Pending Approval
          </h2>

          <div className="text-left bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-700 mb-3">
              Your registration is pending admin approval.
            </p>
            <p className="text-sm text-yellow-700 mb-3">
              You will be automatically approved after <span className="font-semibold">24 hours</span> if admin doesn't respond.
            </p>
            <p className="text-sm text-yellow-700">
              For immediate access, please contact the admin at:
            </p>
            <p className="text-sm font-semibold text-yellow-800 mt-1">
              gajjelasuryateja2021@gmail.com
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to={user?.role === 'student' ? '/student' : `/${user?.role?.replace('_', '-')}`}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </Link>

            <button
              onClick={() => logout()}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <p>Your account details:</p>
            <p className="font-medium text-gray-700 mt-1">{user?.email}</p>
            <p className="text-gray-600">Role: {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
