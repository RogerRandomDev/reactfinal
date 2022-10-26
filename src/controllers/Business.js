const {connectDB} =require('../db/connect');
const BusinessModel=require("../models/businessModel");
require('dotenv').config()

const getBusiness = async (businessName)=>
{
    var output=null;
    try{
        await connectDB(process.env.MONGO_URI)
        await (output= await BusinessModel.find())
        console.log(output)
        }
    catch(err){
    console.log(err)
    
        }
    
}

module.exports=getBusiness;
