const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getPlatformStats,
} = require('../controllers/adminController');

// All routes are protected and admin-only
router.use(protect, admin);

// Get all users
router.get('/users', getAllUsers);

// Update user role
router.put('/users/:id/role', updateUserRole);

// Delete user
router.delete('/users/:id', deleteUser);

// Get platform statistics
router.get('/stats', getPlatformStats);

module.exports = router;
