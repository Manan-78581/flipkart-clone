require('dotenv').config();
const pool = require('./db');
const bcrypt = require('bcryptjs');

const seed = async () => {
  const conn = await pool.getConnection();

  try {
    // Default user
    const hashedPassword = await bcrypt.hash('password123', 10);
    await conn.query(`
      INSERT IGNORE INTO users (id, name, email, password)
      VALUES (1, 'Default User', 'user@flipkart.com', ?)
    `, [hashedPassword]);

    // Products with images
    const products = [
      { name: 'iPhone 15 Pro', price: 134900, original_price: 149900, category: 'Mobiles', rating: 4.5, reviews: 1234, description: 'Latest iPhone with A17 Pro chip, titanium design and advanced camera system.', stock: 10, images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', 'https://images.unsplash.com/photo-1696446701796-da61339901d4?w=400', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'] },
      { name: 'Samsung Galaxy S24', price: 79999, original_price: 89999, category: 'Mobiles', rating: 4.3, reviews: 856, description: 'Powerful Android smartphone with Galaxy AI features and 200MP camera.', stock: 15, images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'] },
      { name: 'OnePlus 12', price: 64999, original_price: 69999, category: 'Mobiles', rating: 4.4, reviews: 654, description: 'Flagship killer with Snapdragon 8 Gen 3 and 100W fast charging.', stock: 20, images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400'] },
      { name: 'Nike Air Max 270', price: 9995, original_price: 12995, category: 'Fashion', rating: 4.2, reviews: 567, description: 'Comfortable running shoes with Air Max cushioning for all-day wear.', stock: 30, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'] },
      { name: 'Adidas Ultraboost 22', price: 14999, original_price: 17999, category: 'Fashion', rating: 4.3, reviews: 432, description: 'Premium running shoes with Boost midsole technology.', stock: 25, images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=400'] },
      { name: "Levi's 511 Slim Jeans", price: 2999, original_price: 3999, category: 'Fashion', rating: 4.1, reviews: 789, description: 'Classic slim fit jeans in stretch denim for comfort and style.', stock: 50, images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400', 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400'] },
      { name: 'Dell XPS 15 Laptop', price: 149999, original_price: 169999, category: 'Electronics', rating: 4.6, reviews: 321, description: 'Premium laptop with Intel Core i9, 32GB RAM and OLED display.', stock: 8, images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400'] },
      { name: 'Sony WH-1000XM5 Headphones', price: 29990, original_price: 34990, category: 'Electronics', rating: 4.7, reviews: 1567, description: 'Industry-leading noise cancelling headphones with 30hr battery life.', stock: 18, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'] },
      { name: 'Apple iPad Pro 12.9"', price: 112900, original_price: 119900, category: 'Electronics', rating: 4.8, reviews: 432, description: 'Most powerful iPad with M2 chip, Liquid Retina XDR display.', stock: 12, images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400'] },
      { name: 'LG 55" 4K OLED TV', price: 89999, original_price: 109999, category: 'Electronics', rating: 4.5, reviews: 234, description: 'Stunning OLED display with perfect blacks and Dolby Vision IQ.', stock: 6, images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400', 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=400', 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400'] },
      { name: 'Dyson V15 Vacuum Cleaner', price: 52900, original_price: 59900, category: 'Appliances', rating: 4.6, reviews: 345, description: 'Powerful cordless vacuum with laser dust detection technology.', stock: 10, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400'] },
      { name: 'Instant Pot Duo 7-in-1', price: 8999, original_price: 11999, category: 'Appliances', rating: 4.4, reviews: 2341, description: 'Multi-use pressure cooker, slow cooker, rice cooker and more.', stock: 22, images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=400', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400'] },
      { name: 'IKEA KALLAX Shelf', price: 7999, original_price: 9999, category: 'Furniture', rating: 4.2, reviews: 678, description: 'Versatile shelf unit that can be used as room divider or TV bench.', stock: 15, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400'] },
      { name: 'Wooden Study Table', price: 12999, original_price: 15999, category: 'Furniture', rating: 4.3, reviews: 234, description: 'Solid wood study table with storage drawers and cable management.', stock: 8, images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400', 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400', 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400'] },
      { name: 'LEGO Technic Set', price: 4999, original_price: 5999, category: 'Toys', rating: 4.7, reviews: 892, description: 'Advanced building set with 1500+ pieces for ages 10 and above.', stock: 30, images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?w=400', 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=400'] },
      { name: 'Maybelline Fit Me Foundation', price: 499, original_price: 699, category: 'Beauty', rating: 4.1, reviews: 3421, description: 'Lightweight foundation with natural finish for all skin types.', stock: 60, images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'] },
      { name: 'The Ordinary Niacinamide Serum', price: 799, original_price: 999, category: 'Beauty', rating: 4.5, reviews: 2134, description: '10% Niacinamide + 1% Zinc serum for blemish-free skin.', stock: 45, images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400'] },
      { name: 'Prestige Induction Cooktop', price: 3499, original_price: 4499, category: 'Home', rating: 4.3, reviews: 567, description: 'Energy efficient induction cooktop with 8 preset cooking menus.', stock: 20, images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400', 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400'] },
      { name: 'Yoga Mat Premium', price: 1299, original_price: 1999, category: 'Sports', rating: 4.4, reviews: 876, description: 'Non-slip 6mm thick yoga mat with carrying strap.', stock: 40, images: ['https://images.unsplash.com/photo-1601925228008-f5e4c5e5e5e5?w=400', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'] },
      { name: 'Harry Potter Box Set', price: 2499, original_price: 3499, category: 'Books', rating: 4.9, reviews: 5678, description: 'Complete 7-book Harry Potter series in a collector box set.', stock: 25, images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'] },
    ];

    for (const p of products) {
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

    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    conn.release();
    process.exit();
  }
};

seed();
