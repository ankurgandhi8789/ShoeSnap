import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../context/cartStore";
import ProductImage from "../components/ProductImage";

function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-[#E2E2DC] hover:border-[#17181A]/20 transition-colors"
    >
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F0F0EC] shrink-0">
        <ProductImage src={item.image} alt={item.name} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#17181A] truncate">{item.name}</p>
        <p className="text-xs text-[#17181A]/40 mt-0.5">Size {item.size}</p>

        {/* Qty controls */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => onQtyChange(item, -1)}
            className="w-7 h-7 rounded-lg bg-[#F0F0EC] hover:bg-[#E2E2DC] text-[#17181A] text-sm font-bold flex items-center justify-center transition-colors"
          >−</button>
          <span className="text-sm font-semibold text-[#17181A] w-5 text-center">{item.qty}</span>
          <button
            onClick={() => onQtyChange(item, 1)}
            className="w-7 h-7 rounded-lg bg-[#F0F0EC] hover:bg-[#E2E2DC] text-[#17181A] text-sm font-bold flex items-center justify-center transition-colors"
          >+</button>
        </div>
      </div>

      {/* Price + remove */}
      <div className="text-right shrink-0 flex flex-col items-end gap-3">
        <p className="text-sm font-bold text-[#17181A]">
          Rs {(item.price * item.qty).toLocaleString()}
        </p>
        <p className="text-xs text-[#17181A]/30">
          Rs {item.price.toLocaleString()} each
        </p>
        <button
          onClick={() => onRemove(item)}
          className="flex items-center gap-1 text-xs text-[#17181A]/30 hover:text-[#FF4B1F] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
          Remove
        </button>
      </div>
    </motion.div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, addItem } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  const handleQtyChange = (item, delta) => {
    if (item.qty + delta <= 0) {
      removeItem(item.productId, item.size);
    } else {
      removeItem(item.productId, item.size);
      addItem({ ...item, qty: item.qty + delta });
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#F0F0EC] flex items-center justify-center mb-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C6C6C0" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <p className="text-base font-semibold text-[#17181A]">Your cart is empty</p>
        <p className="text-sm text-[#17181A]/40">Looks like you haven't added anything yet.</p>
        <Link
          to="/shop"
          className="mt-2 bg-[#FF4B1F] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#17181A]">Your cart</h1>
          <p className="text-xs text-[#17181A]/40 mt-0.5">{totalItems} item{totalItems > 1 ? "s" : ""}</p>
        </div>
        <Link to="/shop" className="text-xs text-[#17181A]/40 hover:text-[#FF4B1F] transition-colors flex items-center gap-1">
          ← Continue shopping
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6">

        {/* Cart items */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.size}`}
                item={item}
                onRemove={(i) => removeItem(i.productId, i.size)}
                onQtyChange={handleQtyChange}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div className="h-fit sticky top-20">
          <div className="bg-[#F0F0EC] rounded-2xl p-5">
            <p className="text-sm font-bold text-[#17181A] mb-4">Order summary</p>

            {/* Item breakdown */}
            <div className="flex flex-col gap-2 mb-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex justify-between text-xs text-[#17181A]/50">
                  <span className="truncate max-w-[140px]">{item.name} × {item.qty}</span>
                  <span>Rs {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E2E2DC] pt-3 flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-sm text-[#17181A]/60">
                <span>Subtotal</span>
                <span>Rs {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-[#17181A]/60">
                <span>Shipping</span>
                <span className="text-[#17181A] font-medium">
                  {subtotal >= 3000 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    "Rs 99"
                  )}
                </span>
              </div>
              {subtotal < 3000 && (
                <p className="text-[10px] text-[#17181A]/40 bg-[#E2E2DC] rounded-lg px-2 py-1.5">
                  Add Rs {(3000 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}
            </div>

            <div className="flex justify-between text-sm font-bold text-[#17181A] border-t border-[#E2E2DC] pt-3 mb-5">
              <span>Total</span>
              <span>Rs {(subtotal + (subtotal >= 3000 ? 0 : 99)).toLocaleString()}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#FF4B1F] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors flex items-center justify-center gap-2"
            >
              Checkout
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 mt-4">
              {["Secure payment", "Easy returns"].map((t) => (
                <div key={t} className="flex items-center gap-1 text-[10px] text-[#17181A]/30">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
