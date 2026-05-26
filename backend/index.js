// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";
// import mongoose from "mongoose"; 

// import { connectDB } from "./config/database.js";
// import UserRouter from "./routes/userRouter.js";
// import MessageRouter from "./routes/messageRouter.js";
// import { Message } from "./models/messageModel.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 8000;

// // ✅ Connect DB
// connectDB();

// // ✅ Middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// const corsOption = {
//   origin: [
//     "http://localhost:3000",
//     "https://chat-website1-jy4bxss7v-altransions-projects.vercel.app"
//   ],
//   credentials: true,
// };

// app.use(cors(corsOption));

// // ✅ Routes
// app.use("/test", UserRouter);
// app.use("/test", MessageRouter);

// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "successfully get message",
//   });
// });

// // ✅ Create HTTP server (Express + Socket.IO together)
// const server = http.createServer(app);

// // ✅ Setup Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://chat-website1-jy4bxss7v-altransions-projects.vercel.app"
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Function to get socketId by the help of the receiver(user)Id
// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// const userSocketMap = {}; // {userId -> socketId}

// // ✅ Socket.IO logic
// io.on("connection", async (socket) => { // <--- 2. ADD async HERE
//   console.log("✅ User Connected:", socket.id);
  
//   // Extraction socket.io query 
//   const userId = socket.handshake.query.userId;
//   if (userId !== undefined) {
//     userSocketMap[userId] = socket.id;
//     console.log(`🔗 Mapped User ${userId} to Socket ${socket.id}`);
    
//     // To send data from backend to frontend
//     io.emit('getOnlineUsers', Object.keys(userSocketMap));

//     // ==========================================
//     // 🔥 NEW: FETCH UNREAD COUNTS FROM DB ON CONNECT
//     // ==========================================
//     try {
//       const unreadMessages = await Message.aggregate([
//         {
//           $match: {
//              // THE FIX: Convert string to ObjectId so MongoDB matches it correctly!
//             receiverId: new mongoose.Types.ObjectId(userId), 
//             // readBy is an array of Strings, so .toString() is correct here
//             readBy: { $not: { $elemMatch: { $eq: userId.toString() } } },
//             // Don't count deleted messages
//             deletedForEveryone: { $ne: true } 
//           }
//         },
//         {
//           $group: {
//             _id: "$senderId",   // Group by the person who sent it
//             count: { $sum: 1 }    // Count how many unread per sender
//           }
//         }
//       ]);

//       // Convert array to object: { "user_id_1": 3, "user_id_2": 5 }
//       const countsMap = {};
//       unreadMessages.forEach(item => {
//         countsMap[item._id] = item.count;
//       });

//       // Send the counts ONLY to the user who just logged in
//       socket.emit("initial_unread_counts", countsMap);
//       console.log(`📬 Sent initial unread counts to ${userId}:`, countsMap);
      
//     } catch (error) {
//       console.error("Error fetching initial unread counts:", error);
//     }
//   }

//   // ==========================================
//   // 📞 NEW: WEBRTC SIGNALING EVENTS
//   // ==========================================

//   // 1. INCOMING CALL (Caller sends offer to receiver)
//   socket.on("call_user", ({ userToCall, from, signal, callType }) => {
//     const receiverSocketId = getReceiverSocketId(userToCall);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("incoming_call", { from, signal, callType });
//     }
//   });

//   // ==================== TYPING INDICATOR ====================
//   socket.on("typing", ({ to, from }) => {
//     const receiverSocketId = getReceiverSocketId(to);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("typing", { from });
//     }
//   });

//   // 2. ANSWER CALL (Receiver sends answer back to caller)
//   socket.on("answer_call", ({ to, signal }) => {
//     const callerSocketId = getReceiverSocketId(to);
//     if (callerSocketId) {
//       io.to(callerSocketId).emit("call_accepted", { signal });
//     }
//   });

//   // 3. ICE CANDIDATE (Both users exchange network details)
//   socket.on("ice_candidate", ({ to, candidate }) => {
//     const targetSocketId = getReceiverSocketId(to);
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("ice_candidate", { candidate });
//     }
//   });

//   // 4. END CALL (Either user ends the call)
//   socket.on("end_call", ({ to }) => {
//     const targetSocketId = getReceiverSocketId(to);
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("call_ended");
//     }
//   });

//   // 5. REJECT CALL (Receiver rejects the call)
//   socket.on("reject_call", ({ to }) => {
//     const callerSocketId = getReceiverSocketId(to);
//     if (callerSocketId) {
//       io.to(callerSocketId).emit("call_rejected");
//     }
//   });

