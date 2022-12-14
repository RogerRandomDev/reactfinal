const { connectDB, process } = require('../db/connect');
const MessageModel = require('../models/MessageModel');
const { hashString } = require('../middleware/hash');
const {decodeToken} = require('../controllers/auth');
require('dotenv').config();

//sends message to the given receiver
//use userID for sender and receivers
//product should be the productID
const sendMessage = async (sender,receiver,message) => {
    const {userID}=JSON.parse(decodeToken(sender));
    if(message.length>200){return {success:false,msg:"message is too long"}}
    try {
        await connectDB(process.env.MONGO_URI);
        
        const sentMsg=new MessageModel({sender:userID,receiver,message,time:Date.now()})
        sentMsg.save()
        return {success:true,msg:"message sent"}
    }
    catch(err){}
    return { success: false, msg: 'failed to send message' };

};
//Use userID here as well for getting messages
//productID for product here again
const getMessages = async (user1,user2) => {
    try{
        const h1=user1
        const h2=user2
        await connectDB(process.env.MONGO_URI);
        let list;
        if(h2 == null){
           list = await MessageModel.find({"sender":h1}).sort({time:-1}).distinct("receiver")
           list = [...list,...await MessageModel.find({"receiver":h1}).sort({time:-1}).distinct("sender")]
           list = [...new Set([...list])]
        }else{
           list = await MessageModel.find({$or:[{"sender":h1,"receiver":h2},{"receiver":h1,"sender":h2}]}).sort({time:-1}).limit(150)
        }
        return {success:true,msg:"succeeded at getting user messaged with other user",list}
    }
    catch(err){

    }
    return {success:false,msg:"failed to obtain message list with other user"}
}

module.exports = {sendMessage,getMessages}
