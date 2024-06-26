// SoldProductsPage.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const SoldProductsPage = () => {
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/productsold"
        );
        setSoldProducts(response.data);
      } catch (error) {
        console.error("Error fetching sold products:", error);
      }
    };

    fetchSoldProducts();
  }, []);

  return (
    <div>
      <div className="text-center text-2xl font-bold mb-4">Product Sold</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {soldProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold">{product.item}</h3>
            <p className="text-gray-700 mt-2">Price: ${product.quantity}</p>
            <p className="text-gray-700">Stock: {product.totalCogs}</p>
            <p className="text-gray-700">Total Price: {product.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoldProductsPage;
