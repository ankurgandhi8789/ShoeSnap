# StrideCo — 3D Sneaker E-Commerce Platform

A full-stack MERN e-commerce platform for shoes/sneakers built as a placement project. Features a animated hero slider, Flipkart-style category sections, product filtering, cart, Razorpay + COD checkout, JWT auth, admin panel, and Cloudinary image uploads.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, Framer Motion |
| State | Zustand (cart + auth, persisted to localStorage) |
| Routing | React Router v6 |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (7-day tokens), bcryptjs |
| Payments | Razorpay (UPI/card) + Cash on Delivery |
| Images | Cloudinary (upload via Multer) |

---

## Folder Structure

```
ecommerce-project/
├── backend/
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── cloudinary.js          # Cloudinary config
│   ├── controllers/
│   │   ├── authController.js      # register / login
│   │   ├── productController.js   # CRUD
│   │   └── orderController.js     # orders + Razorpay
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT protect + isAdmin
│   │   ├── errorMiddleware.js     # global error handler
│   │   └── uploadMiddleware.js    # Multer + Cloudinary
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   └── uploadRoutes.js
│   ├── seed.js                    # seeds 8 sample products
│   ├── seedAdmin.js               # creates admin user
│   └── server.js
│
└── client/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── components/
        │   ├── Navbar.jsx         # sticky nav, cart badge, user dropdown
        │   ├── Footer.jsx         # links + newsletter input
        │   └── ProductImage.jsx   # image with fallback placeholder
        ├── context/
        │   ├── cartStore.js       # zustand cart (persisted)
        │   └── authStore.js       # zustand auth (persisted, sets axios header)
        ├── pages/
        │   ├── Home.jsx           # hero slider, flash sale, category boxes, testimonials
        │   ├── Shop.jsx           # product grid, sidebar filters, search, sort, pagination
        │   ├── ProductDetail.jsx  # image gallery, size picker, tabs, recommendations
        │   ├── Cart.jsx           # cart items, qty controls, summary
        │   ├── Checkout.jsx       # address form, Razorpay / COD payment
        │   ├── OrderConfirmation.jsx
        │   ├── Auth.jsx           # login / register (tabbed)
        │   └── AdminPanel.jsx     # product CRUD, image upload
        └── App.jsx
```

---

## Setup

### 1. Clone & install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../client
npm install
```

### 2. Backend environment

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Frontend environment

Create `client/.env`:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> `RAZORPAY_KEY_ID` and `VITE_RAZORPAY_KEY_ID` must be the same value.  
> Get free test keys from [razorpay.com](https://razorpay.com) → Dashboard → Settings → API Keys.

### 4. Seed the database

```bash
cd backend

# Seed 8 sample products
npm run seed

# Create an admin user (check seedAdmin.js for credentials)
npm run seed:admin
```

### 5. Run

```bash
# Terminal 1 — backend (port 5000)
cd backend
npm run dev

# Terminal 2 — frontend (port 5173)
cd client
npm run dev
```

Open `http://localhost:5173`

---

## API Routes

### Auth — `/api/auth`
| Method | Route | Description |
|---|---|---|
| POST | `/register` | Create account |
| POST | `/login` | Login, returns JWT |

### Products — `/api/products`
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/` | — | List products (filter: category, search, page, limit) |
| GET | `/:id` | — | Single product |
| POST | `/` | Admin | Create product |
| PUT | `/:id` | Admin | Update product |
| DELETE | `/:id` | Admin | Delete product |

### Orders — `/api/orders`
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/` | — | Create order (COD or post-Razorpay) |
| POST | `/razorpay` | — | Create Razorpay order |
| POST | `/razorpay/verify` | — | Verify payment signature |
| GET | `/my` | User | My orders |
| GET | `/:id` | — | Single order |

### Upload — `/api/upload`
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/` | Admin | Upload image to Cloudinary |

---

## Features

- **Home** — auto-playing hero slider, flash sale countdown timer, Flipkart-style category boxes (Running / Casual / Sports) with pagination, perks strip, testimonials, brand stats
- **Shop** — sidebar with category, size, price range filters + search + sort, animated product grid, pagination
- **Product Detail** — image gallery with thumbnails, size selector, add to cart, Description / Details / Reviews tabs, "You might also like" section
- **Cart** — qty controls, duplicate-safe (same product+size merges qty), persists on refresh
- **Checkout** — Razorpay UPI/card flow + Cash on Delivery, saves order to DB
- **Auth** — JWT login/register, role-based (user / admin), token persisted in localStorage
- **Admin Panel** — add/edit/delete products, Cloudinary image upload

---

## Notes

- Cart and auth state survive page refresh via Zustand `persist` middleware
- All backend controllers use `try/catch` with a global error middleware
- Vite dev server proxies `/api/*` to `http://localhost:5000` — no CORS issues in dev
- COD works without any Razorpay keys — use it for local testing
