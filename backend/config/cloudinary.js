import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Put your keys here
cloudinary.config({
    cloud_name: 'dw6degkin',
    api_key: '239629825944141',
    api_secret: 'eknjJgu7Ru5llDpGbaDaMZFI7A0'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let resourceType = 'image'; 
        
        if (file.mimetype.startsWith('video/')) {
            resourceType = 'video';
        } else if (!file.mimetype.startsWith('image/')) {
            resourceType = 'raw'; 
        }

        // 🔥 NEW: If it's a PDF/ZIP/DOC, manually force the file extension!
        if (resourceType === 'raw') {
            const ext = file.originalname.split('.').pop(); // gets "pdf", "zip", etc.
            return {
                folder: 'chat_files',
                public_id: `${Date.now()}-${file.originalname.split('.')[0].replace(/\s+/g, '-')}`,
                format: ext, // Forces Cloudinary to keep the ".pdf" at the end of the URL!
                resource_type: 'raw'
            };
        }

        return {
            folder: 'chat_files',
            resource_type: resourceType
        };
    },
});

export { cloudinary, storage };