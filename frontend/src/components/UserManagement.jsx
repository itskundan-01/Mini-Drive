import { useState } from 'react';
import { updateUserRole, deleteUser } from '../api/adminApi';
import { Shield, User, Trash2, Users as UsersIcon, ArrowUp, ArrowDown } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = ({ users, onUpdate }) => {
  const [loadingUserId, setLoadingUserId] = useState(null);

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const confirmed = window.confirm(
      `Are you sure you want to ${newRole === 'admin' ? 'promote' : 'demote'} this user to ${newRole}?`
    );

    if (!confirmed) return;

    setLoadingUserId(userId);
    try {
      await updateUserRole(userId, newRole);
      toast.success(`User ${newRole === 'admin' ? 'promoted to' : 'demoted to'} ${newRole}`);
      onUpdate();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${userName}"? This will also delete all their files. This action cannot be undone.`
    );

    if (!confirmed) return;

    setLoadingUserId(userId);
    try {
      const result = await deleteUser(userId);
      toast.success(`User deleted successfully. ${result.deletedFiles} files removed.`);
      onUpdate();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingUserId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-700">
          User Management
        </h2>
        <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {users.length} users
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Files
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Storage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-800">{user.name}</div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.role === 'admin' ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded bg-indigo-100 text-indigo-700">
                      <Shield className="h-3 w-3" />
                      <span>Admin</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 text-slate-700">
                      <User className="h-3 w-3" />
                      <span>User</span>
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                  {user.fileCount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                  {formatSize(user.totalSize || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRoleChange(user._id, user.role)}
                      disabled={loadingUserId === user._id}
                      className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        user.role === 'admin'
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {user.role === 'admin' ? (
                        <>
                          <ArrowDown className="h-3 w-3" />
                          <span>Demote</span>
                        </>
                      ) : (
                        <>
                          <ArrowUp className="h-3 w-3" />
                          <span>Promote</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      disabled={loadingUserId === user._id}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
