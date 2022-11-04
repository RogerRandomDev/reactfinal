const { connectDB } = require('../db/connect');
const {decodeToken,checkToken} = require("./auth");
const ProductModel = require('../models/productModel');
const userModel = require('../models/userModel');
require('dotenv').config();

//returns the business database content
const getProduct = async (productId) => {
  var output=null;
  try {
    await connectDB(process.env.MONGO_URI);
    (output=await ProductModel.findById(productId));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};

const updateProduct = async (productID,productData,senderToken) => {
  var output={success:false,msg:"default output"};
  if(!checkToken(senderToken)){return {success:false,msg:"invalid sender token"}}
  const senderData=decodeToken(senderToken)
  try {
    await connectDB(process.env.MONGO_URI);
    const creator=await userModel.findOne({email:senderData.email})
    (output=await ProductModel.updateOne({_id:productID,creatorID:creator._id},productData));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return {success:true,output,msg:"updated product data"};
};
const deleteProduct = async (productId) => {
  var output=null;
  try {
    await connectDB(process.env.MONGO_URI);
    (output=await ProductModel.findByIdAndDelete(productId));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};
//creates a business and adds it to the database
const createProduct = async (productData) => {
  
  try {
    await connectDB(process.env.MONGO_URI);
    const newProduct=new ProductModel(productData)
    newProduct.save()
  } catch (err) {
    console.log(err);
  }
  return { success: true, msg: 'Product Created successfully' };
};

module.exports = { getProduct, createProduct, updateProduct, deleteProduct };