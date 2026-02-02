const { applyDiscount } = require('../utils/discount');

async function createOrder({ userId, items }) {
  if (!userId || !Array.isArray(items)) {
    const err = new Error('Invalid order data');
    err.status = 400;
    throw err;
  }

  const total = applyDiscount(calculateTotal(items));
  return {
    id: Math.floor(Math.random() * 10000),
    userId,
    items,
    total,
    createdAt: new Date()
  };
}

function calculateTotal(items) {
  if (!items.length) {
    throw new Error('Order must contain at least one item');
  }

  return items.reduce((sum, item) => {
    if (item.price < 0) {
      throw new Error('Invalid item price');
    }
    return sum + item.price * item.quantity;
  }, 0);
}

module.exports = { createOrder, calculateTotal };
