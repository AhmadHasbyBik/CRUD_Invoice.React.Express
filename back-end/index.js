// app.js atau index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const invoiceRoutes = require('./routes/invoiceRoute');
const productRoutes = require('./routes/productRoute');
const productSoldRoutes = require('./routes/productSoldRoute');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use('/api', invoiceRoutes);
app.use('/api', productRoutes);
app.use('/api', productSoldRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
