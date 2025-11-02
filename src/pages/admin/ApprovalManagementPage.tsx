import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import type { User } from '@/types';
import toast from 'react-hot-toast';

export const ApprovalManagementPage = () => {
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users', filter],
    queryFn: async () => {
      const endpoint = filter === 'pending'
        ? '/api/admin/pending-approvals'
        : '/api/admin/users';
      return api.get<User[]>(endpoint);
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (userId: string) => {
      return api.post(`/api/admin/approve-user/${userId}`, {
        adminId: currentUser?.id,
      });
    },
    onSuccess: () => {
      toast.success('User approved successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Failed to approve user');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (userId: string) => {
      return api.post(`/api/admin/reject-user/${userId}`, {
        adminId: currentUser?.id,
      });
    },
    onSuccess: () => {
      toast.success('User rejected successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Failed to reject user');
    },
  });

  const filteredUsers = filter === 'pending'
    ? users
    : users?.filter(u => u.role !== 'admin');

  const getApprovalBadge = (user: User) => {
    const status = user.approvalStatus || 'PENDING';
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      AUTO_APPROVED: 'bg-blue-100 text-blue-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      student: 'bg-blue-100 text-blue-800',
      teacher: 'bg-purple-100 text-purple-800',
      principal: 'bg-indigo-100 text-indigo-800',
      it_admin: 'bg-gray-100 text-gray-800',
      admin: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role] || 'bg-gray-100 text-gray-800'}`}>
        {role.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Approval Management</h1>
            <Link to="/admin" className="text-blue-600 hover:text-blue-800">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setFilter('pending')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  filter === 'pending'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Approvals
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  filter === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Users
              </button>
            </nav>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!isLoading && (!filteredUsers || filteredUsers.length === 0) && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">
              {filter === 'pending' ? 'No pending approvals.' : 'No users found.'}
            </p>
          </div>
        )}

        {!isLoading && filteredUsers && filteredUsers.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{user.phone || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getApprovalBadge(user)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {user.approvalStatus === 'PENDING' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveMutation.mutate(user.id)}
                              disabled={approveMutation.isPending}
                              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectMutation.mutate(user.id)}
                              disabled={rejectMutation.isPending}
                              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {user.approvalStatus !== 'PENDING' && (
                          <span className="text-gray-500">No actions available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredUsers?.length || 0} user{filteredUsers?.length !== 1 ? 's' : ''}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Users who are not approved within 24 hours will be automatically approved by the system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
