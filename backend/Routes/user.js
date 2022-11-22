const express = require('express');
const cors = require('cors');
const {getUser,getUserByID,updateUserFavorites,createUser,buildUserData,} = require('../controllers/User');
const { getLocation } = require('../middleware/geo');
const {login,logout,updateToken,checkToken,} = require('../controllers/auth');
const { storeImage, moveFromTemp } = require('../middleware/images');
const {sendConfirmationEmail,recieveConfirmationToken,} = require('../middleware/accountConfirmation');
const { createBusiness } = require('../controllers/Business');
const { ImNext } = require('react-icons/im');
const {createAccount,linkAccount} = require('../middleware/stripe');
const router = express.Router();
// router.use(express.urlencoded({extended:true}));
//these do not require authentication since they relate to giving the user an auth token
router.options('*', cors());
router.use(express.text({ limit: '12mb' }));

router.put('/updateFavorites', async (req, res) => {
  const { userID, favorites } = JSON.parse(req.body);
  let data = await updateUserFavorites(userID, favorites);
  res.status(200).send(data);
});

router.post('/createAccount', async (req, res) => {
  const userData = buildUserData(req);
  const Banner = await storeImage(JSON.parse(req.body).Banner, 'temp');

  if (Banner != null) {
    userData.businessData = JSON.parse(userData.businessData);
    userData.businessData.BannerLink = Banner;
  }
  const IP = req.ip;
  var ipLocation = getLocation(IP);
  if (IP == '::1') {
    ipLocation = { country: 'a', region: 'b', city: 'c' };
  }
  userData.Location = [ipLocation.country, ipLocation.region, ipLocation.city];
  await sendConfirmationEmail(userData);
  return res
    .status(200)
    .send({ success: true, msg: 'Sent confirmation email successfully' });
});
router.post('/Login', async (req, res) => {
  const userData = buildUserData(req);

  var checkUser = await getUser(userData.email);
  var log = await login(userData, checkUser);
  return await res.status(200).send(log);
});

router.post('/confirmAccount', async (req, res) => {
  var userData = await recieveConfirmationToken(req, res);
  if (!userData.success) {
    return res
      .status(202)
      .send({ success: false, msg: 'Authentication failed' });
  }
  userData.decoded.businessData.BannerLink = await moveFromTemp(
    userData.decoded.businessData.BannerLink,
    'BusinessBanners'
  );
  if (!userData.success) return res.send('Authentication Failed');
  // userData.decoded.businessData=JSON.parse(userData.decoded.businessData)
  //creates the business account for the user
  
  var _bus = await createBusiness(userData.decoded.businessData);
  userData.decoded.icon = userData.decoded.businessData.BannerLink;
  userData.decoded.myBusiness = _bus._id;
  //set this up once we can actually use stripe
  //Credit unions do not like being used as banks for a business
  //const account = await createAccount(userData.decoded)
  //console.log(account)
  console.log(_bus.msg);
  //userData.decoded.card=account.id
  if (_bus._id == null) {
    return res.send('Authentication failed');
  }
  const newUser = await createUser(userData.decoded);

  if (!newUser.success) {
    return res.send(newUser);
  }

  if (!newUser.success) {
    return res.send(newUser);
  }

  var ID = newUser._id;
  res.send({ success: true, msg: 'account authenticated', _id: ID });
});
//these require authentication at the given time
router.all('/', async (req, res) => {
  if (!checkToken(req.get('token')) || req.get('token') == undefined) {
    return res.send({ success: false, msg: 'invalid/no token' });
  }

  next(req, res);
});

router.post('/logout', async (req, res) => {
  await logout(req, res);
  // console.log('account logged out');
});

router.post('/show', async (req, res) => {
  // console.log(req.body);
  const { user } = JSON.parse(req.body);
  const userData = await getUserByID(user);
  if (userData == null) {
    return res.status(202).send({ success: false });
  }
  userData.password = null;
  userData.card = null;
  res.status(200).send(userData);
});
router.post('/addCardData',async (req,res) => {

})



module.exports = router;
