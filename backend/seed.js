import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Air Runner",
    brand: "StrideCo",
    description: "Lightweight running shoe with responsive cushioning. Built for speed and long-distance comfort.",
    category: "running",
    price: 3499,
    stock: 50,
    sizes: [7, 8, 9, 10, 11],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    ],
    model3D: "/models/sneaker.glb",
    rating: 4.5,
    numReviews: 128,
  },
  {
    name: "Trail Max",
    brand: "StrideCo",
    description: "Rugged trail shoe with aggressive grip and waterproof upper. Conquer any terrain.",
    category: "running",
    price: 4199,
    stock: 35,
    sizes: [7, 8, 9, 10, 11],
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
    model3D: "/models/sneaker.glb",
    rating: 4.3,
    numReviews: 89,
  },
  {
    name: "Court Classic",
    brand: "StrideCo",
    description: "Clean, minimal court-style sneaker. Pairs with everything — from jeans to joggers.",
    category: "casual",
    price: 2899,
    stock: 60,
    sizes: [7, 8, 9, 10, 11],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=80",
    ],
    model3D: "/models/sneaker.glb",
    rating: 4.6,
    numReviews: 214,
  },
  {
    name: "Flex Glide",
    brand: "StrideCo",
    description: "Ultra-flexible everyday sneaker with memory foam insole. All-day comfort guaranteed.",
    category: "casual",
    price: 3999,
    stock: 45,
    sizes: [7, 8, 9, 10, 11],
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    ],
    model3D: "/models/sneaker.glb",
    rating: 4.4,
    numReviews: 76,
  },
  {
    name: "Urban Step",
    brand: "StrideCo",
    description: "Street-ready sneaker with bold silhouette. Designed for the city grind.",
    category: "casual",
    price: 2499,
    stock: 40,
    sizes: [8, 9, 10, 11],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    ],
    model3D: "/models/sneaker.glb",
    rating: 4.2,
    numReviews: 53,
  },
  {
    name: "Sprint Pro",
    brand: "StrideCo",
    description: "High-performance sports shoe with carbon fibre plate. Built for athletes.",
    category: "sports",
    price: 4599,
    stock: 25,
    sizes: [7, 8, 9, 10, 11],
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80",
    ],
    model3D: "/models/sneaker.glb",
    rating: 4.7,
    numReviews: 162,
  },
  {
    name: "Power Boost",
    brand: "StrideCo",
    description: "Energy-return midsole technology for explosive performance on the court.",
    category: "sports",
    price: 5199,
    stock: 20,
    sizes: [8, 9, 10, 11],
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=80",
    ],
    model3D: "/models/sneaker.glb",
    rating: 4.8,
    numReviews: 97,
  },
  {
    name: "Drift Low",
    brand: "StrideCo",
    description: "Low-profile skate-inspired sneaker with vulcanized sole and canvas upper.",
    category: "casual",
    price: 1999,
    stock: 70,
    sizes: [7, 8, 9, 10, 11],
    images: [
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=80",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=80",
    ],
    model3D: "/models/sneaker.glb",
    rating: 4.1,
    numReviews: 44,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await Product.deleteMany({});
    console.log("Old products cleared");
    await Product.insertMany(products);
    console.log(`${products.length} products seeded with images`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seed();
