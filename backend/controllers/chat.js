const { connectDB, process } = require('../db/connect');
const MessageModel = require('../models/MessageModel');
const { hashString } = require('../middleware/hash');

require('dotenv').config();

//sends message to the given receiver
//use userID for sender and receivers
//product should be the productID
const sendMessage = async (sender,receiver,product,message) => {
    try {
        await connectDB(process.env.MONGO_URI);
        
        const sentMsg=new MessageModel({sender,receiver,product,message})
        sentMsg.save()
        return {success:true,msg:"message sent"}
    }
    catch(err){

    }
    return {success:false,msg:"failed to send message"}
}
//Use userID here as well for getting messages
//productID for product here again
const getMessages = async (user1,user2,product) => {
    try{
        const h1=user1
        const h2=user2
        await connectDB(process.env.MONGO_URI)
        let list = await MessageModel.find({$or:[{"sender":h1,"receiver":h2,product},{"receiver":h1,"sender":h2,product}]})
        return {success:true,msg:"succeeded at getting user messaged with other user",list}
    }
    catch(err){

    }
    return {success:false,msg:"failed to obtain message list with other user"}
}
//gets unique conversations you have
//user is also the userID of the sender
const getConversations = async (user) => {
    try{
        const h=user
        await connectDB(process.env.MONGO_URI)
        let list = await MessageModel.find({$or:[{"sender":h},{"receiver":h}]}).distinct('product')
        return {success:true,msg:"successfully got all unique message lists",list}
    }
    catch(err){

    }
    return {success:false,msg:"failed to obtain message lists"}
}

module.exports = {sendMessage,getMessages,getConversations}
