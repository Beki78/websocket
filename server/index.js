const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Updated to match Vite's default port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user id : ", socket.id, data);
  });


  socket.on("send_message", (data) =>{
    socket.to(data.room).emit( "recieve_message", data)
  })

  socket.on("disconnect", () => {
    console.log("User", socket.id, "disconnected"); // Corrected socket.id
  });
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
