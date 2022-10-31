const {getBusiness,createBusiness}=require('./controllers/Business');
const {getUser,createUser} = require('./controllers/User');
const {storeImage} = require('./middleware/images');
const fs=require("fs");
const {hashString} = require("./middleware/hash")
const upload_preset= require("./models/imageModel")
const {cloud,cloudConfig}=require("./models/imageModel");


const t = async (BannerData) =>{
    console.log(await createBusiness({
        "Name": "Realistic FPS games",
        "BannerLink":await storeImage(BannerData),
        "ProductType":"Product",
        "TargetAudience":"Child",
        "Rating":5
    }))}
t(__dirname+"/../src/img.jpg")

createUser({
    email:"ro@gmail.com",
    password:"testing",
    username:"its'a me",
    myBusiness:""
})
