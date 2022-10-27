const { connectDB } = require('../db/connect');
const BusinessModel = require('../models/businessModel');
require('dotenv').config();

//returns the business database content
const getBusiness = async (businessName) => {
  var output=null;
  try {
    await connectDB(process.env.MONGO_URI);
    await (output = await BusinessModel.findOne({ Name: businessName }));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};
//creates a business and adds it to the database
const createBusiness = async (businessData) => {
  
  try {
    await connectDB(process.env.MONGO_URI);
    if(await BusinessModel.findOne({Name:businessData.Name})){
      return { success: false, msg: 'Business already exists with name' };
    }
    const newBusiness=new BusinessModel(businessData)
    newBusiness.save()
  } catch (err) {
    console.log(err);
  }
  return { success: true, msg: 'Business Created successfully' };
};

module.exports = { getBusiness, createBusiness };
