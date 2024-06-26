import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    date: "",
    customer: "",
    salesperson: "",
    paymentType: "",
    notes: "",
    quantity: 1,
  });
  const [soldProductData, setSoldProductData] = useState({
    item: "", // Initialize with empty string
    quantity: 1,
    totalCogs: 0,
    totalPrice: 0,
  });
  const [showSoldProductModal, setShowSoldProductModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        const fetchedProduct = response.data;

        // Set product details
        setProduct(fetchedProduct);

        // Initialize sold product data with product details
        setSoldProductData({
          ...soldProductData,
          item: fetchedProduct.name,
          totalCogs: fetchedProduct.price * soldProductData.quantity,
          totalPrice:
            fetchedProduct.price * soldProductData.quantity +
            Math.floor(Math.random() * 5) +
            1, // Random price between 1 and 5
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]); // Only run this effect when productId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleSoldProductChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      // Update quantity and calculate totalCogs and totalPrice
      const newQuantity = parseInt(value, 10);
      const newTotalCogs = product.price * newQuantity;
      const newTotalPrice =
        product.price * newQuantity +
        Math.floor(Math.random() * 5) +
        1; // Random price between 1 and 5

      setSoldProductData({
        ...soldProductData,
        [name]: newQuantity,
        totalCogs: newTotalCogs,
        totalPrice: newTotalPrice,
      });
    } else {
      setSoldProductData({
        ...soldProductData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/invoices", {
        ...invoiceData,
        products: [
          {
            productId: product.id,
          },
        ],
      });
      console.log("Invoice saved:", response.data);
      setShowSoldProductModal(true);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  const handleSoldProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/productsold",
        {
          ...soldProductData,
          totalCogs: soldProductData.totalCogs,
          totalPrice: soldProductData.totalPrice,
        }
      );
      console.log("Sold product saved:", response.data);
      onClose();
    } catch (error) {
      console.error("Error saving sold product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-700">Price: ${product.price}</p>
        <p className="text-gray-700">Stock: {product.stock}</p>
        <p className="text-gray-700">{product.category}</p>
        <p className="text-gray-700 mt-4">{product.description}</p>

        <form onSubmit={handleSubmit} className="mt-4">
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
            <input
              type="text"
              name="paymentType"
              value={invoiceData.paymentType}
              onChange={handleChange}
              className="mt-1 block w-full border rounded py-2 px-3"
              required
            />
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
        {showSoldProductModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-1/2">
              <h2 className="text-2xl font-bold mb-4">Add Sold Product</h2>

              <form onSubmit={handleSoldProductSubmit} className="mt-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Item Name</label>
                  <input
                    type="text"
                    name="item"
                    value={soldProductData.item}
                    onChange={handleSoldProductChange}
                    className="mt-1 block w-full border rounded py-2 px-3"
                    required
                    readOnly // Set readOnly to true for auto-filled item name
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={soldProductData.newQuantity}
                    className="mt-1 block w-full border rounded py-2 px-3"
                    required
                    min="1"
                    max={product.stock} // Assuming max is limited by available stock
                  />
                </div>

                {/* You can hide these fields if they are calculated server-side */}
                <div className="">
                  <label className="block text-gray-700">Total COGS</label>
                  <input
                    type="number"
                    name="totalCogs"
                    value={soldProductData.totalCogs}
                    onChange={handleSoldProductChange}
                    className="mt-1 block w-full border rounded py-2 px-3"
                    required
                    readOnly // Assuming totalCogs is calculated server-side
                  />
                </div>
                <div className="mb-4">
                <span className="ml-2 text-gray-500">
                      (Shipping cost: +{soldProductData.totalPrice -
                        product.price *
                          soldProductData.quantity}{" "}
                      USD)
                    </span>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Total Price</label>
                  <input
                    type="number"
                    name="totalPrice"
                    value={soldProductData.totalPrice}
                    onChange={handleSoldProductChange}
                    className="mt-1 block w-full border rounded py-2 px-3"
                    required
                    readOnly // Assuming totalPrice is calculated server-side
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-2xl"
                >
                  Add Sold Product
                </button>
              </form>
              <button
                onClick={() => setShowSoldProductModal(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
