import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExt = /jpg|jpeg|png|webp/;
  const allowedMime = /image\/jpg|image\/jpeg|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase().slice(1); // remove dot
  const mimetype = file.mimetype;

  if (allowedExt.test(extname) && allowedMime.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: "Upload error", error: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    return res.status(200).json({
      message: "Image uploaded successfully",
      image: `/uploads/${req.file.filename}`,
    });
  });
});

export default router;
