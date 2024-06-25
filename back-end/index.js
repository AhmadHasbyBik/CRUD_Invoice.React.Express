const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Invoice, Product } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// CRUD for Invoices
app.post('/api/invoices', async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (invoice) {
      res.status(200).json(invoice);
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (invoice) {
      await invoice.update(req.body);
      res.status(200).json(invoice);
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (invoice) {
      await invoice.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// CRUD for Products
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
