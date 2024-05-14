import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3000"); // Ensure this matches your backend's address

function App() {
  const [userName, setUserName] = useState ("")
  const [room, setRoom] = useState("");

  const joinRoom = () =>{
      if (userName !== "" && room !== ""){
        socket.emit("join_room", room)
      }
  }
  return (
    <>
      <h3>Join a chat</h3>
      <input
        type="text"
        placeholder="John.."
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID.."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join a room</button>
      <Chat socket={socket} userName={userName} room={room}/>
    </>
  );
}
 
export default App;
