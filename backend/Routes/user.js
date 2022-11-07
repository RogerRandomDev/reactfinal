const express = require('express')

const { getUser, getUserByID, createUser, buildUserData } = require('../controllers/User');
const { login, logout, updateToken} = require('../controllers/auth');
const {sendConfirmationEmail,recieveConfirmationToken} = require("../middleware/accountConfirmation")
const {createBusiness} = require('../controllers/Business')
const router = express.Router();







router.post('/createAccount', async (req, res) => {
  const userData = buildUserData(req);
  sendConfirmationEmail(userData)
  return res.status(200).send({success:true,msg:"Sent confirmation email successfully"})
});

router.get('/Login', async (req, res) => {
  const userData = buildUserData(req);
  var log=await login(userData)
  
  return await res.status(200).send(log);
});


router.get("/confirmAccount",async (req,res)=>{
  console.log("account authenticated")
  var userData=await recieveConfirmationToken(req,res)
  console.log(userData)
  if(!userData.success) return res.send("Authentication Failed")
  await createUser(userData.decoded)
  console.log(userData.decoded)
  if(userData.decoded.businessData!=null){await createBusiness(userData.decoded.businessData)}
  res.send("Account Authenticated")
})
router.post("/logout",async (req,res)=>{
  await logout(req,res)
  console.log("account logged out")
})
router.get("/show",async (req,res)=>{
  const {user}=req.query;
  const userData=await getUserByID(user);
  userData.password=null
  res.status(200).send(userData)
})

module.exports = router