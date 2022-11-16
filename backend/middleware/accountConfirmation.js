const jsonwebtoken= require("jsonwebtoken");
const {sendEmail} = require("../controllers/emails")
const JWT_SECRET = "ASEDsano17sdskan216754dio_peuba64ifuwiqaso832jdehifncmaofi522351'112Hda"
const { createUser,getUser} = require("../controllers/User");
const {getBusiness} = require("../controllers/Business");
const {checkEmail} = require("../controllers/blacklist")
const fs=require("fs");
const { Console } = require("console");
const { storeImage } = require("./images");
let emailForm = fs.readFileSync(__dirname+"/../interface/emailForm.html",'utf-8');
var confirmationTokens=[]
//sends an activation email for the user to their email address
const sendConfirmationEmail =async(userData)=> {
  if(await checkEmail(userData.email)) return {success:false,msg:"email/domain blacklisted"}
  if(await getBusiness(userData.businessData.email)) return {success:false,msg:"business name already in use"}
  //userData.businessData.BannerLink=await storeImage(userData.businessData.BannerLink)
  var confirmationToken= await jsonwebtoken.sign(userData, JWT_SECRET,{expiresIn: '30m'})
  confirmationTokens.push(confirmationToken);
  // let replaceValue = `<input type='hidden' value='${String(confirmationToken)}' name='token'>
  // <button type='submit'>Authenticate Account</button>`
emailForm = emailForm.replace("{FORM_REPLACE}",String(confirmationToken));

  sendEmail(userData.email,"Account Confirmation",emailForm);
  
  return {success:true,msg:"Sent account authentication email"}
}
const recieveConfirmationToken = async(req,res)=>{
    // var {token}=req.query
    // let regex=  /confirmAccount\/(.+)/;
    // let token = req.originalUrl.match(regex)[1];
    // console.log(token, "29");
    // console.log(req.params);
    // console.log(req.body);
    let token = req.body.token;
    console.log(token);
    // console.log(req.originalUrl);
    if(!confirmationTokens.includes(token)){return {success:false,msg:"invalid token"}}
    var decoded=await jsonwebtoken.decode(token)
    if(Date.now()>=decoded.exp*1000){return {success:false,msg:"token expired"}}
    
    var tokenData=decoded.businessData
    delete confirmationTokens[token]
    return {success:true,decoded,msg:"account authenticated",tokenData}
    // req.body.token = tokenData;
    // next();
}

module.exports = {sendConfirmationEmail,recieveConfirmationToken}