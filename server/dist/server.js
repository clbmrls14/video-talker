"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 5000;
const app = (0, express_1.default)();
const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let peers = [];
const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};
io.on("connection", (socket) => {
  socket.emit("connection", null);
  console.log("new user connected");
  console.log(socket.id);
  socket.on("register-new-user", (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId,
    });
    console.log("registered new user");
    console.log(peers);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    peers = peers.filter((peer) => peer.socketId !== socket.id);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });
  });
  // listeners related with direct call
  socket.on("pre-offer", (data) => {
    console.log("pre-offer handled");
    console.log(`${data.caller.username} is calling ${data.callee.username}`);
    io.to(data.callee.socketId).emit("pre-offer", {
      callerUsername: data.caller.username,
      callerSocketId: socket.id,
    });
  });
  socket.on("pre-offer-answer", (data) => {
    console.log("handling pre-offer answer");
    io.to(data.callerSocketId).emit("pre-offer-answer", {
      answer: data.answer,
    });
  });
});
