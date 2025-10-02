const File = require('../models/fileModel');
const cloudinary = require('../config/cloudinary');

// @desc    Upload a file
// @route   POST /api/files
// @access  Private
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Cloudinary URL is now correctly formatted based on resource_type in storage config
    const cloudinaryUrl = req.file.path;

    // Create file document in database
    const file = await File.create({
      user: req.user._id,
      fileName: req.file.originalname,
      cloudinaryUrl: cloudinaryUrl,
      cloudinaryId: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all files for the logged-in user
// @route   GET /api/files/myfiles
// @access  Private
const getUserFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a file
// @route   DELETE /api/files/:id
// @access  Private
const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file or is an admin
    if (file.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this file' });
    }

    // Delete file from Cloudinary with correct resource_type
    const resourceType = file.fileType.startsWith('image/') ? 'image' : 'raw';
    await cloudinary.uploader.destroy(file.cloudinaryId, { resource_type: resourceType });

    // Delete file from database
    await File.findByIdAndDelete(req.params.id);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all files from all users (Admin only)
// @route   GET /api/files/all
// @access  Private/Admin
const getAllFiles = async (req, res) => {
  try {
    const files = await File.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download a file
// @route   GET /api/files/download/:id
// @access  Private
const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file or is an admin
    if (file.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this file' });
    }

    // Use axios to fetch the file from Cloudinary
    const axios = require('axios');
    
    try {
      // Fetch file from Cloudinary
      const response = await axios.get(file.cloudinaryUrl, {
        responseType: 'stream',
      });

      // Set proper headers for download
      res.setHeader('Content-Type', file.fileType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.fileName)}"`);
      if (file.fileSize) {
        res.setHeader('Content-Length', file.fileSize);
      }

      // Pipe the stream to response
      response.data.pipe(res);
    } catch (streamError) {
      console.error('Error streaming file:', streamError);
      res.status(500).json({ message: 'Failed to download file from storage' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    View/Stream a file (inline display)
// @route   GET /api/files/view/:id
// @access  Private
const viewFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file or is an admin
    // req.user._id is set by protectWithQuery middleware (can be string or ObjectId)
    const userId = req.user._id?.toString() || req.user._id;
    if (file.user.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this file' });
    }

    // Use axios to fetch the file from Cloudinary
    const axios = require('axios');
    
    try {
      // Fetch file from Cloudinary
      const response = await axios.get(file.cloudinaryUrl, {
        responseType: 'stream',
      });

      // Set proper headers for inline viewing (not download)
      res.setHeader('Content-Type', file.fileType || 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.fileName)}"`);
      if (file.fileSize) {
        res.setHeader('Content-Length', file.fileSize);
      }
      // Add CORS headers for cross-origin viewing
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

      // Pipe the stream to response
      response.data.pipe(res);
    } catch (streamError) {
      console.error('Error streaming file:', streamError);
      res.status(500).json({ message: 'Failed to view file from storage' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadFile,
  getUserFiles,
  deleteFile,
  getAllFiles,
  downloadFile,
  viewFile,
};
