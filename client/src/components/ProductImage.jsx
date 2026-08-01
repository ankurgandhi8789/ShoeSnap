// Handles missing local images gracefully — shows a placeholder instead of broken icon
export default function ProductImage({ src, alt, className = "" }) {
  const handleError = (e) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "flex";
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={handleError}
        className="w-full h-full object-cover"
      />
      {/* Fallback placeholder — hidden by default, shown on error */}
      <div
        style={{ display: "none" }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#F0F0EC] gap-2"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C6C6C0" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="text-xs text-[#17181A]/30">{alt}</span>
      </div>
    </div>
  );
}
