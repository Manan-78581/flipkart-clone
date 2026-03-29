require('dotenv').config();
const pool = require('./db');

const categoryBrands = {
  Mobiles: [
    { label: 'iPhone', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80' },
    { label: 'Samsung', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80' },
    { label: 'OnePlus', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80' },
    { label: 'Redmi', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80' },
    { label: 'POCO', img: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400&q=80' },
    { label: 'realme', img: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80' },
    { label: 'motorola', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80' },
    { label: 'vivo', img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80' },
  ],
  Electronics: [
    { label: 'Sony', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
    { label: 'Apple', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80' },
    { label: 'Dell', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80' },
    { label: 'LG', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&q=80' },
    { label: 'iPad', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80' },
  ],
  Fashion: [
    { label: 'Celeb Looks', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80' },
    { label: 'T-shirts Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
    { label: 'Jeans', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
    { label: 'Kurtas', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80' },
    { label: 'Sports Wear', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { label: 'Sunglasses', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80' },
    { label: 'Sandals & clogs', img: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80' },
    { label: 'Backpacks', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
    { label: 'Casual shoes', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80' },
    { label: 'Formal shoes', img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80' },
    { label: 'Trolley', img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80' },
    { label: "Kids' clothing", img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80' },
    { label: 'Slides', img: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80' },
    { label: 'Watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
    { label: 'Jewellery', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  ],
  Appliances: [
    { label: 'Dyson', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { label: 'Instant Pot', img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80' },
  ],
  Sports: [
    { label: 'Nike', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { label: 'Adidas', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80' },
    { label: 'Yoga', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80' },
  ],
  Books: [
    { label: 'Harry Potter', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80' },
    { label: 'Fiction', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80' },
    { label: 'Non-Fiction', img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80' },
  ],
  Furniture: [
    { label: 'IKEA', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
    { label: 'Study Table', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80' },
  ],
  Beauty: [
    { label: 'Maybelline', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80' },
    { label: 'The Ordinary', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80' },
  ],
};

const prefixes = ["Premium", "Classic", "Modern Elite"];
const suffixes = ["Edition", "Pro Series", "Collection"];

const seedMassive = async () => {
  const conn = await pool.getConnection();
  try {
    console.log('Generating exactly 3 products for every single subcategory...');
    
    let totalAdded = 0;
    
    for (const [category, subcategories] of Object.entries(categoryBrands)) {
      for (const sub of subcategories) {
        // Generate 3 products per subcategory
        for (let i = 0; i < 3; i++) {
          const name = `${prefixes[i]} ${sub.label} ${suffixes[i]}`;
          const basePrice = Math.floor(Math.random() * 5000) + 1000; 
          const price = basePrice;
          const original_price = basePrice + Math.floor(Math.random() * 1000) + 500;
          const rating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
          const reviews = Math.floor(Math.random() * 1000) + 10;
          const description = `This is a high-quality ${sub.label} item from our ${category} department. Beautifully crafted and highly rated.`;
          const stock = Math.floor(Math.random() * 50) + 5;
          
          const [result] = await conn.query(
            `INSERT INTO products (name, price, original_price, category, rating, reviews, description, stock)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, price, original_price, category, rating, reviews, description, stock]
          );
          
          const productId = result.insertId;
          
          // Insert 2 images (reusing the same representative URL for simplicity and stability)
          await conn.query(`INSERT INTO product_images (product_id, url) VALUES (?, ?)`, [productId, sub.img]);
          await conn.query(`INSERT INTO product_images (product_id, url) VALUES (?, ?)`, [productId, sub.img]);
          
          totalAdded++;
        }
      }
    }
    
    console.log(`✅ Success! Generated and added ${totalAdded} new subcategory products!`);
  } catch (err) {
    console.error('❌ Insertion error:', err.message);
  } finally {
    conn.release();
    process.exit();
  }
};

seedMassive();
