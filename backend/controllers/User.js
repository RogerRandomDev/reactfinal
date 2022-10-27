const { connectDB, process } = require('../db/connect');
require('dotenv').config();
//returns the user database content
const getUser = async (userEmail) => {
    var output=null;
    try {
      await connectDB(process.env.MONGO_URI);
      await (output = await UserModel.findOne({ email: userEmail }));
      console.log(output);
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
      const newUser=new UserModel(userData);
      newUser.save()
    } catch (err) {
      console.log(err);
    }
    return { success: true, msg: 'User Created successfully' };
  };
  
  module.exports = { getUser, createUser };