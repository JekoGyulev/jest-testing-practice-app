const express = require('express');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong'
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
