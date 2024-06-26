const pool = require('../config/db');

const createInventoryTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS inventories (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES products(id) ON DELETE CASCADE,
      sucursal VARCHAR(100),
      cantidad INT
    )
  `;
  await pool.query(queryText);
};

createInventoryTable().catch(err => console.error('Error creating inventory table', err.stack));

module.exports = pool;
