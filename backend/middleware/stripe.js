require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);
const createAccount = async (accountData)=>{return await stripe.accounts.create({
    type: 'custom',
    country: accountData.location[0],
    email: accountData.email,
    capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
    business_profile: {url:'https://localhost:3000/profile?id='+accountData._id}
  });
}
const linkAccount = async (userData,updateAccount=false) => {return await stripe.accountLinks.create({
    account: userData.account,
    refresh_url: 'https://example.com/reauth',
    return_url: 'https://example.com/return',
    type: (updateAccount?'account_update':'account_onboarding'),
  });}

module.exports = {createAccount,linkAccount}