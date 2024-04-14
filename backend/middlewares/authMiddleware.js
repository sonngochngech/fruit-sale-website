const jwt = require("jsonwebtoken");
const {User,Order}=require("../models");

require('dotenv').config();

const isAuthenticated=async (req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1];
        try{
            const decodedToken=await jwt.verify(token,process.env.JWT_SECRET);
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
        else{
            return res.status(401).send({
                error: "Permission denied"});

        }
    }catch (error){
        return res.status(500).send({
            error: "There is some trouble in server"});
    }
}

const isOrderOwner=async(req,res,next)=>{
    // try{
        const order= await Order.findByPk(req.params.orderId);
        if(!order){
            return res.status(403).send({
                error:"Order is not found"
            })
        }
        console.log(order);
        if(req.user.role==="Admin" || req.user.id === order.UserId) {
            req.order=order;
            next();
        }
        else{
            return res.status(401).send({ 
                error: "Permission denied"});
        }
    // }catch(error){
    //     res.status(500).send({
    //         error: "There is some trouble in server"});
    // }
    
}

module.exports={isAuthenticated,isAdmin,isOrderOwner}    