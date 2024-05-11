const { trycatchWrapper } = require("../middlewares/tryCatchWrapper");
const {TemporaryToken}=require("../models");

const { Op } = require('sequelize');
const cron=require('node-cron')
const deleteTemparyToken=trycatchWrapper(async()=>{
    const now= new Date();
    const cutOff= new Date(now.getTime()-120000);

    const deletedTokens= await TemporaryToken.destroy({
        where:{
            createdAt: {
                [Op.lt]: cutOff
            }
        }
    })
    console.log("Deleted Successfully");

})


module.exports = () => {
    cron.schedule('* * * * *', () => {
        deleteTemparyToken();
    });
};


