const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.load();

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.uploader.upload('recording.webm', { resource_type: 'video' }, function (error, result) {
  // if video has been loaded, then remove file from local storage
});
