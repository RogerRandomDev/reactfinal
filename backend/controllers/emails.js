var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'rgrang816@west-mec.org',
    pass: 'snoxevwyrrzugymz'
  }
}));
const sendEmail=(target,subject,contents)=>{
var mailOptions = {
  from: 'rgrang816@west-mec.org',
  to: target,
  subject: subject,
  html:contents
    
};
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });  
}


module.exports={sendEmail}
