import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../context/cartStore";
import { useAuthStore } from "../context/authStore";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const { user, logout } = useAuthStore();
  const cartCount = items.reduce((sum, i) => sum + (i.qty || 1), 0);

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-[#FF4B1F] ${
        location.pathname === to ? "text-[#FF4B1F]" : "text-[#17181A]"
      }`}
    >
      {label}
    </Link>
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E2E2DC]"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-tight text-[#17181A]">
          StrideCo
        </Link>

        <div className="flex items-center gap-7">
          {navLink("/", "Home")}
          {navLink("/shop", "Shop")}

          {/* Cart */}
          <Link to="/cart" className="relative text-sm font-medium text-[#17181A] hover:text-[#FF4B1F] transition-colors">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#FF4B1F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-xs font-semibold bg-[#C6FF3D] text-[#17181A] px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
                >
                  Admin
                </Link>
              )}
              <span className="text-sm text-[#17181A]/50 hidden sm:block">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-[#17181A]/50 hover:text-[#FF4B1F] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-medium text-[#17181A] hover:text-[#FF4B1F] transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
