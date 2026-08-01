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
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="#FF4B1F">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span className="text-xs text-[#17181A]/50">{rating?.toFixed(1)}</span>
    </div>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/product/${product._id}`} className="block group">
        <div className="relative bg-[#F0F0EC] rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: "1" }}>
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
            <ProductImage src={product.images?.[0]} alt={product.name} />
          </div>
          <span className="absolute top-3 left-3 bg-[#C6FF3D] text-[#17181A] text-[10px] font-bold px-2.5 py-1 rounded-full capitalize">
            {product.category}
          </span>
          <div className="absolute inset-0 bg-[#17181A]/0 group-hover:bg-[#17181A]/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <span className="bg-white text-[#17181A] text-xs font-semibold px-4 py-2 rounded-full shadow-md">
              Quick view
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#17181A] truncate">{product.name}</p>
            <p className="text-sm font-bold text-[#17181A] mt-0.5">Rs {product.price?.toLocaleString()}</p>
          </div>
          {product.rating > 0 && <StarRating rating={product.rating} />}
        </div>
        {product.sizes?.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="text-[10px] text-[#17181A]/40 border border-[#E2E2DC] rounded-md px-1.5 py-0.5">
                {s}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-[#17181A]/40">+{product.sizes.length - 4}</span>
            )}
          </div>
        )}
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
    // show first, last, current, and neighbours
    if (
      i === 1 || i === totalPages ||
      (i >= page - 1 && i <= page + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      {/* Prev */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 rounded-xl border border-[#E2E2DC] flex items-center justify-center text-[#17181A]/50 hover:border-[#17181A] hover:text-[#17181A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-[#17181A]/30">
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
              p === page
                ? "bg-[#17181A] text-white"
                : "border border-[#E2E2DC] text-[#17181A]/60 hover:border-[#17181A] hover:text-[#17181A]"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-xl border border-[#E2E2DC] flex items-center justify-center text-[#17181A]/50 hover:border-[#17181A] hover:text-[#17181A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
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

  const category = searchParams.get("category") || "";

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [category, search, selectedSizes, sort]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/products", { params: { category, search, limit: 100 } })
      .then((res) => {
        let list = res.data.products;
        if (selectedSizes.length > 0)
          list = list.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
        if (sort === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
        if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
        if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
        setAllProducts(list);
        setTotal(list.length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, search, selectedSizes, sort]);

  const totalPages = Math.ceil(total / LIMIT);
  const paginated = allProducts.slice((page - 1) * LIMIT, page * LIMIT);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setCategory = (val) => {
    if (val) setSearchParams({ category: val });
    else setSearchParams({});
  };

  const toggleSize = (s) =>
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const clearFilters = () => {
    setCategory("");
    setSelectedSizes([]);
    setSort("");
    setSearch("");
    setSearchInput("");
  };

  const hasFilters = category || selectedSizes.length > 0 || sort || search;

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#17181A]">
            {category ? <span className="capitalize">{category}</span> : "All Products"}
          </h1>
          {!loading && (
            <p className="text-xs text-[#17181A]/40 mt-0.5">
              {total} products
              {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search sneakers..."
                className="w-48 border border-[#E2E2DC] rounded-xl pl-9 pr-3 py-2 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#17181A]/30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </form>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-[#E2E2DC] rounded-xl px-3 py-2 text-sm text-[#17181A] bg-[#FAFAF8] focus:outline-none focus:border-[#17181A] transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-7">

        {/* Sidebar */}
        <aside className="w-40 shrink-0">
          <div className="mb-7">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#17181A]/30 mb-3">Category</p>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setCategory("")}
                className={`text-left text-sm py-1.5 px-3 rounded-lg transition-all ${
                  !category ? "bg-[#17181A] text-white font-medium" : "text-[#17181A]/60 hover:text-[#17181A] hover:bg-[#F0F0EC]"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-left text-sm py-1.5 px-3 rounded-lg capitalize transition-all ${
                    category === c ? "bg-[#17181A] text-white font-medium" : "text-[#17181A]/60 hover:text-[#17181A] hover:bg-[#F0F0EC]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#17181A]/30 mb-3">Size</p>
            <div className="grid grid-cols-3 gap-1.5">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedSizes.includes(s)
                      ? "bg-[#FF4B1F] text-white border-[#FF4B1F]"
                      : "border-[#E2E2DC] text-[#17181A]/60 hover:border-[#17181A] hover:text-[#17181A]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {hasFilters && (
              <motion.button
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                onClick={clearFilters}
                className="w-full text-xs text-[#FF4B1F] border border-[#FF4B1F]/30 rounded-lg py-2 hover:bg-[#FF4B1F]/5 transition-colors"
              >
                Clear all
              </motion.button>
            )}
          </AnimatePresence>
        </aside>

        {/* Product grid */}
        <section className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-3 gap-5">
              {[...Array(9)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C6C6C0" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="text-sm text-[#17181A]/40">No products found</p>
              <button onClick={clearFilters} className="text-xs text-[#FF4B1F] hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${page}-${category}-${sort}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-3 gap-5"
                >
                  {paginated.map((p, i) => (
                    <ProductCard key={p._id} product={p} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>

              <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
