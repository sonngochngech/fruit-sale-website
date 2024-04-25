const { trycatchWrapper } = require("../middlewares/tryCatchWrapper");
const{Category}=require("../models");

const createCategory=trycatchWrapper(async (req,res)=>{

    const{name}=req.body;

    const category=await Category.create({name:name});

    res.status(200).send({
        category: category
    })

})

const getCategories=trycatchWrapper(async(req,res)=>{
    const categories=await Category.findAll({
        where:{
            isDeleted:0
        },
        order: [["createdAt", "DESC"]],
    });

    return res.status(200).send({
        categories: categories
    })

})

const deleteCategory=trycatchWrapper(async(req,res)=>{
    const category=await Category.findByPk(req.params.categoryId);
    if(!category){
        return res.status(400).send({
            error:"Category is not found"
        })
    }
    await category.destroy();
    return res.status(200).send({
        message:"Category is deleted successfully"
    })
})


module.exports={createCategory,getCategories,deleteCategory}