//   // ==========================================
//   // 🔌 DISCONNECT
//   // ==========================================
//   socket.on("disconnect", () => {
//     console.log("❌ User Disconnected:", socket.id);
//     delete userSocketMap[userId];
//     // To send data from backend to frontend
//     io.emit('getOnlineUsers', Object.keys(userSocketMap));
//   });
// });

// // ✅ Start server
// server.listen(port, () => {
//   console.log(`🚀 Server has started at http://localhost:${port}`);
// });

// export { app, io, server };
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectDB } from "./config/database.js";
import UserRouter from "./routes/userRouter.js";
import MessageRouter from "./routes/messageRouter.js";
import { Message } from "./models/messageModel.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ==========================================
// CONNECT DATABASE
// ==========================================
connectDB();

// ==========================================
// MIDDLEWARES
// ==========================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ==========================================
// CORS
// ==========================================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// ==========================================
// ROUTES
// ==========================================
app.use("/test", UserRouter);
app.use("/test", MessageRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Backend is running successfully",
  });
});

// ==========================================
// CREATE HTTP SERVER
// ==========================================
const server = http.createServer(app);

// ==========================================
// SOCKET.IO SETUP
// ==========================================
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ==========================================
// USER SOCKET MAP
// ==========================================
const userSocketMap = {};

// ==========================================
// GET RECEIVER SOCKET ID
// ==========================================
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// ==========================================
// SOCKET CONNECTION
// ==========================================
io.on("connection", async (socket) => {
  console.log("User Connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    console.log(`Mapped User ${userId} to Socket ${socket.id}`);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // ==========================================
    // FETCH UNREAD COUNTS
    // ==========================================
    try {
      const unreadMessages = await Message.aggregate([
        {
          $match: {
            receiverId: new mongoose.Types.ObjectId(userId),
            readBy: {
              $not: {
                $elemMatch: {
                  $eq: userId.toString(),
                },
              },
            },
            deletedForEveryone: {
              $ne: true,
            },
          },
        },
        {
          $group: {
            _id: "$senderId",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      const countsMap = {};
      unreadMessages.forEach((item) => {
        countsMap[item._id] = item.count;
      });

      socket.emit("initial_unread_counts", countsMap);
      console.log(`Sent initial unread counts to ${userId}:`, countsMap);
    } catch (error) {
      console.log("Error fetching unread counts:", error);
    }
  }

  // ==========================================
  // CALL USER (Initial call offer)
  // ==========================================
  socket.on("call_user", ({ userToCall, from, signal, callType }) => {
    const receiverSocketId = getReceiverSocketId(userToCall);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("incoming_call", {
        from,
        signal,
        callType,
      });
    }
  });

  // ==========================================
  // ICE RESTART OFFER (NEW - separate from call_user)
  // This prevents the receiver from showing a new
  // incoming call popup during reconnection
  // ==========================================
  socket.on("ice_restart_offer", ({ to, signal, callType }) => {
    const targetSocketId = getReceiverSocketId(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("ice_restart_offer", {
        from: socket.handshake.query.userId,
        signal,
        callType,
      });
    }
  });

  // ==========================================
  // TYPING INDICATOR
  // ==========================================
  socket.on("typing", ({ to, from }) => {
    const receiverSocketId = getReceiverSocketId(to);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", {
        from,
      });
    }
  });

  // ==========================================
  // ANSWER CALL
  // ==========================================
  socket.on("answer_call", ({ to, signal }) => {
    const callerSocketId = getReceiverSocketId(to);
    if (callerSocketId) {
      io.to(callerSocketId).emit("call_accepted", {
        signal,
      });
    }
  });

  // ==========================================
  // ICE CANDIDATE
  // ==========================================
  socket.on("ice_candidate", ({ to, candidate }) => {
    const targetSocketId = getReceiverSocketId(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("ice_candidate", {
        candidate,
      });
    }
  });

  // ==========================================
  // END CALL
  // ==========================================
  socket.on("end_call", ({ to }) => {
    const targetSocketId = getReceiverSocketId(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("call_ended");
    }
  });

  // ==========================================
  // REJECT CALL
  // ==========================================
  socket.on("reject_call", ({ to }) => {
    const callerSocketId = getReceiverSocketId(to);
    if (callerSocketId) {
      io.to(callerSocketId).emit("call_rejected");
    }
  });

  // ==========================================
  // DISCONNECT
  // ==========================================
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ==========================================
// START SERVER
// ==========================================
server.listen(port, () => {
  console.log(`Server has started at PORT ${port}`);
});

// ==========================================
// EXPORTS
// ==========================================
export { app, io, server };