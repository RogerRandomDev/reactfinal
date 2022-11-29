const { connectDB, process } = require('../db/connect');
const MessageModel = require('../models/MessageModel');
const { hashString } = require('../middleware/hash');

require('dotenv').config();

//sends message to the given receiver
//use userID for sender and receivers
//product should be the productID
const sendMessage = async (sender,receiver,message) => {
    try {
        await connectDB(process.env.MONGO_URI);
        
        const sentMsg=new MessageModel({sender,receiver,message})
        sentMsg.save()
        return {success:true,msg:"message sent"}
    }
    catch(err){

    const sentMsg = new MessageModel({ sender, receiver, product, message });
    sentMsg.save();
    return { success: true, msg: 'message sent' };
  } catch (err) {}
  return { success: false, msg: 'failed to send message' };
};
//Use userID here as well for getting messages
//productID for product here again
const getMessages = async (user1,user2) => {
    try{
        const h1=user1
        const h2=user2
        await connectDB(process.env.MONGO_URI)
        let list = await MessageModel.find({$or:[{"sender":h1,"receiver":h2},{"receiver":h1,"sender":h2}]}).sort({_id:-1}).limit(50)
        return {success:true,msg:"succeeded at getting user messaged with other user",list}
    }
    catch(err){

    }
    return {success:false,msg:"failed to obtain message list with other user"}
}

module.exports = {sendMessage,getMessages}
