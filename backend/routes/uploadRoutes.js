import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const router = express.Router();

// ✅ Cloudinary Configuration
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary configuration");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ✅ Constants
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const CLOUDINARY_FOLDER = "uploads";

// ✅ Multer Setup
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase().slice(1);
  if (
    !ALLOWED_EXTENSIONS.includes(extname) ||
    !file.mimetype.startsWith("image/")
  ) {
    return cb(
      new Error("Invalid file type. Please upload a JPG, JPEG, PNG, or WEBP image."),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
});

// ✅ Error handler middleware
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

// ✅ Upload Route
router.post("/", upload.single("image"), handleUploadErrors, async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file provided" });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: CLOUDINARY_FOLDER,
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during image upload" });
  }
});

export default router;
