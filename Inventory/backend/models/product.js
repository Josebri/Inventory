const pool = require('../config/db');

const createProductTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      codigo VARCHAR(50) NOT NULL,
      categoria VARCHAR(100),
      descripcion VARCHAR(255),
      descripcion_detallada TEXT,
      marca VARCHAR(100),
      precio NUMERIC(10, 2),
      imagen_url VARCHAR(255)
    )
  `;
  await pool.query(queryText);
};

createProductTable().catch(err => console.error('Error creating product table', err.stack));

module.exports = pool;
