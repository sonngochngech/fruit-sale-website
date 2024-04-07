const jwt = require("jsonwebtoken");
const {User}=require("../models");
require('dotenv').config();

const isAuthenticated=async (req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1];
        console.log(token);
        try{
            const decodedToken=await jwt.verify(token,process.env.JWT_SECRET);
            console.log("hello");
            console.log(decodedToken);
            req.user= await User.findByPk(decodedToken?.id);
            next();
        }catch (error){
            return res.status(401).json("User is not found");
        }
    }else{
        return res.status(404).json('You should authenticate');
    }
}

const isAdmin=async (req,res,next)=>{
    try{
        if(req.user.role==="Admin")  next();
    }catch (error){
        return res.status(401).send({
            error: "Permission denied"});
    }
}

module.exports={isAuthenticated,isAdmin}    