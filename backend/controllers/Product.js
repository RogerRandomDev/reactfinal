const { connectDB } = require('../db/connect');
const ProductModel = require('../models/productModel');
require('dotenv').config();

//returns the business database content
const getProduct = async (productId) => {
  var output=null;
  try {
    await connectDB(process.env.MONGO_URI);
    (output=await ProductModel.findById(Number(productId)));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};

const updateProduct = async (productId) => {
  var output=null;
  try {
    await connectDB(process.env.MONGO_URI);
    (output=await ProductModel.findByIdAndUpdate(Number(productId)));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};
const deleteProduct = async (productId) => {
  var output=null;
  try {
    await connectDB(process.env.MONGO_URI);
    (output=await ProductModel.findByIdAndDelete(Number(productId)));
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