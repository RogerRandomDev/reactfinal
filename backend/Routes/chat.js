const express = require('express');
const cors = require('cors');
const router = express.Router();
const {decodeToken} = require("../controllers/auth")
const {sendMessage,getMessages,getConversations} = require('../controllers/chat')
router.options('*', cors());

router.use((req, res, next) => {
  next();
});

//returns messages between two users about given product
//send data in form {userToken,targetID,productID}
router.post("/getMessages",async (req,res)=>{
    const {userToken,targetID,productID}=JSON.parse(req.body)
    const {userID}=decodeToken(userToken)
    try{
        const output=await getMessages(userID,targetID,productID)
        return res.status(200).send({success:true,msg:"successfully returned messages",output})
    }
    catch(err){}
    return res.send({success:false,msg:"error getting messages"})
})
//returns message conversations
router.post("/getConversations",async (req,res)=>{
  const {userToken}=JSON.parse(req.body)
  const {userID}=decodeToken(userToken)
  try{
    const output=await getConversations(userID)
    return res.status(200).send(output)
  }catch(err){}
  res.status(200).send({success:false,msg:"error getting conversations"})
})



//socket-io socket
const socket = require("../middleware/chat");
const { request } = require('express');

//returns the list of unique conversations the user is having
module.exports = router;