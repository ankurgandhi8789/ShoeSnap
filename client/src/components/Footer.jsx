import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E2DC] mt-20 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="text-lg font-bold text-[#17181A]">ShoeSnap</Link>
            <p className="text-sm text-[#17181A]/50 mt-2 leading-relaxed">
              Premium sneakers crafted for every stride. Step into the future.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#17181A]/40 mb-3">Shop</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "All Products", to: "/shop" },
                { label: "Running", to: "/shop?category=running" },
                { label: "Casual", to: "/shop?category=casual" },
                { label: "Sports", to: "/shop?category=sports" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="text-sm text-[#17181A]/60 hover:text-[#FF4B1F] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#17181A]/40 mb-3">Help</p>
            <div className="flex flex-col gap-2">
              {["Size Guide", "Shipping Policy", "Returns", "Contact Us"].map((l) => (
                <span key={l} className="text-sm text-[#17181A]/60 cursor-default">{l}</span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#17181A]/40 mb-3">Stay updated</p>
            <p className="text-sm text-[#17181A]/50 mb-3">Get new drops and offers in your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 border border-[#E2E2DC] rounded-xl px-3 py-2 text-sm text-[#17181A] bg-transparent placeholder:text-[#17181A]/30 focus:outline-none focus:border-[#17181A] transition-colors"
              />
              <button className="bg-[#FF4B1F] text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-[#e03d10] transition-colors shrink-0">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E2E2DC]">
          <p className="text-xs text-[#17181A]/40">© {new Date().getFullYear()} ShoeSnap. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            {[
              { label: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
              { label: "Twitter", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="text-[#17181A]/30 hover:text-[#FF4B1F] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
