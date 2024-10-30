// mailer.js
const nodemailer = require('nodemailer');
const PASSWORD_MAILER = process.env.PASSWORD_MAILER;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ngongocthang18082004@gmail.com',
        pass: 'PASSWORD_MAILER',
    },
});

const sendNotification = (email, subject, message) => {
    const mailOptions = {
        from: 'ngongocthang18082004@gmail.com',
        to: email,
        subject: subject,
        text: message,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendNotification;
