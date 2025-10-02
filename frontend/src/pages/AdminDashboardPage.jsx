import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllFiles } from '../api/fileApi';
import { getAllUsers, getPlatformStats } from '../api/adminApi';
import { Users, Folder, HardDrive, Shield, Activity, TrendingUp, RefreshCw, Loader2 } from 'lucide-react';
import FileList from '../components/FileList';
import UserManagement from '../components/UserManagement';
import StatCard from '../components/StatCard';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, files, users

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [filesData, usersData, statsData] = await Promise.all([
        getAllFiles(),
        getAllUsers(),
        getPlatformStats(),
      ]);
      setFiles(filesData);
      setUsers(usersData);
      setStats(statsData);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const formatSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto" />
            <p className="mt-4 text-slate-600 text-base font-medium">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-indigo-100 rounded-lg px-2.5 py-1 mb-2">
                <Shield className="h-3.5 w-3.5 text-indigo-600" />
                <span className="text-xs font-semibold text-indigo-600">Admin</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">
                Control Panel
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Manage users and platform activity
              </p>
            </div>
            <div className="hidden sm:block">
              <Shield className="h-10 w-10 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm p-1 flex space-x-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'files'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Folder className="h-4 w-4" />
            <span>Files</span>
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                title="Total Users"
                value={stats.totalUsers}
                subtitle={`${stats.recentUsers} new this week`}
              />
              <StatCard
                icon={Folder}
                title="Total Files"
                value={stats.totalFiles}
                subtitle={`${stats.recentFiles} uploaded this week`}
              />
              <StatCard
                icon={HardDrive}
                title="Total Storage"
                value={formatSize(stats.totalStorage)}
                subtitle={`Avg ${stats.averageFilesPerUser} files/user`}
              />
              <StatCard
                icon={Shield}
                title="Admins"
                value={stats.totalAdmins}
                subtitle={`${stats.totalRegularUsers} regular users`}
              />
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold text-slate-700 mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-800">New Users</p>
                      <p className="text-sm text-slate-600">Last 7 days</p>
                    </div>
                    <span className="text-2xl font-bold text-indigo-600">{stats.recentUsers}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-800">New Files</p>
                      <p className="text-sm text-slate-600">Last 7 days</p>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">{stats.recentFiles}</span>
                  </div>
                </div>
              </div>

              {/* Platform Health */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold text-slate-700 mb-4">
                  Platform Health
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-800">System Status</p>
                      <p className="text-sm text-slate-600">All systems operational</p>
                    </div>
                    <Activity className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-800">Avg Files per User</p>
                      <p className="text-sm text-slate-600">User engagement</p>
                    </div>
                    <span className="text-2xl font-bold text-indigo-600">{stats.averageFilesPerUser}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('users')}
                  className="flex flex-col items-start bg-indigo-50 hover:bg-indigo-100 rounded-lg p-4 transition-colors text-left border border-indigo-200"
                >
                  <Users className="h-6 w-6 text-indigo-600 mb-2" />
                  <div className="font-semibold text-slate-800">Manage Users</div>
                  <div className="text-sm text-slate-600">View and edit user roles</div>
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className="flex flex-col items-start bg-emerald-50 hover:bg-emerald-100 rounded-lg p-4 transition-colors text-left border border-emerald-200"
                >
                  <Folder className="h-6 w-6 text-emerald-600 mb-2" />
                  <div className="font-semibold text-slate-800">View All Files</div>
                  <div className="text-sm text-slate-600">Browse and manage files</div>
                </button>
                <button
                  onClick={fetchAllData}
                  className="flex flex-col items-start bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors text-left border border-slate-200"
                >
                  <RefreshCw className="h-6 w-6 text-slate-600 mb-2" />
                  <div className="font-semibold text-slate-800">Refresh Data</div>
                  <div className="text-sm text-slate-600">Update dashboard stats</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-semibold text-slate-700 mb-6">User Management</h2>
            <UserManagement users={users} onUpdate={fetchAllData} />
          </div>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div>
            <h2 className="text-xl font-semibold text-slate-700 mb-6">All Files ({files.length})</h2>
            <FileList files={files} onDeleteSuccess={fetchAllData} showUserInfo={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
