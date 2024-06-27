import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../redux/productSlice";
import InvoiceModal from "./invoiceModal";
import SoldProductModal from "./SoldProductModal";

const ProductModal = ({ productId, onClose }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [product, setProduct] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showSoldProductModal, setShowSoldProductModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === productId);
    setProduct(selectedProduct);
  }, [products, productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <img 
          src={`http://localhost:5000/images/${product.image}`} 
          alt={product.name} 
          className="w-96 h-96 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-700">Price: ${product.price}</p>
        <p className="text-gray-700">Stock: {product.stock}</p>
        <p className="text-gray-700">{product.category}</p>
        <p className="text-gray-700 mt-4">{product.description}</p>
        <button
          onClick={() => setShowInvoiceModal(true)}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-2xl"
        >
          Buy
        </button>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-2xl ml-3"
        >
          Close
        </button>
        {showInvoiceModal && (
          <InvoiceModal
            product={product}
            onClose={() => setShowInvoiceModal(false)}
            onShowSoldProductModal={() => setShowSoldProductModal(true)}
          />
        )}
        {showSoldProductModal && (
          <SoldProductModal product={product} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default ProductModal;
