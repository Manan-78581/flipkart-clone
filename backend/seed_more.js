require('dotenv').config();
const pool = require('./db');

const newProducts = [
  // Mobiles (1 new)
  { name: 'Redmi Note 13 Pro', price: 25999, original_price: 28999, category: 'Mobiles', rating: 4.2, reviews: 1560, description: 'Mid-range device with great camera, 120Hz display and fast charging.', stock: 45, images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'] },
  
  // Fashion (1 new)
  { name: 'Polo Ralph Lauren T-Shirt', price: 1999, original_price: 2499, category: 'Fashion', rating: 4.5, reviews: 890, description: 'Classic cotton polo t-shirt for daily casual wear.', stock: 60, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'] },

  // Appliances (2 new)
  { name: 'Samsung Microwave Oven', price: 6500, original_price: 8500, category: 'Appliances', rating: 4.3, reviews: 452, description: 'Solo microwave oven with 23L capacity and smart heating.', stock: 15, images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'] },
  { name: 'LG Fully Automatic Washing Machine', price: 28990, original_price: 34990, category: 'Appliances', rating: 4.6, reviews: 1205, description: '8kg front load washing machine with AI direct drive.', stock: 10, images: ['https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400'] },

  // Furniture (2 new)
  { name: 'Ergonomic Office Chair', price: 4500, original_price: 6000, category: 'Furniture', rating: 4.4, reviews: 330, description: 'Comfortable mesh office chair with lumbar support.', stock: 25, images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400'] },
  { name: 'King Size Teak Wood Bed', price: 24900, original_price: 29900, category: 'Furniture', rating: 4.7, reviews: 110, description: 'Premium solid teak wood bed frame.', stock: 5, images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'] },

  // Toys (3 new)
  { name: 'Hot Wheels 10-Car Pack', price: 999, original_price: 1299, category: 'Toys', rating: 4.8, reviews: 450, description: 'Pack of 10 classic Hot Wheels die-cast cars.', stock: 50, images: ['https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400'] },
  { name: 'Barbie Dreamhouse Playset', price: 12500, original_price: 15000, category: 'Toys', rating: 4.6, reviews: 290, description: 'Giant Barbie doll house with elevator and accessories.', stock: 12, images: ['https://images.unsplash.com/photo-1558066112-68fba8151475?w=400'] },
  { name: 'Nerf Elite Blaster', price: 1499, original_price: 1999, category: 'Toys', rating: 4.5, reviews: 670, description: 'Motorized dart blaster for action-packed fun.', stock: 35, images: ['https://images.unsplash.com/photo-1555462589-f538cb314545?w=400'] },

  // Beauty (2 new)
  { name: 'Loreal Paris Shampoo 1L', price: 850, original_price: 1100, category: 'Beauty', rating: 4.4, reviews: 1200, description: 'Total Repair 5 shampoo for damaged hair.', stock: 100, images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'] },
  { name: 'MAC Ruby Woo Lipstick', price: 1950, original_price: 2100, category: 'Beauty', rating: 4.9, reviews: 3400, description: 'Classic red matte lipstick.', stock: 20, images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'] },

  // Home (3 new)
  { name: 'Cotton Bedsheet Double', price: 799, original_price: 1299, category: 'Home', rating: 4.2, reviews: 540, description: '100% cotton floral print double bedsheet with 2 pillow covers.', stock: 60, images: ['https://images.unsplash.com/photo-1631525048564-8f4b5059bb29?w=400'] },
  { name: 'Philips 9W LED Bulbs (Pack of 4)', price: 399, original_price: 450, category: 'Home', rating: 4.6, reviews: 2100, description: 'Energy efficient cool daylight LED bulbs.', stock: 200, images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400'] },
  { name: 'Stainless Steel Dinner Set', price: 1599, original_price: 2500, category: 'Home', rating: 4.3, reviews: 320, description: 'Premium 30-piece kitchen dinner set.', stock: 30, images: ['https://images.unsplash.com/photo-1590457199577-ab558e2a148a?w=400'] },

  // Sports (3 new)
  { name: 'Cosco Football Size 5', price: 650, original_price: 800, category: 'Sports', rating: 4.1, reviews: 890, description: 'Durable synthetic leather football for practice.', stock: 40, images: ['https://images.unsplash.com/photo-1614632537190-23e4146777db?w=400'] },
  { name: 'Kookaburra Cricket Bat', price: 3500, original_price: 4200, category: 'Sports', rating: 4.5, reviews: 150, description: 'Kashmir willow cricket bat for intermediate players.', stock: 15, images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400'] },
  { name: 'Yonex Badminton Racket', price: 1999, original_price: 2500, category: 'Sports', rating: 4.4, reviews: 670, description: 'Lightweight carbon graphite racket with head cover.', stock: 25, images: ['https://images.unsplash.com/photo-1613918431703-b0fc5ee20c7a?w=400'] },

  // Books (3 new)
  { name: 'Atomic Habits by James Clear', price: 450, original_price: 699, category: 'Books', rating: 4.8, reviews: 12000, description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.', stock: 150, images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400'] },
  { name: 'The Psychology of Money', price: 299, original_price: 399, category: 'Books', rating: 4.7, reviews: 8500, description: 'Timeless lessons on wealth, greed, and happiness.', stock: 120, images: ['https://images.unsplash.com/photo-1611077544025-3330b62e49c7?w=400'] },
  { name: 'Sapiens: A Brief History of Humankind', price: 550, original_price: 799, category: 'Books', rating: 4.6, reviews: 5400, description: 'A detailed exploration of human evolution and history.', stock: 80, images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'] }
];

const seedMore = async () => {
  const conn = await pool.getConnection();
  try {
    console.log('Inserting new products...');
    for (const p of newProducts) {
      const [result] = await conn.query(
        `INSERT INTO products (name, price, original_price, category, rating, reviews, description, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.name, p.price, p.original_price || null, p.category, p.rating, p.reviews, p.description, p.stock]
      );
      const productId = result.insertId;
      for (const url of p.images) {
        await conn.query(`INSERT INTO product_images (product_id, url) VALUES (?, ?)`, [productId, url]);
      }
    }
    console.log('✅ Added 20 new products successfully!');
  } catch (err) {
    console.error('❌ Insertion error:', err.message);
  } finally {
    conn.release();
    process.exit();
  }
};

seedMore();
