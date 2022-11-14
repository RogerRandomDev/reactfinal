const { cloud } = require('../models/imageModel');
const streamifier = require('streamifier');
const basePath="https://res.cloudinary.com/dztnsrrta/image/upload/"

//try avoiding this one if it is NOT a low res image.
//only really here still because it has it's use
//just use uploadFromBuffer when possible
const storeImage = async(imageData,uploadTo="default")=>{
  
  try{
  return (
    await uploadFromBuffer(imageData,uploadTo)
  );
  } catch(err){
    console.log(err)
  }
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
//moves files from the temp location to the final location
const moveFromTemp=async(imageUrl,moveTo)=>{
  const output=(await cloud.v2.uploader.upload(basePath+imageUrl,{folder:moveTo})).secure_url.split(basePath)[1]
  await cloud.v2.uploader.destroy(imageUrl)
  return output
}
//testing this from online. thank you, google!
let uploadFromBuffer = (imageData,folder) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloud.v2.uploader.upload_stream(
     {
       folder
     },
     (error, result) => {

       if (result) {
         resolve(result.secure_url.split(basePath)[1]);
       } else {
         reject(error);
        }
      }
    )

    streamifier.createReadStream(imageData).pipe(cld_upload_stream);
  });

};




module.exports = {storeImage,removeImages,getImageName,uploadFromBuffer,moveFromTemp};
