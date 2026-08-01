import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  const exists = await User.findOne({ email: "admin@strideco.com" });
  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await User.create({
    name: "Admin",
    email: "admin@strideco.com",
    password: "admin123",
    role: "admin",
  });

  console.log("Admin created — email: admin@strideco.com  password: admin123");
  process.exit(0);
}

seedAdmin().catch((e) => { console.error(e); process.exit(1); });
