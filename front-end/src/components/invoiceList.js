import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices, selectAllInvoices } from '../redux/invoiceSlice';
import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import 'chart.js/auto';
import { eachDayOfInterval, format } from 'date-fns';

Chart.register(zoomPlugin);

const InvoicePage = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(selectAllInvoices);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(4);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const totalPages = Math.ceil(invoices.length / invoicesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfFirstInvoice + invoicesPerPage);

  // Prepare data for the chart
  const invoiceDates = invoices.map(invoice => new Date(invoice.date));
  const minDate = invoiceDates.length > 0 ? new Date(Math.min(...invoiceDates)) : new Date();
  const maxDate = invoiceDates.length > 0 ? new Date(Math.max(...invoiceDates)) : new Date();

  const dates = eachDayOfInterval({ start: minDate, end: maxDate });
  const invoiceCountData = dates.map(date => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const count = invoices.filter(invoice => format(new Date(invoice.date), 'yyyy-MM-dd') === formattedDate).length;
    return { date: formattedDate, count };
  });

  const chartData = {
    labels: invoiceCountData.map(data => data.date),
    datasets: [
      {
        label: 'Number of Invoices',
        data: invoiceCountData.map(data => data.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Number of Invoices',
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  };

  return (
    <div>
      <div className="text-center text-2xl font-bold mt-5 mb-4">Invoices</div>
      <Bar data={chartData} options={options}/>
      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentInvoices.map((invoice) => (
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
          <div className="flex justify-center mt-4 mb-6">
            <button
              onClick={handlePrevPage}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoicePage;
