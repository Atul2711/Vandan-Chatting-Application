require("dotenv").config();
const express=require('express');
const cors=require('cors');
const mongoose=require("mongoose");
const userRoutes=require('./routes/userRoutes');
const msgRoutes=require('./routes/msgRoutes');
const socket=require('socket.io');

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes);
app.use('/api/messages',msgRoutes);

 mongoose.connect(process.env.MONGO_URL,{
     useNewUrlParser:true,
     
 }).then(console.log("Connected to db")).catch((err)=>console.log(err));

app.get('/',function(req,res){
    res.send("Hello");
})



const server=app.listen(process.env.PORT || 5000,function(req,res){
    console.log("server is running at port 5000");
})

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    },
});

global.onlineUsers=new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });


//api->app.js
//my-app->api folder