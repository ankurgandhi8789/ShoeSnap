import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const products = 
[
  {
    "name": "Air Runner",
    "brand": "StrideCo",
    "description": "Lightweight running shoe with responsive cushioning. Built for speed and long-distance comfort on any surface.",
    "category": "running",
    "price": 3499,
    "stock": 50,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.6,
    "numReviews": 128
  },
  {
    "name": "Trail Max",
    "brand": "StrideCo",
    "description": "Rugged trail shoe with aggressive grip and waterproof upper. Engineered to conquer any terrain in any weather.",
    "category": "running",
    "price": 4199,
    "stock": 35,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=85",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.3,
    "numReviews": 89
  },
  {
    "name": "Court Classic",
    "brand": "StrideCo",
    "description": "Clean, minimal court-style sneaker with premium leather upper. Pairs effortlessly with everything from jeans to joggers.",
    "category": "casual",
    "price": 2899,
    "stock": 60,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=85",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.6,
    "numReviews": 214
  },
  {
    "name": "Flex Glide",
    "brand": "StrideCo",
    "description": "Ultra-flexible everyday sneaker with memory foam insole and breathable mesh upper. All-day comfort guaranteed.",
    "category": "casual",
    "price": 3999,
    "stock": 45,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=85",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.4,
    "numReviews": 76
  },
  {
    "name": "Urban Step",
    "brand": "StrideCo",
    "description": "Street-ready sneaker with bold silhouette and chunky sole. Designed for the city grind and weekend outings.",
    "category": "casual",
    "price": 2499,
    "stock": 40,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.2,
    "numReviews": 53
  },
  {
    "name": "Sprint Pro",
    "brand": "StrideCo",
    "description": "High-performance sports shoe with carbon fibre plate and energy-return foam. Built for athletes who demand the best.",
    "category": "sports",
    "price": 4599,
    "stock": 25,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.7,
    "numReviews": 162
  },
  {
    "name": "Power Boost",
    "brand": "StrideCo",
    "description": "Energy-return midsole technology for explosive performance on the court. Lateral support keeps you stable at full speed.",
    "category": "sports",
    "price": 5199,
    "stock": 20,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=85",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.8,
    "numReviews": 97
  },
  {
    "name": "Drift Low",
    "brand": "StrideCo",
    "description": "Low-profile skate-inspired sneaker with vulcanized sole and canvas upper. Timeless style meets everyday durability.",
    "category": "casual",
    "price": 1999,
    "stock": 70,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=85",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.1,
    "numReviews": 44
  },
  {
    "name": "Storm Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 1799,
    "stock": 15,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85"
    ],
    "model3D": null,
    "rating": 3.9,
    "numReviews": 20
  },
  {
    "name": "Cloud Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 1936,
    "stock": 22,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=85",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=85",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.2,
    "numReviews": 43
  },
  {
    "name": "Blaze Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 2073,
    "stock": 29,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.5,
    "numReviews": 66
  },
  {
    "name": "Rapid Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 2210,
    "stock": 36,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.8,
    "numReviews": 89
  },
  {
    "name": "Nova Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 2347,
    "stock": 43,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=85",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.1,
    "numReviews": 112
  },
  {
    "name": "Echo Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 2484,
    "stock": 50,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.4,
    "numReviews": 135
  },
  {
    "name": "Summit Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 2621,
    "stock": 57,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.7,
    "numReviews": 158
  },
  {
    "name": "Ridge Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 2758,
    "stock": 64,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=85",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4,
    "numReviews": 181
  },
  {
    "name": "Vortex Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 2895,
    "stock": 71,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=85",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.3,
    "numReviews": 204
  },
  {
    "name": "Horizon Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 3032,
    "stock": 78,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=85",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.6,
    "numReviews": 227
  },
  {
    "name": "Ember Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 3169,
    "stock": 15,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=85",
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=85"
    ],
    "model3D": null,
    "rating": 3.9,
    "numReviews": 250
  },
  {
    "name": "Pulse Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 3306,
    "stock": 22,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=85",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.2,
    "numReviews": 273
  },
  {
    "name": "Zenith Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 3443,
    "stock": 29,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.5,
    "numReviews": 296
  },
  {
    "name": "Aero Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 3580,
    "stock": 36,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.8,
    "numReviews": 319
  },
  {
    "name": "Bolt Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 3717,
    "stock": 43,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=85",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.1,
    "numReviews": 42
  },
  {
    "name": "Cascade Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 3854,
    "stock": 50,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=85",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.4,
    "numReviews": 65
  },
  {
    "name": "Drift Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 3991,
    "stock": 57,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.7,
    "numReviews": 88
  },
  {
    "name": "Ignite Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 4128,
    "stock": 64,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=85",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=85",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4,
    "numReviews": 111
  },
  {
    "name": "Momentum Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 4265,
    "stock": 71,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.3,
    "numReviews": 134
  },
  {
    "name": "Prime Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 4402,
    "stock": 78,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.6,
    "numReviews": 157
  },
  {
    "name": "Quantum Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 4539,
    "stock": 15,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=85",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=85"
    ],
    "model3D": null,
    "rating": 3.9,
    "numReviews": 180
  },
  {
    "name": "Solstice Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 4676,
    "stock": 22,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=85",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.2,
    "numReviews": 203
  },
  {
    "name": "Terra Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 4813,
    "stock": 29,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.5,
    "numReviews": 226
  },
  {
    "name": "Voyage Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 4950,
    "stock": 36,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=85",
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=85",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.8,
    "numReviews": 249
  },
  {
    "name": "Wave Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 5087,
    "stock": 43,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.1,
    "numReviews": 272
  },
  {
    "name": "Zephyr Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 5224,
    "stock": 50,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.4,
    "numReviews": 295
  },
  {
    "name": "Falcon Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 5361,
    "stock": 57,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.7,
    "numReviews": 318
  },
  {
    "name": "Granite Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 1898,
    "stock": 64,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=85",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=85",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4,
    "numReviews": 41
  },
  {
    "name": "Halo Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 2035,
    "stock": 71,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=85",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.3,
    "numReviews": 64
  },
  {
    "name": "Ion Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 2172,
    "stock": 78,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=85",
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.6,
    "numReviews": 87
  },
  {
    "name": "Kinetic Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 2309,
    "stock": 15,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=85",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=85"
    ],
    "model3D": null,
    "rating": 3.9,
    "numReviews": 110
  },
  {
    "name": "Lumen Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 2446,
    "stock": 22,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.2,
    "numReviews": 133
  },
  {
    "name": "Mirage Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 2583,
    "stock": 29,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.5,
    "numReviews": 156
  },
  {
    "name": "Nimbus Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 2720,
    "stock": 36,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=85",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=85",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.8,
    "numReviews": 179
  },
  {
    "name": "Onyx Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 2857,
    "stock": 43,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.1,
    "numReviews": 202
  },
  {
    "name": "Pinnacle Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 2994,
    "stock": 50,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.4,
    "numReviews": 225
  },
  {
    "name": "Raven Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 3131,
    "stock": 57,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=85",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.7,
    "numReviews": 248
  },
  {
    "name": "Surge Runner",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 3268,
    "stock": 64,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=85",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4,
    "numReviews": 271
  },
  {
    "name": "Tempo Runner",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 3405,
    "stock": 71,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.3,
    "numReviews": 294
  },
  {
    "name": "Umbra Runner",
    "brand": "StrideCo",
    "description": "Breathable running shoe tuned for cadence and rebound, keeping every stride light over long distances.",
    "category": "running",
    "price": 3542,
    "stock": 78,
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=85",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.6,
    "numReviews": 317
  },
  {
    "name": "Storm Glide",
    "brand": "StrideCo",
    "description": "Everyday casual sneaker with a comfort-first fit, easy to dress up or down for daily wear.",
    "category": "casual",
    "price": 3679,
    "stock": 15,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=85",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=85"
    ],
    "model3D": null,
    "rating": 3.9,
    "numReviews": 40
  },
  {
    "name": "Cloud Glide",
    "brand": "StrideCo",
    "description": "Performance sports shoe with reinforced lateral support, built for quick cuts and explosive starts.",
    "category": "sports",
    "price": 3816,
    "stock": 22,
    "sizes": [
      8,
      9,
      10,
      11
    ],
    "images": [
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=85",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=85",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=85"
    ],
    "model3D": null,
    "rating": 4.2,
    "numReviews": 63
  }
]
;

export default products;

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await Product.deleteMany({});
    console.log("Old products cleared");
    await Product.insertMany(products);
    console.log(`${products.length} products seeded with images`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seed();
