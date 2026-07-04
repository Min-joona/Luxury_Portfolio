const cloudinary = require('cloudinary').v2;

if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

async function uploadImage(base64Image) {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: 'portfolio',
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }]
  });
  return { url: result.secure_url, publicId: result.public_id };
}

async function deleteImage(publicId) {
  return cloudinary.uploader.destroy(publicId);
}

module.exports = { cloudinary, uploadImage, deleteImage };
