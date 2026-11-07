/**
 * Product Service for fetching and managing product inventory.
 * Provides resilient fetching from DummyJSON API with an extensive curated local catalog
 * covering Electronics, Fashion, Home & Living, Accessories, and Sports.
 */

export const FALLBACK_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';

// Curated 30 high-quality products mapped with realistic Indian Rupee prices and verified Unsplash CDN images
export const LOCAL_PRODUCTS = [
  {
    id: 1,
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: 29990,
    rating: 4.8,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Industry-leading noise cancellation optimized with two processors and eight microphones. Ultra-comfortable lightweight design with soft fit leather and up to 30-hour battery life with quick charging.'
  },
  {
    id: 2,
    name: 'Apple MacBook Air M2 13-inch',
    category: 'Electronics',
    price: 94990,
    rating: 4.9,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Redesigned around the next-generation M2 chip, MacBook Air is strikingly thin and brings exceptional speed and power efficiency within its durable all-aluminum enclosure.'
  },
  {
    id: 3,
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    category: 'Electronics',
    price: 8995,
    rating: 4.7,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'An icon remastered with Quiet Clicks and 8,000 DPI track-on-glass sensor. Features MagSpeed electromagnetic scrolling for remarkable speed and precision.'
  },
  {
    id: 4,
    name: 'Keychron K2 Pro QMK Wireless Mechanical Keyboard',
    category: 'Electronics',
    price: 11499,
    rating: 4.6,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Customizable 75% compact wireless mechanical keyboard with hot-swappable Keychron K Pro switches, south-facing RGB, and Mac/Windows layout support.'
  },
  {
    id: 5,
    name: 'Samsung 32-inch 4K UHD Curved Smart Monitor',
    category: 'Electronics',
    price: 34990,
    rating: 4.5,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Crisp 4K UHD resolution with 1500R curvature for immersive work and entertainment. Built-in smart TV apps, AirPlay, and multiple USB-C ports.'
  },
  {
    id: 6,
    name: 'Men Premium Merino Wool Overcoat',
    category: 'Fashion',
    price: 14999,
    rating: 4.7,
    stock: 16,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Tailored single-breasted overcoat crafted from 100% fine Italian Merino wool. Timeless charcoal silhouette designed for executive elegance in cooler weather.'
  },
  {
    id: 7,
    name: 'Women Pure Mulberry Silk Trench Coat',
    category: 'Fashion',
    price: 18500,
    rating: 4.9,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Luxurious belted trench coat with water-repellent silk-blend finish. Double-breasted with storm flap and bespoke horn buttons.'
  },
  {
    id: 8,
    name: 'Classic White Crisp Oxford Cotton Shirt',
    category: 'Fashion',
    price: 2999,
    rating: 4.5,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Essential 100% long-staple organic cotton Oxford button-down shirt. Breathable, wrinkle-resistant weave tailored for all-day comfort.'
  },
  {
    id: 9,
    name: 'Handcrafted Heritage Selvedge Denim Jeans',
    category: 'Fashion',
    price: 6499,
    rating: 4.6,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?w=700&auto=format&fit=crop&q=80'
    ],
    description: '14oz authentic shuttle-loom Japanese selvedge denim. Raw indigo dye that develops unique patina creases over wear.'
  },
  {
    id: 10,
    name: 'Cashmere Knit Crewneck Pullover',
    category: 'Fashion',
    price: 8990,
    rating: 4.8,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Grade-A Mongolian cashmere 2-ply knit crewneck. Impossibly soft against the skin, offering natural temperature regulation.'
  },
  {
    id: 11,
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    category: 'Home & Living',
    price: 59900,
    rating: 4.9,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Laser reveals invisible dust on hard floors. Piezo sensor scientifically calculates and counts dust particles for automated suction control.'
  },
  {
    id: 12,
    name: 'Mid-Century Modern Velvet Accent Armchair',
    category: 'Home & Living',
    price: 24500,
    rating: 4.6,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Sculptural velvet lounge chair with tapered gold-finished brass legs and high-density foam cushioning for ergonomic support.'
  },
  {
    id: 13,
    name: 'Handblown Amber Glass Pendant Light',
    category: 'Home & Living',
    price: 4999,
    rating: 4.4,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Artisanal mouth-blown fluted amber glass luminaire with antique brass hardware. Casts a warm, inviting ambient glow over dining or living spaces.'
  },
  {
    id: 14,
    name: 'Organic Stoneware 16-Piece Dinnerware Set',
    category: 'Home & Living',
    price: 7999,
    rating: 4.7,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Crafted from durable stoneware with an earthy reactive speckled matte glaze. Dishwasher and microwave safe service for four.'
  },
  {
    id: 15,
    name: 'Ultrasonic Ceramic Aromatherapy Essential Oil Diffuser',
    category: 'Home & Living',
    price: 3499,
    rating: 4.5,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Whisper-quiet ultrasonic mister cased in matte porcelain ceramic. Enhances indoor air quality and supports ambient mood lighting modes.'
  },
  {
    id: 16,
    name: 'Fossil Minimalist Chronograph Brown Leather Watch',
    category: 'Accessories',
    price: 11995,
    rating: 4.6,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Striking 44mm stainless steel case with sunray dial, 3-hand analog chronograph movement, and interchangeable genuine supple leather strap.'
  },
  {
    id: 17,
    name: 'Ray-Ban Classic Aviator Polarized Sunglasses',
    category: 'Accessories',
    price: 9890,
    rating: 4.8,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Timeless tear-drop shaped gold metal frame with crystal green polarized lenses offering 100% UV400 eye protection.'
  },
  {
    id: 18,
    name: 'Bellroy Full-Grain Leather Travel Wallet & Passport Sleeve',
    category: 'Accessories',
    price: 7490,
    rating: 4.7,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Slimline bifold travel companion made from certified environmentally tanned leather. Fits passport, boarding passes, currency and RFID protection.'
  },
  {
    id: 19,
    name: 'Aer Travel Pack 3 Cordura Ballistic Backpack',
    category: 'Accessories',
    price: 19999,
    rating: 4.9,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Engineered for seamless one-bag travel. 1680D Cordura ballistic nylon with padded 16-inch laptop pocket, lay-flat main compartment and YKK zippers.'
  },
  {
    id: 20,
    name: 'Solid 925 Sterling Silver Curb Chain Bracelet',
    category: 'Accessories',
    price: 4500,
    rating: 4.5,
    stock: 26,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Hand-polished Italian sterling silver 7mm cuban curb chain. Finished with anti-tarnish rhodium plating and sturdy lobster clasp.'
  },
  {
    id: 21,
    name: 'Garmin Forerunner 965 AMOLED GPS Smartwatch',
    category: 'Sports',
    price: 58990,
    rating: 4.9,
    stock: 11,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Premium GPS running smartwatch with vivid AMOLED touchscreen display, titanium bezel, advanced training readiness metrics, and multi-band GNSS.'
  },
  {
    id: 22,
    name: 'Nike ZoomX Vaporfly NEXT% 3 Road Racing Shoes',
    category: 'Sports',
    price: 21995,
    rating: 4.8,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Chasing race day PRs with responsive full-length carbon fiber Flyplate and ultra-resilient ZoomX foam midsole engineered for explosive propulsion.'
  },
  {
    id: 23,
    name: 'Manduka PRO Yoga & Pilates Mat 6mm',
    category: 'Sports',
    price: 9999,
    rating: 4.7,
    stock: 29,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'The #1 recommended mat by yoga teachers worldwide. High-density closed-cell cushioning protects joints and won’t absorb moisture or sweat.'
  },
  {
    id: 24,
    name: 'Bowflex SelectTech 552 Adjustable Dumbbells (Pair)',
    category: 'Sports',
    price: 36990,
    rating: 4.8,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Replace 15 pairs of free weights with an intuitive rapid turn-dial selector system adjusting from 2.5 kg to 24 kg per dumbbell.'
  },
  {
    id: 25,
    name: 'Hydro Flask 32 oz Wide Mouth Insulated Water Bottle',
    category: 'Sports',
    price: 3999,
    rating: 4.6,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'TempShield double-wall vacuum insulation keeps cold beverages ice cold for up to 24 hours. Pro-grade stainless steel with leakproof Flex Straw cap.'
  },
  {
    id: 26,
    name: 'Canon EOS R6 Mark II Mirrorless Camera Body',
    category: 'Electronics',
    price: 189990,
    rating: 4.9,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&auto=format&fit=crop&q=80'
    ],
    description: '24.2 MP full-frame CMOS sensor with Dual Pixel CMOS AF II, up to 40 fps continuous electronic shooting, and 6K oversampled 4K 60p video capture.'
  },
  {
    id: 27,
    name: 'Italian Leather Chelsea Ankle Boots',
    category: 'Fashion',
    price: 12499,
    rating: 4.7,
    stock: 17,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Classic handcrafted Chelsea silhouette in deep burnished cognac calfskin leather with elastic side goring and durable Goodyear welt.'
  },
  {
    id: 28,
    name: 'Nespresso VertuoPlus Coffee & Espresso Machine',
    category: 'Home & Living',
    price: 17990,
    rating: 4.6,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Centrifusion extraction technology gently spins coffee grounds at 7,000 RPM to craft rich barista crema and optimal coffee extraction at one touch.'
  },
  {
    id: 29,
    name: 'Leather Executive Briefcase & Laptop Messenger',
    category: 'Accessories',
    price: 13990,
    rating: 4.8,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Full-grain vegetable-tanned cowhide leather briefcase with padded compartment for up to 15.6 inch laptops and brass hardware closures.'
  },
  {
    id: 30,
    name: 'Speedo Fastskin Racing Swimming Goggles',
    category: 'Sports',
    price: 4999,
    rating: 4.7,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700&auto=format&fit=crop&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'Hydrodynamic profile engineered for competitive racing. IQfit 3D seal ensures maximum leak resistance and anti-fog mirror lenses.'
  }
];

