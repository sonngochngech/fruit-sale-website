const {createCustomerError}=require("../errors/customError")

const trycatchWrapper=(func)=>{
    return async(req,res,next)=>{
        try{
            await func(req,res,next);
        }catch(error){
            return next(createCustomerError(error,500));
        }
    }

}
module.exports={trycatchWrapper}