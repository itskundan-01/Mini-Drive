import api from './axios';

// Register a new user
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/users', { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during registration'
    );
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during login'
    );
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user profile'
    );
  }
};
