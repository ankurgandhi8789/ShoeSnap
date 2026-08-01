import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../context/authStore";

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const [tab, setTab] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (tab === "login") {
        await login(form.email, form.password);
      } else {
        if (!form.name) { setError("Name is required"); setLoading(false); return; }
        await register(form.name, form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <Link to="/" className="block text-center text-xl font-bold text-[#17181A] mb-8">
          StrideCo
        </Link>

        {/* Tabs */}
        <div className="flex bg-[#F0F0EC] rounded-2xl p-1 mb-6">
          {["login", "register"].map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                tab === t ? "bg-white text-[#17181A] shadow-sm" : "text-[#17181A]/50 hover:text-[#17181A]"
              }`}
            >
              {t === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <AnimatePresence>
            {tab === "register" && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            className="w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            minLength={6}
            className="w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
          />

          {error && (
            <p className="text-xs text-[#FF4B1F] px-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full bg-[#FF4B1F] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors disabled:opacity-50"
          >
            {loading ? "Please wait..." : tab === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
