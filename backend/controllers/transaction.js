const { connectDB } = require('../db/connect');
const TransactionModel= require('../models/transactionModel');
const {decodeToken} = require('./auth')
require('dotenv').config();


const createReceipt = async(transactionData)=>{
    await connectDB(process.env.MONGO_URI)
    .then(()=>{
        var receipt=new TransactionModel(transactionData)
        receipt.save()
    })
    return {success:true,msg:"stored receipt"}
}

const getReceiptsFor = async (userToken,viewPage=0)=>{
    const userID=decodeToken(userToken).userID;
    var output={success:false,msg:"default output"}
    await connectDB(process.env.MONGO_URI)

        var bought= await TransactionModel.find({$or:[{buyer:userID},{seller:userID}]},null,{limit:10,skip:10*viewPage});
        output={
            success:true,
            receipts:bought.sort((a,b)=>a.timeStamp>b.timeStamp),
            msg:"returned user receipts"}
    return output
}



module.exports = {createReceipt,getReceiptsFor}