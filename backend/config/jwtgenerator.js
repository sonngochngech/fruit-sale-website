const jwt=require("jsonwebtoken")

const generatejwt=(id)=>{
    return jwt.sign({
        id: id
    },process.env.JWT_SECRET,{expiresIn:"24h"})
}

module.exports=generatejwt