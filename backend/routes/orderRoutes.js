import express from "express";
import {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);                          // create order (auth optional)
router.post("/razorpay", createRazorpayOrder);          // create Razorpay order
router.post("/razorpay/verify", verifyRazorpayPayment); // verify payment
router.get("/my", protect, getMyOrders);                // user's orders
router.get("/:id", getOrderById);                       // single order

export default router;
