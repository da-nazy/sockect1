const express=require('express');
const app=express();
const http=require('http');
const {Server}=require('socket.io');
const cors=require("cors");

const server=http.createServer(app);
app.use(cors());
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});
// listening to event
// when a user is connected to the client
io.on("connection",(socket)=>{
   console.log(`User connected:${socket.id}`);
   
   // id of room to join
   socket.on('join_room',(data)=>{
    socket.join(data);
   })

   socket.on("send_message",(data)=>{
    // console.log(data);
   // socket.broadcast.emit("receive_message",data);
   socket.to(data.room).emit("receive_message",data);
   })
})
server.listen(3001,()=>{
    console.log("SERVER IS RUNNING");
})