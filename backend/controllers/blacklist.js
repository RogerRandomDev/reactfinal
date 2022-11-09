const { connectDB } = require('../db/connect');
const BlackListModel = require('../models/BlackListModel');
require('dotenv').config();

const blacklistEmail = async (email,domain)=>{
    await connectDB(process.env.MONGO_URI);
    const blacklisted=new BlackListModel({email,domain})
    blacklisted.save()
    console.log(`blacklisted email:${email}/domain:${domain}`)
}
const whitelistEmail = async (email,domain)=>{
    await connectDB(process.env.MONGO_URI);
    BlackListModel.findOneAndDelete({email,domain})
    console.log(`removed blacklist on email:${email}/domain:${domain}`)
}

//checks if email matches any blacklist
const checkEmail = async (email)=>{
    try{
    if(email==undefined){return false}
    await connectDB(process.env.MONGO_URI);
    var checked=(
        await BlackListModel.findOne({domain:email.split(/@/)[1]})!=null||
        await BlackListModel.findOne({email})!=null)
    return checked
    }
    catch(err){
        return err
    }
}




module.exports = {blacklistEmail,whitelistEmail,checkEmail}