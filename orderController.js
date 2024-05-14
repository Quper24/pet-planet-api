import { randomUUID } from 'crypto';
import { loadOrders, saveOrders } from './dataService.js';

export const setupOrderRoutes = app => {
  app.post('/api/orders', async (req, res) => {
    const { products, storeId } = req.body;

    if (!products || !Array.isArray(products) || !storeId) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    try {
      const orders = await loadOrders();
      const order = {
        id: randomUUID(),
        products,
        storeId,
        date: new Date().toISOString(),
      };

      orders.push(order);

      if (await saveOrders(orders)) {
        res.status(201).json({ orderId: order.id });
      } else {
        res.status(500).json({ error: 'Failed to save order' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to process order' });
    }
  });
};
