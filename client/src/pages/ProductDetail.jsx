import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useCartStore } from "../context/cartStore";
import ProductImage from "../components/ProductImage";

const FEATURES = ["Free shipping", "Easy returns", "1 year warranty", "Authentic product"];

const FEATURE_ICONS = {
  "Free shipping":    { icon: "🚚", color: "#E0F2FE", border: "#7DD3FC" },
  "Easy returns":     { icon: "🔄", color: "#F0FDF4", border: "#86EFAC" },
  "1 year warranty":  { icon: "🛡️", color: "#FFF7ED", border: "#FDBA74" },
  "Authentic product":{ icon: "✅", color: "#F5F3FF", border: "#C4B5FD" },
};

function StarRow({ rating, numReviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <svg key={s} width="15" height="15" viewBox="0 0 24 24"
            fill={s <= Math.round(rating) ? "#FF4B1F" : "none"}
            stroke="#FF4B1F" strokeWidth="1.8">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-[#17181A]">{rating?.toFixed(1)}</span>
      <span className="text-xs text-[#17181A]/40">({numReviews} reviews)</span>
    </div>
  );
}

function RecommendationCard({ product }) {
  return (
    <motion.div whileHover={{ y: -5, boxShadow: "0 10px 28px rgba(0,0,0,0.09)" }}
      className="bg-white border border-[#E2E2DC] rounded-2xl overflow-hidden transition-all">
      <Link to={`/product/${product._id}`} className="block group">
        <div className="bg-[#F0F0EC] aspect-square overflow-hidden">
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-400">
            <ProductImage src={product.images?.[0]} alt={product.name} />
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm font-bold text-[#17181A] truncate">{product.name}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm font-bold text-[#FF4B1F]">Rs {product.price?.toLocaleString()}</p>
            {product.rating > 0 && (
              <span className="text-[10px] text-[#17181A]/40 flex items-center gap-0.5">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="#FF4B1F"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                {product.rating?.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    setSelectedSize(null); setActiveImg(0); setTab("description");
    axios.get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        return axios.get("/api/products", { params: { category: res.data.category, limit: 6 } });
      })
      .then((res) => setRecommendations(res.data.products.filter((p) => p._id !== id)))
      .catch(() => navigate("/shop"));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({ productId: product._id, name: product.name, price: product.price, image: product.images?.[0], size: selectedSize, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return (
    <div className="max-w-6xl mx-auto px-6 py-20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-[#FF4B1F] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#17181A]/40">Loading product...</p>
      </div>
    </div>
  );

  const images = product.images?.length ? product.images : [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 pb-20">

      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-xs text-[#17181A]/40 mb-6">
        <Link to="/" className="hover:text-[#FF4B1F] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#FF4B1F] transition-colors">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-[#FF4B1F] transition-colors capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-[#17181A]/70 font-medium">{product.name}</span>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-[1fr_360px] gap-10 mb-16">

        {/* Left — image gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="flex gap-3">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex flex-col gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImg === i ? "border-[#FF4B1F] shadow-md shadow-[#FF4B1F]/20" : "border-[#E2E2DC] hover:border-[#17181A]"}`}>
                  <ProductImage src={img} alt={`view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="flex-1 bg-[#F0F0EC] rounded-3xl overflow-hidden aspect-square relative border border-[#E2E2DC] shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div key={activeImg} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-full">
                <ProductImage src={images[activeImg]} alt={product.name} />
              </motion.div>
            </AnimatePresence>

            {/* Category badge on image */}
            <span className="absolute top-4 left-4 bg-[#C6FF3D] text-[#17181A] text-[10px] font-black px-3 py-1 rounded-full capitalize shadow-sm">
              {product.category}
            </span>

            {/* Stock badge */}
            {product.stock > 0 && product.stock <= 10 && (
              <span className="absolute top-4 right-4 bg-[#FF4B1F] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                Only {product.stock} left!
              </span>
            )}

            {images.length > 1 && (
              <>
                <button onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-[#17181A] hover:bg-white hover:scale-110 transition-all shadow-md text-lg">‹</button>
                <button onClick={() => setActiveImg((p) => (p + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-[#17181A] hover:bg-white hover:scale-110 transition-all shadow-md text-lg">›</button>
              </>
            )}

            {images.length === 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#17181A]/20">
                <span className="text-6xl">👟</span>
                <p className="text-sm">No image available</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right — product info */}
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="flex flex-col gap-5">

          <div>
            <h1 className="text-3xl font-black text-[#17181A] leading-tight">{product.name}</h1>
            <p className="text-sm text-[#17181A]/40 mt-1 font-medium">{product.brand}</p>
          </div>

          {product.numReviews > 0 && <StarRow rating={product.rating} numReviews={product.numReviews} />}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-black text-[#17181A]">Rs {product.price?.toLocaleString()}</p>
            <span className="text-sm text-[#17181A]/30 line-through">Rs {Math.round(product.price * 1.2).toLocaleString()}</span>
            <span className="text-xs font-bold bg-[#C6FF3D] text-[#17181A] px-2 py-0.5 rounded-full">20% OFF</span>
          </div>

          {/* Size selector */}
          <div className="bg-[#FAFAF8] border border-[#E2E2DC] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-[#17181A]">Select Size <span className="text-[#17181A]/30 font-normal">(UK)</span></p>
              <span className="text-xs text-[#FF4B1F] underline cursor-pointer font-medium">Size guide</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(product.sizes || []).map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold border-2 transition-all ${
                    selectedSize === s
                      ? "bg-[#17181A] text-white border-[#17181A] scale-110 shadow-lg"
                      : "border-[#E2E2DC] text-[#17181A] hover:border-[#FF4B1F] hover:text-[#FF4B1F]"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-[#FF4B1F] mt-2 font-medium">⚠ Please select a size to continue</p>}
          </div>

          {/* Add to cart */}
          <motion.button onClick={handleAddToCart} disabled={!selectedSize}
            whileTap={selectedSize ? { scale: 0.97 } : {}}
            className={`w-full py-4 rounded-2xl text-sm font-black tracking-wide transition-all shadow-lg ${
              added
                ? "bg-[#C6FF3D] text-[#17181A] shadow-[#C6FF3D]/30"
                : selectedSize
                ? "bg-[#FF4B1F] text-white hover:bg-[#e03d10] shadow-[#FF4B1F]/30 hover:shadow-[#FF4B1F]/50"
                : "bg-[#F0F0EC] text-[#17181A]/30 cursor-not-allowed shadow-none"
            }`}>
            {added ? "✓ Added to cart!" : "Add to cart"}
          </motion.button>

          {/* Feature pills */}
          <div className="grid grid-cols-2 gap-2">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: FEATURE_ICONS[f].color, border: `1px solid ${FEATURE_ICONS[f].border}` }}>
                <span>{FEATURE_ICONS[f].icon}</span>
                <span className="text-[#17181A]/70">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs — Description / Details / Reviews */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <div className="flex gap-1 border-b border-[#E2E2DC] mb-6">
          {["description", "details", "reviews"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-bold capitalize transition-all border-b-2 -mb-px ${
                tab === t ? "border-[#FF4B1F] text-[#FF4B1F]" : "border-transparent text-[#17181A]/40 hover:text-[#17181A]"
              }`}>
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {tab === "description" && (
              <div className="max-w-2xl">
                <p className="text-[#17181A]/70 leading-relaxed text-sm">{product.description}</p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { label: "Category", value: product.category },
                    { label: "Brand",    value: product.brand },
                    { label: "In Stock", value: `${product.stock} pairs` },
                  ].map((d) => (
                    <div key={d.label} className="bg-[#F0F0EC] rounded-xl p-3 border border-[#E2E2DC]">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#17181A]/30 mb-1">{d.label}</p>
                      <p className="text-sm font-bold text-[#17181A] capitalize">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "details" && (
              <div className="max-w-2xl grid grid-cols-2 gap-3">
                {[
                  { label: "Upper Material", value: "Premium Mesh / Leather" },
                  { label: "Sole",           value: "Rubber Outsole" },
                  { label: "Closure",        value: "Lace-up" },
                  { label: "Fit",            value: "True to size" },
                  { label: "Ideal For",      value: product.category === "running" ? "Running, Jogging" : product.category === "sports" ? "Sports, Training" : "Casual, Everyday" },
                  { label: "Available Sizes",value: product.sizes?.join(", ") || "—" },
                ].map((d) => (
                  <div key={d.label} className="flex items-start justify-between py-3 px-4 bg-[#FAFAF8] rounded-xl border border-[#E2E2DC]">
                    <span className="text-xs text-[#17181A]/40 font-semibold">{d.label}</span>
                    <span className="text-xs font-bold text-[#17181A] text-right max-w-[55%]">{d.value}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div className="max-w-2xl">
                {product.numReviews > 0 ? (
                  <div className="flex items-center gap-6 p-5 bg-[#FAFAF8] rounded-2xl border border-[#E2E2DC] mb-5">
                    <div className="text-center">
                      <p className="text-5xl font-black text-[#FF4B1F]">{product.rating?.toFixed(1)}</p>
                      <StarRow rating={product.rating} numReviews={product.numReviews} />
                    </div>
                    <div className="flex-1">
                      {[5,4,3,2,1].map((star) => (
                        <div key={star} className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-[#17181A]/40 w-3">{star}</span>
                          <div className="flex-1 h-1.5 bg-[#E2E2DC] rounded-full overflow-hidden">
                            <div className="h-full bg-[#FF4B1F] rounded-full" style={{ width: star === Math.round(product.rating) ? "70%" : star > Math.round(product.rating) ? "10%" : "30%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#17181A]/40">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* You might also like */}
      {recommendations.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#17181A]/30 mb-1">More like this</p>
              <h2 className="text-lg font-black text-[#17181A]">You might also like</h2>
            </div>
            <Link to={`/shop?category=${product.category}`} className="text-xs font-bold text-[#FF4B1F] border border-[#FF4B1F]/30 px-4 py-2 rounded-xl hover:bg-[#FF4B1F] hover:text-white transition-all">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {recommendations.slice(0, 4).map((p, i) => (
              <motion.div key={p._id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <RecommendationCard product={p} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </main>
  );
}
