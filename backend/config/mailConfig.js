const nodemailer=require("nodemailer");
require('dotenv').config()
const config={
    Service:"gmail",
    host:"smtp.gmail.com",
    port: 587,
    secure:false,
    auth:{
        user: process.env.MAILER,
        pass: process.env.MAIL_PASSWORD
    }
}

module.exports={config} 