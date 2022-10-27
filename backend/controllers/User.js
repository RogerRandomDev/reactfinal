const { connectDB } = require('../db/connect');
const UserModel = require('../models/UserModel');
require('dotenv').config();

//returns the User database content
const getUser = async (UserEmail) => {
  var output = [];
  try {
    await connectDB(process.env.MONGO_URI);
    await (output = await UserModel.find({ email: UserEmail }));
    console.log(output);
  } catch (err) {
    console.log(err);
  }
  return output;
};
//creates a User and adds it to the database
const createUser = async (UserEmail, UserPassword) => {
  if ((await getUser(UserEmail.Name).length) == 0) {
    return { success: false, msg: 'User already exists with email' };
  }
  try {
    await connectDB(process.env.MONGO_URI);
    UserModel.create([UserEmail, UserPassword]);
  } catch (err) {
    console.log(err);
  }
  return { success: true, msg: 'User Created successfully' };
};

module.exports = { getUser, createUser };
