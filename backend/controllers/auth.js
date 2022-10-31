require('dotenv').config();
const jsonwebtoken=require("jsonwebtoken");
const {connectDB} = require("../db/connect");
const {hashString,compareHash} = require("../middleware/hash")
const {getUser} = require("./User");
const JWT_SECRET = "ASEDsano17sdskan216754dio_peuba64ifuwiqaso832jdehifncmaofi522351'112Hda"



var tokens=[]

const login = async (userData) => {
    const { email, password } = userData;
    console.log(`${email} is trying to login ..`);
    var checkUser=await getUser(email);
    if(checkUser!=null&&compareHash(password,checkUser.password)) {
        var tokenData=jsonwebtoken.sign({user:checkUser.email}, JWT_SECRET)
        tokens.push(tokenData)
        return {success:true,token:tokenData,msg:"Login Token Generated"}
    }
  
    return {success:false,msg:"Invalid Login"};
  };

  const logout = async(req,res) =>{
    const {token} = req.header;
    tokens=tokens.filter((myToken)=>myToken.token!=token)
    return {success:true,msg:"removed login token"}
  }


  module.exports = {login,logout}