import "./App.css";
import React,{useEffect,useState} from 'react';
import * as io from 'socket.io-client';
const socket=io.connect("http://localhost:3001");
// connection to our socket server
const App=()=>{
  // Room State
  const[room,setRoom]=useState<string>("");

  const[message,setMessage]=useState<string>("");
  const[messageReceived,setMessageReceived]=useState<string>("");
   
  const joinRoom=()=>{
    if(room!==""){
      socket.emit("join_room",room);
    }
  }
  const sendMessage=()=>{
    // send message and room
    socket.emit("send_message",{message,room})   
  }
  useEffect(()=>{
   socket.on("receive_message",(data)=>{
    setMessageReceived(data.message);
    
   })
  },[socket]);

  return(
    <div className="App">
       <input 
       placeholder="Room Number..." 
       onChange={(e)=>setRoom(e.target.value)}
       />
      <button onClick={joinRoom}>Join Room</button>
      <br/>
      <br/>
      <input placeholder="message..." onChange={(e)=>setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  )
}
export default App
