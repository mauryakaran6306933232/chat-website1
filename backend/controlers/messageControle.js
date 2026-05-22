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


// ==================== 3. GET MESSAGES (WHATSAPP CURSOR PAGINATION) ====================
export const getMessages = async (req, res) => {
  try {
    const myId = req.id;
    const otherUserId = req.params.id;
    const cursor = req.query.cursor; // The _id of the oldest message on the frontend

    const query = {
      $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId }
      ]
    };

    // If a cursor exists, only fetch messages OLDER than the cursor
    if (cursor) {
      query._id = { $lt: cursor };
    }

    // Sort descending (-1) so we get the NEWEST messages first, limited to 20
    const messages = await Message.find(query)
      .sort({ _id: -1 })
      .limit(20);

    // The next cursor is the _id of the OLDEST message in this batch
    const nextCursor = messages.length > 0 ? messages[messages.length - 1]._id : null;

    return res.status(200).json({
      success: true,
      messages: messages, 
      nextCursor: nextCursor,
      hasMore: messages.length === 20 // If we got exactly 20, there might be more
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Backend error in the getMessage function"
    });
  }
};
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
// ==================== 6. SAVE CALL RECORD ====================
export const saveCallRecord = async (req, res) => {
  try {
    const currentUserId = req.id; 
    const { senderId, receiverId, callType, callStatus, callDuration } = req.body;

    // Security: Ensure the person making the request is actually part of this call
    if (currentUserId !== senderId && currentUserId !== receiverId) {
      return res.status(403).json({ success: false, message: "Unauthorized to save this call log" });
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
      message: "", 
      callType,
      callStatus,
      callDuration,
    });

    gotConversation.messages.push(newMessage._id);
    await gotConversation.save();

    // ==========================================
    // ■ FIX: EMIT TO BOTH USERS
    // ==========================================
    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      newMessage,
      message: "Call record saved",
    });
  } catch (error) {
    console.error("Save call record error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save call record",
    });
  }
};