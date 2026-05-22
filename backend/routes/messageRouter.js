import { saveCallRecord } from '../controlers/messageControle.js';
import express from 'express';
import { isAuthenticate } from '../middleware/isAuthenticate.js';
// 1. ADDED markMessagesAsRead TO THE IMPORT:
import { getMessages, sendMessage, uploadFile, deleteMessage, markMessagesAsRead } from '../controlers/messageControle.js'; 
import { upload } from '../middleware/multer.js';

const router = express.Router();

// Existing routes
router.post('/sendMessage/:id', isAuthenticate, sendMessage);
router.get('/getMessage/:id', isAuthenticate, getMessages);
router.post('/upload-file/:id', isAuthenticate, upload.single("file"), uploadFile);
router.delete('/delete-message/:messageId', isAuthenticate, deleteMessage);

// 2. ADDED THE MISSING ROUTE:
router.post('/mark-read/:id', isAuthenticate, markMessagesAsRead);
router.post("/save-call", isAuthenticate, saveCallRecord);
export default router;