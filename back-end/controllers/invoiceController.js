// controllers/invoiceController.js
const Invoice = require('../models/invoice');

// Create
exports.createInvoice = async (req, res) => {
  try {
    const { date, customer, salesperson, paymentType, notes } = req.body;
    const newInvoice = await Invoice.create({
      date,
      customer,
      salesperson,
      paymentType,
      notes
    });
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found' });
    } else {
      res.status(200).json(invoice);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Invoice.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedInvoice = await Invoice.findByPk(id);
      res.status(200).json(updatedInvoice);
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Invoice.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
