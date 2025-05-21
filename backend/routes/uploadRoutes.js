import path from "path";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
  const allowedExt = /jpg|jpeg|png|webp/;
  const allowedMime = /image\/jpg|image\/jpeg|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase().slice(1);
  const mimetype = file.mimetype;

  if (allowedExt.test(extname) && allowedMime.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed"), false);
  }
};

// Memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: "Upload error", error: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "your_folder_name",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      return res.status(200).json({
        message: "Image uploaded to Cloudinary successfully",
        imageUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height
      });

    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({ 
        message: "Error uploading to Cloudinary",
        error: error.message 
      });
    }
  });
});

export default router;