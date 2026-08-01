import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/upload  — upload single image, returns Cloudinary URL
router.post("/", protect, isAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ url: req.file.path });
});

export default router;
