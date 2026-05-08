// import {Server} from 'socket.io';
// import http from "http"
// import express from "express"
//  const app = express();
//  const server = http.createServer(app); 
//  const io = new Server(server , {
//     cors :{
//         origin : ['http://localhost:3000'],
//         methods : ['GET','POST']
//        }
//  });
//  io.on('connection' , (socket)=>{
//     console.log('user Connected' , socket.id)
//  })
// export {app , io , server}
import { Server } from 'socket.io';
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: ['http://localhost:3000'], // Make sure this matches your frontend URL
      methods: ['GET', 'POST']
   }
});

// ==========================================
// 🗺️ MAP TO TRACK ONLINE USERS
// ==========================================
// This stores: { "mongoDB_userId": "socket.id" }
const userSocketMap = {};

// Export this so your messagecontroller.js can use it!
export const getReceiverSocketId = (receiverId) => {
   return userSocketMap[receiverId];
};

// ==========================================
// 🔌 SOCKET CONNECTION & EVENTS
// ==========================================
io.on('connection', (socket) => {
   console.log('user Connected', socket.id);

   // 1. SETUP: When user opens the app, link their MongoDB ID to their Socket ID
   //  socket.on("setup", (userId) => {
   //      userSocketMap[userId] = socket.id;
   //      socket.join(userId); // Join a "room" named after their ID
   //      console.log(`User ${userId} mapped to socket ${socket.id}`);
   //  });
   const userId = socket.handshake.query.userId;
   
   if (userId) {
      userSocketMap[userId] = socket.id;
      socket.join(userId);
      console.log(`✅ User ${userId} mapped to socket ${socket.id}`); // This should turn green if it works
   } else {
      console.log("❌ NO USER ID FOUND IN QUERY!"); // This will tell us why it's failing
   }
   // ==========================================
   // 📞 NEW: WEBRTC SIGNALING EVENTS
   // ==========================================

   // 2. INCOMING CALL (Caller sends offer to receiver)
   socket.on("call_user", ({ userToCall, from, signal, callType }) => {
      const receiverSocketId = getReceiverSocketId(userToCall);
      console.log("🟡 BACKEND: Call for", userToCall, "| Found socket:", receiverSocketId); 
      if (receiverSocketId) {
         io.to(receiverSocketId).emit("incoming_call", {
            from,
            signal,
            callType // "video" or "audio"
         });
      }
   });

   // 3. ANSWER CALL (Receiver sends answer back to caller)
   socket.on("answer_call", ({ to, signal }) => {
      const callerSocketId = getReceiverSocketId(to);
      if (callerSocketId) {
         io.to(callerSocketId).emit("call_accepted", { signal });
      }
   });

   // 4. ICE CANDIDATE (Both users exchange network details)
   socket.on("ice_candidate", ({ to, candidate }) => {
      const targetSocketId = getReceiverSocketId(to);
      if (targetSocketId) {
         io.to(targetSocketId).emit("ice_candidate", { candidate });
      }
   });

   // 5. END CALL (Either user ends the call)
   socket.on("end_call", ({ to }) => {
      const targetSocketId = getReceiverSocketId(to);
      if (targetSocketId) {
         io.to(targetSocketId).emit("call_ended");
      }
   });

   // 6. REJECT CALL (Receiver rejects the call)
   socket.on("reject_call", ({ to }) => {
      const callerSocketId = getReceiverSocketId(to);
      if (callerSocketId) {
         io.to(callerSocketId).emit("call_rejected");
      }
   });

   // ==========================================
   // 🔌 DISCONNECT
   // ==========================================
   socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      // Remove user from map when they close the tab
      for (const [userId, socketId] of Object.entries(userSocketMap)) {
         if (socketId === socket.id) {
            delete userSocketMap[userId];
            break;
         }
      }
   });
})

export { app, io, server }