const nodemailer = require('nodemailer');
dotenv = require("dotenv");
dotenv.config();
const sendMail = async (data) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.SUPPORT_EMAIL,
            pass: process.env.SUPPORT_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const mailOptions = {
        from: process.env.SUPPORT_EMAIL,
        to: data.email,
        subject: data.subject,
        text: data.text
    };

    transporter.sendMail(mailOptions, function (error, res) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + res.response);
        }
    });

}

module.exports = {
    sendMail
}