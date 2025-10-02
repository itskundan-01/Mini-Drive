import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserFiles } from '../api/fileApi';
import { Folder, HardDrive, FileType, Plus, X, Loader2, FolderOpen } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import StatCard from '../components/StatCard';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await getUserFiles();
      setFiles(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadSuccess = () => {
    fetchFiles();
    setShowUpload(false);
  };

  // Calculate user statistics
  const totalSize = files.reduce((acc, file) => acc + (file.fileSize || 0), 0);
  const formatSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // File type breakdown
  const fileTypes = files.reduce((acc, file) => {
    const type = file.fileType?.split('/')[0] || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto" />
            <p className="mt-4 text-slate-600 text-base font-medium">Loading your files...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Welcome Message */}
        <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Welcome back, {user?.name || 'User'}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Manage your files securely
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full">
              <span className="text-lg font-bold text-indigo-600">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Folder}
            title="Total Files"
            value={files.length}
            subtitle="Files in your drive"
          />
          <StatCard
            icon={HardDrive}
            title="Storage Used"
            value={formatSize(totalSize)}
            subtitle="Total file storage"
          />
          <StatCard
            icon={FileType}
            title="File Types"
            value={Object.keys(fileTypes).length}
            subtitle="Different file types"
          />
        </div>

        {/* File Type Breakdown */}
        {Object.keys(fileTypes).length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Your File Collection
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(fileTypes).map(([type, count]) => (
                <div key={type} className="bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors">
                  <div className="text-2xl font-bold text-slate-800">{count}</div>
                  <div className="text-sm text-slate-600 capitalize mt-1">{type}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="mb-8">
          {!showUpload ? (
            <button
              onClick={() => setShowUpload(true)}
              className="w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Plus className="h-5 w-5" />
              <span>Upload New File</span>
            </button>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-700">
                  Upload File
                </h2>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FileUpload onUploadSuccess={handleUploadSuccess} />
            </div>
          )}
        </div>

        {/* Files Section */}
        {files.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <FolderOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No files yet</h3>
            <p className="text-slate-600 mb-6">
              Upload your first file to get started with Mini Drive
            </p>
            <button
              onClick={() => setShowUpload(true)}
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Plus className="h-4 w-4" />
              <span>Upload Now</span>
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-slate-700 mb-6">
              Your Files ({files.length})
            </h2>
            <FileList files={files} onDeleteSuccess={fetchFiles} showUserInfo={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
