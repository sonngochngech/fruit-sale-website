const  express=require("express")
const cors=require("cors")
const path = require('path');
const app=express()
const IoService=require("./services/IoService")
app.use(express.json())
app.use(cors())

app.use('/public', express.static(path.join(__dirname, 'public')));

const http=require('http')
const socketIo=require('socket.io')
const server=http.createServer(app)
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
    //   allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
global.io=io;

const InMemorySocketStore=require("./utils/socketStore");
global.InMemorySocketStore= new InMemorySocketStore();


io.on("connection",(socket)=>{
    console.log("connect successfully");
    socket.on('authenticated',(user)=>IoService.authenticatedUser({socket,user}));
   
    // socket.on('disconnect',()=>IoService.removeSocket({socket}));
})


const router=require("./routes");

app.get("/getUserList",async(req,res)=>{
  console.log("hello 1111 ");
  res.status(200).send({message: global.InMemorySocketStore.findSocketIdsByUserId(1)});
})

app.use("",router);



// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//  'fruit_sale',
//  'root',
//  'root',
//   {
//     host: 'localhost',
//     dialect: 'mysql'
//   }
// );


// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

 module.exports={server}
