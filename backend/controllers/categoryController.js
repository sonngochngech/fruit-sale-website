const{Category}=require("../models");

const createCategory=async (req,res)=>{

    const{name}=req.body;

    const category=await Category.create({name:name});

    res.status(200).send({
        category: category
    })

}

