const express = require('express')

const { getUser, getUserByID, createUser, buildUserData } = require('../controllers/User');
const { login, logout, updateToken} = require('../controllers/auth');
const {sendConfirmationEmail,recieveConfirmationToken} = require("../middleware/accountConfirmation")
const {createBusiness} = require('../controllers/Business')
const router = express.Router();







router.post('/createAccount', async (req, res) => {
  const userData = buildUserData(req);
  userData.businessData=await JSON.parse(userData.businessData)
  
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
  
  if(!userData.success) return res.send("Authentication Failed")
  //creates the business account for the user
  
  var _bus=await createBusiness(userData.tokenData)
  userData.decoded.myBusiness=_bus._id
  userData.decoded.Location=userData.decoded.myBusiness.Location
  if(_bus._id==null){return res.send("Authentication failed")}
  const newUser=await createUser(userData.decoded)
  
  if(!newUser.success){return res.send(newUser)}
  

  var ID=newUser._id
  res.send({success:true,msg:"account authenticated",'_id':ID})
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