import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../context/cartStore";

function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 py-4 border-b border-[#E2E2DC]"
    >
      <div className="w-16 h-16 bg-[#F0F0EC] rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#E2E2DC]" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#17181A] truncate">{item.name} — size {item.size}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <button onClick={() => onQtyChange(item, -1)} className="w-6 h-6 rounded-lg bg-[#F0F0EC] text-[#17181A] text-sm flex items-center justify-center hover:bg-[#E2E2DC]">−</button>
          <span className="text-sm text-[#17181A]/60">Qty {item.qty}</span>
          <button onClick={() => onQtyChange(item, 1)} className="w-6 h-6 rounded-lg bg-[#F0F0EC] text-[#17181A] text-sm flex items-center justify-center hover:bg-[#E2E2DC]">+</button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-[#17181A]">Rs {(item.price * item.qty).toLocaleString()}</p>
        <button onClick={() => onRemove(item)} className="text-xs text-[#17181A]/40 hover:text-[#FF4B1F] mt-1 transition-colors">Remove</button>
      </div>
    </motion.div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, addItem } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

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
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-[#17181A]/40 text-sm mb-4">Your cart is empty</p>
        <Link to="/shop" className="text-sm font-semibold text-[#FF4B1F] hover:underline">Browse products →</Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold text-[#17181A] mb-6">Your cart ({items.length} items)</h1>

      <div className="grid grid-cols-[1fr_280px] gap-8">
        <div>
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

        <div className="bg-[#F0F0EC] rounded-2xl p-5 h-fit">
          <div className="flex justify-between text-sm text-[#17181A]/60 mb-2">
            <span>Subtotal</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-[#17181A]/60 mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-[#17181A] border-t border-[#E2E2DC] pt-4 mb-5">
            <span>Total</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-[#FF4B1F] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
