// const { io } = require("../app");
const {Order,OrderItem}=require("../models");


const createOrder=async (req,res)=>{
    const {title,phoneNo,address,fruits,productCost, shippingCost}=req.body;

    const order=await Order.create({
        title : title,
        phoneNo: phoneNo,
        address: address,
        productCost: productCost,
        shippingCost: shippingCost,
        // email: email
    })
    const fruitsWithOrderId=fruits.map(fruit=>({
        ...fruit,
        OrderId: order.id
    }))
    console.log(fruitsWithOrderId);

    const orderItems=await OrderItem.bulkCreate(fruitsWithOrderId);

    global.io.emit('order creation',{order: order});

    return res.status(200).send({
        order: order,
        orderItems:orderItems
    })
}

const deleteOrder=async (req,res)=>{
    const  orderId=res.params.fruitId;

    const order=await Order.findByPk(orderId);

    await order.destroy();
    return res.status(200).send({message:"Order deleted successfully"})

    





}

const updateBasicInformationOrder=async (req,res)=>{

    const  orderId=res.params.fruitId;

    const order=await Order.findByPk(orderId);

    await order.update(req.body);


     res.status(200).send(
        {order: order})

}


const updateStatusOrder=async (req,res)=>{
    const{status}=res.body;
    const  orderId=res.params.fruitId;

    const order=await Order.findByPk(orderId);

    order.status=status;

    await order.save();


     res.status(200).send(
        {order: order})





}

module.exports={createOrder,deleteOrder,updateBasicInformationOrder,updateStatusOrder}

