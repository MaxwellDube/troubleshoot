const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
  host: 'sql8.freesqldatabase.com',
  user: 'sql8778649',
  password: 'MaxwellTaku12!',
  database: 'sql8778649'
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err.message);
    return;
  }
  console.log('Connected to MySQL DB');
});

// POST route to insert an order
app.post('/orders', (req, res) => {
  const { name, surname, email, phone, porkType, packs, price } = req.body;

  if (!name || !surname || !email || !phone || !porkType || !packs || !price) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const sql = 'INSERT INTO orders (name, surname, email, phone, porkType, packs, price) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, surname, email, phone, porkType, packs, price], (err, result) => {
    if (err) {
      console.error('Insert error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Order placed successfully!' });
  });
});

// POST route to insert a product
app.post('/products', (req, res) => {
  const { name, description, price, image_url } = req.body;
  const sql = 'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, description, price, image_url], (err, result) => {
    if (err) {
      console.error('Insert error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Product added successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
