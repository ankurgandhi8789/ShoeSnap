import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuthStore } from "../context/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegister
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const { data } = await axios.post(url, payload);
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-sm mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-[#E2E2DC] rounded-3xl p-8"
      >
        <h1 className="text-xl font-bold text-[#17181A] mb-6">
          {isRegister ? "Create account" : "Sign in"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegister && (
            <div>
              <label className="text-sm font-medium text-[#17181A] block mb-1.5">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-[#17181A] block mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              required
              className="w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#17181A] block mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-[#E2E2DC] rounded-xl px-4 py-3 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
            />
          </div>

          {error && <p className="text-xs text-[#FF4B1F]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF4B1F] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors disabled:opacity-50"
          >
            {loading ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-[#17181A]/50 text-center mt-5">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
            className="text-[#FF4B1F] font-medium hover:underline"
          >
            {isRegister ? "Sign in" : "Register"}
          </button>
        </p>
      </motion.div>
    </main>
  );
}
