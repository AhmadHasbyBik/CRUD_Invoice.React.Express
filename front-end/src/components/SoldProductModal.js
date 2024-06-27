import React, { useState } from "react";
import axios from "axios";

const SoldProductModal = ({ product, onClose }) => {
  const shipping = Math.floor(Math.random() * 5) + 1;
  const [soldProductData, setSoldProductData] = useState({
    productId: product.id,
    item: product.name,
    quantity: 1,
    totalCogs: product.price,
    totalPrice: product.price + shipping,
  });

  const handleSoldProductChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      const newQuantity = parseInt(value, 10);
      const newTotalCogs = product.price * newQuantity;
      const newTotalPrice = newTotalCogs + Math.floor(Math.random() * 5) + 1;
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

  const handleSoldProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/productsold",
        soldProductData
      );
      console.log("Sold product saved:", response.data);
      onClose();
    } catch (error) {
      console.error("Error saving sold product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Add Sold Product</h2>
        <form onSubmit={handleSoldProductSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Item Name</label>
            <input
              type="text"
              name="item"
              value={soldProductData.item}
              onChange={handleSoldProductChange}
              className="mt-1 block w-full border rounded py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={soldProductData.quantity}
              onChange={handleSoldProductChange}
              className="mt-1 block w-full border rounded py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total COGS</label>
            <input
              type="number"
              name="totalCogs"
              value={soldProductData.totalCogs}
              readOnly
              className="mt-1 block w-full border rounded py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Price</label>
            <input
              type="number"
              name="totalPrice"
              value={soldProductData.totalPrice}
              readOnly
              className="mt-1 block w-full border rounded py-2 px-3"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-2xl"
          >
            Submit Sold Product
          </button>
        </form>
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

export default SoldProductModal;
