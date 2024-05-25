const { where } = require("sequelize");
const { trycatchWrapper } = require("../middlewares/tryCatchWrapper");
const {AdminAddress,PaymentHistory,Order,User}=require("../models");
const ioService=require("../services/IoService")
const notiService=require("../services/notiService")


const changePaymentAddress=trycatchWrapper(async(req,res)=>{

    let adminAddress= await AdminAddress.findOne({
        where: {
            UserId:req.user.id
        }
    });
    if(adminAddress){
        adminAddress.paymentAddress=req.body.paymentAddress
        await adminAddress.save();
        return res.status(200).send({
            adminAddress:adminAddress
        })
    }

     adminAddress=await AdminAddress.create(
        {
            paymentAddress: req.body.paymentAddress,
            UserId: req.user.id,
        }
    )
    return res.status(200).send({
        adminAddress:adminAddress
    })

})

const pay=trycatchWrapper(async(req,res)=>{
   const order=await Order.findByPk(req.body.orderId);
   if(!order){
    return res.status(403).send({
        error:"Order is not found"
    })
   }
   order.status="Paid";
   await order.save();


    const paymentTurn=await PaymentHistory.create({
        sender: req.body.sender,
        recipient: req.body.recipient,
        OrderId: req.body.orderId,
        hash: req.body.hash
    })


    const users = await User.findAll({
        where: {
            role: "Admin"
        }
    });
    const admins = users ? users.map(admin => admin.id) : [];
    console.log(admins)
    try{
        await ioService.sendNotification(admins,`A order ${order.code} is paid`)
    }catch(error){
        console.log(error);
    }
  
    await notiService.createNoti(`A order ${order.code} is paid`,`${paymentTurn?.hash}: ${paymentTurn?.sender} paid the order ${order.code} to ${paymentTurn?.recipient}`,admins);

    res.status(200).send({
        paymentTurn: paymentTurn
    })

})

const getAddress=trycatchWrapper(async(req,res)=>{
    const adminAddress=await AdminAddress.findAll();
    if(!adminAddress){
        return res.status(200).send({
            adminAddress:[]
        })
    }
    res.status(200).send({
        adminAddress: adminAddress[0].paymentAddress
    })

})

module.exports={
    changePaymentAddress,
    pay,
    getAddress
}
