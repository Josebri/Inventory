const Product = require('../models/product');
const Inventory = require('../models/inventory');

module.exports = {
  async getAllProducts(req, res) {
    try {
      const products = await Product.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getProductById(req, res) {
    try {
      const product = await Product.getProductById(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async createProduct(req, res) {
    try {
      const product = await Product.createProduct(req.body);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async updateProduct(req, res) {
    try {
      const product = await Product.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async deleteProduct(req, res) {
    try {
      const product = await Product.deleteProduct(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getInventoryByProductId(req, res) {
    try {
      const inventories = await Inventory.getInventoryByProductId(req.params.productId);
      res.json(inventories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async createInventory(req, res) {
    try {
      const inventory = await Inventory.createInventory(req.body);
      res.json(inventory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async updateInventory(req, res) {
    try {
      const inventory = await Inventory.updateInventory(req.params.id, req.body);
      res.json(inventory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async deleteInventory(req, res) {
    try {
      const inventory = await Inventory.deleteInventory(req.params.id);
      res.json(inventory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
