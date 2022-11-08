const express = require('express')

const router = express.Router();

router.use((req,res,next)=>{
    next();
})

router.get("/show",async (req,res)=>{
    
})


module.exports = router