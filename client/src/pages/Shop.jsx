import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const CATEGORIES = ["running", "casual", "sports"];
const SIZES = [7, 8, 9, 10, 11];

function ProductCard({ product }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Link to={`/product/${product._id}`} className="block group">
        <div className="bg-[#F0F0EC] rounded-2xl aspect-square mb-3 overflow-hidden relative">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#E2E2DC]" />
            </div>
          )}
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

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "";

  useEffect(() => {
    setLoading(true);
    axios.get("/api/products", { params: { category, limit: 12 } })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  const setCategory = (val) => {
    if (val) setSearchParams({ category: val });
    else setSearchParams({});
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Filters */}
        <aside className="w-44 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#17181A]/40 mb-4">Filters</p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-[#17181A] mb-2">Category</p>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setCategory("")}
                className={`text-left text-sm py-1 transition-colors ${!category ? "text-[#FF4B1F] font-medium" : "text-[#17181A]/60 hover:text-[#17181A]"}`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-left text-sm py-1 capitalize transition-colors ${category === c ? "text-[#FF4B1F] font-medium" : "text-[#17181A]/60 hover:text-[#17181A]"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#17181A] mb-2">Size</p>
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map((s) => (
                <span key={s} className="text-xs border border-[#E2E2DC] rounded-lg px-2 py-1 text-[#17181A]/60 cursor-pointer hover:border-[#FF4B1F] hover:text-[#FF4B1F] transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <section className="flex-1">
          {loading ? (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-[#F0F0EC] rounded-2xl aspect-square mb-3" />
                  <div className="h-3 bg-[#F0F0EC] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#F0F0EC] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center h-60 text-sm text-[#17181A]/40">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
