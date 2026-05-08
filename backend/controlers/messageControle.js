// import { getReceiverSocketId } from "../index.js";
// import { Conversation } from "../models/conversationModel.js";
// import { Message } from "../models/messageModel.js";
// import { User } from "../models/userModel.js";
// import { io } from "../index.js";
// export const sendMessage = async (req, res) => {
//   try {
//     console.log("send message function is running");

//     const senderId = req.id; // must be set by auth middleware
//     const receiverId = req.params.id;
//     const { message } = req.body;
// console.log(" new message is1",message)
//     if (!senderId || !receiverId || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "senderId, receiverId and message are required",
//       });
//     }

//     let gotConversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!gotConversation) {
//       gotConversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (!newMessage) {
//       return res.status(500).json({
//         success: false,
//         message: "new message is not created",
//       });
//     }
//    const p1 = newMessage.message;
//    console.log("p1 is ",p1);
//     gotConversation.messages.push(newMessage._id);
//     await gotConversation.save();

//     // socket io
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     return res.status(201).json({
//       success: true,
//       newMessage,
//       message: "new message created successfully",
//     });
//   } catch (error) {
//     console.error("Send message error:", error);
//     return res.status(400).json({
//       success: false,
//       message: "backend error in the send message function",
//       error: error.message,
//     });
//   }
// };


// // export const sendMessage=async(req, res)=>{
// //    try{ 
// //     console.log('send message function is running');
// //     const senderId = req.id;
// //     const receiverId = req.params.id;
// //     const {message} = req.body;
// //     let gotConversation=await Conversation.findOne({participants:{$all : [senderId , receiverId]}});
// //     if(!gotConversation){
// //         gotConversation=await Conversation.create({
// //             participants : [senderId , receiverId]
// //         })
// //     }
// //      const newMessage = await Message.create({
// //          senderId,
// //          receiverId,
// //          message
// //    })
// //     if(!newMessage){
// //      return res.status(404).json({
// //         success : false,
// //         message : 'new message is not created'
// //      })
// //    }
// //      gotConversation.messages.push(newMessage._id);
// //      await gotConversation.save();
// // //// socket io (send message to receiver)
// // const receiverSocketId = getReceiverSocketId(receiverId);
// // if(receiverSocketId){
// //     // io.to(my multiple receiverId we can send message i the group)
// //     io.to(receiverSocketId).emit('newMessage' ,newMessage);
// // }
 
// //     return res.status(201).json({
// //      success : true,
// //      newMessage,
// //      message:'new message crearte successfully'
    
// //     })
// //    }
// //    catch(error){
// //     return res.status(400).json({
// //         success : true,
// //         message : 'backend error in the send message function'
// //     })
// //    }
// // }
// /////get message
// export const getMessages = async(req, res)=>{
//     try{
//     const senderId=req.params.id;
//      const receiverId=req.id;
//     const conversation= await Conversation.findOne(
//       {
//        participants : {$all : [senderId , receiverId]}
//     }
//   ).populate({path : 'messages'})
//     if(!conversation){
//         return res.status(400).json({
//             success: false,
//             message : "conversation has not started between user"
//         })
//     }
//       return res.status(200).json({
//           success : true ,
//           conversation,
//           message : 'message find successfully'
//     })
// }
  
//     catch(error){
//         return res.status(400).json({
//             success : false,
//             message : "backend error in the getMessage function"
//         })
//     }
// }
// import { getReceiverSocketId } from "../index.js";
// import { Conversation } from "../models/conversationModel.js";
// import { Message } from "../models/messageModel.js";
// import { User } from "../models/userModel.js";
// import { io } from "../index.js";

// // ==================== 1. SEND TEXT MESSAGE ====================
// export const sendMessage = async (req, res) => {
//   try {
//     console.log("send message function is running");

//     const senderId = req.id; 
//     const receiverId = req.params.id;
//     const { message } = req.body;
    
//     if (!senderId || !receiverId || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "senderId, receiverId and message are required",
//       });
//     }

//     let gotConversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!gotConversation) {
//       gotConversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (!newMessage) {
//       return res.status(500).json({
//         success: false,
//         message: "new message is not created",
//       });
//     }

//     gotConversation.messages.push(newMessage._id);
//     await gotConversation.save();

//     // socket io
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     return res.status(201).json({
//       success: true,
//       newMessage,
//       message: "new message created successfully",
//     });
//   } catch (error) {
//     console.error("Send message error:", error);
//     return res.status(400).json({
//       success: false,
//       message: "backend error in the send message function",
//       error: error.message,
//     });
//   }
// };


// // ==================== 2. UPLOAD FILE (CLOUDINARY) ====================
// export const uploadFile = async (req, res) => {
//   try {
//     // Multer/Cloudinary puts the uploaded file inside req.file
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file uploaded",
//       });
//     }

//     const senderId = req.id; 
//     const receiverId = req.params.id;

//     // Figure out what type of file it is for the frontend
//     let fileType = "file";
//     if (req.file.mimetype.startsWith("image/")) fileType = "image";
//     else if (req.file.mimetype.startsWith("video/")) fileType = "video";

//     // Find or create conversation (Same logic as text message)
//     let gotConversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!gotConversation) {
//       gotConversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     // Create the message in Database
//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       message: "", // Empty because they sent a file, not text
//       fileUrl: req.file.path, // Cloudinary automatically puts the full https:// URL here!
//       fileType: fileType,
//     });

//     gotConversation.messages.push(newMessage._id);
//     await gotConversation.save();

//     // Send via Socket.IO to receiver
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     return res.status(201).json({
//       success: true,
//       newMessage,
//       message: "File sent successfully",
//     });

//   } catch (error) {
//     console.error("Upload file error:", error);
    
//     // Special error handling if the file is too large (from your multer.js limit)
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         success: false,
//         message: "File size exceeds the 5MB limit!",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "backend error in the upload file function",
//       error: error.message,
//     });
//   }
// };


// // ==================== 3.
import { getReceiverSocketId } from "../index.js";
import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { io } from "../index.js";

// ==================== 1. SEND TEXT MESSAGE ====================
export const sendMessage = async (req, res) => {
  try {
    console.log("send message function is running");

    const senderId = req.id; 
    const receiverId = req.params.id;
    const { message } = req.body;
    
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: "senderId, receiverId and message are required",
      });
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      replyTo: req.body.replyTo || null
    });

    if (!newMessage) {
      return res.status(500).json({
        success: false,
        message: "new message is not created",
      });
    }

    gotConversation.messages.push(newMessage._id);
    await gotConversation.save();

    // socket io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      newMessage,
      message: "new message created successfully",
    });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(400).json({
      success: false,
      message: "backend error in the send message function",
      error: error.message,
    });
  }
};


