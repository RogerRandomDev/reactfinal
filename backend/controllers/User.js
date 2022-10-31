//TODO Update this and make it work with my routes

const {connectDB,process}=require('../db/connect');
const UserModel=require("../models/userModel");
const {hashString} = require("../middleware/hash")
require('dotenv').config();


//returns the user database content
const getUser = async (userEmail) => {
    var output=null;
    try {
      await connectDB(process.env.MONGO_URI);
      await (output = await UserModel.findOne({ email: userEmail }));
    } catch (err) {
      console.log(err);
    }
    return output;
  };
  //creates a user and adds it to the database
  const createUser = async (userData) => {
    try {
      await connectDB(process.env.MONGO_URI);
      if(await UserModel.findOne({email:userData.email})){
        return { success: false, msg: 'User already exists with email' };
      }
      console.log(userData.password)
      userData.password=await hashString(userData.password);
      console.log(userData)
      const newUser=new UserModel(userData);
      
      newUser.save()
    } catch (err) {
      console.log(err);
    }
    return { success: true, msg: 'User Created successfully' };
  };

  const buildUserData=(req)=>{return {email:req.get("email"),password:req.get("password"),username:req.get("username"),mycompany:req.get("mycompany")}}

  module.exports = { getUser, createUser, buildUserData };
