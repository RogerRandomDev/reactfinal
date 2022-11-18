const { connectDB } = require('../db/connect');
const { storeImage, removeImages} = require('../middleware/images');
const { checkToken, decodeToken } = require('./auth.js');
const ProductModel = require('../models/productModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
require('dotenv').config();
const productsPerPage = 50;

//returns products from given business/user
const getUserProducts = async (creatorID, viewPage = 0) => {
  var output = null;
  console.log(creatorID);
  try {
    await connectDB(process.env.MONGO_URI);
    output = await ProductModel.find({ creatorID }, null, {
      limit: productsPerPage,
      skip: viewPage * productsPerPage,
    });
  } catch (err) {
    console.log(err);
  }
  return output;
};

//returns the product from the id
const getProduct = async (productId) => {
  var output = null;
  try {
    await connectDB(process.env.MONGO_URI);
    // console.log(productId);
    // let id = mongoose.Types.ObjectId(productId);
    output = await ProductModel.findById(productId);
  } catch (err) {
    console.log(err);
  }
  return output;
};
const updateProduct = async (productID, productData, senderToken) => {
  var output = { success: false, msg: 'default output' };
  if (!checkToken(senderToken)) {
    return { success: false, msg: 'invalid sender token' };
  }
  console.log(productData)
  const senderData = decodeToken(senderToken);
  try {
    await connectDB(process.env.MONGO_URI);
    const creator = await userModel.findOne({ email: senderData.email });
    var imgUrls = []
    for (const image of productData.images) {
      imgUrls.push((image.includes('.jpg')?image:await storeImage(image[2], 'productImages')));
  }
      productData.images = imgUrls;
      (output = await ProductModel.findById(
        productID
      ));
    //if(output.creatorID!=senderData.userID){return {success:false,msg:"user ID does not match product creator"}}
    removeImages(output.images)
    await ProductModel.findByIdAndUpdate(
      productID,
      productData
    )
  } catch (err) {
    console.log(err);
  }
  return { success: true, output, msg: 'updated product data' };
};
const deleteProduct = async (productId) => {
  var output = null;
  try {
    await connectDB(process.env.MONGO_URI);
    output = await ProductModel.findByIdAndDelete(productId);
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};
//creates a product and adds it to the database
const createProduct = async (productData, userToken, userID) => {
  // console.log('69');

  if (!checkToken(userToken)) {
    return { success: false, msg: 'token invalid', _id: null };
  }
  const userData = await decodeToken(userToken);
  //if(userID!=userData.userID){return {success:false,msg:"user token does not match id",_id:null}}

  productData.creatorID = userID;
  productData.date = Date.now();
  var imgUrls = [];
  for (const image of productData.images) {
    imgUrls.push(await storeImage(image[2], 'productImages'));
  }
  productData.images = imgUrls;
  try {
    await connectDB(process.env.MONGO_URI);
    const newProduct = new ProductModel(productData);
    newProduct.save();
    productData._id = newProduct._id;
  } catch (err) {
    console.log(err);
  }
  return {
    success: true,
    msg: 'Product Created successfully',
    _id: productData._id,
  };
};

module.exports = {
  getProduct,
  getUserProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
