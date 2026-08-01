import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../context/cartStore";
import { useAuthStore } from "../context/authStore";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cartCount = items.reduce((sum, i) => sum + (i.qty || 1), 0);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E2E2DC]"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          
          <span className="inline-flex items-center rounded-full border-2 border-orange-500 px-4 py-1 text-base font-bold tracking-tight text-[#17181A] bg-white/80 backdrop-blur-sm shadow-sm">
  StrideCo
</span></Link>

        {/* Center nav links */}
        <div className="flex items-center gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/shop", label: "Shop" },
            { to: "/shop?category=running", label: "Running" },
            { to: "/shop?category=casual", label: "Casual" },
            { to: "/shop?category=sports", label: "Sports" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                isActive(link.to)
                  ? "bg-[#17181A] text-white font-medium"
                  : "text-[#17181A]/60 hover:text-[#17181A] hover:bg-[#F0F0EC]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-[#17181A]/60 hover:text-[#17181A] hover:bg-[#F0F0EC] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#FF4B1F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {cartCount > 9 ? "9+" : cartCount}
              </motion.span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm hover:bg-[#F0F0EC] transition-all"
              >
                {/* Avatar */}
                <div className="w-6 h-6 rounded-full bg-[#17181A] flex items-center justify-center text-white text-[10px] font-bold">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-[#17181A] hidden sm:block max-w-[80px] truncate">
                  {user.name}
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="#17181A" strokeWidth="2"
                  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-lg border border-[#E2E2DC] overflow-hidden z-50"
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-[#E2E2DC]">
                        <p className="text-xs font-semibold text-[#17181A] truncate">{user.name}</p>
                        <p className="text-[10px] text-[#17181A]/40 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        {user.role === "admin" && (
                          <Link
                            to="/admin"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#17181A] hover:bg-[#F0F0EC] transition-colors"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                            </svg>
                            Admin panel
                            <span className="ml-auto bg-[#C6FF3D] text-[#17181A] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              ADMIN
                            </span>
                          </Link>
                        )}

                        <Link
                          to="/cart"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#17181A] hover:bg-[#F0F0EC] transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                          </svg>
                          My cart
                          {cartCount > 0 && (
                            <span className="ml-auto bg-[#FF4B1F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              {cartCount}
                            </span>
                          )}
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#FF4B1F] hover:bg-[#FF4B1F]/5 transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 bg-[#17181A] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#2a2b30] transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
