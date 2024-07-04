const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'inventory',
  password: '12bote34',
  port: 5432,
});

const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token verification failed', error: err.message });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header not provided' });
  }
};

// Registro de usuarios
app.post('/register', async (req, res) => {
  const { username, password, email, phone, profile } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, password, email, phone, profile) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, hashedPassword, email, phone, profile]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [usernameOrEmail, usernameOrEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    if (user.is_blocked) {
      return res.status(403).json({ error: 'User is blocked' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      await pool.query(
        'UPDATE users SET attempts = attempts - 1 WHERE id_users = $1',
        [user.id_users]
      );

      const updatedUser = await pool.query(
        'SELECT * FROM users WHERE id_users = $1',
        [user.id_users]
      );

      if (updatedUser.rows[0].attempts === 0) {
        await pool.query(
          'UPDATE users SET is_blocked = TRUE WHERE id_users = $1',
          [user.id_users]
        );
      }

      return res.status(403).json({ error: 'Invalid password' });
    }

    await pool.query(
      'UPDATE users SET attempts = 3 WHERE id_users = $1',
      [user.id_users]
    );

    const token = jwt.sign(
      { id: user.id_users, username: user.username, profile: user.profile },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener sedes del usuario
app.get('/users/locations', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const locations = await pool.query(
      'SELECT l.id_location, l.name, l.address FROM users_locations ul ' +
      'JOIN locations l ON ul.id_location = l.id_location ' +
      'WHERE ul.id_users = $1',
      [userId]
    );
    res.status(200).json(locations.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD de productos
app.get('/products', authenticate, async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.status(200).json(products.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:id', authenticate, async (req, res) => {
  try {
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (product.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/products', authenticate, async (req, res) => {
  const { name, brand, reorder_quantity, image, supplier, price } = req.body;
  try {
    const newProduct = await pool.query(
      'INSERT INTO products (name, brand, reorder_quantity, image, supplier, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, brand, reorder_quantity, image, supplier, price]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/products/:id', authenticate, async (req, res) => {
  const { name, brand, reorder_quantity, image, supplier, price } = req.body;
  try {
    const updatedProduct = await pool.query(
      'UPDATE products SET name = $1, brand = $2, reorder_quantity = $3, image = $4, supplier = $5, price = $6 WHERE id = $7 RETURNING *',
      [name, brand, reorder_quantity, image, supplier, price, req.params.id]
    );
    if (updatedProduct.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/products/:id', authenticate, async (req, res) => {
  try {
    const deletedProduct = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
    if (deletedProduct.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD de ubicaciones
app.get('/locations', authenticate, async (req, res) => {
  try {
    const locations = await pool.query('SELECT * FROM locations');
    res.status(200).json(locations.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/locations/:id', authenticate, async (req, res) => {
  try {
    const location = await pool.query('SELECT * FROM locations WHERE id_location = $1', [req.params.id]);
    if (location.rows.length === 0) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(location.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/locations', authenticate, async (req, res) => {
  const { name, address } = req.body;
  try {
    const newLocation = await pool.query(
      'INSERT INTO locations (name, address) VALUES ($1) RETURNING *',
      [name, address]
    );
    res.status(201).json(newLocation.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/locations/:id', authenticate, async (req, res) => {
  const { name, address } = req.body;
  try {
    const updatedLocation = await pool.query(
      'UPDATE locations SET name = $1, address = $2 WHERE id_location = $3 RETURNING *',
      [name, address, req.params.id]
    );
    if (updatedLocation.rows.length === 0) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(updatedLocation.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/locations/:id', authenticate, async (req, res) => {
  try {
    const deletedLocation = await pool.query('DELETE FROM locations WHERE id_location = $1 RETURNING *', [req.params.id]);
    if (deletedLocation.rows.length === 0) return res.status(404).json({ message: 'Location not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
