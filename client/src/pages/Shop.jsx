import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ProductImage from "../components/ProductImage";

const CATEGORIES = ["running", "casual", "sports"];
const SIZES = [7, 8, 9, 10, 11];
const LIMIT = 9;
const SORT_OPTIONS = [
  { label: "Newest", value: "" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];
const PRICE_RANGES = [
  { label: "Under Rs 2,500", min: 0, max: 2500 },
  { label: "Rs 2,500 – 4,000", min: 2500, max: 4000 },
  { label: "Above Rs 4,000", min: 4000, max: Infinity },
];
const CAT_META = {
  "": { icon: "🛍️", label: "All" },
  running: { icon: "🏃", label: "Running" },
  casual: { icon: "👟", label: "Casual" },
  sports: { icon: "⚡", label: "Sports" },
};

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/product/${product._id}`} className="block group">
        {/* Image */}
        <div className="relative bg-[#F0F0EC] rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: "1" }}>
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
            <ProductImage src={product.images?.[0]} alt={product.name} />
          </div>

          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-[#C6FF3D] text-[#17181A] text-[10px] font-bold px-2.5 py-1 rounded-full capitalize">
            {product.category}
          </span>

          {/* Rating badge */}
          {product.rating > 0 && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#17181A] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#FF4B1F">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {product.rating?.toFixed(1)}
            </span>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#17181A]/0 group-hover:bg-[#17181A]/20 transition-all duration-300 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100">
            <span className="bg-white text-[#17181A] text-xs font-bold px-5 py-2.5 rounded-full shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              View Product →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="px-1">
          <p className="text-sm font-semibold text-[#17181A] truncate">{product.name}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm font-bold text-[#FF4B1F]">Rs {product.price?.toLocaleString()}</p>
            {product.sizes?.length > 0 && (
              <div className="flex gap-1">
                {product.sizes.slice(0, 3).map((s) => (
                  <span key={s} className="text-[9px] text-[#17181A]/40 border border-[#E2E2DC] rounded px-1 py-0.5">{s}</span>
                ))}
                {product.sizes.length > 3 && <span className="text-[9px] text-[#17181A]/30">+{product.sizes.length - 3}</span>}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-[#F0F0EC] rounded-2xl aspect-square mb-3" />
      <div className="h-3 bg-[#F0F0EC] rounded w-3/4 mb-2" />
      <div className="h-3 bg-[#F0F0EC] rounded w-1/2" />
    </div>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) pages.push(i);
    else if (pages[pages.length - 1] !== "...") pages.push("...");
  }
  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}
        className="w-9 h-9 rounded-xl border border-[#E2E2DC] flex items-center justify-center text-[#17181A]/50 hover:border-[#17181A] hover:text-[#17181A] disabled:opacity-30 transition-all">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      {pages.map((p, i) => p === "..." ? (
        <span key={`d${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-[#17181A]/30">···</span>
      ) : (
        <button key={p} onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${p === page ? "bg-[#17181A] text-white" : "border border-[#E2E2DC] text-[#17181A]/60 hover:border-[#17181A] hover:text-[#17181A]"}`}>
          {p}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
        className="w-9 h-9 rounded-xl border border-[#E2E2DC] flex items-center justify-center text-[#17181A]/50 hover:border-[#17181A] hover:text-[#17181A] disabled:opacity-30 transition-all">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
    </div>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState(null);

  const category = searchParams.get("category") || "";

  useEffect(() => { setPage(1); }, [category, search, selectedSizes, sort, priceRange]);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/products", { params: { category, search, limit: 100 } })
      .then((res) => {
        let list = res.data.products ?? [];
        if (selectedSizes.length > 0) list = list.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
        if (priceRange) list = list.filter((p) => p.price >= priceRange.min && p.price < priceRange.max);
        if (sort === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
        if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
        if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
        setAllProducts(list);
        setTotal(list.length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, search, selectedSizes, sort, priceRange]);

  const totalPages = Math.ceil(total / LIMIT);
  const paginated = allProducts.slice((page - 1) * LIMIT, page * LIMIT);

  const setCategory = (val) => val ? setSearchParams({ category: val }) : setSearchParams({});
  const toggleSize = (s) => setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const handleSearch = (e) => { e.preventDefault(); setSearch(searchInput); };
  const clearFilters = () => { setCategory(""); setSelectedSizes([]); setSort(""); setSearch(""); setSearchInput(""); setPriceRange(null); };
  const hasFilters = category || selectedSizes.length > 0 || sort || search || priceRange;

  return (
    <main>
      {/* Shop Banner — centered, not full width */}
      <div className="max-w-6xl mx-auto px-6 pt-8 mb-8">
        <div className="relative rounded-2xl bg-[#17181A] overflow-hidden border border-[#FF4B1F]/30 shadow-lg">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #FF4B1F 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C6FF3D 0%, transparent 50%)" }} />
          <div className="px-6 py-10 relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[#C6FF3D] text-xs font-bold uppercase tracking-widest mb-2">ShoeSnap Collection</p>
              <h1 className="text-3xl font-black text-white leading-tight">
                {category ? (
                  <>{CAT_META[category]?.icon} <span className="capitalize">{category}</span> Shoes</>
                ) : "All Sneakers"}
              </h1>
              {!loading && (
                <p className="text-white/40 text-sm mt-1">{total} products{totalPages > 1 && ` · Page ${page} of ${totalPages}`}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search sneakers..."
                    className="w-52 bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors" />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </form>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/50 cursor-pointer">
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} className="text-[#17181A]">{o.label}</option>)}
              </select>
            </div>
          </div>
          {/* Category pills */}
          <div className="px-6 pb-5 flex gap-2 relative z-10">
            {Object.entries(CAT_META).map(([val, meta]) => (
              <button key={val} onClick={() => setCategory(val)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === val ? "bg-[#FF4B1F] text-white" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                }`}>
                <span>{meta.icon}</span> {meta.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex gap-7">

          {/* Sidebar */}
          <aside className="w-52 shrink-0 self-start sticky top-20">
            <div className="bg-white border border-[#E2E2DC] rounded-2xl overflow-hidden shadow-sm">

              {/* Active filters count */}
              {hasFilters && (
                <div className="px-4 py-2.5 bg-[#FF4B1F]/5 border-b border-[#FF4B1F]/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#FF4B1F]">Filters active</span>
                  <button onClick={clearFilters} className="text-[10px] font-bold text-[#FF4B1F] hover:underline">Clear all</button>
                </div>
              )}

              {/* Size */}
              <div className="px-4 py-4 border-b border-[#E2E2DC]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#17181A]/30 mb-3">Size (UK)</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {SIZES.map((s) => (
                    <button key={s} onClick={() => toggleSize(s)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSizes.includes(s)
                          ? "bg-[#FF4B1F] text-white border-[#FF4B1F] shadow-sm scale-105"
                          : "border-[#E2E2DC] text-[#17181A]/60 hover:border-[#FF4B1F] hover:text-[#FF4B1F]"
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#17181A]/30 mb-3">Price Range</p>
                <div className="flex flex-col gap-1.5">
                  {PRICE_RANGES.map((r) => (
                    <button key={r.label} onClick={() => setPriceRange(priceRange?.label === r.label ? null : r)}
                      className={`text-left text-xs py-2 px-3 rounded-xl border transition-all flex items-center justify-between ${
                        priceRange?.label === r.label
                          ? "bg-[#17181A] text-white border-[#17181A] font-semibold"
                          : "border-[#E2E2DC] text-[#17181A]/60 hover:border-[#17181A] hover:text-[#17181A]"
                      }`}>
                      {r.label}
                      {priceRange?.label === r.label && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <section className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-3 gap-5">
                {[...Array(9)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4 bg-white rounded-2xl border border-[#E2E2DC]">
                <span className="text-5xl">👟</span>
                <p className="text-sm font-semibold text-[#17181A]/40">No products found</p>
                <button onClick={clearFilters} className="text-xs font-semibold text-[#FF4B1F] border border-[#FF4B1F]/30 px-4 py-2 rounded-xl hover:bg-[#FF4B1F] hover:text-white transition-all">
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${page}-${category}-${sort}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-3 gap-5"
                  >
                    {paginated.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
                  </motion.div>
                </AnimatePresence>
                <Pagination page={page} totalPages={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
