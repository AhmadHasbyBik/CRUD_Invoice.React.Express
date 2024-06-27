import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices, selectAllInvoices } from '../redux/invoiceSlice';

const InvoicePage = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(selectAllInvoices);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-bold mb-2">Invoice #{invoice.id}</h3>
              <p className="text-gray-700">Date: {new Date(invoice.date).toLocaleDateString()}</p>
              <p className="text-gray-700">Customer: {invoice.customer}</p>
              <p className="text-gray-700">Salesperson: {invoice.salesperson}</p>
              <p className="text-gray-700">Payment Type: {invoice.paymentType}</p>
              <p className="text-gray-700">Notes: {invoice.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
