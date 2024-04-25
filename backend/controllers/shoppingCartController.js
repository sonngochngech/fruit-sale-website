const { where } = require("sequelize");
const { trycatchWrapper } = require("../middlewares/tryCatchWrapper");
const {Fruit,ShoppingCart}=require("../models");


const addFruitToCart=trycatchWrapper(async(req,res)=>{
    const {fruitId,amount}=req.body;
    const fruit= await Fruit.findByPk(fruitId,{
        where:{
            isDeleted:0
        },
    })
    if(!fruit){
        return res.status(403).send({
            error:"Fruit is not found"
        })
    }
    let  cart=await ShoppingCart.findOne({
        where:{
            FruitId: fruitId,
            UserId: req.user.id
        }
    })
    if(cart){
        cart.amount= cart.amount+ amount;
        await cart.save();
    }
    else{
        cart=await ShoppingCart.create({
            amount: amount,
            UserId: req.user.id,
            FruitId: fruitId
        })

    }
    

    res.status(200).send({
        cart: cart
    })
})

const updateCart=async(req,res)=>{
    const {fruitId,amount}=req.body;
    let  cart=await ShoppingCart.findOne({
        where:{
            FruitId: fruitId,
            UserId: req.user.id
        }
    })
    if(!cart){
        return res.status(403).send({
            error:"Cart is not found"
        })
    }
    cart.amount+=amount;
    await cart.save();
    res.status(200).send({
        cart:cart
    })
    
}

const getFruitsInCart=trycatchWrapper(
    async(req,res)=>{
    const cart=await ShoppingCart.findAll({
        where:{
            UserId: req.user.id
        },
        order: [["createdAt", "DESC"]],
        include:[
            {model: Fruit},
            
        ],
    }
    )
    res.status(200).send({
        cart: cart
    })
})

const removeFruitInCart=trycatchWrapper(async(req,res)=>{
    const  fruitId=req.query.fruitId;

    let  cart=await ShoppingCart.findOne({
        where:{
            FruitId: fruitId,
            UserId: req.user.id
        }
    })
    if(!cart){
        return res.status(403).send({error:"Cart is not found"})
    }
   
    await cart.destroy();
    return res.status(200).send({message:"Remove Cart successfully"})

})

module.exports={addFruitToCart,getFruitsInCart,removeFruitInCart,updateCart}