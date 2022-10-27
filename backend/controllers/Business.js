const { connectDB } = require('../db/connect');
const BusinessModel = require('../models/businessModel');
require('dotenv').config();

//returns the business database content
const getBusiness = async (businessName) => {
  var output = [];
  try {
    await connectDB(process.env.MONGO_URI);
    await (output = await BusinessModel.find({ Name: businessName }));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};
//creates a business and adds it to the database
const createBusiness = async (businessData) => {
  if ((await getBusiness(businessData.Name).length) == 0) {
    return { success: false, msg: 'Business already exists with name' };
  }
  try {
    await connectDB(process.env.MONGO_URI);
    BusinessModel.create([businessData]);
  } catch (err) {
    console.log(err);
  }
  return { success: true, msg: 'Business Created successfully' };
};

module.exports = { getBusiness, createBusiness };
