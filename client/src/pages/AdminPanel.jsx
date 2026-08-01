import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../context/authStore";

const EMPTY_FORM = {
  name: "", brand: "StrideCo", description: "", category: "running",
  price: "", stock: "", sizes: "7,8,9,10,11", images: [], model3D: "/models/sneaker.glb",
};

function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await axios.post("/api/upload", fd);
      setForm((f) => ({ ...f, images: [data.url, ...f.images] }));
    } catch {
      alert("Image upload failed. Check Cloudinary keys in .env");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url) =>
    setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        sizes: String(form.sizes).split(",").map((s) => Number(s.trim())).filter(Boolean),
      };
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full border border-[#E2E2DC] rounded-xl px-4 py-2.5 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="text-xs font-medium text-[#17181A]/50 block mb-1">Product name</label>
          <input name="name" value={form.name} onChange={set} placeholder="Air Runner" required className={inputCls} />
        </div>
        <div>
          <label className="text-xs font-medium text-[#17181A]/50 block mb-1">Price (₹)</label>
          <input name="price" type="number" value={form.price} onChange={set} placeholder="3499" required className={inputCls} />
        </div>
        <div>
          <label className="text-xs font-medium text-[#17181A]/50 block mb-1">Stock</label>
          <input name="stock" type="number" value={form.stock} onChange={set} placeholder="50" required className={inputCls} />
        </div>
        <div>
          <label className="text-xs font-medium text-[#17181A]/50 block mb-1">Category</label>
          <select name="category" value={form.category} onChange={set} className={inputCls}>
            <option value="running">Running</option>
            <option value="casual">Casual</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-[#17181A]/50 block mb-1">Sizes (comma separated)</label>
          <input name="sizes" value={form.sizes} onChange={set} placeholder="7,8,9,10,11" className={inputCls} />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium text-[#17181A]/50 block mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={set} rows={3} placeholder="Product description..." required className={inputCls + " resize-none"} />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium text-[#17181A]/50 block mb-1">3D Model path</label>
          <input name="model3D" value={form.model3D} onChange={set} placeholder="/models/sneaker.glb" className={inputCls} />
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="text-xs font-medium text-[#17181A]/50 block mb-2">Product images</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.images.map((url) => (
            <div key={url} className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F0F0EC]">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#FF4B1F] text-white rounded-full text-[10px] flex items-center justify-center"
              >×</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            disabled={uploading}
            className="w-16 h-16 rounded-xl border-2 border-dashed border-[#E2E2DC] flex items-center justify-center text-[#17181A]/30 hover:border-[#17181A]/40 transition-colors text-xl"
          >
            {uploading ? "..." : "+"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={saving} className="flex-1 bg-[#FF4B1F] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save product"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-[#E2E2DC] text-sm text-[#17181A] hover:border-[#17181A] transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: "add" | "edit", product? }

  // Guard — only admin
  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    if (user.role !== "admin") { navigate("/"); return; }
  }, [user]);

  const fetchProducts = () => {
    setLoading(true);
    axios.get("/api/products", { params: { limit: 100 } })
      .then((r) => setProducts(r.data.products))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async (payload) => {
    try {
      if (modal.mode === "add") {
        await axios.post("/api/products", payload);
      } else {
        await axios.put(`/api/products/${modal.product._id}`, payload);
      }
      setModal(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`/api/products/${id}`);
    fetchProducts();
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#17181A]">Admin Panel</h1>
          <p className="text-sm text-[#17181A]/40 mt-0.5">{products.length} products</p>
        </div>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="bg-[#FF4B1F] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors"
        >
          + Add product
        </button>
      </div>

      {/* Product table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-[#F0F0EC] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="border border-[#E2E2DC] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E2DC] bg-[#F0F0EC]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#17181A]/50 uppercase tracking-wide">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#17181A]/50 uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#17181A]/50 uppercase tracking-wide">Price</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#17181A]/50 uppercase tracking-wide">Stock</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p._id} className={`border-b border-[#E2E2DC] last:border-0 ${i % 2 === 0 ? "" : "bg-[#FAFAF8]"}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#F0F0EC] overflow-hidden shrink-0">
                        {p.images?.[0]
                          ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full" />}
                      </div>
                      <span className="font-medium text-[#17181A]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-[#C6FF3D] text-[#17181A] text-xs font-semibold px-2 py-0.5 rounded-full capitalize">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 text-[#17181A]">₹{p.price?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[#17181A]/60">{p.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => setModal({ mode: "edit", product: p })}
                        className="text-xs font-medium text-[#17181A] hover:text-[#FF4B1F] transition-colors px-2 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-xs font-medium text-[#17181A]/40 hover:text-[#FF4B1F] transition-colors px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal(null)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-[#FAFAF8] rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
                <h2 className="text-base font-bold text-[#17181A] mb-5">
                  {modal.mode === "add" ? "Add new product" : `Edit — ${modal.product.name}`}
                </h2>
                <ProductForm
                  initial={modal.mode === "edit"
                    ? { ...modal.product, sizes: modal.product.sizes?.join(",") }
                    : EMPTY_FORM}
                  onSave={handleSave}
                  onCancel={() => setModal(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
