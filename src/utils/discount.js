function applyDiscount(total) {
  if (total > 500) return total * 0.9;
  if (total > 200) return total * 0.95;
  return total;
}

module.exports = { applyDiscount };
