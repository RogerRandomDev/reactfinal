const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_KEY,
  apiSecret: process.env.NEXMO_SECRET
});
const sendSMS=(target,msg)=> {
    nexmo.message.sendSms(
        process.env.VIRTUAL_NUMBER, target, msg,{type:'unicode'},
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              console.dir(responseData);
            }
          }
       );
       
}

 module.exports = {sendSMS}
