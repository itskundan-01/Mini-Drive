import api from './axios';

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch users'
    );
  }
};

// Update user role
export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to update user role'
    );
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to delete user'
    );
  }
};

// Get platform statistics
export const getPlatformStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch statistics'
    );
  }
};
