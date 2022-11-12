const express = require('express')
const router = express.Router();
const {storeImage,removeImages,getImageName,uploadFromBuffer} = require('../middleware/images')
//can't test this cause npm doesn't let me use npm i on my pc
//because screw me i guess.
const {fileUpload} = require("express-fileupload")

router.use(fileUpload({
    limits: {
        files: 1
    }
}))
router.use((req,res,next)=>{  
    next();
})
//uploads the given image to cloudinary and returns the response data
router.post("/upload/:imageData",async (req,res)=>{
    
    const {imageData}=req.files.file.data
    const uploadResponse = await uploadFromBuffer(imageData);
    res.send(uploadResponse)
})
//removes image with given url
router.post("/remove/:imageURL", async (req,res)=>{
    const {imageURL}=req.params
    const removeResponse= await removeImages([imageURL],"default")
    res.status(200).send({success:true,msg:"removed file from server"})
})

module.exports = router;