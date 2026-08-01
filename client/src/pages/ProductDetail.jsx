import { useEffect, useState, Suspense } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ProductViewer3D from "../components/ProductViewer3D";
import { useCartStore } from "../context/cartStore";

function RecommendationCard({ product }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link to={`/product/${product._id}`} className="block group">
        <div className="bg-[#F0F0EC] rounded-2xl aspect-square mb-3 overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#E2E2DC]" />
            </div>
          )}
        </div>
        <p className="text-sm font-semibold text-[#17181A] truncate">{product.name}</p>
        <p className="text-sm text-[#17181A]/50 mt-0.5">Rs {product.price?.toLocaleString()}</p>
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

  useEffect(() => {
    setSelectedSize(null);
    setActiveImg(0);
    axios.get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        // fetch same-category recommendations
        return axios.get("/api/products", {
          params: { category: res.data.category, limit: 5 },
        });
      })
      .then((res) => {
        setRecommendations(res.data.products.filter((p) => p._id !== id));
      })
      .catch(() => navigate("/shop"));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      size: selectedSize,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-center">
        <div className="animate-pulse text-sm text-[#17181A]/40">Loading...</div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* Main product section */}
      <div className="grid grid-cols-[1fr_340px] gap-10 mb-16">

        {/* Left — 3D viewer + image thumbnails */}
        <div className="flex flex-col gap-3">
          <Suspense fallback={
            <div className="bg-[#F0F0EC] rounded-3xl aspect-square flex items-center justify-center text-sm text-[#17181A]/40">
              Loading 3D...
            </div>
          }>
            <ProductViewer3D modelUrl={product.model3D || "/models/sneaker.glb"} />
          </Suspense>

          {/* Image thumbnails */}
          {product.images?.length > 0 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? "border-[#17181A]" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — product info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-5 pt-2"
        >
          {product.category && (
            <span className="inline-block bg-[#C6FF3D] text-[#17181A] text-xs font-semibold px-3 py-1 rounded-full w-fit capitalize">
              {product.category}
            </span>
          )}

          <div>
            <h1 className="text-2xl font-bold text-[#17181A] leading-tight">{product.name}</h1>
            <p className="text-sm text-[#17181A]/40 mt-0.5">{product.brand}</p>
          </div>

          {/* Rating */}
          {product.numReviews > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="14" height="14" viewBox="0 0 24 24"
                    fill={star <= Math.round(product.rating) ? "#FF4B1F" : "none"}
                    stroke="#FF4B1F" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-[#17181A]/50">{product.rating?.toFixed(1)} ({product.numReviews} reviews)</span>
            </div>
          )}

          <p className="text-2xl font-bold text-[#17181A]">Rs {product.price?.toLocaleString()}</p>

          <p className="text-sm text-[#17181A]/60 leading-relaxed">{product.description}</p>

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-[#17181A]">Select Size</p>
              <span className="text-xs text-[#17181A]/40 underline cursor-pointer">Size guide</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(product.sizes || []).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-11 h-11 rounded-xl text-sm font-medium border transition-all ${
                    selectedSize === s
                      ? "bg-[#17181A] text-white border-[#17181A]"
                      : "border-[#E2E2DC] text-[#17181A] hover:border-[#17181A]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-xs text-[#FF4B1F] mt-1.5">Please select a size</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              added
                ? "bg-[#C6FF3D] text-[#17181A]"
                : selectedSize
                ? "bg-[#FF4B1F] text-white hover:bg-[#e03d10]"
                : "bg-[#F0F0EC] text-[#17181A]/30 cursor-not-allowed"
            }`}
          >
            {added ? "Added to cart ✓" : "Add to cart"}
          </button>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {["Free shipping", "Easy returns", "1 year warranty", "Authentic product"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-[#17181A]/50">
                <span className="w-4 h-4 rounded-full bg-[#C6FF3D] flex items-center justify-center text-[#17181A] font-bold text-[9px]">✓</span>
                {f}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#17181A]/40">
              You might also like
            </p>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-xs font-medium text-[#FF4B1F] hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {recommendations.slice(0, 4).map((p) => (
              <RecommendationCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
