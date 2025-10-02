const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const jwt = require('jsonwebtoken');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  uploadFile,
  getUserFiles,
  deleteFile,
  getAllFiles,
  downloadFile,
  viewFile,
} = require('../controllers/fileController');

// Middleware to check auth from header OR query param (for view endpoint)
const protectWithQuery = async (req, res, next) => {
  let token;

  // Check for token in Authorization header first
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check for token in query parameter
  else if (req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Use decoded.id to match the token payload structure
    req.user = { _id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine resource_type based on file mimetype
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');
    
    return {
      folder: 'mini-drive',
      resource_type: isImage ? 'image' : isVideo ? 'video' : 'raw',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'txt', 'mp4', 'mp3'],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Upload a file
router.post('/', protect, upload.single('file'), uploadFile);

// Get user's files
router.get('/myfiles', protect, getUserFiles);

// View a file (inline display - for PDFs, videos, etc.)
router.get('/view/:id', protectWithQuery, viewFile);

// Download a file (force download)
router.get('/download/:id', protect, downloadFile);

// Delete a file
router.delete('/:id', protect, deleteFile);

// Get all files (Admin only)
router.get('/all', protect, admin, getAllFiles);

module.exports = router;
