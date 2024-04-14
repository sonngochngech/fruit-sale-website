const {User,TemporaryToken}=require("../models");
// const TemporaryToken=require("../models/temporarytoken.js")n;
const bcrypt = require('bcrypt')
const generatejwt=require('../config/jwtgenerator')
const crypto = require("crypto")
const nodemailer=require("nodemailer");
const {config}=require("../config/mailConfig");
const {trycatchWrapper}=require("../middlewares/tryCatchWrapper")
const {  validationResult } = require('express-validator');
const { sendMail } = require('../services/mailService');
require('dotenv').config()


const sendToken=trycatchWrapper(async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(403).send({errors: errors.array()})
        }
        
        const {email,type}=req.body;
     

        if((!email) || (type!== "PASSWORD" && type!=="REGISTER")){
            return res.status(403).send({
                error: 'Incorrect login information .'
            })
        }

        const user=await User.findOne({
            where: {
                email:email
            }
        })


        if((type==="PASSWORD" && !user)||(type==="REGISTER" && user)){
                return res.status(403).send({
                    error: "the email have been already used "
                });
        }
        
        const token =crypto.randomInt(100000, 999999).toString();
        const  mailOptions = {
            from: process.env.MAILER,
            to: email,
            subject: "Email verification code to register",
            text:'Welcome to fruit market !\n\n' +
                'Your email verification code is: ' + token + '\n\n' +
                'Use this code to complete the registration process.\n\n' +
                'Enjoy using your account!\n'
        }

       
        await sendMail(mailOptions);

        const newToken=await TemporaryToken.create({
            code: token,
            email: email,
            type: type
        })
        return  res.status(200).send({
            temporaryToken: newToken
        })
})  




const login=trycatchWrapper(async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(403).send({errors: errors.array()})
        }
        const {email,password}=req.body;
        const user=await User.findOne({
            where: {
                email:email
            }
        })
        if(!user){
            return res.status(403).send({
                error: 'Incorrect login information.'
            })
        }
        if(! await bcrypt.compare(password,user.password)){
            return res.status(403).send({
                error: 'Incorrect login information.'
            })  
        }
        res.status(200).send({
            user: user,
            jwt: generatejwt(user.id)
        })
   
})

const register=trycatchWrapper( async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(403).send({errors: errors.array()})
    }

    const {email,password,firstname,lastname,mobile,token}=req.body;

    const storedToken=await TemporaryToken.findOne({
        where:{
            code: token
        }
    })
    const currentTime=new Date();
    if(!storedToken ||  currentTime.valueOf()- storedToken.createdAt.valueOf()>=600000000000|| email!=storedToken.email){
        return res.status(403).send({
            error: "invalid token."
        })
    }
    const user=await User.create({
        email: email,
        role: "Customer", 
        firstName:firstname,
        lastName:lastname,
        phoneNo: mobile,
        password: await bcrypt.hash(password,10)
    });

    return res.status(200).send({
        user:user,
        jwt: await generatejwt(user.id)
    })
})

const verifyPasswordToken=trycatchWrapper( async(req,res)=>{

        const {token}=req.body;
    const storedToken=await TemporaryToken.findOne({
        where:{
            code: token
        }
    })
    const currentTime=new Date();
    if(!storedToken ||  currentTime.valueOf()- storedToken.createdAt.valueOf()>=600000000000|| storedToken.type!=="PASSWORD"){
        return res.status(403).send({
            error: "invalid token."
        })
    }
    const user=await User.findOne({
        where: {
            email:storedToken.email
        }
    })
    return res.status(200).send({
        user:user,
        jwt: await generatejwt(user.id) 

    })
})

const updatePassword=trycatchWrapper(async(req,res)=>{
        const {  oldPassword, newPassword } = req.body;
        const currentUser=await User.findByPk(req.user.id);
        if (currentUser && (await bcrypt.compare(oldPassword,currentUser.password))) {
            
            
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            currentUser.password=hashedNewPassword;
            await currentUser.save();

            res.status(200).send({
                user:currentUser,
                jwt: generatejwt(currentUser.id)
            });
        } else {
            res.status(403).send({
                message: 'Invalid credentials or old password does not match',
            });
        }
})
const resetPassword=trycatchWrapper(async(req,res)=>{
    const {password}=req.body;
    const currentUser=await User.findByPk(req.user.id);
        if (currentUser) {
            
            
            const hashedNewPassword = await bcrypt.hash(password, 10);

            currentUser.password=hashedNewPassword;
            await currentUser.save();

            res.status(200).send({
                user:currentUser,
                jwt: generatejwt(currentUser.id)
            });
        } else {
            res.status(403).send({
                message: 'Invalid credentials or old password does not match',
            });
        }

})

module.exports={register,login,sendToken,updatePassword,verifyPasswordToken,resetPassword}