const { connectDB } = require('../db/connect');
const BusinessModel = require('../models/businessModel');
const {storeImage}=require("../middleware/images")
require('dotenv').config();

//returns the business database content
const getBusiness = async (businessEmail) => {
  var output=null;
  try {
    await connectDB(process.env.MONGO_URI);
    await (output = await BusinessModel.findOne({ email: businessEmail }));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};
//creates a business and adds it to the database
const createBusiness = async (businessData) => {
  if(businessData.BannerLink!=null){businessData.BannerLink=await storeImage(businessData.BannerLink)}
  console.log(businessData)
  var _id=null;
  try {
    await connectDB(process.env.MONGO_URI);
    if(await BusinessModel.findOne({email:businessData.email})){
      return { success: false, msg: 'Business already exists with name' };
    }
    const newBusiness=new BusinessModel(businessData)
    newBusiness.save()
    _id=newBusiness._id
  } catch (err) {
    console.log(err);
  }
  return { success: true, msg: 'Business Created successfully',_id};
};

module.exports = { getBusiness, createBusiness };
