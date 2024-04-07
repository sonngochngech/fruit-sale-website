const {User,TemporaryToken}=require("../models");
// const TemporaryToken=require("../models/temporarytoken.js")n;
const bcrypt = require('bcrypt')
const generatejwt=require('../config/jwtgenerator')
const crypto = require("crypto")
const nodemailer=require("nodemailer");
const {config}=require("../config/mailConfig");


require('dotenv').config()


const sendToken=async (req,res)=>{
    try{
        const {email,type}=req.body;
        console.log(type);
        

        if((!email) || (type!== "PASSWORD" && type!=="REGISTER")){
            return res.status(403).send({
                error: 'Incorrect login information 1 .'
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

        const transporter= await nodemailer.createTransport(config);
        await transporter.sendMail(mailOptions  ,(err,info)=>{
            if(err){
                console.log("hello",err)
                return res.status(403).send({
                    error: "An error occured when trying to send an email for request password token"
                });
               
            }else {
                console.log(info.response);
               
            }
        });

        const newToken=await TemporaryToken.create({
            code: token,
            email: email,
            type: type
        })
        return  res.status(200).send({
            temporaryToken: newToken
        })
    }
    catch(err){
        res.status(500).send({
            error: 'An error occured when trying to sign in.'
        })
    }
}




const login=async (req,res)=>{
    try{
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
    }catch(err){
        res.status(500).send({
            error: 'An error occured when trying to sign in.'
        })
    }
}

const register= async (req,res)=>{
//    try{
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
//    }catch(err){
//         res.status(500).send({
//             error: 'An error occured when trying to sign in.'
//         })
//    }
}

const verifyPasswordToken= async(req,res)=>{
    try{
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

    }catch(error){
        res.status(500).send({
            error: 'An error occured when trying to sign in.'
        })
    }

}

const updatePassword=async(req,res)=>{
    try{
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
            res.status(401).send({
                message: 'Invalid credentials or old password does not match',
            });
        }
    }catch(error){
        res.status(500).send({
            error: 'An error occured when trying to change password'
        })
    }
}
const resetPassword=async(req,res)=>{
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
            res.status(401).send({
                message: 'Invalid credentials or old password does not match',
            });
        }

}

module.exports={register,login,sendToken,updatePassword,verifyPasswordToken,resetPassword}