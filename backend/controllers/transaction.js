const { connectDB } = require('../db/connect');
const TransactionModel= require('../models/transactionModel');

require('dotenv').config();


const createReceipt = async(transactionData)=>{
    await connectDB(process.env.MONGO_URI)
    .then(()=>{
        var receipt=new TransactionModel(transactionData)
        receipt.save()
    })
    return {success:true,msg:"stored receipt"}
}

const getReceiptsFor = async(userID,viewPage=0)=>{
    var output={success:false,msg:"default output"}
    await connectDB(process.env.MONGO_URI)
    .then(()=>{
        var bought=await TransactionModel.find({buyer:userID},null,{limit:10,skip:10*viewPage})
        output={
            success:true,
            receipts:bought.sort((a,b)=>a.timeStamp>b.timeStamp),
            msg:"returned user receipts"}
    })
    return output
}



module.exports = {createReceipt,getReceiptsFor}