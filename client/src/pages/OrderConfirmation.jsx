import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <main className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 bg-[#C6FF3D] rounded-full flex items-center justify-center mb-6"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#17181A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-[#17181A] mb-2">Order placed</h1>
        <p className="text-sm text-[#17181A]/60 mb-8">
          Order #{orderId} — arriving in 4–5 days
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/shop"
            className="bg-[#FF4B1F] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="border border-[#E2E2DC] text-[#17181A] px-6 py-3 rounded-xl text-sm font-medium hover:border-[#17181A] transition-colors"
          >
            Back to home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
