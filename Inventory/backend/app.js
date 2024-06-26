const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:4200', // Cambia esto si tu frontend está en otro dominio o puerto
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Rutas de tu aplicación
const productRoutes = require('./routes/product');
const inventoryRoutes = require('./routes/inventory');

app.use('/api/products', productRoutes);
app.use('/api/inventories', inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
