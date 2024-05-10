const nodemailer = require('nodemailer');
const {config}=require("../config/mailConfig");
require('dotenv').config()
async function sendMail(mailOptions) {
    try {
        const transporter = nodemailer.createTransport(config);
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = {
    sendMail
};