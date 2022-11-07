//TODO Update this and make it work with my routes

const { connectDB, process } = require('../db/connect');
const UserModel = require('../models/userModel');
const { hashString } = require('../middleware/hash');
const {sendConfirmationEmail} = require("../middleware/accountConfirmation")

require('dotenv').config();

//returns the user database content
const getUser = async (userEmail) => {
  var output = null;
  try {
    await connectDB(process.env.MONGO_URI);
    await (output = await UserModel.findOne({ email: userEmail }));
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
    joinDate:new Date().toDateString()
  };
  var _id=null;
  try {
    await connectDB(process.env.MONGO_URI);
    if (await UserModel.findOne({ email: userData.email })) {
      return { success: false, msg: 'User already exists with email' };
    }

    userData.password = await hashString(userData.password);
    const newUser = new UserModel(userData);
    newUser.save();
    _id=newUser._id;
  } catch (err) {
    console.log(err);
  }
  return { success: true, msg: 'User Created successfully',_id};
};


const buildUserData = (req) => {
  return {
    email: req.get('email'),
    password: req.get('password'),
    username: req.get('username'),
    myBusiness: req.get('mycompany'),
  };
};

module.exports = { getUser, getUserByID, createUser, buildUserData };
