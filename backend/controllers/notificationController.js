const { where } = require("sequelize");
const {trycatchWrapper}=require("../middlewares/tryCatchWrapper")
const {Notification}=require("../models");

const getNotification=trycatchWrapper(async(req,res)=>{
    const notifications=await Notification.findAll({
        where: {
            UserId: req.user.id
        },
        order: [
            ['isRead', 'ASC']
          ]
    })
    res.status(200).send({
        notifications: notifications
    })
})

const updateIsRead=trycatchWrapper(async(req,res)=>{
    const id=req.params.notiId;
    const notification=await Notification.findByPk(id);
    if(!notification) res.status(403).send({
        error: "The notification is not found"
    })
    if(notification.isRead===0) notification.isRead=1;
    await notification.save();
    res.status(200).send({
        notification:notification
    })

})

const getUnreadNoti=trycatchWrapper(async(req,res)=>{
    const notifications=await Notification.findAll({
        where: {
            UserId: req.user.id,
            isRead: 0
        }
    })
    res.status(200).send({
        notificationCount: notifications.length,
        unreadNotification: notifications

    })
})
const deleteAllNotifications=trycatchWrapper(async(req,res)=>{
    const deletedCount=await Notification.destroy({
        where:{
            UserId:req.user.id
        }
    })
    res.status(200).send({
        message:"deleted successfully"
    })

})


const deleteNotification=trycatchWrapper(async(req,res)=>{
    const deletedNo=await Notification.findByPk(req.params.notiId);
    await deletedNo.destroy();
    res.status(200).send({
        message:"deleted sucessfully"
    })
})

module.exports={getNotification,
                updateIsRead,
                deleteAllNotifications,
                deleteNotification,
                getUnreadNoti
}