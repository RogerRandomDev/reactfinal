const cloud = require('cloudinary');
require('dotenv').config();
const cloudConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloud.config(cloudConfig);
module.exports = { cloud, cloudConfig };
