import multer from "multer";
import { storage } from "../config/cloudinary.js"; // Import Cloudinary storage

export const upload = multer({
    storage: storage, 
    limits: {
        // LIMIT: 5MB. Change 5 to 10 if you want a 10MB limit.
        fileSize: 5 * 1024 * 1024, 
    },
});