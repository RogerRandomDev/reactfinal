const { connectDB, process } = require('../db/connect');
const MessageModel = require('../models/MessageModel');
const { hashString } = require('../middleware/hash');
const { checkToken,decodeToken } = require('./auth');

require('dotenv').config();

//sends message to the given receiver
//use userID for sender and receivers
//product should be the productID
const sendMessage = async (sender,receiver,product,message) => {
    try {
        await connectDB(process.env.MONGO_URI);
        //for testing if it works
        console.log(await MessageModel.distinct("sender"))
        
        const sentMsg=new MessageModel({sender:hashString(sender),receiver:hashString(receiver),product,message})
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
        await connectDB(process.env.MONGO_URI)
        let list = [
            ...await MessageModel.find({"sender":hashString(user1),"receiver":hashString(user2),product}),
            ...await MessageModel.find({"receiver":hashString(user1),"sender":hashString(user2),product})
        ]
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
        await connectDB(process.env.MONGO_URI)
        let list = [
            ...await MessageModel.find({"sender":hashString(user)}).distinct('product'),
            ...await MessageModel.find({"receiver":hashString(user)}).distinct('product')
        ]
        return {success:true,msg:"successfully got all unique message lists",list}
    }
    catch(err){

    }
    return {success:false,msg:"failed to obtain message lists"}
}

module.exports = {sendMessage,getMessages,getConversations}
