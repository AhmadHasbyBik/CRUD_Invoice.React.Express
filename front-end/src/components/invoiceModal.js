import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../redux/invoiceSlice';

const InvoiceModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    date: '',
    customerName: '',
    salespersonName: '',
    notes: '',
    products: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addInvoice(formData))
      .then(() => {
        alert('Invoice added successfully!');
        closeModal();
      })
      .catch((error) => {
        alert('Failed to add invoice: ' + error.message);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Invoice</h2>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <br />

          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
          <br />

          <label>Salesperson Name:</label>
          <input
            type="text"
            name="salespersonName"
            value={formData.salespersonName}
            onChange={handleChange}
            required
          />
          <br />

          <label>Notes:</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
          <br />

          {/* Add products input (you can use autocomplete or select dropdown for products) */}

          <button type="submit">Add Invoice</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal;
