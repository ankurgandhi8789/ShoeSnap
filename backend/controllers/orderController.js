import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

const getRazorpay = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount, razorpayOrderId, razorpayPaymentId } = req.body;
    if (!items?.length || !shippingAddress || !paymentMethod || !totalAmount)
      return res.status(400).json({ message: "Missing required fields" });

    const order = await Order.create({
      user: req.user?.id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
    });
    res.status(201).json(order);
  } catch (err) { next(err); }
};

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: "Amount required" });

    const rzpOrder = await getRazorpay().orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.json(rzpOrder);
  } catch (err) { next(err); }
};

export const verifyRazorpayPayment = (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSig = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSig !== razorpay_signature)
      return res.status(400).json({ message: "Payment verification failed" });

    res.json({ verified: true });
  } catch (err) { next(err); }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) { next(err); }
};
