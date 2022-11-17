const { connectDB, process } = require('../db/connect');
const UserModel = require('../models/userModel');
const { hashString } = require('../middleware/hash');
const {sendConfirmationEmail} = require("../middleware/accountConfirmation")

require('dotenv').config();

//returns the user database content
const getUser = async (userEmail) => {
  let output = null;
  try {
    await connectDB(process.env.MONGO_URI);
    output = await UserModel.findOne({ email: userEmail });
  } catch (err) {
    console.log(err);
  }
  return output;
};
//returns user from database through the user id
const getUserByID = async (userID) => {
  var output = null;
  try {
    await connectDB(process.env.MONGO_URI);
    await (output = await UserModel.findById(userID));
  } catch (err) {
    console.log(err);
  }
  return output;
};
//creates a user and adds it to the database
const createUser = async (userData) => {

  userData={
    email:userData.email,
    password:userData.password,
    username:userData.username,
    myBusiness:userData.myBusiness,
    Location:userData.Location,
    joinDate:new Date().toDateString()
  };
  var _id=null;
  try {
    await connectDB(process.env.MONGO_URI);
    if (await UserModel.findOne({ email: userData.email })) {
      return { success: false, msg: 'User already exists with email' };
    }

    userData.password = await hashString(userData.password);
    console.log("🚀 ~ file: User.js ~ line 51 ~ createUser ~ userData", userData)

    const newUser = new UserModel(userData);
    await newUser.save();
    _id=newUser._id;
  } catch (err) {
    console.log(err);
  }
  return { success: true, msg: 'User Created successfully',_id};
};


const buildUserData = (req) => {
  
  const {email,password,username,myBusiness,businessData,Location}=JSON.parse(req.body)
  return {
    email,
    password,
    username,
    myBusiness,
    businessData,
    Location
  };
};

module.exports = { getUser, getUserByID, createUser, buildUserData };
