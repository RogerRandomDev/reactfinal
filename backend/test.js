const {getBusiness,createBusiness} = require('./controllers/Business');
const {getBannerLink} = require('./middleware/images');
const fs=require("fs");

const upload_preset= require("./models/imageModel")
const {cloud,cloudConfig}=require("./models/imageModel");


const t = async (BannerData) =>{
    console.log(await createBusiness({
        "Name": "Realistic FPS games",
        "BannerLink":await getBannerLink(BannerData),
        "ProductType":"Product",
        "TargetAudience":"Child",
        "Rating":5
    }))}
t(__dirname+"/../src/img.jpg")
console.log(getBusiness("Realistic FPS games"))