const express = require('express');
const { createOrder, calculateTotal } = require('../services/orderService');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/total', (req, res, next) => {
  try {
    const total = calculateTotal(req.body.items);
    res.json({ total });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
