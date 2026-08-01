import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ProductImage from "../components/ProductImage";

const HERO_SLIDES = [
  { bg: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=85", tag: "New Collection 2025", title: "Step into the future", sub: "Premium sneakers crafted for every stride." },
  { bg: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1400&q=85", tag: "Trail Collection", title: "Built for the wild", sub: "Rugged trail shoes for every terrain." },
  { bg: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85", tag: "Sports Edition", title: "Perform at your peak", sub: "High-performance shoes for serious athletes." },
  { bg: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1400&q=85", tag: "Casual Vibes", title: "Style meets comfort", sub: "Everyday sneakers that go with everything." },
];

/* ── tiny helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17181A]/30 mb-5">{children}</p>
);

/* ── Hero ── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);
  const slide = HERO_SLIDES[current];

  return (
    <section className="my-6 rounded-3xl overflow-hidden min-h-[64vh] flex items-center relative border border-white/10 shadow-2xl">
      <AnimatePresence>
        <motion.div key={current + "-bg"} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1 }} className="absolute inset-0">
          <img src={slide.bg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17181A] via-[#17181A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17181A]/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Animated glow orb */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-1/3 top-1/4 w-72 h-72 rounded-full bg-[#FF4B1F] blur-3xl pointer-events-none" />

      <div className="relative z-10 px-14 py-16 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div key={current + "-text"} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.55 }}>
            <span className="inline-block bg-[#C6FF3D] text-[#17181A] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              {slide.tag}
            </span>
            <h1 className="text-white text-5xl font-black leading-tight mb-4 drop-shadow-lg">{slide.title}</h1>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">{slide.sub}</p>
            <div className="flex gap-3">
              <Link to="/shop" className="bg-[#FF4B1F] text-white px-7 py-3 rounded-xl text-sm font-bold hover:bg-[#e03d10] hover:scale-105 transition-all shadow-lg shadow-[#FF4B1F]/30">
                Shop now →
              </Link>
              <Link to="/shop" className="border border-white/30 text-white px-7 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
                View all
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-14 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`transition-all rounded-full ${i === current ? "w-7 h-2 bg-[#FF4B1F]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`} />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-10 z-10 text-white/30 text-xs font-mono">
        {String(current + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
      </div>
    </section>
  );
}

/* ── Flash Sale ── */
function FlashSaleBanner() {
  const TARGET = new Date(); TARGET.setHours(23, 59, 59, 0);
  const [timeLeft, setTimeLeft] = useState(() => TARGET - Date.now());
  useEffect(() => { const t = setInterval(() => setTimeLeft(TARGET - Date.now()), 1000); return () => clearInterval(t); }, []);
  const h = String(Math.floor((timeLeft / 3600000) % 24)).padStart(2, "0");
  const m = String(Math.floor((timeLeft / 60000) % 60)).padStart(2, "0");
  const s = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  return (
    <motion.div {...fadeUp(0)}
      className="relative mb-8 rounded-2xl overflow-hidden flex items-center justify-between px-8 py-5 gap-6 border border-[#FF4B1F]/30 shadow-lg shadow-[#FF4B1F]/10"
      style={{ background: "linear-gradient(135deg, #17181A 0%, #2a1208 55%, #3d1a08 100%)" }}
    >
      {/* animated shimmer line */}
      <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="flex items-center gap-4 shrink-0">
        <div className="text-center leading-none">
          <p className="text-[#FF4B1F] text-2xl font-black">FLASH</p>
          <div className="flex items-center gap-0.5">
            <p className="text-white text-2xl font-black">SA</p>
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-2xl">⚡</motion.span>
            <p className="text-white text-2xl font-black">E</p>
          </div>
        </div>
        <div className="w-px h-12 bg-white/20" />
        <div>
          <p className="text-white text-xl font-bold">Flat 20% Off</p>
          <p className="text-white/50 text-sm">on all sneakers today</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Ends in</p>
        {[h, m, s].map((val, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-center min-w-[52px] shadow-inner">
              <p className="text-white text-xl font-black tabular-nums">{val}</p>
              <p className="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">{["hrs", "min", "sec"][i]}</p>
            </div>
            {i < 2 && <span className="text-white/30 font-bold text-lg">:</span>}
          </div>
        ))}
      </div>

      <Link to="/shop" className="shrink-0 bg-[#FF4B1F] text-white font-bold text-sm px-7 py-3 rounded-xl hover:bg-[#e03d10] hover:scale-105 transition-all shadow-lg shadow-[#FF4B1F]/30">
        Grab deal →
      </Link>
    </motion.div>
  );
}

/* ── Category Box ── */
function CategoryBox({ category, label, accent, borderColor }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const PER = 4;

  useEffect(() => {
    axios.get("/api/products", { params: { category, limit: 12 } })
      .then((res) => setProducts(res.data.products ?? [])).catch(() => {});
  }, [category]);

  const total = Math.ceil(products.length / PER);
  const visible = products.slice(page * PER, page * PER + PER);

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ border: `1.5px solid ${borderColor}` }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ background: accent }}>
        <h3 className="text-base font-black text-[#17181A] tracking-tight">{label}</h3>
        <div className="flex items-center gap-2">
          {total > 1 && (
            <>
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
                className="w-7 h-7 rounded-full bg-white border border-[#E2E2DC] flex items-center justify-center text-sm font-bold disabled:opacity-25 hover:border-[#17181A] transition-all shadow-sm">←</button>
              <button onClick={() => setPage((p) => Math.min(total - 1, p + 1))} disabled={page === total - 1}
                className="w-7 h-7 rounded-full bg-[#17181A] text-white flex items-center justify-center text-sm font-bold disabled:opacity-25 hover:bg-[#FF4B1F] transition-all shadow-sm">→</button>
            </>
          )}
          <Link to={`/shop?category=${category}`} className="text-xs font-bold text-[#FF4B1F] hover:underline ml-2">View all →</Link>
        </div>
      </div>

      {/* Products */}
      <div className="px-5 pb-5 pt-3 bg-white">
        {products.length === 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#F0F0EC] rounded-xl aspect-square mb-2" />
                <div className="h-2.5 bg-[#F0F0EC] rounded w-3/4 mb-1.5" />
                <div className="h-2.5 bg-[#F0F0EC] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }} className="grid grid-cols-4 gap-4">
              {visible.map((p) => (
                <Link key={p._id} to={`/product/${p._id}`} className="group block">
                  <div className="bg-[#F0F0EC] rounded-xl aspect-square overflow-hidden mb-2 border border-transparent group-hover:border-[#E2E2DC] transition-all">
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-400">
                      <ProductImage src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[#17181A] truncate">{p.name}</p>
                  <p className="text-xs font-semibold text-[#FF4B1F] mt-0.5">Rs {p.price?.toLocaleString()}</p>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 pb-24">

      <HeroSlider />
      <FlashSaleBanner />

      {/* Category boxes */}
      <section className="mb-14 flex flex-col gap-5">
        {[
          { category: "running", label: "🏃 Running",  accent: "#F0FDF4", borderColor: "#86EFAC" },
          { category: "casual",  label: "👟 Casual",   accent: "#FFFBEB", borderColor: "#FCD34D" },
          { category: "sports",  label: "⚡ Sports",   accent: "#F5F3FF", borderColor: "#C4B5FD" },
        ].map((box, i) => (
          <motion.div key={box.category} {...fadeUp(i * 0.12)}>
            <CategoryBox {...box} />
          </motion.div>
        ))}
      </section>

      {/* Free shipping banner */}
      <motion.section {...fadeUp(0)}
        className="rounded-3xl px-10 py-8 flex items-center justify-between border border-[#C6FF3D]/40 shadow-lg"
        style={{ background: "linear-gradient(120deg, #17181A 60%, #1e2a0a 100%)" }}
      >
        <div>
          <p className="text-[#C6FF3D] text-xs font-black uppercase tracking-widest mb-1">Limited time</p>
          <h2 className="text-white text-xl font-black">Free shipping on orders above Rs 3,000</h2>
        </div>
        <Link to="/shop" className="bg-[#C6FF3D] text-[#17181A] px-7 py-3 rounded-xl text-sm font-black hover:scale-105 transition-all shadow-lg shadow-[#C6FF3D]/20 shrink-0">
          Shop now →
        </Link>
      </motion.section>

      {/* Perks */}
      <section className="mt-6 grid grid-cols-4 gap-4">
        {[
          { icon: "🚚", title: "Free Delivery",   sub: "On orders above Rs 3,000", color: "#E0F2FE", border: "#7DD3FC" },
          { icon: "🔄", title: "Easy Returns",    sub: "7-day hassle-free returns",  color: "#F0FDF4", border: "#86EFAC" },
          { icon: "🛡️", title: "Secure Payment",  sub: "100% safe & encrypted",      color: "#FFF7ED", border: "#FDBA74" },
          { icon: "📞", title: "24/7 Support",    sub: "Always here to help",         color: "#F5F3FF", border: "#C4B5FD" },
        ].map((perk, i) => (
          <motion.div key={perk.title} {...fadeUp(i * 0.08)}
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            className="rounded-2xl px-5 py-4 flex items-center gap-4 cursor-default transition-all"
            style={{ background: perk.color, border: `1.5px solid ${perk.border}` }}
          >
            <span className="text-3xl">{perk.icon}</span>
            <div>
              <p className="text-sm font-black text-[#17181A]">{perk.title}</p>
              <p className="text-xs text-[#17181A]/50 mt-0.5">{perk.sub}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="mt-14">
        <motion.div {...fadeUp(0)}><SectionLabel>What our customers say</SectionLabel></motion.div>
        <div className="grid grid-cols-3 gap-5">
          {[
            { name: "Arjun M.", review: "Best sneakers I've ever bought. The Air Runner is incredibly comfortable for long runs.", rating: 5, tag: "Running", color: "#F0FDF4", border: "#86EFAC" },
            { name: "Priya S.", review: "Court Classic goes with literally everything. Super clean design and great quality.", rating: 5, tag: "Casual",  color: "#FFFBEB", border: "#FCD34D" },
            { name: "Rahul K.", review: "Sprint Pro gave me a real edge on the court. Delivery was super fast too!", rating: 4, tag: "Sports",  color: "#F5F3FF", border: "#C4B5FD" },
          ].map((t, i) => (
            <motion.div key={t.name} {...fadeUp(i * 0.1)}
              whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}
              className="rounded-2xl p-5 transition-all"
              style={{ background: t.color, border: `1.5px solid ${t.border}` }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="#FF4B1F">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#17181A]/70 leading-relaxed mb-4">"{t.review}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#17181A] flex items-center justify-center text-xs font-black text-white">
                    {t.name[0]}
                  </div>
                  <p className="text-xs font-bold text-[#17181A]">{t.name}</p>
                </div>
                <span className="text-[10px] font-black bg-[#17181A] text-white px-2.5 py-1 rounded-full">{t.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand stats */}
      <motion.section {...fadeUp(0)}
        className="mt-14 rounded-3xl px-10 py-10 grid grid-cols-4 gap-6 text-center border border-[#E2E2DC]"
        style={{ background: "linear-gradient(135deg, #FAFAF8 0%, #F0F0EC 100%)" }}
      >
        {[
          { num: "10K+", label: "Happy Customers", icon: "😊" },
          { num: "50+",  label: "Shoe Styles",      icon: "👟" },
          { num: "4.8★", label: "Average Rating",   icon: "⭐" },
          { num: "2-Day",label: "Fast Delivery",    icon: "🚀" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: i * 0.09, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.06 }} className="cursor-default"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-3xl font-black text-[#FF4B1F] mb-1">{stat.num}</p>
            <p className="text-sm text-[#17181A]/50 font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

    </main>
  );
}
