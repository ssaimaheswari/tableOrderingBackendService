const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, connect } = require('./config/dbConfig');

// Import routes
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Initialize database connection
connect();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
