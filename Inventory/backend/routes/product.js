const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Rutas para productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const { codigo, categoria, descripcion, descripcion_detallada, marca, precio, imagen_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (codigo, categoria, descripcion, descripcion_detallada, marca, precio, imagen_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [codigo, categoria, descripcion, descripcion_detallada, marca, precio, imagen_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { codigo, categoria, descripcion, descripcion_detallada, marca, precio, imagen_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET codigo = $1, categoria = $2, descripcion = $3, descripcion_detallada = $4, marca = $5, precio = $6, imagen_url = $7 WHERE id = $8 RETURNING *',
      [codigo, categoria, descripcion, descripcion_detallada, marca, precio, imagen_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
