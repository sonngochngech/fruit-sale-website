
async function authenticatedUser({socket,user}){
    socket.join(user.id);
     await global.InMemorySocketStore.addSession(user.id,socket.id);
    console.log("wonderfull");

}
async function removeSocket({socket}){
    await  global.InMemorySocketStore.removeSession(socket.id);
    console.log("more than wonderfull");

}

async function EmitEvent(userIds,event,message){
    console.log("hello you  1");
    for(userId of userIds){
            const socketList= await  global.InMemorySocketStore.findSocketIdsByUserId(userId);
            console.log(socketList);
        if(socketList.length!==0){
            console.log("hello you");

              await   global.io.to(userId).emit(event,message);
        }
    } 
}



async function sendNotification(userIds,message){
    await EmitEvent(userIds,'new notification',message);
}

module.exports={authenticatedUser,removeSocket,sendNotification}