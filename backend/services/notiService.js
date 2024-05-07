const {Notification}=require("../models");



async function createNoti(title,description,userIds){
    const notiData=userIds.map(id=>{
        return { title: title,description: description,UserId: id}
    })
    await Notification.bulkCreate(notiData);
    
}

module.exports={createNoti}