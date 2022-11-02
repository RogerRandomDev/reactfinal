const jsonwebtoken= require("jsonwebtoken");
const {sendEmail} = require("../controllers/emails")
const JWT_SECRET = "ASEDsano17sdskan216754dio_peuba64ifuwiqaso832jdehifncmaofi522351'112Hda"
const { createUser } = require("../controllers/User");
var confirmationTokens=[]
//sends an activation email for the user to their email address
const sendConfirmationEmail =async(userData)=> {
  var confirmationToken= await jsonwebtoken.sign(userData, JWT_SECRET,{expiresIn: '30m'})
  confirmationTokens.push(confirmationToken)
  sendEmail(userData.email,"Account Confirmation",`<a class="btn btn-success" href="http://localhost:5000/user/confirmAccount/?token=${String(confirmationToken)}" target="_blank">Google</a>`)
}
const recieveConfirmationToken = async(req,res)=>{
    var {token}=req.query
    if(confirmationTokens.includes(token)){
        var decoded=await jsonwebtoken.decode(token)
        console.log(decoded)
        return decoded
    }
}

module.exports = {sendConfirmationEmail,recieveConfirmationToken}