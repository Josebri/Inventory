const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Rutas para inventarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventories');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const { product_id, sucursal, cantidad } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO inventories (product_id, sucursal, cantidad) VALUES ($1, $2, $3) RETURNING *',
      [product_id, sucursal, cantidad]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { product_id, sucursal, cantidad } = req.body;
  try {
    const result = await pool.query(
      'UPDATE inventories SET product_id = $1, sucursal = $2, cantidad = $3 WHERE id = $4 RETURNING *',
      [product_id, sucursal, cantidad, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM inventories WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
