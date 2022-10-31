const { cloud } = require('../models/imageModel');

const storeImage = async(imageData,uploadTo="default")=>{
  return (
    await cloud.v2.uploader.upload(imageData, { folder: uploadTo})
  ).secure_url;
}


module.exports = {storeImage};
