import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ProductImage from "../components/ProductImage";

const HERO_SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=85",
    shoe: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85",
    tag: "New Collection 2025",
    title: "Step into the future",
    sub: "Premium sneakers crafted for every stride.",
  },
  {
    bg: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1400&q=85",
    shoe: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=700&q=85",
    tag: "Trail Collection",
    title: "Built for the wild",
    sub: "Rugged trail shoes for every terrain.",
  },
  {
    bg: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85",
    shoe: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85",
    tag: "Sports Edition",
    title: "Perform at your peak",
    sub: "High-performance shoes for serious athletes.",
  },
  {
    bg: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1400&q=85",
    shoe: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=700&q=85",
    tag: "Casual Vibes",
    title: "Style meets comfort",
    sub: "Everyday sneakers that go with everything.",
  },
];

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
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
            <ProductImage src={product.images?.[0]} alt={product.name} />
          </div>
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

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="my-6 rounded-3xl overflow-hidden bg-[#17181A] min-h-[62vh] flex items-center relative">

      {/* Background — crossfade */}
      <AnimatePresence>
        <motion.div
          key={current + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17181A] via-[#17181A]/75 to-[#17181A]/20" />
        </motion.div>
      </AnimatePresence>

      {/* Text content */}
      <div className="relative z-10 px-12 py-16 max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#C6FF3D] text-xs font-semibold uppercase tracking-widest mb-3">
              {slide.tag}
            </p>
            <h1 className="text-white text-5xl font-bold leading-tight mb-4">
              {slide.title}
            </h1>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              {slide.sub}
            </p>
            <div className="flex gap-3">
              <Link
                to="/shop"
                className="bg-[#FF4B1F] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors"
              >
                Shop now
              </Link>
              
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side shoe image — crossfade */}
      <AnimatePresence>
        <motion.div
          key={current + "-shoe"}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.7 }}
          className="absolute right-12 bottom-0 h-[90%] hidden lg:block"
        >
          <img
            src={slide.shoe}
            alt="sneaker"
            className="h-full w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-12 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all rounded-full ${
              i === current
                ? "w-6 h-2 bg-[#FF4B1F]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
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
      <HeroSlider />

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
