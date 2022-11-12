const express = require('express')
const router = express.Router();
const {storeImage,removeImages,getImageName,uploadFromBuffer} = require('../middleware/images')

router.use((req,res,next)=>{  
    next();
})
router.post("/upload/:imageData",async (req,res)=>{
    const {imageData}=req.params
    const uploadResponse = await uploadFromBuffer(imageData);
    res.send(uploadResponse)
})


module.exports = router;