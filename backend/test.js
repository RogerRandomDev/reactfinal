const {getBusiness,createBusiness} = require('./controllers/Business');
const t = async () =>{
console.log(await createBusiness({
    "Name": "Realistic FPS games",
    "BannerLink":"none",
    "Password":"a",
    "ProductType":"Product",
    "TargetAudience":"Child",
    "Rating":5
}))}
t()

