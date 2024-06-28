import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../redux/invoiceSlice";

const InvoiceModal = ({ product, productSoldId, onClose, onInvoiceSubmit }) => {
  const dispatch = useDispatch();
  
  const [invoiceData, setInvoiceData] = useState({
    date: "",
    customer: "",
    salesperson: "",
    paymentType: "Cash", // Default value
    notes: "",
    ProductSoldId: productSoldId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addInvoice({
        ...invoiceData,
        products: [
          {
            productId: product.id,
          },
        ],
      })
    )
      .unwrap()
      .then(() => {
        onInvoiceSubmit();
      })
      .catch((error) => {
        console.error("Error saving invoice:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 lg:w-1/3 sm:w-11/12">
        <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={invoiceData.date}
              onChange={handleChange}
              className="mt-1 block w-full border rounded py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customer"
              value={invoiceData.customer}
              onChange={handleChange}
              className="mt-1 block w-full border rounded py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Salesperson Name</label>
            <input
              type="text"
              name="salesperson"
              value={invoiceData.salesperson}
              onChange={handleChange}
              className="mt-1 block w-full border rounded py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Payment Type</label>
            <select
              name="paymentType"
              value={invoiceData.paymentType}
              onChange={handleChange}
              className="mt-1 block w-full border rounded py-2 px-3"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={invoiceData.notes}
              onChange={handleChange}
              className="mt-1 block w-full border rounded py-2 px-3"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-2xl"
          >
            Submit Invoice
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-2xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InvoiceModal;
