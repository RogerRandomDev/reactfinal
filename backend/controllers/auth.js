require('dotenv').config();
const jsonwebtoken=require("jsonwebtoken");
const {connectDB} = require("../db/connect");
const {hashString,compareHash} = require("../middleware/hash")
const {getUser} = require("./User");




var tokens=[]

const login = async (userData) => {
    const { email, password } = userData;
    console.log(`${email} is trying to login ..`);
    var checkUser=await getUser(email);
    if(checkUser!=null&&compareHash(password,checkUser.password)) {
        var tokenData=jsonwebtoken.sign({user:checkUser.email}, process.env.JWT_SECRET,{expiresIn: '20m'})
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


//checks if it should change the token or not yet
const updateToken=async (oldToken)=>{
  if(isTokenExpired(oldToken)) return {success:false,msg:"token expired"};
  return await reloadToken(oldToken)
}

//reloads user token if the user has not logged out
const reloadToken=async (oldToken)=>{
  tokens=tokens.filter((myToken)=>myToken.token!=oldToken)
  const decoded=JSON.parse(decodeToken(oldToken))
  var tokenData=jsonwebtoken.sign({user:decoded.email}, process.env.JWT_SECRET,{expiresIn: '20m'})
  return tokenData
}
//checks if token is expired
const isTokenExpired=(token)=>{
  const jsonPayload=decodeToken(token)
  if(jsonPayload==null){return true}
  const { exp } = JSON.parse(jsonPayload);
  const expired = Date.now() >= exp * 1000
  return expired
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
const checkToken=(token)=>{return tokens.includes(token)}

  module.exports = {login,logout,reloadToken,updateToken,decodeToken,checkToken}