import React, { useEffect, useState } from "react";
import axios from "axios";

const SoldProductsPage = () => {
  const [soldProducts, setSoldProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});

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

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching product details for productId ${productId}:`, error);
        return null;
      }
    };

    // Fetch product details for each sold product
    const fetchAllProductDetails = async () => {
      const details = await Promise.all(
        soldProducts.map(product => fetchProductDetails(product.ProductId))
      );
      setProductDetails(details);
    };

    if (soldProducts.length > 0) {
      fetchAllProductDetails();
    }
  }, [soldProducts]);

  return (
    <div>
      <div className="text-center text-2xl font-bold mb-4">Product Sold</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {soldProducts.map((product, index) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            {productDetails[index] ? (
              <>
                <img
                  src={`http://localhost:5000/images/${productDetails[index].image}`}
                  alt={productDetails[index].name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-xl font-bold">{productDetails[index].name}</h3>
                <p className="text-gray-700 mt-2">Quantity: {product.quantity}</p>
                <p className="text-gray-700">Total COGS: ${product.totalCogs}</p>
                <p className="text-gray-700">Total Price: ${product.totalPrice}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoldProductsPage;
