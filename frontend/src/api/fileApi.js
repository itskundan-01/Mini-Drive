import api from './axios';

// Upload a file
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to upload file'
    );
  }
};

// Get user's files
export const getUserFiles = async () => {
  try {
    const response = await api.get('/files/myfiles');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch files'
    );
  }
};

// Delete a file
export const deleteFile = async (fileId) => {
  try {
    const response = await api.delete(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to delete file'
    );
  }
};

// Get all files (Admin only)
export const getAllFiles = async () => {
  try {
    const response = await api.get('/files/all');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch all files'
    );
  }
};

// Get download URL for a file
export const getDownloadUrl = async (fileId) => {
  try {
    const response = await api.get(`/files/download/${fileId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to get download URL'
    );
  }
};
