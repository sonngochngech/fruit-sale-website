const {Fruit,Category,FruitImage}=require("../models");
const db=require("../models/index")
require('dotenv').config()
const fs=require("fs")
const path = require('path');
const { Op } = require('sequelize');
const {trycatchWrapper}=require("../middlewares/tryCatchWrapper")
const {  validationResult } = require('express-validator');
const IoService =require('../services/IoService');
const crypto = require("crypto")
const getAllFruits=trycatchWrapper(async (req,res)=>{
    const fruits=await Fruit.findAll({
        where:{
            isDeleted:0
        },
        order: [["createdAt", "DESC"]],
        include:[
            {model: Category},
            {model: FruitImage}
        ],
        
    });
    await IoService.sendNotification([1],"hello you");
    
    res.status(200).send({
        fruits: fruits
    })
})

const getFruit=trycatchWrapper(async(req,res)=>{
    const fruit= await Fruit.findByPk(req.params.fruitId,{
        include:[
            {model: Category},
            {model: FruitImage}
        ]
    });
    if(!fruit || fruit.isDeleted===1){
        return res.status(403).send({
            error:"Fruit is not found"
        })
    }

    res.status(200).send({
        fruit:fruit
    });
    
})
const createFruit=trycatchWrapper(async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
         deleteUploadedFiles(req.files);
        return res.status(403).send({errors: errors.array()})
    }

    let transaction;
    try{
        transaction=await db.sequelize.transaction();
        console.log(req.body);

        let images=[];
        const fruit=await Fruit.create({
            code:crypto.randomInt(100000, 999999).toString(),
            title: req.body.title,
            description: req.body.description,
            amount: req.body.amount,
            price: req.body.price, 
            sales: req.body.sales,
            CategoryId: req.body.CategoryId
        })
        
        if(fruit){
            let fruitId=fruit.id;
            if(req.files!= undefined){
                req.files.forEach(element => {
                    images.push({link:element.path,FruitId: fruitId});
                });  
            }
        
            await FruitImage.bulkCreate(images);
        }
        await  transaction.commit();
        res.send({fruit:fruit});
    }catch(error){
        if (transaction) {
            await transaction.rollback();
          }
         deleteUploadedFiles(req.files);
        res.status(500).send({
            error: 'Server is error'
        })
    }
})
const deleteFruit=trycatchWrapper(async (req,res)=>{
    const  deletedFruit=await Fruit.findByPk(req.params.fruitId);
    if(!deletedFruit || deletedFruit.isDeleted!==0){
        return res.status(403).send({
            error:"Fruit is not found"
        })
    }
    deletedFruit.isDeleted=1;
    await deletedFruit.save();
    res.status(200).send({
        fruit: deletedFruit
    })
    

})

const updateFruitInf=trycatchWrapper(async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(403).send({errors: errors.array()})
    }
    const newData=req.body;
    const updatedFruit= await Fruit.findByPk(req.params.fruitId);
    
    if(!updatedFruit || updatedFruit.isDeleted===1){
        return res.status(403).send({
            error:"Fruit is not found"
        })
    }
    await updatedFruit.update(newData);
     res.status(200).send({
        fruit: updatedFruit
    })

})

const addFruitImages= async(req,res)=>{
    try{
    const updatedFruit= await Fruit.findByPk(req.params.fruitId);
    if(!updatedFruit || updatedFruit.isDeleted===1){
        await deleteUploadedFiles(req.files);
        return res.status(403).send({
            error:"Fruit is not found"
        })
    }
    let images=[];
    if(req.files!= undefined){
        req.files.forEach(element => {
            images.push({link:element.path,FruitId: updatedFruit.id});
        });  
    }
   
    const fruitImages=await FruitImage.bulkCreate(images);
    return res.status(200).send({
        fruitImages: fruitImages
    })
    }catch(error){
        await deleteUploadedFiles(req.files);
        return res.status(500).send({
            errors: error
        })
    }

}

const deleteFruitImages=trycatchWrapper(async (req,res)=>{
    const imageIds=req.body.imageIds;
    imageIds.forEach(async(element)=>{
        const image=await FruitImage.findByPk(element);
        if(!image){
            return res.status(403).send({
                error:"Image link is not found"
            })
        }
        console.log(image);
        const filePath = path.resolve(__dirname,'..',image.link);  
            
                if (fs.existsSync(filePath)) {
                    // File exists, so remove it
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(403).send({
                                error:"Server has a problem when deleting the image"
                            })
                        } 
                    });
                } else {
                   console.log('Image not found')
                }

    })

    const deletedCount=await FruitImage.destroy({where: {id: {[Op.in]: imageIds}}});
    return res.status(200).send({
        message:"Deleted successfully"
    })
})
const searchFruit=trycatchWrapper(async (req,res)=>{
    const searchString=req.query.title;
    console.log("hello",searchString);

    const whereCondition = searchString ? {
        [Op.or]: [
            { title: { [Op.like]: `%${searchString}%` } },
        ],
        isDeleted: 0
    } : {};
    const fruits = await Fruit.findAll({
        where: whereCondition,
        include: [
            { model: Category },
            { model: FruitImage }
        ],
        order: [["createdAt", "DESC"]]
    });

    res.status(200).send({ fruits: fruits });


})

const filterFruit=trycatchWrapper(async (req,res)=>{

    const { priceStart,priceEnd } = req.query;
    
        let whereCondition = {};
        if (priceStart && priceEnd) {
            whereCondition.price = { [Op.between]: [priceStart, priceEnd] };
        }
        whereCondition.isDeleted = 0;
        const fruits = await Fruit.findAll({
            where: whereCondition,
            include: [
                { model: Category },
                { model: FruitImage }
            ],
            order: [["createdAt", "DESC"]]
        });

        // Send the response with the fetched fruits
        res.status(200).send({ fruits:fruits });

})
const getFruitsByCategory=trycatchWrapper(async(req,res)=>{
    const categoryId = req.query.categoryId;
    console.log("HELLO: ",categoryId);

    
    const fruits = await Fruit.findAll({
        where: {
            isDeleted: 0,
            CategoryId: categoryId
        },
        include:[
            {model: Category},
            {model: FruitImage}
        ],
    });
    return res.status(200).send({
        fruits: fruits
    });

})


const deleteUploadedFiles =async (files) => {
    if (files) {
        files.forEach(file => {
            const filePath = path.resolve(__dirname, '..', file.path);
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error(err);
                    }
                });
            } else {
                console.log('Image not found');
            }
        });
    }
};
module.exports={getAllFruits,getFruit,createFruit,deleteFruit,updateFruitInf,addFruitImages,deleteFruitImages,filterFruit,searchFruit,getFruitsByCategory}
