const express = require('express')

const { getUser, createUser, buildUserData } = require('../controllers/User');
const { login, logout, updateToken} = require('../controllers/auth');
const {sendConfirmationEmail,recieveConfirmationToken} = require("../middleware/accountConfirmation")

const router = express.Router();



router.use((req,res,next)=>{
  const token=req.headers.get("token")
  if(token==null||!findToken(token)){return res.status(202).send({success:false,msg:"Invalid Login Token"})}
  next();
})



router.post('/createAccount', async (req, res) => {
  const userData = buildUserData(req);
  sendConfirmationEmail(userData)
  return res.status(200).send({success:true,msg:"Sent confirmation email successfully"})
});

router.get('/Login', async (req, res) => {
  const userData = buildUserData(req);
  var log=await login(userData)
  console.log(log.msg)
  return await res.status(200).send(log);
});


router.get("/confirmAccount",async (req,res)=>{
  console.log("account authenticated")
  var userData=await recieveConfirmationToken(req,res)
  if(!userData.success) return res.send("Authentication Failed")
  await createUser(userData.decoded)
  if(userData.decoded.businessData!=""){await createBusiness(userData.decoded.businessData)}
  res.send("Account Authenticated")
})
router.post("/logout",async (req,res)=>{
  await logout(req,res)
  console.log("account logged out")
})
router.get("/show",async (req,res)=>{
  const email=req.header.get("email");
  const userData=await getUser(email);
  userData.password=null
  res.status(200).post(userData)
})

module.exports = router