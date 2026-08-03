import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const LINKS = {
  Shop: [
    { label: "All Products", to: "/shop" },
    { label: "Running", to: "/shop?category=running" },
    { label: "Casual", to: "/shop?category=casual" },
    { label: "Sports", to: "/shop?category=sports" },
  ],
  Help: [
    { label: "Size Guide", to: "#" },
    { label: "Shipping Policy", to: "#" },
    { label: "Returns", to: "#" },
    { label: "Contact Us", to: "#" },
  ],
  Company: [
    { label: "About Us", to: "#" },
    { label: "Careers", to: "#" },
    { label: "Press", to: "#" },
    { label: "Privacy Policy", to: "#" },
  ],
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "YouTube",
    href: "#",
    icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full mt-20">

      

      {/* Main footer — dark */}
      <div className="bg-[#111213]">
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">

          {/* Top section */}
          <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr_1.6fr] gap-8 mb-12">

            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#FF4B1F] rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">StrideCo</span>
              </Link>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                Premium sneakers crafted for every stride. Step into the future with our latest collection.
              </p>
              {/* Social icons */}
              <div className="flex gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#FF4B1F] flex items-center justify-center transition-all duration-200 group"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white" className="opacity-50 group-hover:opacity-100 transition-opacity">
                      <path d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(LINKS).map(([section, links]) => (
              <div key={section}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">
                  {section}
                </p>
                <div className="flex flex-col gap-2.5">
                  {links.map((l) => (
                    <Link
                      key={l.label}
                      to={l.to}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Newsletter */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">
                Newsletter
              </p>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">
                Get new drops, exclusive offers and style tips.
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 rounded-xl px-4 py-3 flex items-center gap-2"
                >
                  <span className="text-[#C6FF3D] text-lg">✓</span>
                  <p className="text-xs text-[#C6FF3D] font-medium">You're subscribed!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#FF4B1F] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Divider with tag */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="bg-[#C6FF3D] text-[#17181A] text-[10px] font-bold px-3 py-1 rounded-full">
              STRIDECO
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} StrideCo. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
                <a key={t} href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
