const { cloud } = require('../models/imageModel');

const getBannerLink = async (imageData) => {
  return (
    await cloud.v2.uploader.upload(imageData, { folder: 'BusinessBanners' })
  ).secure_url;
};

module.exports = { getBannerLink };
