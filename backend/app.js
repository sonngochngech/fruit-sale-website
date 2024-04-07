const  express=require("express")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())

const http=require('http')
const socketIo=require('socket.io')
const server=http.createServer(app)
const io = socketIo(server);

io.on('connection',(socket)=>{
  console.log('A client connected');
})

const router=require("./routes");
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
global.io=io;


app.use("",router);



const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'fruit_sale',
 'root',
 'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 module.exports={app,server,io}
