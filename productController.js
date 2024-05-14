import { loadData } from './dataService.js';

export const setupProductRoutes = app => {
  app.get('/api/products', async (req, res) => {
    try {
      const data = await loadData();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load products' });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const data = await loadData();
      const product = data.find(p => p.id === req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to load product' });
    }
  });

  app.get('/api/products/category/:category', async (req, res) => {
    try {
      const data = await loadData();
      const products = data.filter(p => p.categories === req.params.category);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load products by category' });
    }
  });

  app.get('/api/products/list/:ids', async (req, res) => {
    try {
      const data = await loadData();
      const ids = req.params.ids.split(',').map(id => id.trim());
      const products = data.filter(p => ids.includes(p.id));
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load products by ids' });
    }
  });
};
