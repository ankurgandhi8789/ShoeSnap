import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Hero3D from "../components/Hero3D";

const CATEGORIES = [
  { label: "Running", emoji: "🏃", desc: "Speed & endurance" },
  { label: "Casual", emoji: "👟", desc: "Everyday comfort" },
  { label: "Sports", emoji: "⚡", desc: "Peak performance" },
];

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/product/${product._id}`} className="block group">
        <div className="bg-[#F0F0EC] rounded-2xl aspect-square mb-3 overflow-hidden relative">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#E2E2DC]" />
            </div>
          )}
          {/* Category tag */}
          <span className="absolute top-2.5 left-2.5 bg-[#C6FF3D] text-[#17181A] text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
            {product.category}
          </span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-[#17181A]">{product.name}</p>
            <p className="text-sm font-bold text-[#17181A] mt-0.5">Rs {product.price?.toLocaleString()}</p>
          </div>
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#FF4B1F">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xs text-[#17181A]/50">{product.rating?.toFixed(1)}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get("/api/products", { params: { limit: 4 } })
      .then((res) => setFeatured(res.data.products))
      .catch(() => {});
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 pb-20">
      {/* Hero */}
      <section className="rounded-3xl overflow-hidden my-6 bg-[#F0F0EC]" style={{ height: "62vh" }}>
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center text-sm text-[#17181A]/40">
            Loading 3D...
          </div>
        }>
          <Hero3D />
        </Suspense>
      </section>

      {/* Categories */}
      <section className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#17181A]/40 mb-4">
          Shop by category
        </p>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat.label.toLowerCase()}`}
                className="group flex items-center gap-4 bg-[#F0F0EC] hover:bg-[#17181A] px-5 py-4 rounded-2xl transition-all duration-200"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#17181A] group-hover:text-white transition-colors">
                    {cat.label}
                  </p>
                  <p className="text-xs text-[#17181A]/50 group-hover:text-white/60 transition-colors">
                    {cat.desc}
                  </p>
                </div>
                <span className="ml-auto text-[#17181A]/30 group-hover:text-white/50 transition-colors text-lg">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#17181A]/40">
            Featured products
          </p>
          <Link to="/shop" className="text-xs font-medium text-[#FF4B1F] hover:underline">
            View all →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#F0F0EC] rounded-2xl aspect-square mb-3" />
                <div className="h-3 bg-[#F0F0EC] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[#F0F0EC] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {featured.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}
      </section>

      {/* Banner strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 bg-[#17181A] rounded-3xl px-10 py-8 flex items-center justify-between"
      >
        <div>
          <p className="text-[#C6FF3D] text-xs font-semibold uppercase tracking-widest mb-1">Limited time</p>
          <h2 className="text-white text-xl font-bold">Free shipping on orders above Rs 3,000</h2>
        </div>
        <Link
          to="/shop"
          className="bg-[#FF4B1F] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors shrink-0"
        >
          Shop now
        </Link>
      </motion.section>
    </main>
  );
}
