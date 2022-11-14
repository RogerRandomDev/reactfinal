const express = require('express');
const cors = require('cors');
const {
  getUser,
  getUserByID,
  createUser,
  buildUserData,
} = require('../controllers/User');

const { login, logout, updateToken, checkToken} = require('../controllers/auth');
const {storeImage, moveFromTemp} = require('../middleware/images')
const {
  sendConfirmationEmail,
  recieveConfirmationToken,
} = require('../middleware/accountConfirmation');
const { createBusiness } = require('../controllers/Business');
const { ImNext } = require('react-icons/im');
const router = express.Router();
// router.use(express.urlencoded({extended:true}));
//these do not require authentication since they relate to giving the user an auth token
router.options('*', cors());
router.post('/createAccount', async (req, res) => {
  const userData = buildUserData(req);
  console.log((Object.keys(req.body)[0],"temp"))
  const bod=JSON.parse(req.body)
  const Banner=await storeImage(bod.Banner,"temp");
  if(Banner!=null){
  userData.businessData=JSON.parse(userData.businessData)
  userData.businessData.BannerLink=Banner;}
  
  await sendConfirmationEmail(userData);
  return res
    .status(200)
    .send({ success: true, msg: 'Sent confirmation email successfully' });
});
router.get('/Login', async (req, res) => {
  const userData = buildUserData(req);
  var log = await login(userData);
  return await res.status(200).send(log);
});

router.post('/confirmAccount', async (req, res) => {
  console.log('account authenticated');
  var userData = await recieveConfirmationToken(req, res);
  // userData = JSON.parse(userData);
  userData.decoded.businessData.BannerLink=await moveFromTemp(
    userData.decoded.businessData.BannerLink,
    "BusinessBanners"
  )
  if(!userData.success) return res.send("Authentication Failed")
  // userData.decoded.businessData=JSON.parse(userData.decoded.businessData)
  //creates the business account for the user
  var _bus=await createBusiness(userData.decoded.businessData)
  
  userData.decoded.myBusiness=_bus._id
  console.log("45", userData.decoded);
  console.log(_bus.msg)
  if(_bus._id==null){return res.send("Authentication failed")}
  userData.icon=userData.decoded.businessData.BannerLink;
  const newUser=await createUser(userData.decoded)
  
  if(!newUser.success){return res.send(newUser)}
  

  if (!newUser.success) {
    return res.send(newUser);
  }

  var ID = newUser._id;
  res.send({ success: true, msg: 'account authenticated', _id: ID });
});
//these require authentication at the given time
router.all("/",async (req,res)=>{
  if(!checkToken(req.get("token"))||req.get("token")==undefined){return res.send("")}
  
  next(req,res)
})

router.post('/logout', async (req, res) => {
  await logout(req, res);
  console.log('account logged out');
});
router.get('/show', async (req, res) => {
  const { user } = req.query;
  const userData = await getUserByID(user);
  userData.password = null;
  res.status(200).send(userData);
});

module.exports = router;
