const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const usernames = {};
const room = [{ name: "global", creator: "anonymous" }];

io.on("connection", (socket) => {
  socket.on("createUser", (username) => {
    socket.username = username;
    usernames[username] = username;
    socket.currentRoom = "global";

    socket.join("global");
    socket.emit("updateChat", "info", "you have join the global chat");
  });

  socket.on("sendMessage", (data) => {
    io.sockets.to(socket.currentRoom).emit("updateChat", socket.username, data);
  });
});

server.listen(5000, function () {
  console.log("Listening to port 5000.");
});
