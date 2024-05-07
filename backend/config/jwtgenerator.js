const jwt=require("jsonwebtoken")

const generatejwt=(id)=>{
    return jwt.sign({
        id: id
    },process.env.JWT_SECRET,{expiresIn:"30d"})
}

module.exports=generatejwt