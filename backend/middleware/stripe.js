require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { decodeToken } = require('../controllers/auth');
const {getProduct} = require('../controllers/Product');
const { getUserByID } = require('../controllers/User');
const { sendSMS } = require('./sms');
const createAccount = async (accountData)=>{return await stripe.accounts.create({
    type: 'custom',
    country: 'US',
    email: accountData.email,
    capabilities: {card_payments: {requested: true}, transfers: {requested: true}}
  });
}
const linkAccount = async (userData,updateAccount=false) => {return await stripe.accountLinks.create({
    account: userData.account,
    refresh_url: 'https://example.com/reauth',
    return_url: 'https://example.com/return',
    type: (updateAccount?'account_update':'account_onboarding'),
  });}

//everything below is for handling
//money transfer between users

//gets the service fee for the charge
const getServiceFee = (inputCost=0)=> {
    var amount=inputCost*0.035 + 30;
    return Math.max(Math.round(amount),100);
}
//charges the user the given amount
const createCharge = async (chargeData) =>{return await stripe.charges.create({
    amount:chargeData.amount,
    currency:'usd',
    customer:chargeData.id,
    receipt_email:chargeData.email,
    transfer_group: transferData._id
})}
//transfers given charge to the seller
const createTransfer =async (transferData)=>{return await stripe.transfers.create({
    amount: transferData.amount,
    currency: 'usd',
    destination: transferData.destination,
    transfer_group: transferData._id,
  });}
//purchases the product using the productID and buyerToken
const purchaseProduct = async (buyerToken,productID)=> {
    try{
    const buyerID = await decodeToken(buyerToken).userID
    const buyerData = await getUserByID(buyerID);
    const productData = await getProduct(productID);
    const sellerData = await getUserByID(productData.creatorID);
    if(productData.cost<=0){return {success:true,msg:'free transaction complete'}}
    const charge = await createCharge({
        amount:productData.cost,
        id:buyerData.card,
        email:buyerData.email,
        _id:sellerData._id
    })
    const transfer = await createTransfer({
        amount:productData.cost-getServiceFee(productData.cost),
        destination:sellerData.card,
        _id:sellerData._id
    })
    sendSMS(sellerData.contact,`User ${buyerData.name} has purchased ${productData.name}. Please Get the purchased product to them.`)
    return {success:true,msg:'transaction complete'}
    }catch(e){
        return {success:false,msg:'transaction error',e}
    }
}

module.exports = {createAccount,linkAccount,purchaseProduct}