const jsonwebtoken= require("jsonwebtoken");
const {sendEmail} = require("../controllers/emails")
const JWT_SECRET = "ASEDsano17sdskan216754dio_peuba64ifuwiqaso832jdehifncmaofi522351'112Hda"
const { createUser } = require("../controllers/User");
const {checkEmail} = require("../controllers/blacklist")
const fs=require("fs")
const emailForm = fs.readFileSync(__dirname+"/../interface/emailForm.html",'utf-8');
var confirmationTokens=[]
//sends an activation email for the user to their email address
const sendConfirmationEmail =async(userData)=> {
  if(await checkEmail(userData.email)) return {success:false,msg:"email/domain blacklisted"}
  var confirmationToken= await jsonwebtoken.sign(userData, JWT_SECRET,{expiresIn: '30m'})
  confirmationTokens.push(confirmationToken)
  
  sendEmail(userData.email,"Account Confirmation",emailForm.replace("${AUTH_TOKEN}",String(confirmationToken)))
  return {success:true,msg:"Sent account authentication email"}
}
const recieveConfirmationToken = async(req,res)=>{
    var {token}=req.query
    if(!confirmationTokens.includes(token)) return {success:false,msg:"token invalid"}
    var decoded=await jsonwebtoken.decode(token)
    if(Date.now()>=decoded.exp*1000){return {success:false,msg:"token expired"}}
    
    return {success:true,decoded,msg:"account authenticated"}
}

module.exports = {sendConfirmationEmail,recieveConfirmationToken}