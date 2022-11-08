const express = require('express')

const { getUser, getUserByID, createUser, buildUserData } = require('../controllers/User');
const { login, logout, updateToken} = require('../controllers/auth');
const {sendConfirmationEmail,recieveConfirmationToken} = require("../middleware/accountConfirmation")
const {createBusiness} = require('../controllers/Business')
const router = express.Router();







router.post('/createAccount', async (req, res) => {
  const userData = buildUserData(req);
  userData.businessData=await JSON.parse(userData.businessData)
  console.log(userData)
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
  const newUser=await createUser(userData.decoded)
  if(!newUser.success){return res.send(newUser)}
  //creates the business account for the user
  await createBusiness(userData.tokenData)

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