const cloud=require("cloudinary");
const BannerPreset=cloud.v2.api
.create_upload_preset(
  { name: "Banner", 
    unsigned: true, 
    folder: "CompanyBanners" });
console.log(BannerPreset)

module.exports = BannerPreset;