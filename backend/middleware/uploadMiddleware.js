import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "strideco/products",
        transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }],
      },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    Readable.from(buffer).pipe(stream);
  });
