const { cloud } = require('../models/imageModel');
const streamifier = require('streamifier');
const basePath = 'https://res.cloudinary.com/dztnsrrta/image/upload/';
const imgFileRegex = /\.png|\.jpg|\.jpeg|\.jfif/;
//try avoiding this one if it is NOT a low res image.
//only really here still because it has it's use
//just use uploadFromBuffer when possible
const storeImage = async (imageData, uploadTo = 'default') => {
  try {
    return await uploadFromBuffer(imageData, uploadTo);
  } catch (err) {
    console.log(err);
  }
};
const removeImages = async (imageUrls, uploadedTo = 'default') => {
  await imageUrls.map((url) => {
    console.log(url);
    url = getImageName(url);
    if (url == null) {
      return;
    }
    cloud.v2.uploader.destroy(url);
  });
  return { success: true, msg: 'removed images from database' };
};
const removeImagesFromURL = async (imageUrls) => {
  console.log(imageUrls);
  removeImages(
    imageUrls.map((url) =>
      url != null && url.includes(basePath) ? url.split(basePath)[1] : url
    )
  );
  //imageUrls.map((url)=>{if(url!=null){cloud.v2.uploader.destroy(url[2].split(basePath)[1])}})
};
const getImageName = (imageUrl) => {
  if (imageUrl == null) {
    return null;
  }
  var parts = imageUrl.split('/');
  parts.shift();

  return parts.join('/').replace(imgFileRegex, '');
};
//moves files from the temp location to the final location
const moveFromTemp = async (imageUrl, moveTo) => {
  const output = (
    await cloud.v2.uploader.upload(basePath + imageUrl, { folder: moveTo })
  ).secure_url.split(basePath)[1];
  await cloud.v2.uploader.destroy(imageUrl);

  return output;
};
//testing this from online. thank you, google!
let uploadFromBuffer = (imageData, folder) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloud.v2.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (result) {
          resolve(result.secure_url.split(basePath)[1]);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(imageData).pipe(cld_upload_stream);
  });
};

module.exports = {
  storeImage,
  removeImages,
  getImageName,
  uploadFromBuffer,
  moveFromTemp,
  removeImagesFromURL,
  basePath,
  imgFileRegex,
};
