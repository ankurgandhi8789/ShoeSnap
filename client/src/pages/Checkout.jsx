import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../context/cartStore";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const [form, setForm] = useState({ name: "", address: "" });
  const [payment, setPayment] = useState("razorpay");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePay = async (e) => {
    e.preventDefault();
    if (!form.name || !form.address) return;
    setLoading(true);
    try {
      if (payment === "cod") {
        const { data: order } = await axios.post("/api/orders", {
          items: items.map((i) => ({ product: i.productId, name: i.name, price: i.price, size: i.size, qty: i.qty, image: i.image })),
          shippingAddress: form,
          paymentMethod: "cod",
          totalAmount: subtotal,
        });
        clearCart();
        navigate(`/order/${order._id}`);
        return;
      }
      // Razorpay flow
      const { data } = await axios.post("/api/orders/razorpay", { amount: subtotal });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "StrideCo",
        description: "Sneaker Order",
        handler: async (response) => {
          await axios.post("/api/orders", {
            items: items.map((i) => ({ product: i.productId, name: i.name, price: i.price, size: i.size, qty: i.qty, image: i.image })),
            shippingAddress: form,
            paymentMethod: "razorpay",
            totalAmount: subtotal,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
          });
          clearCart();
          navigate(`/order/${response.razorpay_order_id}`);
        },
        prefill: { name: form.name },
        theme: { color: "#FF4B1F" },
      };
      new window.Razorpay(options).open();
    } catch {
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold text-[#17181A] mb-6">Checkout</h1>

      <div className="grid grid-cols-[1fr_280px] gap-8">
        <form onSubmit={handlePay} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-[#17181A] block mb-1.5">Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#17181A] block mb-1.5">Delivery address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, city"
              required
              className="w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#17181A] block mb-2">Payment method</label>
            <div className="grid grid-cols-2 gap-3">
              {["razorpay", "cod"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPayment(method)}
                  className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                    payment === method
                      ? "border-[#17181A] bg-[#17181A] text-white"
                      : "border-[#E2E2DC] text-[#17181A] hover:border-[#17181A]"
                  }`}
                >
                  {method === "razorpay" ? "UPI / Razorpay" : "Cash on delivery"}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#FF4B1F] text-white py-3.5 rounded-2xl text-sm font-semibold hover:bg-[#e03d10] transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay now"}
          </button>
        </form>

        {/* Order summary */}
        <div className="bg-[#F0F0EC] rounded-2xl p-5 h-fit">
          <p className="text-sm font-semibold text-[#17181A] mb-3">Order summary</p>
          <div className="flex justify-between text-sm text-[#17181A]/60 mb-2">
            <span>{items.length} items</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-[#17181A] border-t border-[#E2E2DC] pt-3 mt-3">
            <span>Total</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
