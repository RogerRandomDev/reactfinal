require('dotenv').config();
const jsonwebtoken=require("jsonwebtoken");
const {connectDB} = require("../db/connect");
const {hashString,compareHash} = require("../middleware/hash")
const {getUser} = require("./User");
const timers=require("timers");
const { info } = require('console');



var tokens={}

const login = async (userData) => {
    const { email, password } = userData;
    console.log(`${email} is trying to login ..`);
    var checkUser=await getUser(email);
    if(checkUser!=null&&compareHash(password,checkUser.password)) {
        var tokenData=jsonwebtoken.sign({user:checkUser.email,userID:checkUser._id}, process.env.JWT_SECRET)
        startExpireToken(tokenData)
        return {success:true,token:tokenData,msg:"Login Token Generated",_id:checkUser._id}
    }
  
    return {success:false,msg:"Invalid Login",_id:null};
  };

  const logout = async(req,res) =>{
    const {token} = req.get("token");
    removerExpiredToken(token);
    return {success:true,msg:"removed login token"}
  }


//checks if it should change the token or not yet
const updateToken=async (oldToken)=>{
  if(checkToken(oldToken)) return {success:false,msg:"token expired"};
  return await reloadToken(oldToken)
}

//reloads user token if the user has not logged out
const reloadToken=async (oldToken)=>{
  const decoded=JSON.parse(decodeToken(oldToken))
  var tokenData=jsonwebtoken.sign({email:decoded.email,userID:decoded.userID}, process.env.JWT_SECRET)
  return tokenData
}


//decodes the token
const decodeToken=(token)=>{
  if(token==undefined||token.length<16){return null}
  
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}
//checks if token is valid
const checkToken=(token)=>{return token in tokens}
//starts the timer to expire the given token
const startExpireToken = (token)=>{
  tokens[token]=timers.setTimeout(()=>{removeExpiredToken(token)},2400000)
}
const resetExpirationTimer = (token)=>{
  timers.clearTimeout(tokens[token])
  startExpireToken(token)
}
//removes token once expired
const removeExpiredToken=(token)=>{
  delete tokens[token]
}

module.exports = {login,logout,reloadToken,updateToken,decodeToken,checkToken}