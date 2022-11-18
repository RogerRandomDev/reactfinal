const Stripe = require('stripe');require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_KEY);
const {getUser}=require('../controllers/User');
const {encryptData,decryptData} = require('./hash');
//gets the card and decrypts it
const getCard = async(userID)=>{
    const userData=await getUserByID(userID);
    return decryptData(userData.card);
}
//creates a new card token
const createCard = async(userID)=>{
    const cardData=getCard(userID)
    try{
        return stripe.tokens.create({
            name:cardData.name,
            number:cardData.number,
            exp_month:cardData.exp_month,
            exp_year:cardData.exp_year,
            cvc:cardData.cvc
        })
    }catch(e){}
    return null
}
//creates a new customer token
const createCustomer = async (userData)=>{
    try{
        return await stripe.customers.create({
            name:userData.name,
            email:userData.email
        })
    }catch(e){}
    return null
}
//creates a charge token
const createCharge = async (userData,productData)=>{
    try{
        return await stripe.charges.create({
            receipt_email: userData.email,
            amount: productData.price*100,
            currency:'usd',
            card:getCard(userData._id),
            customer:createCustomer(userData)
        })
    }catch(e){}
    return null
}



module.exports = {createCharge}