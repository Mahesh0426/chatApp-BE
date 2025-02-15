import express from "express";
import http from "http";
import { Server } from "socket.io";

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

// Socket.io connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  //   socket.on("sendMessage", (message) => {
  //     console.log("Message received:", message);
  //     io.emit("receiveMessage", message);
  //   });

  // Socket.io disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

export { app, server };
