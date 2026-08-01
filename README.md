# 3D E-Commerce Platform (Shoes/Sneakers) — Placement Project

MERN stack e-commerce site with a Three.js (React Three Fiber) 3D product viewer.

## Folder structure

```
ecommerce-project/
├── frontend/                       # React + Vite
│   ├── public/
│   │   └── models/                 # .glb 3D shoe models go here
│   └── src/
│       ├── components/
│       │   ├── Hero3D.jsx          # landing page 3D hero
│       │   └── ProductViewer3D.jsx # 360° product viewer
│       ├── context/
│       │   └── cartStore.js        # zustand global cart state
│       ├── pages/
│       │   ├── Home.jsx            # 3D hero + featured products
│       │   ├── Shop.jsx            # product listing + filters
│       │   ├── ProductDetail.jsx   # 3D viewer + add to cart
│       │   ├── Cart.jsx            # cart items + summary
│       │   ├── Checkout.jsx        # address + payment
│       │   └── OrderConfirmation.jsx
│       └── App.jsx                 # routes wiring all pages
│
└── backend/                        # Node + Express + MongoDB
    ├── config/
    │   └── db.js                   # MongoDB connection
    ├── models/
    │   └── Product.js
    ├── controllers/
    │   └── productController.js    # CRUD logic
    ├── routes/
    │   └── productRoutes.js
    ├── middleware/
    │   └── authMiddleware.js       # JWT + admin check
    ├── .env.example
    └── server.js
```

Note: no Socket.io in this stack — the project doesn't need real-time updates, so it's kept out to
avoid unnecessary complexity.

## Setup

### 1. Get free 3D shoe models
Download `.glb` sneaker models from [Sketchfab](https://sketchfab.com) (filter: Downloadable + CC license) or
[Google Poly Archive mirrors]. Place them in `frontend/public/models/`.
Compress with [gltf.report](https://gltf.report) or `gltf-transform` — keep each file under 3-5MB or your
product page will load slowly.

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, RAZORPAY_KEY
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm install three @react-three/fiber @react-three/drei
npm run dev
```

## Build order (recommended)
1. Backend models + auth + product CRUD APIs first (test with Postman)
2. Frontend product listing (plain 2D cards) hooked to API
3. THEN add `ProductViewer3D` to the product detail page
4. Cart, checkout, payment last

## Notes
- Keep Three.js scoped to: landing hero + product viewer. Don't 3D-ify every page — it hurts load time
  and isn't necessary for the placement pitch.
- Use `<Suspense fallback={<Loader/>}>` around every 3D component — GLTF loads are async.
