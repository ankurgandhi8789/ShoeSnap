import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useCartStore } from "../context/cartStore";
import ProductImage from "../components/ProductImage";

const inputCls = "w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors";
const labelCls = "text-xs font-semibold text-[#17181A]/50 uppercase tracking-wide block mb-1.5";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= 3000 ? 0 : 99;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", pincode: "",
  });
  const [payment, setPayment] = useState("razorpay");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.pincode.trim()) e.pincode = "Required";
    if (form.phone && !/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const orderPayload = {
      items: items.map((i) => ({
        product: i.productId, name: i.name,
        price: i.price, size: i.size, qty: i.qty, image: i.image,
      })),
      shippingAddress: {
        name: form.name,
        address: `${form.address}, ${form.city} - ${form.pincode}`,
      },
      paymentMethod: payment,
      totalAmount: total,
    };

    try {
      if (payment === "cod") {
        const { data: order } = await axios.post("/api/orders", orderPayload);
        clearCart();
        navigate(`/order/${order._id}`);
        return;
      }

      const { data } = await axios.post("/api/orders/razorpay", { amount: total });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "ShoeSnap",
        description: "Sneaker Order",
        handler: async (response) => {
          await axios.post("/api/orders", {
            ...orderPayload,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
          });
          clearCart();
          navigate(`/order/${response.razorpay_order_id}`);
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#FF4B1F" },
      };
      new window.Razorpay(options).open();
    } catch {
      alert("Payment failed. Please try again.");
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

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link to="/cart" className="text-[#17181A]/40 hover:text-[#17181A] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-[#17181A]">Checkout</h1>

        {/* Steps */}
        <div className="ml-auto flex items-center gap-2 text-xs">
          {["Cart", "Details", "Payment"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              {i > 0 && <div className="w-6 h-px bg-[#E2E2DC]" />}
              <div className={`flex items-center gap-1.5 ${i === 1 ? "text-[#FF4B1F] font-semibold" : i < 1 ? "text-[#17181A]/30 line-through" : "text-[#17181A]/30"}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 1 ? "bg-[#FF4B1F] text-white" : i < 1 ? "bg-[#E2E2DC] text-[#17181A]/40" : "border border-[#E2E2DC] text-[#17181A]/30"}`}>
                  {i < 1 ? "✓" : i + 1}
                </span>
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-8">

        {/* Left — Form */}
        <form onSubmit={handlePay} className="flex flex-col gap-6">

          {/* Shipping info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#E2E2DC] rounded-2xl p-6"
          >
            <p className="text-sm font-bold text-[#17181A] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#17181A] text-white text-[10px] font-bold flex items-center justify-center">1</span>
              Shipping information
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelCls}>Full name *</label>
                <input name="name" value={form.name} onChange={set} placeholder="Rahul Sharma" className={inputCls} />
                {errors.name && <p className="text-xs text-[#FF4B1F] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className={labelCls}>Email</label>
                <input name="email" type="email" value={form.email} onChange={set} placeholder="rahul@email.com" className={inputCls} />
              </div>

              <div>
                <label className={labelCls}>Phone</label>
                <input name="phone" value={form.phone} onChange={set} placeholder="10-digit number" maxLength={10} className={inputCls} />
                {errors.phone && <p className="text-xs text-[#FF4B1F] mt-1">{errors.phone}</p>}
              </div>

              <div className="col-span-2">
                <label className={labelCls}>Street address *</label>
                <input name="address" value={form.address} onChange={set} placeholder="House no, street, area" className={inputCls} />
                {errors.address && <p className="text-xs text-[#FF4B1F] mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className={labelCls}>City *</label>
                <input name="city" value={form.city} onChange={set} placeholder="Mumbai" className={inputCls} />
                {errors.city && <p className="text-xs text-[#FF4B1F] mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className={labelCls}>Pincode *</label>
                <input name="pincode" value={form.pincode} onChange={set} placeholder="400001" maxLength={6} className={inputCls} />
                {errors.pincode && <p className="text-xs text-[#FF4B1F] mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </motion.div>

          {/* Payment method */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#E2E2DC] rounded-2xl p-6"
          >
            <p className="text-sm font-bold text-[#17181A] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#17181A] text-white text-[10px] font-bold flex items-center justify-center">2</span>
              Payment method
            </p>

            <div className="flex flex-col gap-3">
              {[
                {
                  id: "razorpay",
                  label: "UPI / Razorpay",
                  desc: "Pay via UPI, cards, net banking",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  ),
                },
                {
                  id: "cod",
                  label: "Cash on delivery",
                  desc: "Pay when your order arrives",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                  ),
                },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayment(m.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    payment === m.id
                      ? "border-[#17181A] bg-[#17181A]/3"
                      : "border-[#E2E2DC] hover:border-[#17181A]/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${payment === m.id ? "bg-[#17181A] text-white" : "bg-[#F0F0EC] text-[#17181A]/50"}`}>
                    {m.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#17181A]">{m.label}</p>
                    <p className="text-xs text-[#17181A]/40 mt-0.5">{m.desc}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${payment === m.id ? "border-[#17181A]" : "border-[#E2E2DC]"}`}>
                    {payment === m.id && <div className="w-2 h-2 rounded-full bg-[#17181A]" />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Place order button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF4B1F] text-white py-4 rounded-2xl text-sm font-semibold hover:bg-[#e03d10] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                {payment === "cod" ? "Place order" : "Pay now"}
                <span className="font-bold">· Rs {total.toLocaleString()}</span>
              </>
            )}
          </button>

          {/* Security note */}
          <p className="text-center text-xs text-[#17181A]/30 flex items-center justify-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Secured by 256-bit SSL encryption
          </p>
        </form>

        {/* Right — Order summary */}
        <div className="h-fit sticky top-20 flex flex-col gap-4">
          <div className="bg-[#F0F0EC] rounded-2xl p-5">
            <p className="text-sm font-bold text-[#17181A] mb-4">
              Order summary
              <span className="ml-2 text-xs font-normal text-[#17181A]/40">({items.length} item{items.length > 1 ? "s" : ""})</span>
            </p>

            {/* Items list */}
            <div className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0">
                    <ProductImage src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#17181A] truncate">{item.name}</p>
                    <p className="text-[10px] text-[#17181A]/40">Size {item.size} · Qty {item.qty}</p>
                  </div>
                  <p className="text-xs font-bold text-[#17181A] shrink-0">
                    Rs {(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-[#E2E2DC] pt-3 flex flex-col gap-2">
              <div className="flex justify-between text-sm text-[#17181A]/60">
                <span>Subtotal</span>
                <span>Rs {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-[#17181A]/60">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {shipping === 0 ? "Free" : `Rs ${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#17181A] border-t border-[#E2E2DC] pt-2 mt-1">
                <span>Total</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="bg-white border border-[#E2E2DC] rounded-2xl p-4 flex flex-col gap-3">
            {[
              { icon: "🚚", text: "Delivery in 4–5 business days" },
              { icon: "↩️", text: "Free returns within 7 days" },
              { icon: "✅", text: "100% authentic products" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-xs text-[#17181A]/60">
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
