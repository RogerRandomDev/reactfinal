const { cloud } = require('../models/imageModel');
let streamifier = require('streamifier');
const basePath="https://res.cloudinary.com/dztnsrrta/image/upload/"

//try avoiding this one if it is NOT a low res image.
//only really here still because it has it's use
//just use uploadFromBuffer when possible
const storeImage = async(imageData,uploadTo="default")=>{
  try{
  return (
    await cloud.v2.uploader.upload(imageData, { folder: uploadTo})
  ).secure_url.split(basePath)[1];
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

//testing this from online. thank you, google!
let uploadFromBuffer = (req) => {
  const {folder} = req.params;
  if(folder==null){folder="default"}
  return new Promise((resolve, reject) => {

    let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
     {
       folder
     },
     (error, result) => {

       if (result) {
         resolve(result);
       } else {
         reject(error);
        }
      }
    );

    streamifier.createReadStream(req.body).pipe(cld_upload_stream);
  });

};




module.exports = {storeImage,removeImages,getImageName,uploadFromBuffer};
