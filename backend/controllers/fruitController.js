const {Fruit,Category,FruitImage}=require("../models");
const db=require("../models/index")
require('dotenv').config()
const fs=require("fs")
const path = require('path');
const { Op } = require('sequelize');
const getAllFruits=async (req,res)=>{
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
    res.send(fruits)
}

const getFruit=async(req,res)=>{
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

    res.send(fruit);
    
}
const getFruitImage=async(req,res)=>{
    const fruit= await Fruit.findByPk(req.params.fruitId,{
        // include:[
        //     {model: Category},
        //     {model: FruitImage}
        // ]
    });
    // if(!fruit || fruit.isDeleted===1){
    //     return res.status(403).send({
    //         error:"Fruit is not found"
    //     })
    // }

    res.send(fruit);
    
}

const createFruit=async (req,res)=>{
    let transaction;
    try{
        transaction=await db.sequelize.transaction();
        console.log(req.body);

    let images=[];
    const fruit=await Fruit.create({
        code:req.body.code,
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount,
        price: req.body.price, 
        sales: req.body.sales,
        CategoryId: req.body.categoryId,
        isDeleted:0
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
        if(req.files!= undefined){
            req.files.forEach(element => {
                const filePath = path.resolve(__dirname, '..', element.path);
                
                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(err);
                        } 
                    });
                } else {
                   console.log('Image not found')
                }
            });  
        }
        res.status(500).send({
            error: 'An error occured when trying to sign in.'
        })
    }
}
const deleteFruit=async (req,res)=>{
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
    

}

const updateFruitInf=async (req,res)=>{
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

}

const addFruitImages= async(req,res)=>{
    const updatedFruit= await Fruit.findByPk(req.params.fruitId);
    if(!updatedFruit || updatedFruit.isDeleted===1){
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

}

const deleteFruitImages=async (req,res)=>{
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
        deletedCount:deletedCount
    })
}
const searchFruit=async (req,res)=>{
    const searchString=req.params.title;

    const whereCondition = searchString ? {
        [Op.or]: [
            { name: { [Op.like]: `%${searchString}%` } },
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


}

const filterFruit=async (req,res)=>{

    const { pricestart,priceEnd } = req.params;
        let whereCondition = {};
        if (pricestart && priceEnd) {
            whereCondition.price = { [Op.between]: [pricestart, priceEnd] };
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
        res.status(200).json({ fruits });

}
module.exports={getAllFruits,getFruit,createFruit,deleteFruit,updateFruitInf,addFruitImages,deleteFruitImages,filterFruit,searchFruit,getFruitImage}