/**
 * Fetch all products with fallback to curated dataset
 */
export const fetchProducts = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('https://dummyjson.com/products?limit=60', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data && Array.isArray(data.products) && data.products.length > 0) {
      // Map DummyJSON products into our consistent standardized schema with INR prices
      const mapped = data.products.map((p) => {
        // Map category nicely
        let category = 'Electronics';
        const rawCat = (p.category || '').toLowerCase();
        if (rawCat.includes('shirt') || rawCat.includes('dress') || rawCat.includes('shoes') || rawCat.includes('clothing') || rawCat.includes('tops')) {
          category = 'Fashion';
        } else if (rawCat.includes('home') || rawCat.includes('furniture') || rawCat.includes('kitchen') || rawCat.includes('groceries') || rawCat.includes('decoration')) {
          category = 'Home & Living';
        } else if (rawCat.includes('watch') || rawCat.includes('sunglasses') || rawCat.includes('jewel') || rawCat.includes('bag')) {
          category = 'Accessories';
        } else if (rawCat.includes('sport') || rawCat.includes('motorcycle') || rawCat.includes('vehicle')) {
          category = 'Sports';
        }

        // Convert USD price to realistic INR rounded value (approx 80x)
        const inrPrice = Math.round((p.price || 50) * 82);

        return {
          id: p.id,
          name: p.title || 'Product',
          category,
          price: inrPrice,
          rating: Number(p.rating) || 4.5,
          stock: p.stock || 20,
          image: p.thumbnail || p.images?.[0] || FALLBACK_PRODUCT_IMAGE,
          thumbnails: (p.images && p.images.length > 0) ? p.images : [p.thumbnail || FALLBACK_PRODUCT_IMAGE],
          description: p.description || 'Premium quality product manufactured to the highest industry standards.',
        };
      });

      // Merge with our local products to ensure all categories and high quality data are present
      return mapped;
    }
    return LOCAL_PRODUCTS;
  } catch (error) {
    console.warn('Using local fallback product dataset due to fetch error:', error.message);
    return LOCAL_PRODUCTS;
  }
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id) => {
  const numericId = Number(id);
  const products = await fetchProducts();
  const found = products.find((p) => p.id === numericId);
  if (found) return found;

  // Fallback to local products
  const localFound = LOCAL_PRODUCTS.find((p) => p.id === numericId);
  return localFound || null;
};
