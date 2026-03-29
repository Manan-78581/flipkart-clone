const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// GET /api/products
app.get('/api/products', async (req, res) => {
  const { search, category } = req.query;
  try {
    let query = `
      SELECT p.*, GROUP_CONCAT(pi.url) as images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ` AND p.name LIKE ?`;
      params.push(`%${search}%`);
    }
    if (category) {
      query += ` AND p.category = ?`;
      params.push(category);
    }

    query += ` GROUP BY p.id`;

    const [rows] = await pool.query(query, params);
    const products = rows.map(p => ({ ...p, images: p.images ? p.images.split(',') : [] }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, GROUP_CONCAT(pi.url) as images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.id = ?
      GROUP BY p.id
    `, [req.params.id]);

    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    const p = rows[0];
    res.json({ ...p, images: p.images ? p.images.split(',') : [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT DISTINCT category FROM products ORDER BY category`);
    res.json(rows.map(r => r.category));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  const { items, shippingAddress, totalAmount } = req.body;
  if (!items || !shippingAddress || !totalAmount) {
    return res.status(400).json({ error: 'Missing required order data' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [orderResult] = await conn.query(`
      INSERT INTO orders (user_id, total_amount, shipping_name, shipping_email, shipping_phone, shipping_address, shipping_city, shipping_state, shipping_zip)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [totalAmount, shippingAddress.name, shippingAddress.email, shippingAddress.phone,
        shippingAddress.address, shippingAddress.city, shippingAddress.state, shippingAddress.zipCode]);

    const orderId = orderResult.insertId;

    for (const item of items) {
      await conn.query(`
        INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
        VALUES (?, ?, ?, ?, ?)
      `, [orderId, item.productId, item.name, item.quantity, item.price]);
    }

    await conn.commit();
    res.json({ orderId: orderId.toString(), message: 'Order placed successfully', totalAmount });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

// GET /api/orders/mine
app.get('/api/orders/mine', async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT * FROM orders WHERE user_id = 1 ORDER BY created_at DESC
    `);

    const result = await Promise.all(orders.map(async (order) => {
      const [items] = await pool.query(`SELECT * FROM order_items WHERE order_id = ?`, [order.id]);
      return {
        orderId: order.id.toString(),
        date: order.created_at,
        totalAmount: order.total_amount,
        shippingAddress: {
          name: order.shipping_name,
          email: order.shipping_email,
          phone: order.shipping_phone,
          address: order.shipping_address,
          city: order.shipping_city,
          state: order.shipping_state,
          zipCode: order.shipping_zip,
        },
        items: items.map(i => ({
          productId: i.product_id,
          name: i.product_name,
          quantity: i.quantity,
          price: i.price,
        })),
      };
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('uncaughtException', (err) => console.error('Error:', err.message));
process.on('unhandledRejection', (err) => console.error('Rejection:', err.message));
