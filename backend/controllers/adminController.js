const User = require('../models/userModel');
const File = require('../models/fileModel');

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    // Get file count for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const fileCount = await File.countDocuments({ user: user._id });
        const files = await File.find({ user: user._id });
        const totalSize = files.reduce((acc, file) => acc + (file.fileSize || 0), 0);
        
        return {
          ...user.toObject(),
          fileCount,
          totalSize,
        };
      })
    );

    res.json(usersWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be "user" or "admin"' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from demoting themselves
    if (user._id.toString() === req.user._id.toString() && role === 'user') {
      return res.status(400).json({ message: 'You cannot demote yourself' });
    }

    user.role = role;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: `User role updated to ${role}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete yourself' });
    }

    // Delete all files belonging to this user
    const userFiles = await File.find({ user: user._id });
    
    // Delete from Cloudinary
    const cloudinary = require('../config/cloudinary');
    for (const file of userFiles) {
      try {
        const resourceType = file.fileType.startsWith('image/') ? 'image' : 'raw';
        await cloudinary.uploader.destroy(file.cloudinaryId, { resource_type: resourceType });
      } catch (err) {
        console.error('Error deleting file from Cloudinary:', err);
      }
    }

    // Delete files from database
    await File.deleteMany({ user: user._id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({ 
      message: 'User and all their files deleted successfully',
      deletedFiles: userFiles.length 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get platform statistics (Admin only)
// @route   GET /api/admin/stats
// @access  Private/Admin
const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalFiles = await File.countDocuments();
    
    const allFiles = await File.find({});
    const totalStorage = allFiles.reduce((acc, file) => acc + (file.fileSize || 0), 0);

    // Recent users (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentUsers = await User.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });

    // Recent files (last 7 days)
    const recentFiles = await File.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });

    res.json({
      totalUsers,
      totalAdmins,
      totalRegularUsers: totalUsers - totalAdmins,
      totalFiles,
      totalStorage,
      recentUsers,
      recentFiles,
      averageFilesPerUser: totalUsers > 0 ? (totalFiles / totalUsers).toFixed(2) : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getPlatformStats,
};
