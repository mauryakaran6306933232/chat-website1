import mongoose from "mongoose";
import { User } from "./userModel.js";

const messageModel = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        // CHANGED: It is no longer required, because a user might send ONLY a file
        default: "" 
    },
    deletedForEveryone: {
    type: Boolean,
    default: false
   },
   readBy: {
    type: [String], // Array of User IDs who have read this message
    default: []
   },
    replyTo: {
      type: {
         messageId: String,
         text: String,
         username: String
      },
      default: null
   },
    // NEW: This will save the Cloudinary URL (e.g., "https://res.cloudinary.com/...")
    fileUrl: {
        type: String,
        default: ""
    },
    // ... existing fields (fileUrl, fileType, etc.)
fileType: {
    type: String,
    default: ""
},
// ========== NEW CALL RECORD FIELDS ==========
callType: {
    type: String,
    enum: ['', 'audio', 'video'],
    default: ''
},
callStatus: {
    type: String,
    enum: ['', 'missed', 'completed'],
    default: ''
},
callDuration: {
    type: Number, // Duration in seconds
    default: 0
}
// ============================================
}, { timestamps: true });

export const Message = mongoose.model('Message', messageModel);