import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "running", "casual", "sports"
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    sizes: [{ type: Number }], // available shoe sizes
    images: [{ type: String }], // 2D product photos (Cloudinary URLs)
    model3D: { type: String }, // URL to .glb file for the 3D viewer
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
