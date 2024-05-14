import React, { useEffect, useState } from "react";

const Chat = ({ socket, userName, room }) => {
  const [current, setCurrent] = useState("");

  const sendMessage = async () => {
    if (current !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: current,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div>
      <div className="">
        <p className="text-3xl">Live caht</p>
      </div>
      <div></div>
      <div>
        <input
          type="text"
          placeholder="hey..."
          onChange={(e) => {
            setCurrent(e.target.value);
          }}
        />
      </div>
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  );
};

export default Chat;
