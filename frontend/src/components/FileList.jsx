import { useState } from 'react';
import { deleteFile } from '../api/fileApi';
import { FileImage, FileText, File, Music, Video, Eye, Trash2, User, Calendar, HardDrive, FolderOpen, Download } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FileList = ({ files, onDeleteSuccess, showUserInfo = false }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [hoveredFile, setHoveredFile] = useState(null);

  // Get current user info from localStorage
  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    setDeletingId(fileId);
    try {
      await deleteFile(fileId);
      toast.success('File deleted successfully');
      onDeleteSuccess();
    } catch (error) {
      toast.error(error.message || 'Failed to delete file');
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (file) => {
    try {
      const token = localStorage.getItem('token');
      // Use environment variable for API URL
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const viewUrl = `${apiUrl}/api/files/view/${file._id}?token=${token}`;
      window.open(viewUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('View error:', error);
      toast.error('Failed to view file');
    }
  };

  const handleDownload = async (file) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      
      // Use backend proxy endpoint to download with correct filename
      const response = await axios.get(
        `${apiUrl}/api/files/download/${file._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', // Important for file downloads
        }
      );

      // Create blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.fileName); // Use original filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return FileImage;
    if (fileType?.includes('pdf')) return FileText;
    if (fileType?.includes('doc')) return FileText;
    if (fileType?.includes('video')) return Video;
    if (fileType?.includes('audio')) return Music;
    return File;
  };

  if (files.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <FolderOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No files found</h3>
        <p className="text-slate-500">There are no files to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {files.map((file) => {
        const FileIcon = getFileIcon(file.fileType);
        const isHovered = hoveredFile === file._id;
        const currentUser = getCurrentUser();
        const isOwner = currentUser && file.user && (file.user._id === currentUser._id || file.user === currentUser._id);
        const isAdmin = currentUser && currentUser.role === 'admin';
        const canDelete = isOwner || isAdmin;
        
        return (
          <div
            key={file._id}
            onMouseEnter={() => setHoveredFile(file._id)}
            onMouseLeave={() => setHoveredFile(null)}
            className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 relative"
          >
            {/* File Preview/Icon Area */}
            <div className="h-40 bg-slate-50 flex items-center justify-center relative overflow-hidden">
              {file.fileType?.startsWith('image/') && file.cloudinaryUrl ? (
                <img
                  src={file.cloudinaryUrl}
                  alt={file.fileName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FileIcon className="h-16 w-16 text-slate-400" />
              )}
              
              {/* Hover Overlay with Actions */}
              {isHovered && (
                <div className="absolute inset-0 bg-slate-900 bg-opacity-75 flex flex-col items-center justify-center gap-2 p-3">
                  {/* View button for images, videos, and PDFs */}
                  {(file.fileType?.startsWith('image/') || 
                    file.fileType?.startsWith('video/') || 
                    file.fileType === 'application/pdf') && (
                    <button
                      onClick={() => handleView(file)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer min-w-[100px]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </button>
                  )}
                  
                  {/* Download button - show only for file owners (not for admin viewing others' files) */}
                  {isOwner && (
                    <button
                      onClick={() => handleDownload(file)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors cursor-pointer min-w-[100px]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                  
                  {/* Delete button - only for owners and admin */}
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(file._id)}
                      disabled={deletingId === file._id}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-slate-400 transition-colors cursor-pointer min-w-[100px]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>{deletingId === file._id ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* File Details */}
            <div className="p-4">
              {/* File Name */}
              <h3 className="text-sm font-medium text-slate-800 mb-2 truncate" title={file.fileName}>
                {file.fileName}
              </h3>

              {/* File Info */}
              <div className="space-y-1">
                <div className="flex items-center text-xs text-slate-500">
                  <HardDrive className="h-3 w-3 mr-1" />
                  <span>{formatSize(file.fileSize)}</span>
                </div>
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(file.createdAt)}</span>
                </div>
                {showUserInfo && file.user && (
                  <div className="flex items-center text-xs text-slate-500">
                    <User className="h-3 w-3 mr-1" />
                    <span className="truncate">{file.user.name}</span>
                  </div>
                )}
              </div>

              {/* File Type Badge */}
              <div className="mt-3">
                <span className="inline-block text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-700 font-medium capitalize">
                  {file.fileType?.split('/')[1] || 'file'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileList;
