const { cloud } = require('../models/imageModel');

const storeImage = async(imageData,uploadTo="default")=>{
  return (
    await cloud.v2.uploader.upload(imageData, { folder: uploadTo})
  ).secure_url;
}
const removeImages = async(imageUrls,uploadedTo="default")=>{
  imageUrls=imageUrls.map((url)=>getImageName(url));
  await imageUrls.map((url)=>{cloud.v2.uploader.destroy(uploadedTo+"/"+url)})
  return {success:true,msg:"removed images from database"};
}
const getImageName=(imageUrl)=>{
  var parts=imageUrl.split("/")
  parts=parts[parts.length-1]
  return parts.replace(".jpg","")
}

module.exports = {storeImage,removeImages,getImageName};