// ==================== 2. UPLOAD FILE (CLOUDINARY) ====================
export const uploadFile = async (req, res) => {
  try {
    // Multer/Cloudinary puts the uploaded file inside req.file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const senderId = req.id; 
    const receiverId = req.params.id;

    // Figure out what type of file it is for the frontend
    let fileType = "file";
    if (req.file.mimetype.startsWith("image/")) fileType = "image";
    else if (req.file.mimetype.startsWith("video/")) fileType = "video";

    // Find or create conversation (Same logic as text message)
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create the message in Database
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: "", // Empty because they sent a file, not text
      fileUrl: req.file.path, // Cloudinary automatically puts the full https:// URL here!
      fileType: fileType,
    });

    gotConversation.messages.push(newMessage._id);
    await gotConversation.save();

    // Send via Socket.IO to receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      newMessage,
      message: "File sent successfully",
    });

  } catch (error) {
    console.error("Upload file error:", error);
    
    // Special error handling if the file is too large (from your multer.js limit)
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: "File size exceeds the 5MB limit!",
      });
    }

    return res.status(500).json({
      success: false,
      message: "backend error in the upload file function",
      error: error.message,
    });
  }
};


// ==================== 3. GET MESSAGES ====================
export const getMessages = async(req, res) => {
    try {
      const senderId = req.params.id;
      const receiverId = req.id;
      
      const conversation = await Conversation.findOne({
         participants : {$all : [senderId , receiverId]}
      }).populate({path : 'messages'});
      
      if(!conversation){
          return res.status(400).json({
              success: false,
              message : "conversation has not started between user"
          })
      }
      
      return res.status(200).json({
          success : true ,
          conversation,
          message : 'message find successfully'
      });
    }
    catch(error){
        return res.status(400).json({
            success : false,
            message : "backend error in the getMessage function"
        });
    }
}
// ==================== 4. DELETE MESSAGE ====================
export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const userId = req.id; // The person deleting

    // Find the message
    const message = await Message.findById(messageId);

    if (!message) return res.status(404).json({ success: false, message: "Message not found" });

    // Security: Only the SENDER can delete for everyone
    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "You can only delete your own messages" });
    }

    // Update the message in DB
    message.message = "This message was deleted";
    message.fileUrl = "";
    message.fileType = "";
    message.deletedForEveryone = true;
    await message.save();

    // Emit via Socket.IO to receiver
    const receiverId = message.receiverId;
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }

    res.status(200).json({ success: true, message: "Message deleted" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting message" });
  }
} 
// ==================== 5. MARK MESSAGES AS READ ====================
export const markMessagesAsRead = async (req, res) => {
  try {
    const receiverId = req.id; // The person reading the messages
    const senderId = req.params.id; // The person who SENT the messages

    // Find all unread messages sent TO receiverId FROM senderId
    const updatedMessages = await Message.updateMany(
      { 
        senderId: senderId, 
        receiverId: receiverId, 
        readBy: { $nin: [receiverId] } // Only update if receiver hasn't read it yet
      },
      { $push: { readBy: receiverId } } // Add receiver's ID to the readBy array
    );

    // If we actually updated some messages (meaning there were unread ones)
    if (updatedMessages.modifiedCount > 0) {
      const senderSocketId = getReceiverSocketId(senderId);
      if (senderSocketId) {
        // Tell the sender: "Hey, [receiverId] just read your messages!"
        io.to(senderSocketId).emit("messageRead", { receiverId });
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error marking as read" });
  }
}