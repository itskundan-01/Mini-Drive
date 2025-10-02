const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: [true, 'Please add a file name'],
    },
    cloudinaryUrl: {
      type: String,
      required: [true, 'Cloudinary URL is required'],
    },
    cloudinaryId: {
      type: String,
      required: [true, 'Cloudinary ID is required'],
    },
    fileType: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
