import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getUserDetailsFromToken } from "../helper/getUserDetailsFromToken.js";
import User from "../model//userModel.js";
import { Conversation, Message } from "../model//conversationModel.js";
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

// Socket.io  new connection
io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);

  //Extracting Token from Client
  const token = socket.handshake.auth.token;

  //current user details
  const user = await getUserDetailsFromToken(token);
  // console.log(user);

  if (!user?._id) {
    console.log("Invalid Token or User not found. Disconnecting...");
    return socket.disconnect();
  }

  // Convert _id to string
  const userId = user._id.toString();

  //create a room for new user
  socket.join(userId);
  onlineUser.add(userId);

  //Broadcasting Online Users to All Clients
  io.emit("onlineUser", Array.from(onlineUser));

  // Listen for "message-page" event from frontend
  socket.on("message-page", async (userId) => {
    console.log("userId", userId);
    const userDetails = await User.findById(userId).select("-password");

    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile_pic: userDetails?.profile_pic,
      online: onlineUser?.has(userId),
    };
    socket.emit("message-user", payload);
  });

  //new message
  socket.on("new message", async (data) => {
    //check conversation is available both user

    let conversation = await Conversation.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    });
    //if conversation is not available
    if (!conversation) {
      const createConversation = await Conversation({
        sender: data?.sender,
        receiver: data?.receiver,
      });
      await createConversation.save();
    }

    //save the conversation
    const message = new Message({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      msgByUserId: data?.msgByUserId,
    });
    const saveMessage = await message.save();
    console.log("saveMessage", saveMessage);

    //update the conversation with new message id
    await Conversation.updateOne(
      { _id: conversation?._id },
      {
        $push: { messages: saveMessage?._id },
      }
    );

    //get the conversation
    const getConversationMessage = await Conversation.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    io.to(data?.sender).emit("message", getConversationMessage?.messages || []);
    io.to(data?.receiver).emit(
      "message",
      getConversationMessage?.messages || []
    );

    io.to(data?.sender).emit("conversation", getConversationMessage);
    io.to(data?.receiver).emit("conversation", getConversationMessage);
  });

  // Socket.io disconnection
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id?.toString());
    console.log(`User disconnected: ${socket.id}`);
  });
});

export { app, server };
