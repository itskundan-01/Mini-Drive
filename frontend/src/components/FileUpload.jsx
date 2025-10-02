import { useState, useRef } from 'react';
import { uploadFile } from '../api/fileApi';
import { UploadCloud, FileImage, FileText, File, Music, Video, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate progress (since we don't have actual progress from the API)
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 200);

    try {
      await uploadFile(selectedFile);
      setUploadProgress(100);
      toast.success('File uploaded successfully!');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to upload file');
      setUploadProgress(0);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (!file) return File;
    const type = file.type;
    if (type.startsWith('image/')) return FileImage;
    if (type.includes('pdf')) return FileText;
    if (type.includes('doc')) return FileText;
    if (type.includes('video')) return Video;
    if (type.includes('audio')) return Music;
    return File;
  };

  const FileIcon = selectedFile ? getFileIcon(selectedFile) : null;

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 bg-white ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : selectedFile
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleInputChange}
          className="hidden"
          id="file-upload"
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.mp4,.mp3"
        />

        {!selectedFile ? (
          <div className="space-y-4">
            <UploadCloud className="h-16 w-16 text-slate-400 mx-auto" />
            <div>
              <p className="text-lg font-semibold text-slate-700 mb-2">
                {isDragging ? 'Drop your file here!' : 'Drag & drop your file here'}
              </p>
              <p className="text-slate-500 text-sm mb-4">or</p>
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Browse Files
              </label>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Supported: Images, PDF, Documents, Videos, Audio (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {FileIcon && <FileIcon className="h-16 w-16 text-indigo-600 mx-auto" />}
            <div className="bg-white rounded-lg border border-slate-200 p-4 max-w-md mx-auto">
              <p className="font-semibold text-slate-800 truncate mb-1">{selectedFile.name}</p>
              <p className="text-sm text-slate-600">Size: {formatSize(selectedFile.size)}</p>
              <p className="text-xs text-slate-500 mt-1">Type: {selectedFile.type || 'Unknown'}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="inline-flex items-center space-x-1 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Remove File</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Uploading...</span>
            <span className="font-semibold">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        type="submit"
        disabled={!selectedFile || uploading}
        className="w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white py-3.5 rounded-lg font-semibold text-base transition-colors disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {uploading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <UploadCloud className="h-5 w-5" />
            <span>Upload to Cloud</span>
          </>
        )}
      </button>
    </form>
  );
};

export default FileUpload;
