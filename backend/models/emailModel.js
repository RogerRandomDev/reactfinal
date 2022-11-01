const nodemailer = require('nodemailer');
const transporter=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: '[USERNAME]',
        pass: '[PASSWORD]'
    }
});

// send email
await transporter.sendMail({
    from: 'vmalho393@west-mec.org',
    to: 'rgrang816@west-mec.org',
    subject: 'Test Email Subject',
    html: '<h1>Example HTML Message Body</h1>'
});