require('dotenv').config();
const pool = require('./db');
const bcrypt = require('bcryptjs');

// === 1. Original Seed Products ===
const initialProducts = [
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

// === 2. Seed More Products ===
const newProducts = [
  { name: 'Redmi Note 13 Pro', price: 25999, original_price: 28999, category: 'Mobiles', rating: 4.2, reviews: 1560, description: 'Mid-range device with great camera, 120Hz display and fast charging.', stock: 45, images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'] },
  { name: 'Polo Ralph Lauren T-Shirt', price: 1999, original_price: 2499, category: 'Fashion', rating: 4.5, reviews: 890, description: 'Classic cotton polo t-shirt for daily casual wear.', stock: 60, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'] },
  { name: 'Samsung Microwave Oven', price: 6500, original_price: 8500, category: 'Appliances', rating: 4.3, reviews: 452, description: 'Solo microwave oven with 23L capacity and smart heating.', stock: 15, images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'] },
  { name: 'LG Fully Automatic Washing Machine', price: 28990, original_price: 34990, category: 'Appliances', rating: 4.6, reviews: 1205, description: '8kg front load washing machine with AI direct drive.', stock: 10, images: ['https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400'] },
  { name: 'Ergonomic Office Chair', price: 4500, original_price: 6000, category: 'Furniture', rating: 4.4, reviews: 330, description: 'Comfortable mesh office chair with lumbar support.', stock: 25, images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400'] },
  { name: 'King Size Teak Wood Bed', price: 24900, original_price: 29900, category: 'Furniture', rating: 4.7, reviews: 110, description: 'Premium solid teak wood bed frame.', stock: 5, images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'] },
  { name: 'Hot Wheels 10-Car Pack', price: 999, original_price: 1299, category: 'Toys', rating: 4.8, reviews: 450, description: 'Pack of 10 classic Hot Wheels die-cast cars.', stock: 50, images: ['https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400'] },
  { name: 'Barbie Dreamhouse Playset', price: 12500, original_price: 15000, category: 'Toys', rating: 4.6, reviews: 290, description: 'Giant Barbie doll house with elevator and accessories.', stock: 12, images: ['https://images.unsplash.com/photo-1558066112-68fba8151475?w=400'] },
  { name: 'Nerf Elite Blaster', price: 1499, original_price: 1999, category: 'Toys', rating: 4.5, reviews: 670, description: 'Motorized dart blaster for action-packed fun.', stock: 35, images: ['https://images.unsplash.com/photo-1555462589-f538cb314545?w=400'] },
  { name: 'Loreal Paris Shampoo 1L', price: 850, original_price: 1100, category: 'Beauty', rating: 4.4, reviews: 1200, description: 'Total Repair 5 shampoo for damaged hair.', stock: 100, images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'] },
  { name: 'MAC Ruby Woo Lipstick', price: 1950, original_price: 2100, category: 'Beauty', rating: 4.9, reviews: 3400, description: 'Classic red matte lipstick.', stock: 20, images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'] },
  { name: 'Cotton Bedsheet Double', price: 799, original_price: 1299, category: 'Home', rating: 4.2, reviews: 540, description: '100% cotton floral print double bedsheet with 2 pillow covers.', stock: 60, images: ['https://images.unsplash.com/photo-1631525048564-8f4b5059bb29?w=400'] },
  { name: 'Philips 9W LED Bulbs (Pack of 4)', price: 399, original_price: 450, category: 'Home', rating: 4.6, reviews: 2100, description: 'Energy efficient cool daylight LED bulbs.', stock: 200, images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400'] },
  { name: 'Stainless Steel Dinner Set', price: 1599, original_price: 2500, category: 'Home', rating: 4.3, reviews: 320, description: 'Premium 30-piece kitchen dinner set.', stock: 30, images: ['https://images.unsplash.com/photo-1590457199577-ab558e2a148a?w=400'] },
  { name: 'Cosco Football Size 5', price: 650, original_price: 800, category: 'Sports', rating: 4.1, reviews: 890, description: 'Durable synthetic leather football for practice.', stock: 40, images: ['https://images.unsplash.com/photo-1614632537190-23e4146777db?w=400'] },
  { name: 'Kookaburra Cricket Bat', price: 3500, original_price: 4200, category: 'Sports', rating: 4.5, reviews: 150, description: 'Kashmir willow cricket bat for intermediate players.', stock: 15, images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400'] },
  { name: 'Yonex Badminton Racket', price: 1999, original_price: 2500, category: 'Sports', rating: 4.4, reviews: 670, description: 'Lightweight carbon graphite racket with head cover.', stock: 25, images: ['https://images.unsplash.com/photo-1613918431703-b0fc5ee20c7a?w=400'] },
  { name: 'Atomic Habits by James Clear', price: 450, original_price: 699, category: 'Books', rating: 4.8, reviews: 12000, description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.', stock: 150, images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400'] },
  { name: 'The Psychology of Money', price: 299, original_price: 399, category: 'Books', rating: 4.7, reviews: 8500, description: 'Timeless lessons on wealth, greed, and happiness.', stock: 120, images: ['https://images.unsplash.com/photo-1611077544025-3330b62e49c7?w=400'] },
  { name: 'Sapiens: A Brief History of Humankind', price: 550, original_price: 799, category: 'Books', rating: 4.6, reviews: 5400, description: 'A detailed exploration of human evolution and history.', stock: 80, images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'] }
];

// === 3. Massive Subcategories Generation ===
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

// === Main Seed Execution ===
const seed = async () => {
  const conn = await pool.getConnection();

  try {
    console.log('Seeding process started...');

    // 1. Setup default user
    const hashedPassword = await bcrypt.hash('password123', 10);
    await conn.query(`
      INSERT IGNORE INTO users (id, name, email, password)
      VALUES (1, 'Default User', 'user@flipkart.com', ?)
    `, [hashedPassword]);
    
    // Helper function to insert a product + images
    const insertProduct = async (p) => {
      const [result] = await conn.query(
        `INSERT INTO products (name, price, original_price, category, rating, reviews, description, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.name, p.price, p.original_price || null, p.category, p.rating, p.reviews, p.description, p.stock]
      );
      const productId = result.insertId;
      for (const url of p.images) {
        await conn.query(`INSERT INTO product_images (product_id, url) VALUES (?, ?)`, [productId, url]);
      }
    };

    // 2. Insert Original Products
    console.log('Inserting initial core products...');
    for (const p of initialProducts) {
      await insertProduct(p);
    }
    
    // 3. Insert "New" Products
    console.log('Inserting new additional products...');
    for (const p of newProducts) {
      await insertProduct(p);
    }

    // 4. Generate & Insert Massive Subcategory Products
    console.log('Generating subcategory items (massive seed)...');
    let massiveAdded = 0;
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
          
          await insertProduct({
            name, price, original_price, category, rating, reviews, description, stock,
            images: [sub.img, sub.img] // reuse images similar to how seed_massive did
          });
          massiveAdded++;
        }
      }
    }
    
    console.log(`✅ Database successfully seeded! Total generated subcategory items: ${massiveAdded}`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    conn.release();
    process.exit();
  }
};

seed();
