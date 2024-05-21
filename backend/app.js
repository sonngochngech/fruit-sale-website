const  express=require("express")
const cors=require("cors")
const path = require('path');
const app=express()
const IoService=require("./services/IoService")
const router=require("./routes");

require('dotenv').config()
app.use(express.json())
app.use(cors())


//attach io to server 
const http=require('http')
const socketIo=require('socket.io')
const server=http.createServer(app)
const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001","https://fruit-sale-react-application-main.onrender.com",process.env.ADMIN_DOMAIN],
      credentials: true
    }
  });
global.io=io;

//initiate socket information storage 
const InMemorySocketStore=require("./utils/socketStore");
global.InMemorySocketStore= new InMemorySocketStore();


io.on("connection",(socket)=>{
    console.log("connect successfully");
    socket.on('authenticated',(user)=>IoService.authenticatedUser({socket,user}));
   
    socket.on('disconnect',()=>IoService.removeSocket({socket}));
})




app.use('/public', express.static(path.join(__dirname, 'public')));


app.use("",router);




 module.exports={server}
