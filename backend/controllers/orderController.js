// const { io } = require("../app");
const { trycatchWrapper } = require("../middlewares/tryCatchWrapper");
const {Order,OrderItem,Fruit}=require("../models");
const { Op } = require('sequelize');
const db=require("../models/index")
const crypto = require("crypto")

const getOrder=trycatchWrapper(async(req,res)=>{
    return res.status(200).send({
        order:req.order
    })
})

const getUserOrderList=trycatchWrapper(async(req,res)=>{
    const orders=await Order.findAll({
        where:{
            UserId: req.user.id
        },
        order: [["createdAt", "DESC"]],
    }
    )
    return res.status(200).send({
        orders: orders
    })
})

const getAllOrders=trycatchWrapper(async(req,res)=>{
    const orders=await Order.findAll();
    return res.status(200).send({
        orders:orders
    })
})

const searchOrders = trycatchWrapper(async (req, res) => {
    const { status, code, title, createdAt } = req.query;

    try {
        let query = {};

        if (status) {
            query.status = status;
        }
        if (code) {
            query.code = { [Op.like]: `%${code}%` };
        }
        if (title) {
            query.title = { [Op.like]: `%${title}%` };
        }
        if (createdAt) {

            const startDate = new Date(createdAt);
            startDate.setHours(0, 0, 0, 0); 
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);
            query.createdAt = {
                [Op.gte]: startDate,
                [Op.lt]: endDate
            };
        }
        const orders = await Order.findAll({ where: query });

        res.status(200).send({ orders:orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for orders.' });
    }
});


const createOrder=async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()) {
         deleteUploadedFiles(req.files);
        return res.status(403).send({errors: errors.array()})
    }

    let transaction;
    try{
        transaction=await db.sequelize.transaction();
        const {title,phoneNo,address,fruitIds,productCost, shippingCost,email}=req.body;
        const code= crypto.randomInt(10000000, 99999999).toString();

        const order=await Order.create({
            code:code,
            title : title,
            phoneNo: phoneNo,
            address: address,
            productCost: productCost,
            shippingCost: shippingCost,
            email: email,
            UserId: req.user.id
        })
        const fruitsWithOrderId=fruitIds.map(id=>({
            ...id,
            OrderId: order.id
        }))
        console.log(fruitsWithOrderId);
    
        const orderItems=await OrderItem.bulkCreate(fruitsWithOrderId);
    
    
        fruitIds.map(async(id)=>{
            const fruit=await Fruit.findByPk(id);
            fruit.sales+=1;
            await fruit.save();
    
    
        })
        // global.io.emit('order creation',{order: order});
    
        return res.status(200).send({
            order: order,
            orderItems:orderItems
        })

    }catch(error){
        if (transaction) {
            await transaction.rollback();
        }
        res.status(500).send({
            error: 'An error occured when trying to sign in.'
        })
    }
   
}



const deleteOrder=trycatchWrapper(async (req,res)=>{
    const  orderId=res.params.fruitId;

    const order=await Order.findByPk(orderId);

    await order.destroy();
    return res.status(200).send({message:"Order deleted successfully"})


})

const updateBasicInformationOrder=trycatchWrapper(async (req,res)=>{

    
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
         deleteUploadedFiles(req.files);
        return res.status(403).send({errors: errors.array()})
    }

    const  orderId=req.params.orderId;

    const order=await Order.findByPk(orderId);

    await order.update(req.body);


     res.status(200).send(
        {order: order})

})


const updateStatusOrder=async (req,res)=>{
   let transaction;
   try{
        transaction=await db.sequelize.transaction();
        const{status}=req.body;
        const  orderId=req.params.orderId;

        const order=await Order.findByPk(orderId);
        if(order.status==="Delivering" && status==="Cancel"){
            return res.status(200).send({
                error:" You can't change the status"
            })
        }
        order.status=status;
        await order.save();

        await  transaction.commit();
        res.status(200).send(
            {order: order})

   }catch(error){
        if (transaction) {
            await transaction.rollback();
        }
        res.status(500).send({
            error: 'An error occured when trying to sign in.'
        })
   }

}

module.exports={createOrder,
                deleteOrder,
                updateBasicInformationOrder,
                updateStatusOrder,
                deleteOrder,
                getOrder,
                getUserOrderList,
                getAllOrders,
                searchOrders
            }

