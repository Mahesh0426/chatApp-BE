import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getUserDetailsFromToken } from "../helper/getUserDetailsFromToken.js";
import { log } from "console";

// Socket.io connection

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ROOT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//online user
const onlineUser = new Set();

// Socket.io connection
io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);

  const token = socket.handshake.auth.token;

  //current user details
  const user = await getUserDetailsFromToken(token);
  //   console.log(user);

  //create a room
  socket.join(user?._id.toString());
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", (userId) => {
    console.log("Event received: message-page");
    console.log("userId", userId);
  });

  // Socket.io disconnection
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id?.toString());
    console.log(`User disconnected: ${socket.id}`);
  });
});

export { app, server };
